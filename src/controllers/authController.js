const bcrypt = require('bcrypt'); // Para criptografar senhas
const jwt = require('jsonwebtoken'); // Para gerar tokens de autenticação
const User = require('../models/user');

const authController = {
  async signup(req, res) {
    try {
      const { nome_Usuario, senha_Usuario } = req.body;

      // Verifica se o usuário já existe
      const existingUser = await User.findOne({ where: { nome_Usuario } });
      if (existingUser) {
        return res.status(400).json({ message: 'O usuário já existe' });
      }

      // Criptografa a senha
      const hashedPassword = await bcrypt.hash(senha_Usuario, 10);

      // Cria um novo usuário
      const newUser = await User.create({ nome_Usuario, senha_Usuario: hashedPassword });

      // Gera um token de autenticação
      const token = jwt.sign({ userId: newUser.id }, 'secreto', { expiresIn: '1h' });

      res.status(201).json({ message: 'Usuário criado com sucesso', token });
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      res.status(500).json({ message: 'Erro ao criar usuário' });
    }
  },

  async login(req, res) {
    try {
      const { nome_Usuario, senha_Usuario } = req.body;

      // Verifica se o usuário existe
      const user = await User.findOne({ where: { nome_Usuario } });
      if (!user) {
        return res.status(401).json({ message: 'Usuário não existe.' });
      }

      // Verifica se a senha está correta
      const isPasswordValid = await bcrypt.compare(senha_Usuario, user.senha_Usuario);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Senha inválida.' });
      }

      // Gera um token de autenticação
      const token = jwt.sign({ userId: user.id }, 'secreto', { expiresIn: '1h' });

      res.json({ message: 'Login bem-sucedido', token });
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      res.status(500).json({ message: 'Erro ao fazer login' });
    }
  }
};

module.exports = authController;
