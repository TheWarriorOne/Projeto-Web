// Importe o módulo necessário do Sequelize
const { DataTypes } = require('sequelize');
// Importe a instância do Sequelize configurada
const { define } = require('../config/database');

// Defina o modelo de dados para os objetos
const ObjectModel = define('Object', {
  // Define os campos da tabela 'objects'
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, 
{
  // Opções do modelo
  tableName: 'objects', // Nome da tabela no banco de dados
  timestamps: true // Adicionar colunas createdAt e updatedAt automaticamente
});

// Exporte o modelo para uso em outras partes da aplicação
module.exports = ObjectModel;
