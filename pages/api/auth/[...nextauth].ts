import bcrypt from "bcrypt"
import { NextApiRequest, NextApiResponse } from "next"
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { Users } from "models"
import { dbConnect } from "utils/connect-mongo"

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			id: "login",
			type: "credentials",
			credentials: {},
			async authorize(credentials) {
				await dbConnect()
				const { userName, password } = credentials as {
					userName: string
					password: string
				}
				const user = await Users.findOne({ userName })

				if (!user) { throw new Error("User not found.") }

				if (!bcrypt.compareSync(password, user.password)) {
					throw new Error("Invalid email or password.")
				}

				return user
			}
		})
	],
	pages: {
		signIn: "/login",
		error: "/error"
	},
	jwt: {},
	session: {
		strategy: "jwt",
		maxAge: 24 * 60 * 60,
		updateAge: 60 * 60
	},
	callbacks: {
		async session(props) {
			return props.session
		}
	},
	secret: process.env.NEXT_AUTH_SECRET
}

function setNextAuthUrl(req: NextApiRequest) {
	const protocol = process.env.NODE_ENV === "production" ? "https" : "http"
	const host = req.headers["host"]

	if (!host) {
		throw new Error("The request has no host header which breaks authentication and authorization.")
	}

	if (protocol === "https") { return }

	process.env.NEXTAUTH_URL = `${protocol}://${host}`
}

export default (req: NextApiRequest, res: NextApiResponse) => {
	setNextAuthUrl(req)
	return NextAuth(req, res, authOptions)
}