const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Document = sequelize.define('Document', {
  file: DataTypes.STRING,
  isIncome: { type: DataTypes.BOOLEAN, defaultValue: false }
});

User.hasMany(Document);
Document.belongsTo(User);

module.exports = Document;