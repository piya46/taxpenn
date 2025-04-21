const TaxService = require('../services/TaxService');

exports.calculateTax = async (req, res) => {
  const { incomes, deductions } = req.body;
  const service = new TaxService(incomes, deductions);
  res.json({ tax: service.calculateTax() });
};

exports.calculateCurrentDeduction = async (req, res) => {
  const { deductions } = req.body;
  const service = new TaxService([], deductions);
  res.json({ currentDeduction: service.calculateCurrentDeduction() });
};

exports.calculateRecDeduction = async (req, res) => {
  const { incomes } = req.body;
  const service = new TaxService(incomes, []);
  res.json({ recDeduction: service.calculateRecDeduction() });
};