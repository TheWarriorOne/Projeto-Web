const Group = require('../models/group');

const groupController = {
  async createGroup(req, res) {
    try {
      const { name, description } = req.body;

      // Verifica se o grupo já existe
      const existingGroup = await Group.findOne({ where: { name } });
      if (existingGroup) {
        return res.status(400).json({ message: 'O grupo já existe' });
      }

      // Cria um novo grupo
      const newGroup = await Group.create({ name, description });

      res.status(201).json({ message: 'Grupo criado com sucesso', group: newGroup });
    } catch (error) {
      console.error('Erro ao criar grupo:', error);
      res.status(500).json({ message: 'Erro ao criar grupo' });
    }
  },

  async getGroups(req, res) {
    try {
      const groups = await Group.findAll();

      res.status(200).json(groups);
    } catch (error) {
      console.error('Erro ao obter grupos:', error);
      res.status(500).json({ message: 'Erro ao obter grupos' });
    }
  },

  async getGroupById(req, res) {
    try {
      const { id } = req.params;
      const group = await Group.findByPk(id);

      if (!group) {
        return res.status(404).json({ message: 'Grupo não encontrado' });
      }

      res.status(200).json(group);
    } catch (error) {
      console.error('Erro ao obter grupo por ID:', error);
      res.status(500).json({ message: 'Erro ao obter grupo por ID' });
    }
  },

  async updateGroup(req, res) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;

      const group = await Group.findByPk(id);

      if (!group) {
        return res.status(404).json({ message: 'Grupo não encontrado' });
      }

      // Atualiza os dados do grupo
      group.name = name;
      group.description = description;
      await group.save();

      res.status(200).json({ message: 'Grupo atualizado com sucesso', group });
    } catch (error) {
      console.error('Erro ao atualizar grupo:', error);
      res.status(500).json({ message: 'Erro ao atualizar grupo' });
    }
  },

  async deleteGroup(req, res) {
    try {
      const { id } = req.params;

      const group = await Group.findByPk(id);

      if (!group) {
        return res.status(404).json({ message: 'Grupo não encontrado' });
      }

      // Remove o grupo
      await group.destroy();

      res.status(200).json({ message: 'Grupo excluído com sucesso' });
    } catch (error) {
      console.error('Erro ao excluir grupo:', error);
      res.status(500).json({ message: 'Erro ao excluir grupo' });
    }
  }
};

module.exports = groupController;
