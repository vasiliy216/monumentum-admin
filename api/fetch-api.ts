import { NextApiRequest } from "next"
import { getBaseUrl } from "utils/get-base-url"

export const fetchApi = async (req: NextApiRequest | undefined, url: string, params: any = {}) => {
	if (!params.headers) {
		params.headers = {
			"Content-Type": "application/json"
		}
	}
	const response = await fetch(`${getBaseUrl(req)}${url}`, params)
	return response
}