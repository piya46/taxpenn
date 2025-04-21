const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DeductibleDocumentType = sequelize.define('DeductibleDocumentType', {
  deductionType: DataTypes.STRING,
  recommendType: DataTypes.STRING
});

module.exports = DeductibleDocumentType;