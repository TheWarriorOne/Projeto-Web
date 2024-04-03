const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');

// Rota para criar um novo grupo
router.post('/create', groupController.createGroup);

// Rota para obter todos os grupos
router.get('/', groupController.getAllGroups);

// Rota para obter um grupo pelo ID
router.get('/:id', groupController.getGroupById);

// Rota para atualizar um grupo pelo ID
router.put('/:id', groupController.updateGroup);

// Rota para excluir um grupo pelo ID
router.delete('/:id', groupController.deleteGroup);

module.exports = router;
