"use strict";

const express = require("express");

const middleware = require("../middleware");

const Comment = require("../models/comment");
const Planet = require("../models/planet");

const router = express.Router();

