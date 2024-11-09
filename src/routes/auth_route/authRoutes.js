const express = require('express');
const AuthController = require('../../controllers/auth_controller/authController.js');

const authController = new AuthController();
const router = express.Router();

router.post('/login', (req, res) => authController.login(req, res));

module.exports = router;
