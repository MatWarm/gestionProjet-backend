const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Compte = sequelize.define('Compte', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    mail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    prenom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'compte',
    timestamps: false,
});

module.exports = Compte;
