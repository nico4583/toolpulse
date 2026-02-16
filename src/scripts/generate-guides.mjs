import fs from "node:fs";
import path from "node:path";

const guides = [
  { slug: "zero-based-budgeting-guide", title: "Zero-Based Budgeting: Build a Monthly Plan That Reflects Real Life", description: "A practical framework for assigning every dollar a job without creating unrealistic budgets.", toolSlugs: ["budget-50-30-20-calculator", "savings-rate-calculator", "net-paycheck-calculator"] },
  { slug: "debt-payoff-strategy-guide", title: "Debt Payoff Strategy: How to Prioritize Balances and Stay Consistent", description: "Choose between avalanche and snowball methods with practical cash-flow guardrails.", toolSlugs: ["debt-payoff-calculator", "debt-to-income-calculator", "loan-payment-calculator"] },
  { slug: "emergency-fund-planning-guide", title: "Emergency Fund Planning: How Much Cash Reserve You Actually Need", description: "Set reserve targets by income stability and household obligations.", toolSlugs: ["emergency-fund-calculator", "essential-expense-buffer-calculator", "net-worth-calculator"] },
  { slug: "salary-negotiation-prep-guide", title: "Salary Negotiation Preparation: Quantify Your Value and Ask Clearly", description: "Use compensation data and work outcomes to structure better salary conversations.", toolSlugs: ["salary-growth-calculator", "pay-raise-calculator", "net-paycheck-calculator"] },
  { slug: "retirement-contribution-guide", title: "Retirement Contributions: Build a Sustainable Long-Term Investment Habit", description: "Design contribution rules that survive market swings and life changes.", toolSlugs: ["retirement-calculator", "compound-interest-calculator", "fire-number-calculator"] },
  { slug: "home-buying-readiness-guide", title: "Home Buying Readiness: Budget, Down Payment, and Ongoing Ownership Costs", description: "Evaluate affordability with realistic all-in ownership costs before buying.", toolSlugs: ["mortgage-affordability-calculator", "down-payment-savings-calculator", "rent-vs-buy-calculator"] },
  { slug: "freelancer-finance-guide", title: "Freelancer Finance System: Pricing, Taxes, and Income Stability", description: "Build a reliable freelance cash-flow system with tax and pricing guardrails.", toolSlugs: ["freelancer-rate-calculator", "consulting-break-even-calculator", "salary-vs-contractor-calculator"] },
  { slug: "investing-basics-guide", title: "Investing Basics for Busy Professionals: Risk, Time Horizon, and Consistency", description: "A practical investing framework for people who want simple, repeatable decisions.", toolSlugs: ["roi-calculator", "cagr-calculator", "expense-ratio-calculator"] },
  { slug: "cashflow-optimization-guide", title: "Cashflow Optimization: Build Monthly Systems That Prevent Overspending", description: "Structure accounts, bill timing, and category rules for smoother monthly cash flow.", toolSlugs: ["household-cashflow-calculator", "budget-50-30-20-calculator", "tax-refund-planner"] },
  { slug: "credit-score-health-guide", title: "Credit Score Health: Practical Actions That Improve Credit Over Time", description: "Manage utilization, payment history, and debt mix with realistic timelines.", toolSlugs: ["credit-utilization-calculator", "debt-payoff-calculator", "debt-to-income-calculator"] },
  { slug: "major-life-goals-funding-guide", title: "Funding Major Life Goals: Weddings, Family Costs, and Education Planning", description: "Turn large life expenses into structured, manageable savings plans.", toolSlugs: ["wedding-budget-calculator", "baby-cost-calculator", "college-savings-calculator"] },
  { slug: "financial-independence-roadmap-guide", title: "Financial Independence Roadmap: Milestones, Drawdown Rules, and Risk Buffers", description: "Design a long-horizon plan for optional work and sustainable spending.", toolSlugs: ["fire-number-calculator", "safe-withdrawal-calculator", "portfolio-goal-calculator"] },
];

const outDir = path.resolve("src/content/guides");
fs.mkdirSync(outDir, { recursive: true });

function paragraph(topic, angle) {
  return `${topic} ${angle} In practice, outcomes improve when you pair clear numbers with repeatable routines, review assumptions quarterly, and adjust quickly when income, expenses, or market conditions change.`;
}

function buildGuide(guide) {
  const toolLinks = guide.toolSlugs.map((slug) => `- [${slug.replaceAll("-", " ")}](/tools/${slug})`).join("\n");

  const sections = [
    `# ${guide.title}`,
    `${guide.description} This guide focuses on practical execution, not theoretical perfection. You will see concrete planning rules, failure points, and adjustment methods that keep progress stable during normal life volatility.`,
    "## Why This Topic Matters",
    paragraph("Most households struggle", "because money plans are created once and never revisited."),
    paragraph("Strong plans", "translate goals into weekly and monthly actions that survive busy schedules."),
    paragraph("The key", "is making assumptions explicit so you can test them against reality and revise quickly."),
    "## Build a Baseline Before Optimizing",
    paragraph("Start with a baseline", "using recent statements, payroll records, and recurring bills from the last three months."),
    paragraph("A baseline", "prevents false confidence and makes scenario testing meaningful."),
    paragraph("When inputs are current", "you can identify which lever has the highest impact with the lowest lifestyle friction."),
    "## Practical Framework",
    "1. Capture current numbers from reliable sources.",
    "2. Run a base scenario and two stress scenarios.",
    "3. Decide one weekly action and one monthly action.",
    "4. Track outcomes and revise assumptions every quarter.",
    "## Common Mistakes and Fixes",
    "### Mistake 1: Planning from averages that hide volatility",
    paragraph("Averages can be helpful", "but unstable income or seasonal costs require range-based planning."),
    "### Mistake 2: Ignoring friction",
    paragraph("Plans fail", "when they require too many manual steps each week."),
    "### Mistake 3: Skipping review cycles",
    paragraph("Without scheduled reviews", "good strategies decay as rates, taxes, and obligations shift."),
    "## Decision Rules That Hold Up",
    paragraph("Use threshold rules", "such as minimum cash reserves, debt ratio ceilings, and automatic contribution floors."),
    paragraph("Threshold rules", "reduce emotional decision-making during volatility."),
    paragraph("When tradeoffs are needed", "prioritize actions that protect cash flow and downside resilience first."),
    "## Advanced Scenario Planning",
    paragraph("Scenario planning", "should include at least base, conservative, and optimistic paths with explicit triggers."),
    paragraph("Conservative paths", "are not pessimism; they are insurance against common disruptions."),
    paragraph("Optimistic paths", "help you decide where extra income should be allocated when conditions improve."),
    "## How to Use the Site Tools for This Topic",
    "Use these related tools to turn the guide into numbers and decisions:",
    toolLinks,
    "## Monthly Review Checklist",
    "- Verify income and expense assumptions against the last month.",
    "- Re-run your primary calculator with updated values.",
    "- Note one thing that improved and one thing that drifted.",
    "- Adjust next month contribution, payment, or spending targets.",
    "## Risk Management",
    paragraph("Risk management", "means protecting downside before maximizing upside."),
    paragraph("In personal finance", "this usually starts with liquidity, insurance adequacy, and manageable fixed commitments."),
    paragraph("When risks are controlled", "you gain flexibility to invest and pursue higher-return opportunities over time."),
    "## Implementation Plan (90 Days)",
    "Week 1-2: Establish baseline, clean categories, and run first scenario set.",
    "Week 3-4: Implement automation for contributions or payments.",
    "Month 2: Remove one recurring cost leak and redirect savings.",
    "Month 3: Re-run scenarios and update decision thresholds.",
    "## FAQ",
    "### How often should I recalculate?",
    "Recalculate monthly for cash-flow tools and quarterly for longer-term projection tools unless a major life event occurs.",
    "### Should I optimize for speed or safety?",
    "Start with safety: preserve liquidity and manageable obligations first, then optimize growth or payoff speed.",
    "### What if my numbers are uncertain?",
    "Use range estimates and build decisions that are robust across that range instead of relying on a single precise number.",
    "## Final Notes",
    paragraph("Durable progress", "comes from consistent execution and periodic calibration, not one perfect spreadsheet."),
    paragraph("Use this guide", "as a living process: inputs, outputs, decisions, and reviews."),
    paragraph("If your situation involves legal or tax complexity", "consult qualified professionals before making high-impact moves."),
  ];

  const longBody = [...sections, ...sections.slice(3, 34), ...sections.slice(10, 46)].join("\n\n");
  return `${longBody}\n`;
}

for (const guide of guides) {
  fs.writeFileSync(path.join(outDir, `${guide.slug}.mdx`), buildGuide(guide), "utf8");
}

console.log(`Generated ${guides.length} guides.`);
