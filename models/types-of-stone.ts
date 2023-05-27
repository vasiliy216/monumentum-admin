import mongoose from "mongoose"

const TypesOfStoneSchema = new mongoose.Schema({
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
	type: {
		type: String,
		default: "stone"
	}
})

export const TypesOfStone = mongoose.models.TypesOfStone
	|| mongoose.model("TypesOfStone", TypesOfStoneSchema)