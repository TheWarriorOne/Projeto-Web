const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Group = sequelize.define('Group', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, 
{
    tableName: 'groups', // Nome da tabela no banco de dados
    timestamps: true // Adicionar colunas createdAt e updatedAt automaticamente
});

module.exports = Group;
