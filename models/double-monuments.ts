import mongoose from "mongoose"

const DoubleMonumentsSchema = new mongoose.Schema({
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
		default: "monuments"
	}
})

export const DoubleMonuments = mongoose.models.DoubleMonuments
	|| mongoose.model("DoubleMonuments", DoubleMonumentsSchema)