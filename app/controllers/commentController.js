"use strict";

const express = require("express");

const middleware = require("../middleware");

const Comment = require("../models/comment");
const Planet = require("../models/planet");

const router = express.Router({
	mergeParams: true
});

// NEW
router.get("/new", middleware.isLoggedIn, async (request, response) => {
	try {
		const foundPlanet = await Planet.findById(request.params["planet_id"]);

		response.render("comments/new", {
			planet: foundPlanet
		});
	}
	catch (error) {
		request.flash("error", "A planet with that specified ID cannot be found.");
		response.redirect(`/planets/${request.params["planet_id"]}`);
	}
});

// CREATE
router.post("/", middleware.isLoggedIn, async (request, response) => {
	try {
		const foundPlanet = await Planet.findById(request.params["planet_id"]);
		const comment = await Comment.create(request.body.comment);

		comment.author = {
			id: request.user._id,
			username: request.user.username
		};

		comment.save();

		foundPlanet.comments.push(comment);
		foundPlanet.save();

		request.flash(`Comment successfully added to ${foundPlanet.name}.`);
		response.redirect(`/planets/${request.params["planet_id"]}`);
	}
	catch (error) {
		request.flash("error", "The comment could not be created, please try again.");
		response.redirect(`/planets/${request.params["planet_id"]}`);
	}
});

// EDIT


// UPDATE


// DESTROY


module.exports = router;