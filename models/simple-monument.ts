import mongoose from "mongoose"

const SimpleMonumentsSchema = new mongoose.Schema({
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

export const SimpleMonuments = mongoose.models.SimpleMonuments
	|| mongoose.model("SimpleMonuments", SimpleMonumentsSchema)