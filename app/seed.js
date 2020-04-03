"use strict";

const mongoose = require("mongoose");

const Planet = require("./models/planet");

const seedData = [
	{
		name: "Mercury",
		colour: "grey",
		description: "A small, rocky, cratered world.",
		diameter: 4500,
		moonCount: 0,
		starName: "Sol",
		distanceFromStar: 0.4
	},

	{
		name: "Venus",
		colour: "beige",
		description: "A world with a thick, dense atmosphere.",
		diameter: 12100,
		moonCount: 0,
		starName: "Sol",
		distanceFromStar: 0.7
	},

	{
		name: "Earth",
		colour: "blue",
		description: "A geologically active world that can support life as is.",
		diameter: 12700,
		moonCount: 1,
		starName: "Sol",
		distanceFromStar: 1.0
	},

	{
		name: "Mars",
		colour: "maroon",
		description: "A rocky world with a reddish colour due to iron oxide.",
		diameter: 6800,
		moonCount: 2,
		starName: "Sol",
		distanceFromStar: 1.5
	}
];

async function seedDatabase() {
	try {
		await Planet.deleteMany({ });
		console.log("Planets removed.");

		for (const planet of seedData) {
			const createdPlanet = await Planet.create(planet);
			console.log(`Created planet: ${createdPlanet.name}.`);
		}
	}
	catch (error) {
		console.log("Failed to seed database:\n" + error.message);
	}
}

module.exports = seedDatabase;