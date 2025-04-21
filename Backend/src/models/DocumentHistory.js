const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Document = require('./Document');
const User = require('./User');

const DocumentHistory = sequelize.define('DocumentHistory', {
  action: DataTypes.STRING,
  timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

Document.hasMany(DocumentHistory);
DocumentHistory.belongsTo(Document);
User.hasMany(DocumentHistory);
DocumentHistory.belongsTo(User);

module.exports = DocumentHistory;