const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rota para o cadastro de usuário
router.post('/signup', authController.signup);

// Rota para o login do usuário
router.post('/login', authController.login);

module.exports = router;
