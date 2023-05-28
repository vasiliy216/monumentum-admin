import { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
	res.end()
}

export const config = {
	api: {
		bodyParser: false,
		responseLimit: "4mb"
	}
}