"use strict";

const express = require("express");

const Planet = require("../models/planet");

const router = express.Router();

router.get("/", async (request, response) => {
	response.locals.title += " - Planet Index";
	const planets = await Planet.find({ });

	response.render("planets/index", {
		planets: planets
	});
});

module.exports = router;