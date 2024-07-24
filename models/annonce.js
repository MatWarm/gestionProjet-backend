const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Compte = require('./comptes');

const Annonce = sequelize.define('Annonce', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_compte: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Compte,
            key: 'id',
        },
    },
    titre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ville: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cp: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    marque: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nbr_place: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'annonce',
    timestamps: false,
});

Compte.hasMany(Annonce, { foreignKey: 'id_compte' });
Annonce.belongsTo(Compte, { foreignKey: 'id_compte' });

module.exports = Annonce;
