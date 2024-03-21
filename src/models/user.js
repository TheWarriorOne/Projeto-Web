const { DataTypes } = require('sequelize');
const { define } = require('../config/database'); // Importe a instância do Sequelize configurada

const User = define('User', {
    cod_Usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome_Usuario: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    senha_Usuario: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, 
{
    tableName: 'usuarios', // Nome da tabela no banco de dados
    timestamps: true // Adicionar colunas createdAt e updatedAt automaticamente
});

module.exports = User;
