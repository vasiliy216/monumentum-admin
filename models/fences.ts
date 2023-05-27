import mongoose from "mongoose"

const FencesSchema = new mongoose.Schema({
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
		default: "fences"
	}
})

export const Fences = mongoose.models.Fences
	|| mongoose.model("Fences", FencesSchema)