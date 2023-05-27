import jwt from "jsonwebtoken"

type CreateJwtTokenType = { [key: string]: string | number | null | undefined }

export const createJwtToken = (data: CreateJwtTokenType) => {
	const token = jwt.sign(
		{ ...data },
		process.env.JWT_SECRET || "",
		{ expiresIn: 24 * 60 * 60, algorithm: "HS384" }
	)

	return token
}