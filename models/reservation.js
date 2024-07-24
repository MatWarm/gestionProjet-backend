const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Annonce = require('./annonce');
const Compte = require('./compte');

const Reservation = sequelize.define('Reservation', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    date_debut: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    date_fin: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    id_annonce: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Annonce,
            key: 'id',
        },
    },
    id_compte: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Compte,
            key: 'id',
        },
    }
}, {
    tableName: 'reservation',
    timestamps: false,
});

Annonce.hasMany(Reservation, { foreignKey: 'id_annonce' });
Reservation.belongsTo(Annonce, { foreignKey: 'id_annonce' });

Compte.hasMany(Reservation, { foreignKey: 'id_compte' });
Reservation.belongsTo(Compte, { foreignKey: 'id_compte' });

module.exports = Reservation;
