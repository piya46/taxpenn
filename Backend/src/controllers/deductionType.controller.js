const DeductibleDocumentType = require('../models/DeductibleDocumentType');

exports.getDeductionType = async (req, res) => {
  const types = await DeductibleDocumentType.findAll();
  res.json(types);
};

exports.checkRecommendType = async (req, res) => {
  const { incomeTotal } = req.query;
  const recs = await DeductibleDocumentType.findAll({ where: { /* logic */ } });
  res.json(recs);
};