"use strict";

const Comment = require("./models/comment");
const Planet = require("./models/planet");

function isLoggedIn(request, response, next) {
	if (request.isAuthenticated()) {
		next();
	}
	else {
		request.flash("error", "You need to be logged in to do that.");
		response.redirect("/login");
	}
}

async function checkOwnership(model, modelName, request, response, next) {
	if (request.isAuthenticated()) {
		try {
			const foundModel = await model.findById(request.params[`${modelName}_id`]);

			if (foundModel.author.id.equals(request.user._id)) {
				next();
			}
			else {
				request.flash("error", "You don't have permission to do that.");
				response.redirect("back");
			}
		}
		catch (error) {
			request.flash("error", `A ${modelName} with that specified ID does not exist.`);
			response.redirect("back");
		}
	}
	else {
		request.flash("error", "You need to be logged in to do that.");
		response.redirect("back");
	}
}

module.exports = {
	isLoggedIn: isLoggedIn,

	checkPlanetOwnership: async (request, response, next) => {
		await checkOwnership(Planet, "planet", request, response, next);
	},

	checkCommentOwnership: async (request, response, next) => {
		await checkOwnership(Comment, "comment", request, response, next);
	}
}