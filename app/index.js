"use strict";

// REQUIRED MODULES
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const express = require("express");
const expressSession = require("express-session");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");

// UTILITIES


// MODELS
const Comment = require("./models/comment");
const Planet = require("./models/planet");
const User = require("./models/user");

// CONTROLLERS
const homeController = require("./controllers/homeController")

// DATABASE CONFIGURATION
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DATABASE_URI || "mongodb://localhost:27017/worldbuilder")
	.then(() => console.log("Database connected to successfully."))
	.then(() => {
		if (process.env.SEED_DB) {
			console.log("Seeding database...");
			// seedDatabase();
		}
	})
	.catch((error) => console.log(`Database failed to connect:\n${error.message}.`));
	
// APP CONFIGURATION
const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/../public/views/");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser("bog-ana-fog-ana-see"));
app.use(express.static(__dirname + "./public/"));
app.use(methodOverride("_method"));
app.use(flash());

app.use(expressSession({
	secret: "bog-ana-fog-ana-see",
	resave: false,
	saveUninitialized: false
}));

app.use((request, response, next) => {
	response.locals.currentUser = request.user;

	response.locals.errorMessage = request.flash("error");
	response.locals.successMessage = request.flash("success");

	next();
});

// PASSPORT CONFIGURATION
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// CONTROLLER CONFIGURATION
app.use("/", homeController);

// SERVER CONFIGURATION
const DEFAULT_PORT = 3000;

app.listen(process.env.PORT || DEFAULT_PORT, process.env.IP, () => {
	console.log(`Server listening on port ${process.env.PORT || DEFAULT_PORT}.`);
});