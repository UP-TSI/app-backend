const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', [
    body('username').notEmpty().isLength({ min: 3 }),
    body('password').notEmpty().isLength({ min: 6 })
], authController.register);

router.post('/login', authController.login);

module.exports = router;
