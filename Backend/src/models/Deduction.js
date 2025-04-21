const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Document = require('./Document');

const Deduction = sequelize.define('Deduction', {
  type: DataTypes.STRING,
  amount: DataTypes.FLOAT
});

Document.hasMany(Deduction);
Deduction.belongsTo(Document);

module.exports = Deduction;