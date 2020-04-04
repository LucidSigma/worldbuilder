"use strict";

const express = require("express");

const middleware = require("../middleware");

const Planet = require("../models/planet");

const router = express.Router();

// INDEX
router.get("/", async (request, response) => {
	response.locals.title += " - Planet Index";
	const planets = await Planet.find({ });

	response.render("planets/index", {
		planets: planets,
		searchQuery: request.query["search"]
	});
});

// NEW
router.get("/new", middleware.isLoggedIn, (request, response) => {
	response.render("planets/new");
});

// CREATE
router.post("/", middleware.isLoggedIn, async (request, response) => {
	let planetData = request.body.planet;

	planetData.author = {
		id: request.user._id,
		username: request.user.username
	};

	try {
		const createdPlanet = await Planet.create(planetData);
		request.flash("success", `Planet ${createdPlanet.name} created successfully.`);
	}
	catch (error) {
		request.flash("error", "Failed to create planet, please try again.");
	}

	response.redirect("/planets");
});

// SHOW
router.get("/:planet_id", async (request, response) => {
	try {
		const foundPlanet = await Planet.findById(request.params["planet_id"]).populate("comments").exec();

		response.render("planets/show", {
			planet: foundPlanet
		});
	}
	catch (error) {
		request.flash("error", "A planet with that specified ID cannot be found.");
		response.redirect("/planets");
	}
});

// EDIT
router.get("/:planet_id/edit", middleware.checkPlanetOwnership, async (request, response) => {
	try {
		const foundPlanet = await Planet.findById(request.params["planet_id"]);

		response.render("planets/edit", {
			planet: foundPlanet
		})
	}
	catch (error) {
		request.flash("error", "A planet with that specified ID cannot be found.");
		response.redirect("/planets");
	}
});

// UPDATE
router.put("/:planet_id", middleware.checkPlanetOwnership, async (request, response) => {
	try {
		const updatedPlanet = await Planet.findByIdAndUpdate(request.params["planet_id"], request.body.planet);
		request.flash("success", `Planet ${updatedPlanet.name} updated successfully.`);
	}
	catch (error) {
		request.flash("error", "Failed to update planet, please try again.");
	}

	response.redirect(`/planets/${request.params["planet_id"]}`);
});

// DESTROY
router.delete("/:planet_id", middleware.checkPlanetOwnership, async (request, response) => {
	try {
		await Planet.findByIdAndRemove(request.params["planet_id"]);

		request.flash("success", "Planet was deleted.");
		response.redirect("/planets");
	}
	catch (error) {
		request.flash("error", "Failed to delete planet, please try again.");
		response.redirect("back");
	}
});

module.exports = router;