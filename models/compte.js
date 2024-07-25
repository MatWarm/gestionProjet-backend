const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Compte = sequelize.define('Compte', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    mail: {
        type: DataTypes.STRING,
        allowNull: false,
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
    etat:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue: true
    }
}, {
    tableName: 'compte',
    timestamps: false,
});

module.exports = Compte;
