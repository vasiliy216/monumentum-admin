/* eslint-disable @typescript-eslint/no-this-alias */
import mongoose from "mongoose"
import { generatorPasswordHash } from "utils/generator-password-hash"

const UsersSchema = new mongoose.Schema({
	email: {
		type: String,
		require: true,
		default: ""
	},
	userName: {
		type: String,
		default: ""
	},
	password: {
		type: String,
		default: ""
	}
})

UsersSchema.pre("save", async function (next) {
	const user = this

	if (user.password && !user.isModified("password")) { return next() }

	user.password = await generatorPasswordHash(user.password) as string
})

export const Users = mongoose.models.Users
	|| mongoose.model("Users", UsersSchema)