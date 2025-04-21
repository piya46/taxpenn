const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  userId: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  password: DataTypes.STRING,
  role: { type: DataTypes.STRING, defaultValue: 'user' }
});

module.exports = User;