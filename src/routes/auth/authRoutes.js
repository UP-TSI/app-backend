const express = require("express");
const AuthController = require("../../controllers/auth/authController.js");

const authController = new AuthController();
const router = express.Router();

router.post("/login", (req, res) => authController.login(req, res));
router.post("/findUsername", (req, res) => authController.findUser(req, res));

module.exports = router;
