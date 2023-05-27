/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest } from "next"
import formidable from "formidable"
import { Writable } from "stream"

export const formidableConfig = {
	keepExtensions: true,
	maxFileSize: 10_000_000,
	maxFieldsSize: 10_000_000,
	allowEmptyFiles: false,
	multiples: false
}

export function formidablePromise(req: NextApiRequest, opts?: Parameters<typeof formidable>[0]): Promise<{ fields: formidable.Fields; files: any}> {
	return new Promise((accept, reject) => {
		const form = formidable(opts)

		form.parse(req, (err, fields, files) => {
			if (err) {
				return reject(err)
			}
			return accept({ fields, files })
		})
	})
}

export const fileConsumer = <T = unknown>(acc: T[]) => {
	const writable = new Writable({
		write: (chunk, _enc, next) => {
			acc.push(chunk)
			next()
		}
	})

	return writable
}