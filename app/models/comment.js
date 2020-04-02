"use strict";

const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
	text: String,

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
	}
});

module.exports = mongoose.model("Comment", CommentSchema);