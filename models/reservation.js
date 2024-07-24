const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Annonce = require('./annonces');

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
    annonceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Annonce,
            key: 'id',
        },
    },
}, {
    tableName: 'reservation',
    timestamps: false,
});

Annonce.hasMany(Reservation, { foreignKey: 'annonceId' });
Reservation.belongsTo(Annonce, { foreignKey: 'annonceId' });

module.exports = Reservation;
