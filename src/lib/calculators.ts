import type { CalculationMode } from "@/lib/types";

const monthlyRate = (annualRate: number) => annualRate / 100 / 12;

export function calculate(mode: CalculationMode, values: Record<string, number>) {
  switch (mode) {
    case "loan-payment": {
      const principal = values.principal;
      const years = values.years;
      const rate = monthlyRate(values.rate);
      const months = years * 12;
      const payment = rate === 0 ? principal / months : (principal * rate) / (1 - (1 + rate) ** -months);
      return { value: payment, note: "Monthly payment using standard amortization." };
    }
    case "student-loan-payment":
    case "car-loan-payment": {
      const principal = values.balance;
      const years = values.years;
      const rate = monthlyRate(values.rate);
      const months = years * 12;
      const payment = rate === 0 ? principal / months : (principal * rate) / (1 - (1 + rate) ** -months);
      return { value: payment, note: "Monthly payment before optional extra principal payments." };
    }
    case "compound-savings":
    case "retirement-future-value":
    case "college-savings":
    case "down-payment-goal": {
      const initial = values.initial ?? 0;
      const monthly = values.monthly ?? 0;
      const years = values.years;
      const rate = monthlyRate(values.rate);
      const months = years * 12;
      const futureInitial = initial * (1 + rate) ** months;
      const futureContrib = rate === 0 ? monthly * months : monthly * (((1 + rate) ** months - 1) / rate);
      return { value: futureInitial + futureContrib, note: "Future value with monthly compounding and end-of-month contributions." };
    }
    case "net-worth": {
      const value = (values.assets ?? 0) - (values.liabilities ?? 0);
      return { value, note: "Net worth = total assets minus total liabilities." };
    }
    case "simple-interest": {
      const value = values.principal * (values.rate / 100) * values.years;
      return { value, note: "Simple interest only, no compounding." };
    }
    case "salary-hourly-to-annual": {
      const value = values.hourly * values.hoursPerWeek * values.weeks;
      return { value, note: "Gross annual pay before taxes and deductions." };
    }
    case "salary-annual-to-hourly": {
      const denominator = values.hoursPerWeek * values.weeks;
      const value = denominator > 0 ? values.annual / denominator : 0;
      return { value, note: "Equivalent hourly gross pay." };
    }
    case "debt-to-income": {
      const value = values.monthlyDebt / values.grossMonthlyIncome * 100;
      return { value, note: "Front-end + installment debt estimate as percent of gross income." };
    }
    case "emergency-fund": {
      const value = values.monthlyExpenses * values.months;
      return { value, note: "Target reserve for essential monthly expenses." };
    }
    case "roi": {
      const value = ((values.finalValue - values.initialInvestment) / values.initialInvestment) * 100;
      return { value, note: "Total return, not annualized." };
    }
    case "cagr": {
      const value = ((values.endValue / values.startValue) ** (1 / values.years) - 1) * 100;
      return { value, note: "Compound annual growth rate." };
    }
    case "savings-rate": {
      const value = ((values.income - values.expenses) / values.income) * 100;
      return { value, note: "Savings rate based on take-home income." };
    }
    case "budget-50-30-20": {
      const value = values.income * 0.5;
      return { value, note: "Essential needs budget amount (50%). Wants are 30%, savings/debt 20%." };
    }
    case "mortgage-affordability": {
      const maxHousing = values.monthlyIncome * (values.housingRatio / 100);
      const rate = monthlyRate(values.rate);
      const months = values.years * 12;
      const loan = rate === 0 ? maxHousing * months : maxHousing * ((1 - (1 + rate) ** -months) / rate);
      const homePrice = loan + values.downPayment;
      return { value: homePrice, note: "Estimate based on target housing ratio and fixed-rate loan." };
    }
    case "debt-payoff-time": {
      const rate = monthlyRate(values.rate);
      const payment = values.payment;
      const balance = values.balance;
      if (payment <= balance * rate) {
        return { value: 0, note: "Payment is too low to cover interest; payoff is not possible with current input." };
      }
      const months = Math.log(payment / (payment - balance * rate)) / Math.log(1 + rate);
      return { value: months, note: "Estimated months to pay off with fixed monthly payment." };
    }
    case "credit-utilization": {
      const value = values.balance / values.limit * 100;
      return { value, note: "Credit utilization ratio across your card limits." };
    }
    case "income-tax-estimate": {
      const taxable = Math.max(values.income - values.deduction, 0);
      const value = taxable * (values.taxRate / 100);
      return { value, note: "Simple effective-rate tax estimate." };
    }
    case "pay-raise-impact": {
      const annualIncrease = values.salary * (values.raisePercent / 100);
      const monthly = annualIncrease / 12;
      return { value: monthly, note: "Gross monthly increase from raise percentage." };
    }
    case "overtime-pay": {
      const value = values.hourlyRate * values.overtimeHours * values.multiplier;
      return { value, note: "Additional weekly overtime pay." };
    }
    case "freelancer-hourly-rate": {
      const annualRevenue = values.desiredIncome + values.expenses + values.taxReserve;
      const value = annualRevenue / values.billableHours;
      return { value, note: "Minimum hourly rate to hit annual income target." };
    }
    case "payback-period": {
      const monthlyGain = values.monthlyBenefit;
      const months = values.cost / monthlyGain;
      return { value: months, note: "Months needed for benefits to recover upfront cost." };
    }
    case "rule-72": {
      const value = 72 / values.rate;
      return { value, note: "Rule of 72 estimate for doubling time." };
    }
    case "inflation-impact": {
      const value = values.amount / (1 + values.inflationRate / 100) ** values.years;
      return { value, note: "Future purchasing power in today's dollars." };
    }
    case "side-hustle-goal": {
      const value = values.goal / values.monthlyProfit;
      return { value, note: "Months needed if monthly side-hustle profit stays consistent." };
    }
    case "salary-vs-contractor": {
      const salaryNet = values.salary * (1 - values.salaryTax / 100);
      const contractorNet = values.contractRevenue * (1 - values.contractTax / 100) - values.benefitCosts;
      return { value: contractorNet - salaryNet, note: "Positive value means contractor path yields higher annual net income." };
    }
    case "vacation-cost": {
      const value = values.transport + values.lodging + values.food + values.activities;
      return { value, note: "Trip budget total before contingency buffer." };
    }
    case "lease-vs-buy": {
      const leaseTotal = values.leasePayment * values.leaseMonths + values.leaseFees;
      const buyTotal = values.buyPrice + values.financingCost - values.resaleValue;
      return { value: leaseTotal - buyTotal, note: "Positive value means buying costs less over the comparison period." };
    }
    case "rent-vs-buy": {
      const rentCost = values.rent * 12 * values.years;
      const buyCost = values.homePrice * values.buyCostRate / 100 + values.maintenance * values.years;
      return { value: rentCost - buyCost, note: "Positive value means buying is cheaper in this simplified model." };
    }
    case "break-even-price": {
      const value = values.fixedCosts / (1 - values.variableCostRate / 100);
      return { value, note: "Revenue needed to break even when variable costs are a share of sales." };
    }
    case "price-per-unit": {
      const value = values.price / values.quantity;
      return { value, note: "Unit price comparison metric." };
    }
    case "wedding-budget": {
      const value = values.venue + values.food + values.attire + values.photo + values.misc;
      return { value, note: "Wedding budget estimate from major categories." };
    }
    case "baby-cost": {
      const value = values.monthlyCost * 12 * values.years;
      return { value, note: "Projected cumulative cost for early years." };
    }
    case "withdrawal-rule": {
      const value = values.portfolio * (values.rate / 100);
      return { value, note: "Annual withdrawal amount based on selected safe-withdrawal rate." };
    }
    case "fire-number": {
      const value = values.annualExpenses * values.multiplier;
      return { value, note: "Target portfolio based on annual expenses and withdrawal multiple." };
    }
    case "expense-ratio-fee": {
      const value = values.balance * (values.expenseRatio / 100);
      return { value, note: "Approximate annual fund fee from expense ratio." };
    }
    case "net-paycheck": {
      const gross = values.annualSalary / values.payPeriods;
      const taxes = gross * (values.taxRate / 100);
      const deductions = values.benefits + values.retirement;
      return { value: gross - taxes - deductions, note: "Estimated net paycheck after tax and fixed deductions." };
    }
    default:
      return { value: 0, note: "Calculation mode not supported." };
  }
}
