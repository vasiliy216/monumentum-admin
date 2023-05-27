/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from "next"
import { getToken } from "next-auth/jwt"
import NextCors from "nextjs-cors"
import uuid from "react-uuid"
import {
	SimpleMonuments,
	DoubleMonuments,
	ExclusiveMonuments,
	Fences,
	TypesOfStone,
	Vases
} from "models"
import { dbConnect } from "utils/connect-mongo"
import Cloudinary from "utils/cloudinary"
import {
	formidableConfig, formidablePromise, fileConsumer
} from "utils/formidable-promise"

const SAME_ROWS = 6

const CurrentModal = {
	Singles: SimpleMonuments,
	Double: DoubleMonuments,
	Exclusive: ExclusiveMonuments,
	Fences: Fences,
	Vases: Vases,
	Stone: TypesOfStone
}

export type CurrentModalType = keyof typeof CurrentModal

type CurrentNextApiRequest = NextApiRequest & { query: { page: string, tp: CurrentModalType } }

const getFieldsData = (tp: CurrentModalType, fields: Record<string, any>) => {
	if (tp === "Stone") { return { name: fields.name } }
	return {
		name: fields.name,
		cost: fields.cost,
		info: fields.info,
		size: {
			length: fields.length,
			width: fields.width,
			height: fields.height
		}
	}
}

const getFieldsAndSetImg = async (req: CurrentNextApiRequest) => {
	const { query } = req
	const chunks: never[] = []
	const { fields, files } = await formidablePromise(req, {
		...formidableConfig,
		fileWriteStreamHandler: () => fileConsumer(chunks)
	})
	let fileData
	if (files.file) {
		const fileBase64 = Buffer.concat(chunks).toString("base64")
		fileData = await Cloudinary.v2.uploader.upload(`data:${files.file.mimetype};base64,${fileBase64}`, { public_id: uuid(), folder: query.tp })
	}

	return { fields, fileData }
}

export default async (req: CurrentNextApiRequest, res: NextApiResponse) => {
	try {
		const { method, query } = req

		await NextCors(req, res, {
			methods: ["GET", "PUT", "POST", "DELETE"],
			origin: "*",
			optionsSuccessStatus: 200
		})
		// console.log("req", req)
		const auth = await getToken({ req, secret: process.env.NEXT_AUTH_SECRET })
		if (!auth && method !== "GET") { return res.status(401).json({ message: "Unauthorized" }) }

		const _currentModal = CurrentModal[query.tp]

		if (!query.tp || !_currentModal) { return res.status(400).json({ message: "Bad request" }) }

		await dbConnect()

		switch (method) {
			case "GET": {
				let items
				if (query.page === "all") {
					items = await _currentModal.find().select("-_id -__v")
				} else {
					items = await _currentModal.find()
						.select("-_id -__v")
						.skip((+query.page - 1) * SAME_ROWS)
						.limit(SAME_ROWS)
				}
				return res.status(200).json(items)
			}
			case "POST": {
				const { fields, fileData } = await getFieldsAndSetImg(req)

				const newFields = {
					...getFieldsData(query.tp, fields),
					img: fileData?.secure_url
				}

				const newItem = new _currentModal({ ...newFields, id: uuid() })
				await newItem.save()

				return res.status(200).json({ statusCode: 200 })
			}
			case "PUT": {
				const { fields, fileData } = await getFieldsAndSetImg(req)

				const changeFields = getFieldsData(query.tp, fields) as Record<string, any>
				const arr = []

				if (fields.prevImg) {
					changeFields.img = fileData?.secure_url
					const removeImg = `${query.tp}/${(fields.prevImg as any).match(/([^\\/]+)(?=\.\w+$)/)[0]}`
					arr.push(Promise.resolve(Cloudinary.v2.api.delete_resources([removeImg])))
				}

				arr.push(Promise.resolve(_currentModal.findOneAndUpdate({ id: fields.id }, { ...changeFields })))

				// const result = await Promise.all([...arr])
				await Promise.all([...arr])

				return res.status(200).json({ statusCode: 200 })
			}
			case "DELETE": {
				const removedItem = await _currentModal.findOneAndDelete({ id: query.id })
				const removeImg = `${query.tp}/${removedItem.img.match(/([^\\/]+)(?=\.\w+$)/)[0]}`

				await Cloudinary.v2.api.delete_resources([removeImg])

				return res.status(200).json({ statusCode: 200 })
			}
			default:
				return res.status(400).json({ message: "Bad request" })
				break
		}
	} catch (err) {
		console.log("err", err)
		return res.status(500).json({ error: "Internal server error" })
	}
}

export const config = {
	api: {
		bodyParser: false,
		responseLimit: "4mb"
	}
}