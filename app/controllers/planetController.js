"use strict";

const express = require("express");

const Planet = require("../models/planet");

const router = express.Router();

// INDEX
router.get("/", async (request, response) => {
	response.locals.title += " - Planet Index";
	const planets = await Planet.find({ });

	response.render("planets/index", {
		planets: planets
	});
});

// NEW
// TODO: Add logged in middleware.
router.get("/new", (request, response) => {
	response.render("planets/new");
});

// CREATE
// TODO: Add logged in middleware.
router.post("/", async (request, response) => {
	let planetData = request.body.planet;
	planetData.comments = [];
	// Add in planet author here.
	/*
	planetData.author = {
		id: request.user._id,
		username: request.user.username
	};
	*/

	try {
		const createdPlanet = await Planet.create(planetData);
		request.flash("success", "Planet created successfully.");
	}
	catch (error) {
		request.flash("error", "Failed to create planet, please try again.");
	}

	response.redirect("/planets");
});

// SHOW

// EDIT

// UPDATE

// DESTROY

module.exports = router;