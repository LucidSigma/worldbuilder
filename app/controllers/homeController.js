"use strict";

const express = require("express");
const passport = require("passport");

const User = require("../models/user");

const router = express.Router();

router.get("/", async (request, response) => {
	response.render("home");
});

router.get("/login", (request, response) => {
	response.render("login");
});

router.post("/login", passport.authenticate("local", {
	successRedirect: "/planets",
	successFlash: "You have been logged in.",
	failureRedirect: "/login",
	failureFlash: "Failed to log in, please try again."
}), (request, response) => { });

router.get("/register", (request, response) => {
	response.render("register");
});

router.post("/register", async (request, response) => {
	const newUser = new User({
		username: request.body.username
	});

	try {
		await User.register(newUser, request.body.password);

		passport.authenticate("local")(request, response, () => {
			request.flash("success", `Your account has been registered, ${newUser.username}.`);
			response.redirect("/planets");
		});
	}
	catch (error) {
		request.flash("error", "Failed to create new user.");
		response.redirect("/register");
	}

});

router.get("/logout", (request, response) => {
	request.logout();
	request.flash("success", "You have been logged out.");

	response.redirect("/planets");
});

module.exports = router;