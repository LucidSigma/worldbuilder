"use strict";

const mongoose = require("mongoose");

const PlanetSchema = new mongoose.Schema({
	name: String,
	colour: String,
	description: String,
	diameter: Number,
	moonCount: Number,
	
	starName: String,
	distanceFromStar: Number,
	
	creationDate: {
		type: Date,
		default: Date.now
	},

	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},

	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

module.exports = mongoose.model("Planet", PlanetSchema);