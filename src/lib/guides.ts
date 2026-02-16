import type { Guide } from "@/lib/types";

export const guides: Guide[] = [
  {
    slug: "zero-based-budgeting-guide",
    title: "Zero-Based Budgeting: Build a Monthly Plan That Reflects Real Life",
    description: "A practical framework for assigning every dollar a job without creating unrealistic budgets.",
    publishDate: "2026-02-16",
    updatedDate: "2026-02-16",
    author: "Alex Rivera, Personal Finance Editor",
    editor: "Jordan Lee, Senior Content Editor",
    toolSlugs: ["budget-50-30-20-calculator", "savings-rate-calculator", "net-paycheck-calculator"],
    readingMinutes: 11,
  },
  {
    slug: "debt-payoff-strategy-guide",
    title: "Debt Payoff Strategy: How to Prioritize Balances and Stay Consistent",
    description: "Choose between avalanche and snowball methods with practical cash-flow guardrails.",
    publishDate: "2026-02-16",
    updatedDate: "2026-02-16",
    author: "Alex Rivera, Personal Finance Editor",
    editor: "Jordan Lee, Senior Content Editor",
    toolSlugs: ["debt-payoff-calculator", "debt-to-income-calculator", "loan-payment-calculator"],
    readingMinutes: 12,
  },
  {
    slug: "emergency-fund-planning-guide",
    title: "Emergency Fund Planning: How Much Cash Reserve You Actually Need",
    description: "Set reserve targets by income stability and household obligations.",
    publishDate: "2026-02-16",
    updatedDate: "2026-02-16",
    author: "Alex Rivera, Personal Finance Editor",
    editor: "Jordan Lee, Senior Content Editor",
    toolSlugs: ["emergency-fund-calculator", "essential-expense-buffer-calculator", "net-worth-calculator"],
    readingMinutes: 10,
  },
  {
    slug: "salary-negotiation-prep-guide",
    title: "Salary Negotiation Preparation: Quantify Your Value and Ask Clearly",
    description: "Use compensation data and work outcomes to structure better salary conversations.",
    publishDate: "2026-02-16",
    updatedDate: "2026-02-16",
    author: "Alex Rivera, Personal Finance Editor",
    editor: "Jordan Lee, Senior Content Editor",
    toolSlugs: ["salary-growth-calculator", "pay-raise-calculator", "net-paycheck-calculator"],
    readingMinutes: 12,
  },
  {
    slug: "retirement-contribution-guide",
    title: "Retirement Contributions: Build a Sustainable Long-Term Investment Habit",
    description: "Design contribution rules that survive market swings and life changes.",
    publishDate: "2026-02-16",
    updatedDate: "2026-02-16",
    author: "Alex Rivera, Personal Finance Editor",
    editor: "Jordan Lee, Senior Content Editor",
    toolSlugs: ["retirement-calculator", "compound-interest-calculator", "fire-number-calculator"],
    readingMinutes: 13,
  },
  {
    slug: "home-buying-readiness-guide",
    title: "Home Buying Readiness: Budget, Down Payment, and Ongoing Ownership Costs",
    description: "Evaluate affordability with realistic all-in ownership costs before buying.",
    publishDate: "2026-02-16",
    updatedDate: "2026-02-16",
    author: "Alex Rivera, Personal Finance Editor",
    editor: "Jordan Lee, Senior Content Editor",
    toolSlugs: ["mortgage-affordability-calculator", "down-payment-savings-calculator", "rent-vs-buy-calculator"],
    readingMinutes: 12,
  },
  {
    slug: "freelancer-finance-guide",
    title: "Freelancer Finance System: Pricing, Taxes, and Income Stability",
    description: "Build a reliable freelance cash-flow system with tax and pricing guardrails.",
    publishDate: "2026-02-16",
    updatedDate: "2026-02-16",
    author: "Alex Rivera, Personal Finance Editor",
    editor: "Jordan Lee, Senior Content Editor",
    toolSlugs: ["freelancer-rate-calculator", "consulting-break-even-calculator", "salary-vs-contractor-calculator"],
    readingMinutes: 14,
  },
  {
    slug: "investing-basics-guide",
    title: "Investing Basics for Busy Professionals: Risk, Time Horizon, and Consistency",
    description: "A practical investing framework for people who want simple, repeatable decisions.",
    publishDate: "2026-02-16",
    updatedDate: "2026-02-16",
    author: "Alex Rivera, Personal Finance Editor",
    editor: "Jordan Lee, Senior Content Editor",
    toolSlugs: ["roi-calculator", "cagr-calculator", "expense-ratio-calculator"],
    readingMinutes: 12,
  },
  {
    slug: "cashflow-optimization-guide",
    title: "Cashflow Optimization: Build Monthly Systems That Prevent Overspending",
    description: "Structure accounts, bill timing, and category rules for smoother monthly cash flow.",
    publishDate: "2026-02-16",
    updatedDate: "2026-02-16",
    author: "Alex Rivera, Personal Finance Editor",
    editor: "Jordan Lee, Senior Content Editor",
    toolSlugs: ["household-cashflow-calculator", "budget-50-30-20-calculator", "tax-refund-planner"],
    readingMinutes: 11,
  },
  {
    slug: "credit-score-health-guide",
    title: "Credit Score Health: Practical Actions That Improve Credit Over Time",
    description: "Manage utilization, payment history, and debt mix with realistic timelines.",
    publishDate: "2026-02-16",
    updatedDate: "2026-02-16",
    author: "Alex Rivera, Personal Finance Editor",
    editor: "Jordan Lee, Senior Content Editor",
    toolSlugs: ["credit-utilization-calculator", "debt-payoff-calculator", "debt-to-income-calculator"],
    readingMinutes: 10,
  },
  {
    slug: "major-life-goals-funding-guide",
    title: "Funding Major Life Goals: Weddings, Family Costs, and Education Planning",
    description: "Turn large life expenses into structured, manageable savings plans.",
    publishDate: "2026-02-16",
    updatedDate: "2026-02-16",
    author: "Alex Rivera, Personal Finance Editor",
    editor: "Jordan Lee, Senior Content Editor",
    toolSlugs: ["wedding-budget-calculator", "baby-cost-calculator", "college-savings-calculator"],
    readingMinutes: 12,
  },
  {
    slug: "financial-independence-roadmap-guide",
    title: "Financial Independence Roadmap: Milestones, Drawdown Rules, and Risk Buffers",
    description: "Design a long-horizon plan for optional work and sustainable spending.",
    publishDate: "2026-02-16",
    updatedDate: "2026-02-16",
    author: "Alex Rivera, Personal Finance Editor",
    editor: "Jordan Lee, Senior Content Editor",
    toolSlugs: ["fire-number-calculator", "safe-withdrawal-calculator", "portfolio-goal-calculator"],
    readingMinutes: 13,
  },
];

export const guidesBySlug = new Map(guides.map((guide) => [guide.slug, guide]));

export async function loadGuideComponent(slug: string) {
  switch (slug) {
    case "zero-based-budgeting-guide":
      return import("@/content/guides/zero-based-budgeting-guide.mdx");
    case "debt-payoff-strategy-guide":
      return import("@/content/guides/debt-payoff-strategy-guide.mdx");
    case "emergency-fund-planning-guide":
      return import("@/content/guides/emergency-fund-planning-guide.mdx");
    case "salary-negotiation-prep-guide":
      return import("@/content/guides/salary-negotiation-prep-guide.mdx");
    case "retirement-contribution-guide":
      return import("@/content/guides/retirement-contribution-guide.mdx");
    case "home-buying-readiness-guide":
      return import("@/content/guides/home-buying-readiness-guide.mdx");
    case "freelancer-finance-guide":
      return import("@/content/guides/freelancer-finance-guide.mdx");
    case "investing-basics-guide":
      return import("@/content/guides/investing-basics-guide.mdx");
    case "cashflow-optimization-guide":
      return import("@/content/guides/cashflow-optimization-guide.mdx");
    case "credit-score-health-guide":
      return import("@/content/guides/credit-score-health-guide.mdx");
    case "major-life-goals-funding-guide":
      return import("@/content/guides/major-life-goals-funding-guide.mdx");
    case "financial-independence-roadmap-guide":
      return import("@/content/guides/financial-independence-roadmap-guide.mdx");
    default:
      return null;
  }
}
