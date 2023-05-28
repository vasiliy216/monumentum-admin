import bcrypt from "bcrypt"
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
		},
		async jwt({ token }) {
			return token
		}
	},
	secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)