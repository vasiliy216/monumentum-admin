import { NextApiRequest } from "next/types"
import absoluteUrl from "next-absolute-url"

export const getBaseUrl = (req?: NextApiRequest) => {
	if (!req) { return "" }
	const { origin } = absoluteUrl(req)
	return origin
}