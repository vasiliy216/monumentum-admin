import bcrypt from "bcrypt"

export const generatorPasswordHash = (password: string) => {
	return new Promise<string>((res, rej) => {
		bcrypt.hash(password, 10, function (err, hash) {
			if (err) { return rej(err) }
			res(hash)
		})
	})
}