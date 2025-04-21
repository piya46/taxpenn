class TaxService {
    constructor(incomes = [], deductions = []) {
      this.incomes = incomes;
      this.deductions = deductions;
    }
  
    calculateCurrentDeduction() {
      return this.deductions.reduce((sum, d) => sum + d.amount, 0);
    }
  
    calculateRecDeduction() {
      const totalIncome = this.incomes.reduce((sum, i) => sum + i.amount, 0);
      return totalIncome * 0.1;
    }
  
    calculateTax() {
      const totalIncome = this.incomes.reduce((sum, i) => sum + i.amount, 0);
      const deductible = this.calculateCurrentDeduction();
      const taxable = totalIncome - deductible;
      return taxable > 0 ? taxable * 0.1 : 0;
    }
  }
  
  module.exports = TaxService;