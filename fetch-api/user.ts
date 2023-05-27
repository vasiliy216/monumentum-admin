import { NextApiRequest } from "next"
import { fetchApi } from "./fetch-api"
import { User, TransformationType } from "types"

export const userLogin = async (user?: TransformationType<User>, req?: NextApiRequest) => {
	try {
		const res = await fetchApi(req, "/api/user", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ user })
		})
		const json = await res.json()
		return json
	} catch (error) {
		console.log(error)
		return { status: false, message: "Something was wrong" }
	}
}