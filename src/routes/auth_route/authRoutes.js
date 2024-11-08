const express = require('express');
const { body } = require('express-validator');
const authController = require('../../controllers/auth_controller/authController.js');

const router = express.Router();

router.post('/login', authController.login);

module.exports = router;
