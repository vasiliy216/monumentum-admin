import mongoose from "mongoose"

const VasesSchema = new mongoose.Schema({
	id: {
		type: String,
		default: ""
	},
	name: {
		type: String,
		default: ""
	},
	img: {
		type: String,
		default: ""
	},
	cost: {
		type: String,
		default: ""
	},
	size: {
		type: Object,
		default: {
			length: "",
			width: "",
			height: ""
		}
	},
	info: {
		type: String,
		default: ""
	},
	type: {
		type: String,
		default: "vases"
	}
})

export const Vases = mongoose.models.Vases
	|| mongoose.model("Vases", VasesSchema)