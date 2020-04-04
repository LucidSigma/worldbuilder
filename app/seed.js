"use strict";

const Comment = require("./models/comment");
const Planet = require("./models/planet");
const User = require("./models/user");

const seedData = [
	{
		name: "Mercury",
		colour: "#808080",
		description: "A small, rocky, cratered world.",
		diameter: 4500,
		moonCount: 0,
		starName: "Sol",
		distanceFromStar: 0.4
	},

	{
		name: "Venus",
		colour: "#F5F5DC",
		description: "A world with a thick, dense atmosphere.",
		diameter: 12100,
		moonCount: 0,
		starName: "Sol",
		distanceFromStar: 0.7
	},

	{
		name: "Earth",
		colour: "#0000FF",
		description: "A geologically active world that can support life as is.",
		diameter: 12700,
		moonCount: 1,
		starName: "Sol",
		distanceFromStar: 1.0
	},

	{
		name: "Mars",
		colour: "#800000",
		description: "A rocky world with a reddish colour due to iron oxide.",
		diameter: 6800,
		moonCount: 2,
		starName: "Sol",
		distanceFromStar: 1.5
	}
];

async function seedDatabase() {
	try {
		await Comment.deleteMany({ });
		console.log("Comments removed.");

		await Planet.deleteMany({ });
		console.log("Planets removed.");

		await User.deleteMany({ });
		console.log("Users removed.");

		const testUser = new User({
			username: "Test"
		});

		await User.register(testUser, "test");
		console.log("Created test user.");

		for (const planet of seedData) {
			const createdPlanet = await Planet.create(planet);
			createdPlanet.author = {
				id: testUser._id,
				username: testUser.username
			};

			const comment = await Comment.create({
				text: "This is a test comment.",
				author: {
					id: testUser._id,
					username: testUser.username
				}
			});

			createdPlanet.comments.push(comment);
			createdPlanet.save();

			console.log(`Created planet: ${createdPlanet.name}.`);
		}
	}
	catch (error) {
		console.log("Failed to seed database:\n" + error.message);
	}
}

module.exports = seedDatabase;