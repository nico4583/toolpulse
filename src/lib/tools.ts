import type { Tool, ToolInput } from "@/lib/types";

const refs = [
  "Time value of money and amortization concepts from standard personal finance references.",
  "Budgeting and debt ratio practices used in consumer finance education.",
  "General investing and risk principles focused on long-term planning.",
];

const i = (
  key: string,
  label: string,
  description: string,
  defaultValue: number,
  suffix?: string,
): ToolInput => ({ key, label, description, defaultValue, suffix });

function inputsByMode(mode: Tool["mode"]): ToolInput[] {
  const map: Partial<Record<Tool["mode"], ToolInput[]>> = {
    "loan-payment": [i("principal", "Loan amount", "Amount borrowed.", 250000, "$"), i("rate", "APR", "Annual interest rate.", 6.5, "%"), i("years", "Term", "Loan term in years.", 30, "years")],
    "compound-savings": [i("initial", "Current balance", "Starting amount.", 10000, "$"), i("monthly", "Monthly contribution", "Added each month.", 500, "$"), i("rate", "Annual return", "Expected annual return.", 7, "%"), i("years", "Years", "Projection period.", 20, "years")],
    "net-worth": [i("assets", "Assets", "Total assets.", 150000, "$"), i("liabilities", "Liabilities", "Total liabilities.", 65000, "$")],
    "simple-interest": [i("principal", "Principal", "Initial amount.", 5000, "$"), i("rate", "Annual rate", "Simple annual rate.", 4.5, "%"), i("years", "Years", "Time horizon.", 3, "years")],
    "salary-hourly-to-annual": [i("hourly", "Hourly rate", "Gross hourly rate.", 28, "$"), i("hoursPerWeek", "Hours/week", "Average weekly hours.", 40, "h"), i("weeks", "Weeks", "Weeks worked per year.", 50, "weeks")],
    "salary-annual-to-hourly": [i("annual", "Annual salary", "Gross annual salary.", 85000, "$"), i("hoursPerWeek", "Hours/week", "Average weekly hours.", 40, "h"), i("weeks", "Weeks", "Weeks worked per year.", 50, "weeks")],
    "debt-to-income": [i("monthlyDebt", "Monthly debt", "Monthly debt obligations.", 1200, "$"), i("grossMonthlyIncome", "Gross monthly income", "Income before taxes.", 5000, "$")],
    "emergency-fund": [i("monthlyExpenses", "Essential monthly expenses", "Must-pay monthly costs.", 3200, "$"), i("months", "Coverage months", "Target months of reserve.", 6, "months")],
    "roi": [i("initialInvestment", "Initial investment", "Amount invested.", 10000, "$"), i("finalValue", "Final value", "Ending value.", 12500, "$")],
    "cagr": [i("startValue", "Start value", "Beginning value.", 10000, "$"), i("endValue", "End value", "Ending value.", 18000, "$"), i("years", "Years", "Time horizon.", 5, "years")],
    "savings-rate": [i("income", "Take-home income", "Monthly net income.", 5500, "$"), i("expenses", "Monthly expenses", "Total monthly spending.", 4200, "$")],
    "budget-50-30-20": [i("income", "Take-home income", "Monthly net income.", 5000, "$")],
    "mortgage-affordability": [i("monthlyIncome", "Gross monthly income", "Income before tax.", 8000, "$"), i("housingRatio", "Housing ratio", "Target ratio.", 28, "%"), i("rate", "Rate", "Mortgage rate.", 6.25, "%"), i("years", "Years", "Mortgage years.", 30, "years"), i("downPayment", "Down payment", "Cash down payment.", 60000, "$")],
    "retirement-future-value": [i("initial", "Current balance", "Current retirement value.", 50000, "$"), i("monthly", "Monthly contribution", "Monthly savings.", 800, "$"), i("rate", "Annual return", "Expected annual return.", 6.5, "%"), i("years", "Years", "Years to retirement.", 25, "years")],
    "debt-payoff-time": [i("balance", "Debt balance", "Current debt balance.", 12000, "$"), i("rate", "APR", "Annual interest rate.", 18, "%"), i("payment", "Monthly payment", "Planned monthly payment.", 400, "$")],
    "credit-utilization": [i("balance", "Credit balance", "Total revolving balance.", 2200, "$"), i("limit", "Credit limit", "Total card limits.", 10000, "$")],
    "income-tax-estimate": [i("income", "Annual income", "Gross annual income.", 90000, "$"), i("deduction", "Deductions", "Estimated deductions.", 15000, "$"), i("taxRate", "Effective tax rate", "Estimated effective rate.", 22, "%")],
    "pay-raise-impact": [i("salary", "Current salary", "Annual salary now.", 78000, "$"), i("raisePercent", "Raise %", "Expected raise percent.", 5, "%")],
    "overtime-pay": [i("hourlyRate", "Hourly rate", "Base hourly rate.", 24, "$"), i("overtimeHours", "Overtime hours", "Overtime hours.", 8, "hours"), i("multiplier", "Multiplier", "Overtime multiplier.", 1.5, "x")],
    "freelancer-hourly-rate": [i("desiredIncome", "Desired income", "Annual personal income target.", 80000, "$"), i("expenses", "Expenses", "Business expenses.", 15000, "$"), i("taxReserve", "Tax reserve", "Tax reserve.", 22000, "$"), i("billableHours", "Billable hours", "Annual billable hours.", 1200, "hours")],
    "payback-period": [i("cost", "Upfront cost", "Initial cost.", 6000, "$"), i("monthlyBenefit", "Monthly benefit", "Monthly savings or gain.", 250, "$")],
    "rule-72": [i("rate", "Annual rate", "Expected annual rate.", 8, "%")],
    "inflation-impact": [i("amount", "Future amount", "Nominal future amount.", 100000, "$"), i("inflationRate", "Inflation rate", "Annual inflation.", 3, "%"), i("years", "Years", "Time horizon.", 15, "years")],
    "side-hustle-goal": [i("goal", "Goal amount", "Target amount.", 12000, "$"), i("monthlyProfit", "Monthly profit", "Monthly side income profit.", 900, "$")],
    "salary-vs-contractor": [i("salary", "Salary", "Annual salary gross.", 95000, "$"), i("salaryTax", "Salary tax", "Salary effective tax rate.", 24, "%"), i("contractRevenue", "Contract revenue", "Annual contract gross revenue.", 125000, "$"), i("contractTax", "Contract tax", "Contract effective tax rate.", 30, "%"), i("benefitCosts", "Benefit costs", "Self-funded benefits.", 14000, "$")],
    "vacation-cost": [i("transport", "Transport", "Travel transport cost.", 1200, "$"), i("lodging", "Lodging", "Accommodation cost.", 1800, "$"), i("food", "Food", "Food cost.", 700, "$"), i("activities", "Activities", "Experience and activities.", 500, "$")],
    "student-loan-payment": [i("balance", "Loan balance", "Student loan balance.", 38000, "$"), i("rate", "APR", "Annual rate.", 5.8, "%"), i("years", "Years", "Repayment years.", 10, "years")],
    "car-loan-payment": [i("balance", "Amount financed", "Car loan principal.", 28000, "$"), i("rate", "APR", "Annual rate.", 7.2, "%"), i("years", "Years", "Repayment years.", 6, "years")],
    "lease-vs-buy": [i("leasePayment", "Lease payment", "Monthly lease payment.", 420, "$"), i("leaseMonths", "Lease months", "Lease duration.", 36, "months"), i("leaseFees", "Lease fees", "Total lease fees.", 1800, "$"), i("buyPrice", "Buy price", "Purchase price.", 32000, "$"), i("financingCost", "Financing cost", "Loan financing cost.", 4200, "$"), i("resaleValue", "Resale value", "Expected resale value.", 17000, "$")],
    "down-payment-goal": [i("initial", "Current savings", "Current down payment savings.", 12000, "$"), i("monthly", "Monthly contribution", "Monthly savings amount.", 900, "$"), i("rate", "Annual yield", "Expected annual yield.", 3.5, "%"), i("years", "Years", "Time horizon.", 4, "years")],
    "rent-vs-buy": [i("rent", "Monthly rent", "Current rent.", 2100, "$"), i("years", "Years", "Comparison years.", 7, "years"), i("homePrice", "Home price", "Target home price.", 420000, "$"), i("buyCostRate", "Buying cost rate", "Buy costs as percent.", 9, "%"), i("maintenance", "Maintenance", "Annual maintenance.", 4500, "$")],
    "break-even-price": [i("fixedCosts", "Fixed costs", "Fixed costs for period.", 15000, "$"), i("variableCostRate", "Variable cost rate", "Variable costs as percent.", 35, "%")],
    "price-per-unit": [i("price", "Price", "Total package price.", 14.5, "$"), i("quantity", "Quantity", "Total units.", 32, "units")],
    "wedding-budget": [i("venue", "Venue", "Venue and ceremony.", 9500, "$"), i("food", "Food", "Catering and drinks.", 8500, "$"), i("attire", "Attire", "Clothing and styling.", 2500, "$"), i("photo", "Photo/video", "Media services.", 3200, "$"), i("misc", "Misc", "Other costs.", 2800, "$")],
    "baby-cost": [i("monthlyCost", "Monthly cost", "Average monthly baby expenses.", 1200, "$"), i("years", "Years", "Projection years.", 3, "years")],
    "college-savings": [i("initial", "Current savings", "Current education fund.", 5000, "$"), i("monthly", "Monthly contribution", "Monthly savings amount.", 350, "$"), i("rate", "Annual return", "Expected annual return.", 5.5, "%"), i("years", "Years", "Years to enrollment.", 12, "years")],
    "withdrawal-rule": [i("portfolio", "Portfolio", "Portfolio value.", 1200000, "$"), i("rate", "Withdrawal rate", "Annual withdrawal rate.", 4, "%")],
    "fire-number": [i("annualExpenses", "Annual expenses", "Annual retirement expenses.", 60000, "$"), i("multiplier", "Multiplier", "Expense multiplier.", 25, "x")],
    "expense-ratio-fee": [i("balance", "Balance", "Investment balance.", 250000, "$"), i("expenseRatio", "Expense ratio", "Fund expense ratio.", 0.35, "%")],
    "net-paycheck": [i("annualSalary", "Annual salary", "Gross annual salary.", 90000, "$"), i("payPeriods", "Pay periods", "Paychecks per year.", 26, "periods"), i("taxRate", "Tax rate", "Effective tax rate.", 24, "%"), i("benefits", "Benefits deduction", "Per-paycheck benefits.", 180, "$"), i("retirement", "Retirement contribution", "Per-paycheck retirement.", 250, "$")],
  };

  return map[mode] ?? [i("value", "Value", "Generic input value.", 1000, "$")];
}

function resultMode(mode: Tool["mode"]) {
  if (["debt-to-income", "roi", "cagr", "savings-rate", "credit-utilization"].includes(mode)) {
    return { label: "Calculated percentage", suffix: "%", precision: 2 };
  }
  if (["debt-payoff-time", "side-hustle-goal", "rule-72"].includes(mode)) {
    return { label: "Estimated timeline", suffix: "months", precision: 1 };
  }
  return { label: "Estimated result", suffix: "$", precision: 2 };
}

type Seed = { slug: string; name: string; category: string; mode: Tool["mode"]; summary: string };

const flagship: Seed[] = [
  { slug: "loan-payment-calculator", name: "Loan Payment Calculator", category: "Debt & Loans", mode: "loan-payment", summary: "Estimate monthly payments and interest impact for fixed-rate loans." },
  { slug: "compound-interest-calculator", name: "Compound Interest Calculator", category: "Saving & Investing", mode: "compound-savings", summary: "Project savings growth from compounding and monthly contributions." },
  { slug: "net-worth-calculator", name: "Net Worth Calculator", category: "Financial Health", mode: "net-worth", summary: "Track assets minus liabilities to measure long-term financial progress." },
];

const catalog: Seed[] = [
  ...flagship,
  { slug: "salary-to-hourly-calculator", name: "Salary to Hourly Calculator", category: "Salary & Work", mode: "salary-annual-to-hourly", summary: "Convert annual salary to hourly equivalent." },
  { slug: "hourly-to-salary-calculator", name: "Hourly to Salary Calculator", category: "Salary & Work", mode: "salary-hourly-to-annual", summary: "Convert hourly wages into annual salary estimates." },
  { slug: "debt-to-income-calculator", name: "Debt-to-Income Ratio Calculator", category: "Debt & Loans", mode: "debt-to-income", summary: "Measure debt burden relative to income." },
  { slug: "emergency-fund-calculator", name: "Emergency Fund Calculator", category: "Financial Health", mode: "emergency-fund", summary: "Set emergency reserves based on essential costs." },
  { slug: "roi-calculator", name: "ROI Calculator", category: "Saving & Investing", mode: "roi", summary: "Calculate total investment return percentage." },
  { slug: "cagr-calculator", name: "CAGR Calculator", category: "Saving & Investing", mode: "cagr", summary: "Measure annualized growth between two values." },
  { slug: "savings-rate-calculator", name: "Savings Rate Calculator", category: "Budgeting", mode: "savings-rate", summary: "Measure how much take-home pay you keep." },
  { slug: "budget-50-30-20-calculator", name: "50/30/20 Budget Calculator", category: "Budgeting", mode: "budget-50-30-20", summary: "Split income into needs, wants, and goals." },
  { slug: "mortgage-affordability-calculator", name: "Mortgage Affordability Calculator", category: "Housing", mode: "mortgage-affordability", summary: "Estimate home price range based on payment comfort." },
  { slug: "retirement-calculator", name: "Retirement Future Value Calculator", category: "Saving & Investing", mode: "retirement-future-value", summary: "Project retirement balance growth." },
  { slug: "debt-payoff-calculator", name: "Debt Payoff Time Calculator", category: "Debt & Loans", mode: "debt-payoff-time", summary: "Estimate months needed to clear debt." },
  { slug: "credit-utilization-calculator", name: "Credit Utilization Calculator", category: "Credit", mode: "credit-utilization", summary: "Calculate credit usage ratio." },
  { slug: "income-tax-estimator", name: "Income Tax Estimator", category: "Salary & Work", mode: "income-tax-estimate", summary: "Estimate annual tax from effective rate assumptions." },
  { slug: "pay-raise-calculator", name: "Pay Raise Impact Calculator", category: "Salary & Work", mode: "pay-raise-impact", summary: "Estimate gross monthly impact of a raise." },
  { slug: "overtime-pay-calculator", name: "Overtime Pay Calculator", category: "Salary & Work", mode: "overtime-pay", summary: "Calculate additional overtime earnings." },
  { slug: "freelancer-rate-calculator", name: "Freelancer Hourly Rate Calculator", category: "Salary & Work", mode: "freelancer-hourly-rate", summary: "Set sustainable freelance pricing." },
  { slug: "payback-period-calculator", name: "Payback Period Calculator", category: "Planning", mode: "payback-period", summary: "Estimate how long it takes to recover upfront costs." },
  { slug: "rule-of-72-calculator", name: "Rule of 72 Calculator", category: "Saving & Investing", mode: "rule-72", summary: "Quickly estimate doubling time from return rates." },
  { slug: "inflation-impact-calculator", name: "Inflation Impact Calculator", category: "Financial Health", mode: "inflation-impact", summary: "Translate future money into today's purchasing power." },
  { slug: "side-hustle-goal-calculator", name: "Side Hustle Goal Timeline Calculator", category: "Planning", mode: "side-hustle-goal", summary: "Estimate timeline to reach a money goal with side income." },
  { slug: "salary-vs-contractor-calculator", name: "Salary vs Contractor Calculator", category: "Salary & Work", mode: "salary-vs-contractor", summary: "Compare estimated net outcomes for work models." },
  { slug: "vacation-budget-calculator", name: "Vacation Budget Calculator", category: "Budgeting", mode: "vacation-cost", summary: "Plan trip cost with major categories." },
  { slug: "student-loan-calculator", name: "Student Loan Payment Calculator", category: "Debt & Loans", mode: "student-loan-payment", summary: "Estimate student loan monthly payments." },
  { slug: "car-loan-calculator", name: "Car Loan Payment Calculator", category: "Debt & Loans", mode: "car-loan-payment", summary: "Estimate car loan monthly payments." },
  { slug: "lease-vs-buy-calculator", name: "Lease vs Buy Calculator", category: "Housing", mode: "lease-vs-buy", summary: "Compare total cost difference between leasing and buying." },
  { slug: "down-payment-savings-calculator", name: "Down Payment Savings Calculator", category: "Housing", mode: "down-payment-goal", summary: "Project down payment fund growth over time." },
  { slug: "rent-vs-buy-calculator", name: "Rent vs Buy Calculator", category: "Housing", mode: "rent-vs-buy", summary: "Compare simplified long-term renting and buying costs." },
  { slug: "break-even-revenue-calculator", name: "Break-Even Revenue Calculator", category: "Planning", mode: "break-even-price", summary: "Estimate revenue needed to cover fixed and variable costs." },
  { slug: "unit-price-calculator", name: "Price Per Unit Calculator", category: "Budgeting", mode: "price-per-unit", summary: "Compare products using price per unit." },
  { slug: "wedding-budget-calculator", name: "Wedding Budget Calculator", category: "Budgeting", mode: "wedding-budget", summary: "Estimate wedding costs by category." },
  { slug: "baby-cost-calculator", name: "Baby Cost Calculator", category: "Planning", mode: "baby-cost", summary: "Estimate cumulative child-related costs for early years." },
  { slug: "college-savings-calculator", name: "College Savings Calculator", category: "Saving & Investing", mode: "college-savings", summary: "Project education fund growth from monthly savings." },
  { slug: "safe-withdrawal-calculator", name: "Safe Withdrawal Calculator", category: "Saving & Investing", mode: "withdrawal-rule", summary: "Estimate annual withdrawals from portfolio size." },
  { slug: "fire-number-calculator", name: "FIRE Number Calculator", category: "Saving & Investing", mode: "fire-number", summary: "Estimate target portfolio for financial independence." },
  { slug: "expense-ratio-calculator", name: "Expense Ratio Fee Calculator", category: "Saving & Investing", mode: "expense-ratio-fee", summary: "Estimate annual fund costs from expense ratio." },
  { slug: "net-paycheck-calculator", name: "Net Paycheck Calculator", category: "Salary & Work", mode: "net-paycheck", summary: "Estimate take-home pay per paycheck." },
  { slug: "simple-interest-calculator", name: "Simple Interest Calculator", category: "Saving & Investing", mode: "simple-interest", summary: "Calculate simple interest with no compounding." },
  { slug: "monthly-payment-planner", name: "Monthly Payment Planner", category: "Debt & Loans", mode: "loan-payment", summary: "Plan loan payments before borrowing." },
  { slug: "salary-growth-calculator", name: "Salary Growth CAGR Calculator", category: "Salary & Work", mode: "cagr", summary: "Measure annualized salary growth across years." },
  { slug: "portfolio-goal-calculator", name: "Portfolio Goal Calculator", category: "Saving & Investing", mode: "compound-savings", summary: "Project portfolio value with recurring investing." },
  { slug: "freedom-fund-calculator", name: "Freedom Fund Calculator", category: "Planning", mode: "side-hustle-goal", summary: "Estimate timeline to build a career-transition fund." },
  { slug: "life-goal-savings-calculator", name: "Life Goal Savings Calculator", category: "Planning", mode: "compound-savings", summary: "Plan for major life expenses through consistent saving." },
  { slug: "bonus-investment-calculator", name: "Bonus Investment Calculator", category: "Saving & Investing", mode: "compound-savings", summary: "Estimate growth from investing bonuses and monthly adds." },
  { slug: "monthly-net-worth-tracker", name: "Monthly Net Worth Snapshot Calculator", category: "Financial Health", mode: "net-worth", summary: "Take a quick monthly net worth snapshot." },
  { slug: "essential-expense-buffer-calculator", name: "Essential Expense Buffer Calculator", category: "Financial Health", mode: "emergency-fund", summary: "Set reserves for short and long disruptions." },
  { slug: "tax-refund-planner", name: "Tax Refund Planner Calculator", category: "Planning", mode: "budget-50-30-20", summary: "Allocate one-time refunds with a simple framework." },
  { slug: "consulting-break-even-calculator", name: "Consulting Break-Even Calculator", category: "Planning", mode: "break-even-price", summary: "Find required revenue floor for consulting work." },
  { slug: "household-cashflow-calculator", name: "Household Cashflow Savings Rate Calculator", category: "Budgeting", mode: "savings-rate", summary: "Track household savings capacity from monthly cash flow." },
];

const flagshipDetail = new Map<string, Partial<Tool>>([
  [
    "loan-payment-calculator",
    {
      howWeCalculate: [
        "We apply amortization: M = P * r / (1 - (1 + r)^-n).",
        "P is principal, r is monthly rate, and n is total monthly payments.",
        "Estimate excludes taxes, insurance, and lender service fees.",
      ],
      explanation: [
        "Fixed-rate loan payment starts interest-heavy and shifts toward principal over time.",
        "Use this result to compare term length and rate offers before committing.",
      ],
      examples: [
        "Example: $250,000 at 6.5% for 30 years is roughly $1,580/month before taxes and insurance.",
        "Example: A 15-year term raises monthly cost and usually cuts lifetime interest significantly.",
      ],
      edgeCases: ["Variable-rate loans are not modeled.", "No prepayment simulation is included.", "Irregular payment schedules are not included."],
      miniGuide: ["Compare total paid, not only monthly payment.", "Ask for fee breakdowns and APR details.", "Stress-test with rates 1-2% above current offer."],
    },
  ],
  [
    "compound-interest-calculator",
    {
      howWeCalculate: [
        "Starting balance compounds monthly: initial * (1 + r)^n.",
        "Monthly additions use annuity future value.",
        "Model assumes month-end contributions and stable return.",
      ],
      explanation: [
        "Compounding amplifies consistency: regular contributions often outperform irregular large deposits.",
        "This projection helps align monthly behavior with long-term goals.",
      ],
      examples: [
        "Example: $10,000 starting + $500/month at 7% for 20 years can produce a strong six-figure balance.",
        "Example: Raising monthly contribution by $100 can materially increase final value over long periods.",
      ],
      edgeCases: ["Market volatility is not modeled year-to-year.", "Inflation and tax drag are excluded unless adjusted in assumptions.", "Contribution timing differences are simplified."],
      miniGuide: ["Run conservative and optimistic return scenarios.", "Automate investments after each paycheck.", "Increase contributions after raises."],
    },
  ],
  [
    "net-worth-calculator",
    {
      howWeCalculate: [
        "Net worth = total assets - total liabilities.",
        "Assets should reflect current fair values.",
        "Liabilities should include all current debt principal balances.",
      ],
      explanation: [
        "Net worth provides a fuller financial health view than income alone.",
        "Tracking trend direction over time is usually more useful than one snapshot.",
      ],
      examples: [
        "Example: $150,000 assets and $65,000 liabilities equals $85,000 net worth.",
        "Example: Paying off high-interest balances improves net worth immediately.",
      ],
      edgeCases: ["Valuing private assets can be uncertain.", "Currency effects are ignored in mixed-currency portfolios.", "Future pension rights are excluded."],
      miniGuide: ["Update monthly on a fixed date.", "Separate high-interest from low-interest liabilities.", "Pair tracking with monthly cash-flow review."],
    },
  ],
]);

function genericContent(seed: Seed, position: number): Omit<Tool, "related"> {
  const result = resultMode(seed.mode);
  const detail = flagshipDetail.get(seed.slug);
  return {
    slug: seed.slug,
    name: seed.name,
    summary: seed.summary,
    category: seed.category,
    mode: seed.mode,
    inputs: inputsByMode(seed.mode),
    resultLabel: result.label,
    resultSuffix: result.suffix,
    precision: result.precision,
    howWeCalculate: detail?.howWeCalculate ?? [
      `This ${seed.name.toLowerCase()} applies a transparent ${seed.mode} formula from your inputs.`,
      "Inputs are displayed directly so assumptions remain explicit.",
      "Use scenario ranges to avoid overconfidence from a single estimate.",
    ],
    explanation: detail?.explanation ?? [
      `${seed.name} helps with practical planning rather than one-time guessing.`,
      "Pair the result with your real statements, lender docs, or payroll records before acting.",
    ],
    examples: detail?.examples ?? [
      `Example path ${position + 1}: run conservative, base, and optimistic assumptions for ${seed.name.toLowerCase()}.`,
      "Recalculate whenever your income, rates, or recurring costs materially change.",
    ],
    edgeCases: detail?.edgeCases ?? [
      "Tax rules and local regulations can materially change real outcomes.",
      "Irregular cash flow and one-off expenses are simplified.",
      "The tool does not replace product-level disclosures or legal terms.",
    ],
    miniGuide: detail?.miniGuide ?? [
      "Collect current numbers from recent statements first.",
      "Document your assumptions to compare updates later.",
      "Review this estimate quarterly as conditions change.",
    ],
    faqs: [
      {
        question: `How accurate is this ${seed.name.toLowerCase()}?`,
        answer:
          "It is mathematically consistent with the assumptions shown. Real-world outcomes differ based on taxes, fees, timing, and provider-specific terms.",
      },
      {
        question: "How should I use the result?",
        answer:
          "Treat it as a planning baseline, then validate with official statements, contracts, or lending disclosures before making commitments.",
      },
      {
        question: "Can I rely on one scenario?",
        answer:
          "No. Run at least conservative and optimistic scenarios to account for uncertainty and avoid fragile plans.",
      },
    ],
    references: refs,
  };
}

const built = catalog.map((seed, index) => genericContent(seed, index));

function buildRelated(slug: string, category: string) {
  const same = built.filter((tool) => tool.slug !== slug && tool.category === category).map((tool) => tool.slug);
  const other = built.filter((tool) => tool.slug !== slug && tool.category !== category).map((tool) => tool.slug);
  return [...same, ...other].slice(0, 8);
}

export const tools: Tool[] = built.map((tool) => ({ ...tool, related: buildRelated(tool.slug, tool.category) }));
export const toolsBySlug = new Map(tools.map((tool) => [tool.slug, tool]));
export const getToolBySlug = (slug: string) => toolsBySlug.get(slug);
