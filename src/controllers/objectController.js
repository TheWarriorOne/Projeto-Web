// Importe os módulos necessários
const ObjectModel = require('../models/object');

// Defina o controller para manipulação dos objetos
const objectController = {
  // Função para listar todos os objetos
  async listObjects(req, res) {
    try {
      // Consulta todos os objetos no banco de dados
      const objects = await ObjectModel.findAll();

      // Retorna os objetos encontrados
      res.json(objects);
    } catch (error) {
      console.error('Erro ao listar objetos:', error);
      // Em caso de erro, retorna uma mensagem de erro
      res.status(500).json({ message: 'Erro ao listar objetos' });
    }
  },

  // Função para criar um novo objeto
  async createObject(req, res) {
    try {
      // Extrai os dados do corpo da requisição
      const { name, description } = req.body;

      // Cria um novo objeto no banco de dados
      const newObject = await ObjectModel.create({ name, description });

      // Retorna o objeto recém-criado
      res.status(201).json({ message: 'Objeto criado com sucesso', object: newObject });
    } catch (error) {
      console.error('Erro ao criar objeto:', error);
      // Em caso de erro, retorna uma mensagem de erro
      res.status(500).json({ message: 'Erro ao criar objeto' });
    }
  }
};

// Exporte o controller para uso em outras partes da aplicação
module.exports = objectController;
