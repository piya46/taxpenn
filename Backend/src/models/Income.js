const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Document = require('./Document');

const Income = sequelize.define('Income', {
  type: DataTypes.STRING,
  amount: DataTypes.FLOAT
});

Document.hasMany(Income);
Income.belongsTo(Document);

module.exports = Income;