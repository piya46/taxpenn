
class TaxService {
  /**
   * @param {Array<{ amount: number }>} incomes
   * @param {Array<{ amount: number }>} deductions
   * @param {{ personal?: number, spouse?: number, children?: number, socialSecurity?: number, standardDeduct?: number }} allowances
   */
  constructor(incomes = [], deductions = [], allowances = {}) {
    this.incomes = incomes;
    this.deductions = deductions;
    this.allowances = {
      personal: 60000,
      spouse: 0,
      children: 0,
      socialSecurity: 0,
      standardDeduct: 0,
      ...allowances
    };
  }

  // รวมรายได้ทั้งหมด
  totalIncome() {
    return this.incomes.reduce((sum, i) => sum + i.amount, 0);
  }

  // รวมสิทธิลดหย่อนทั้งหมด
  totalAllowances() {
    const { personal, spouse, children, socialSecurity, standardDeduct } = this.allowances;
    const childAllowance = (children || 0) * 30000;
    const ss = Math.min(socialSecurity || 0, 9000);
    const std = Math.min(standardDeduct || 0, 100000);
    return personal + spouse + childAllowance + ss + std;
  }

  // รวมค่าหักลดหย่อนเพิ่มเติม
  totalDeductions() {
    return this.deductions.reduce((sum, d) => sum + d.amount, 0);
  }

  // คำนวณฐานภาษี = รายได้ – สิทธิลดหย่อน – หักลดหย่อน
  taxableIncome() {
    const income = this.totalIncome();
    const allow = this.totalAllowances();
    const deduct = this.totalDeductions();
    const taxable = income - allow - deduct;
    return taxable > 0 ? taxable : 0;
  }

  calculateCurrentDeduction() {
    // รวมสิทธิลดหย่อน + หักลดหย่อนอื่นๆ
    return this.totalAllowances() + this.totalDeductions();
  }

  calculateRecDeduction() {
    // ตัวอย่าง: แนะนำให้ใช้ standardDeduct เต็มจำนวน
    return this.allowances.standardDeduct || 0;
  }

  // คำนวณภาษีแบบขั้นบันไดตามอัตราของกรมสรรพากร
  calculateTax() {
    let tax = 0;
    let remaining = this.taxableIncome();
    const brackets = [
      { limit: 150000, rate: 0 },
      { limit: 300000, rate: 0.05 },
      { limit: 500000, rate: 0.10 },
      { limit: 750000, rate: 0.15 },
      { limit: 1000000, rate: 0.20 },
      { limit: 2000000, rate: 0.25 },
      { limit: 5000000, rate: 0.30 },
      { limit: Infinity, rate: 0.35 }
    ];

    let prev = 0;
    for (const { limit, rate } of brackets) {
      if (remaining <= 0) break;
      const part = Math.min(remaining, limit - prev);
      tax += part * rate;
      remaining -= part;
      prev = limit;
    }
    return Math.round(tax);
  }
}



module.exports = TaxService;
