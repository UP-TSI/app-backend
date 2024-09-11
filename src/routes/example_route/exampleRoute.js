const express = require("express");
const router = express.Router();

// Controller imports
const exampleController = require("../../controllers/example_controller/exampleController.js");

// Routes
router.get("/", exampleController.example);

module.exports = router;
