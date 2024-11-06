const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');

const authController = new AuthController();

router.post('/register', [
    body('username').notEmpty().isLength({ min: 3 }),
    body('password').notEmpty().isLength({ min: 6 })
], authController.register);

router.post('/login', authController.login);

router.get('/logout', authController.logout);

module.exports = router;
