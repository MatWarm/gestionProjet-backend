const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
  host: 'localhost',
  dialect: 'mysql', // or 'sqlite', 'postgres', 'mssql'
  // Additional options like pool configuration could be here
});

module.exports = sequelize;
