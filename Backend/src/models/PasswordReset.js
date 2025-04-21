const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const PasswordReset = sequelize.define('PasswordReset', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  otp: DataTypes.STRING,
  expiresAt: DataTypes.DATE,
  used: { type: DataTypes.BOOLEAN, defaultValue: false }
});

User.hasMany(PasswordReset);
PasswordReset.belongsTo(User);

module.exports = PasswordReset;