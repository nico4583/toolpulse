export type FAQItem = {
  question: string;
  answer: string;
};

export type ToolInput = {
  key: string;
  label: string;
  description: string;
  min?: number;
  max?: number;
  step?: number;
  defaultValue: number;
  suffix?: string;
};

export type CalculationMode =
  | "loan-payment"
  | "compound-savings"
  | "net-worth"
  | "simple-interest"
  | "salary-hourly-to-annual"
  | "salary-annual-to-hourly"
  | "debt-to-income"
  | "emergency-fund"
  | "roi"
  | "cagr"
  | "savings-rate"
  | "budget-50-30-20"
  | "mortgage-affordability"
  | "retirement-future-value"
  | "debt-payoff-time"
  | "credit-utilization"
  | "income-tax-estimate"
  | "pay-raise-impact"
  | "overtime-pay"
  | "freelancer-hourly-rate"
  | "payback-period"
  | "rule-72"
  | "inflation-impact"
  | "side-hustle-goal"
  | "salary-vs-contractor"
  | "vacation-cost"
  | "student-loan-payment"
  | "car-loan-payment"
  | "lease-vs-buy"
  | "down-payment-goal"
  | "rent-vs-buy"
  | "break-even-price"
  | "price-per-unit"
  | "wedding-budget"
  | "baby-cost"
  | "college-savings"
  | "withdrawal-rule"
  | "fire-number"
  | "expense-ratio-fee"
  | "net-paycheck";

export type Tool = {
  slug: string;
  name: string;
  summary: string;
  category: string;
  mode: CalculationMode;
  inputs: ToolInput[];
  resultLabel: string;
  resultSuffix?: string;
  precision?: number;
  howWeCalculate: string[];
  explanation: string[];
  examples: string[];
  edgeCases: string[];
  miniGuide: string[];
  faqs: FAQItem[];
  references: string[];
  related: string[];
};

export type Guide = {
  slug: string;
  title: string;
  description: string;
  publishDate: string;
  updatedDate: string;
  author: string;
  editor: string;
  toolSlugs: string[];
  readingMinutes: number;
};
