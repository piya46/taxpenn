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

exports.breakdown = async (req, res) => {
  const { incomes, deductions, allowances } = req.body;
  const service = new TaxService(incomes, deductions, allowances);
  res.json({
    totalIncome: service.totalIncome(),
    totalAllowances: service.totalAllowances(),
    allowances: service.allowances,
    totalDeductions: service.totalDeductions(),
    taxableIncome: service.taxableIncome()
  });
};

exports.currentDeduction = async (req, res) => {
  const { deductions, allowances } = req.body;
  const svc = new TaxService([], deductions, allowances);
  const value = svc.calculateCurrentDeduction();
  res.json({ currentDeduction: value });
};

exports.recDeduction = async (req, res) => {
  const { incomes, allowances } = req.body;
  const svc = new TaxService(incomes, [], allowances);
  const value = svc.calculateRecDeduction();
  res.json({ recDeduction: value });
};