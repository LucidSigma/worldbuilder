"use strict";

const express = require("express");

const router = express.Router();
//router.use(express.static(__dirname + "./public/"));

router.get("/", (request, response) => {
	response.render("home");
});

module.exports = router;