const bodyParser = require("body-parser");
const express = require("express");
const methodOverride = require("method-override");

const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/../public/views/");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

app.get("/", (request, response) => {
	response.render("home");
});

const DEFAULT_PORT = 3000;

app.listen(process.env.PORT || DEFAULT_PORT, process.env.IP, () => {
	console.log(`Server listening on port ${process.env.PORT || DEFAULT_PORT}.`);
});