import jwt from "jsonwebtoken"

export const verifyJwtToken = (token: string) => new Promise((res, rej) => {
	if (!token) { return rej("The token is missing") }
	jwt.verify(token, process.env.JWT_SECRET || "", (err, decodedToken) => {
		if (err || !decodedToken) {
			return rej(err)
		}
		return res(decodedToken)
	})
})