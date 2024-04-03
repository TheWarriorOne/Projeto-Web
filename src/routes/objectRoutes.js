const express = require('express');
const router = express.Router();
const objectController = require('../controllers/objectController');

// Rota para listar todos os objetos
router.get('/', objectController.getAllObjects);

// Rota para criar um novo objeto
router.post('/', objectController.createObject);

// Rota para buscar um objeto por ID
router.get('/:id', objectController.getObjectById);

// Rota para atualizar um objeto por ID
router.put('/:id', objectController.updateObjectById);

// Rota para deletar um objeto por ID
router.delete('/:id', objectController.deleteObjectById);

module.exports = router;
