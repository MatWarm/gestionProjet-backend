const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database_name', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql', // or 'sqlite', 'postgres', 'mssql'
  // Additional options like pool configuration could be here
});

module.exports = sequelize;