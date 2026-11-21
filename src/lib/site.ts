export const siteConfig = {
  name: "Toolix",
  tagline: "Free online tools for work, study and everyday tasks",
  description: "Free online image, PDF, text, calculator, SEO, salary and tax tools. Fast, simple browser-based utilities for everyday tasks.",
  url: "https://www.gettoolix.online",
  email: "gettolix@gmail.com",
  youtubeChannelUrl: "https://www.youtube.com/@shobhitverma-m3h?sub_confirmation=1"
};

import type { FlagCode } from "@/components/Flag";

/** Any string works — new categories need no code change. */
export type ToolCategory = string;

export type ToolDef = {
  slug: string;
  name: string;
  category: ToolCategory;
  /** Country flag shown in the card corner, or "global" for tools that work anywhere. */
  flag: FlagCode;
  short: string;
  title: string;
  description: string;
  keywords: string[];
  intro: string;
  steps: string[];
  formula: string;
  example: string;
  faqs: { q: string; a: string }[];
  related: string[];
};

export const tools: ToolDef[] = [
  {
    slug: "india-new-vs-old-tax-regime-calculator",
    name: "New vs Old Tax Regime Calculator (India)",
    category: "India",
    flag: "in",
    short: "Compare FY 2026-27 tax under both regimes and see which saves more.",
    title: "India New vs Old Tax Regime Calculator",
    description: "Compare India’s new and old tax regimes for FY 2026-27. Enter salary and eligible deductions to estimate tax, monthly in-hand pay and which model is lower.",
    keywords: ["new vs old tax regime calculator", "income tax calculator india 2026-27", "which tax regime is better", "old regime vs new regime", "tax saving calculator india"],
    intro: "Choosing between the new and old tax regime is the biggest tax decision a salaried Indian makes each year. This calculator runs your salary through both regimes for FY 2026-27 and tells you which one leaves more money in your pocket.",
    steps: ["Enter your annual gross salary or CTC.", "Add the total deductions you would claim in the old regime (80C, 80D, HRA, home loan interest and others).", "Compare the tax payable and in-hand salary under each regime.", "Choose the regime shown as better and declare it to your employer."],
    formula: "Tax = slab tax on (gross − standard deduction − eligible deductions) − 87A rebate + surcharge, then × 1.04 for 4% cess.",
    example: "For a ₹18 lakh salary with ₹3.5 lakh of old-regime deductions, the new regime usually saves more unless deductions exceed roughly ₹4 to ₹5 lakh.",
    faqs: [
      { q: "Can I switch regimes every year?", a: "Salaried employees can choose a regime each year while filing, but business-income taxpayers have limits on switching back." },
      { q: "Is HRA allowed in the new regime?", a: "No. HRA, 80C and most deductions are only available in the old regime." },
      { q: "What is the standard deduction?", a: "₹75,000 under the new regime and ₹50,000 under the old regime for FY 2026-27." }
    ],
    related: ["india-epf-calculator", "hourly-to-salary-calculator"]
  },
  {
    slug: "india-epf-calculator",
    name: "EPF Calculator (India)",
    category: "India",
    flag: "in",
    short: "Project your Employees' Provident Fund corpus at retirement.",
    title: "India EPF Calculator: Retirement Corpus",
    description: "Project an EPF corpus from monthly basic pay, age, retirement age, current balance, yearly increment and an adjustable interest assumption. Estimate only.",
    keywords: ["epf calculator", "pf calculator", "provident fund calculator", "epf maturity calculator", "epf interest calculator"],
    intro: "Your EPF is one of the most reliable long-term savings you have. This calculator projects your provident fund corpus from your monthly basic salary, the 12% employee and employer contribution, your expected annual increment and the EPF interest rate.",
    steps: ["Enter your monthly basic pay plus dearness allowance.", "Set your current age, retirement age and current EPF balance.", "Enter expected annual increment and interest rate.", "Read your projected corpus and total interest earned."],
    formula: "Each month: contribution = 12% of basic (employee) + 8.33% to EPS capped, remainder to EPF. Balance grows at interest rate ÷ 12.",
    example: "At ₹50,000 basic, 30 years of service, 8.25% interest and 6% yearly increments, the projected EPF corpus is about ₹3.3 crore.",
    faqs: [
      { q: "What is the current EPF interest rate?", a: "The rate is declared yearly. This tool uses 8.25% by default, which you can change." },
      { q: "How much goes to EPF vs EPS?", a: "The employer's 12% splits into 8.33% to the pension scheme (on wages up to ₹15,000) and the rest to EPF. This calculator approximates by counting the full employee 12% plus the employer EPF portion." }
    ],
    related: ["india-new-vs-old-tax-regime-calculator"]
  },
  {
    slug: "uae-gratuity-calculator",
    name: "UAE Gratuity Calculator",
    category: "Gulf & Asia",
    flag: "ae",
    short: "Estimate your end-of-service gratuity under UAE labour law.",
    title: "UAE Gratuity Calculator 2026",
    description: "Estimate UAE gratuity from monthly basic salary and service time. Check the calculator assumptions and confirm the result against current official guidance.",
    keywords: ["uae gratuity calculator", "end of service calculator uae", "dubai gratuity calculator", "uae labour law gratuity", "eosb calculator"],
    intro: "If you work in the UAE on a private-sector contract, your employer owes you an end-of-service gratuity when you leave. This calculator estimates the amount from your last basic salary and length of service using the rules in the UAE labour law.",
    steps: ["Enter your last monthly basic salary (not total package).", "Enter the years and months you worked.", "Choose whether the termination was for serious misconduct.", "Read the gratuity, capped at two years of total pay."],
    formula: "Daily wage = basic ÷ 30. First 5 years: 21 days per year. After 5 years: 30 days per year. Maximum: 2 years of basic pay.",
    example: "With AED 10,000 basic and 8 years of service: 5 × 21 + 3 × 30 = 195 days × AED 333.33 ≈ AED 65,000.",
    faqs: [
      { q: "Is gratuity based on basic or total salary?", a: "Basic salary only, excluding housing, transport and other allowances." },
      { q: "How long must I work to get gratuity?", a: "A minimum of one year of continuous service." },
      { q: "Is the gratuity capped?", a: "Yes. The total cannot exceed two years of basic salary." }
    ],
    related: ["salary-raise-calculator"]
  },
  {
    slug: "singapore-cpf-calculator",
    name: "CPF Calculator (Singapore)",
    category: "Gulf & Asia",
    flag: "sg",
    short: "See employee and employer CPF contributions by age band.",
    title: "Singapore CPF Calculator 2026",
    description: "Estimate CPF employee and employer contributions from salary and age band. Review modeled shares and confirm contribution rules with CPF Board before use.",
    keywords: ["cpf calculator", "singapore cpf contribution", "cpf contribution rate 2026", "employer cpf calculator", "cpf ordinary wage ceiling"],
    intro: "Central Provident Fund contributions are split between you and your employer. Enter your monthly salary and age band to see how much goes into CPF each month and how much cash you take home before income tax.",
    steps: ["Enter your gross monthly salary.", "Select your age band.", "The calculator caps wages at S$8,000 a month.", "Review employee, employer and total CPF."],
    formula: "CPF = min(monthly wage, S$8,000) × rate for your age band. Employee rate is 20% up to age 55.",
    example: "At S$6,000 per month and age 30, employee CPF is S$1,200 and employer CPF is S$1,020, a total of S$2,220.",
    faqs: [
      { q: "What is the 2026 CPF ceiling?", a: "S$8,000 for monthly ordinary wages, with an annual cap of S$102,000." },
      { q: "Are foreigners covered?", a: "No. CPF applies to Singapore citizens and permanent residents." }
    ],
    related: ["salary-raise-calculator"]
  },
  {
    slug: "us-bonus-tax-calculator",
    name: "Bonus Tax Calculator (US)",
    category: "Salary",
    flag: "us",
    short: "See how much of your bonus you keep after federal tax and FICA.",
    title: "US Bonus Tax Calculator 2026",
    description: "Compare federal bonus withholding and tax using salary and filing status. State and local taxes are excluded; verify current IRS rules before using results.",
    keywords: ["bonus tax calculator", "bonus after tax", "how much tax on bonus", "supplemental wages tax rate", "bonus withholding calculator"],
    intro: "Bonuses feel heavily taxed because employers often withhold a flat 22% federal rate. Your real tax depends on your total income for the year. This calculator shows both the withholding and the true marginal cost of your bonus.",
    steps: ["Enter your annual salary.", "Enter the bonus amount.", "Pick your filing status.", "Compare flat withholding with the tax you truly owe."],
    formula: "Flat method: bonus × 22% (37% above $1M) + 7.65% FICA. Aggregate method: tax(salary + bonus) − tax(salary).",
    example: "A $10,000 bonus on a $75,000 salary has about $2,200 federal withholding but a true federal cost near $2,200 as well, since the bonus sits in the 22% bracket.",
    faqs: [
      { q: "Is a bonus taxed at a higher rate?", a: "No. It is taxed as ordinary income. Withholding may be higher or lower than what you owe, and you settle the difference at tax filing." },
      { q: "What is the supplemental rate?", a: "22% for supplemental wages up to $1 million and 37% above." }
    ],
    related: ["salary-raise-calculator", "hourly-to-salary-calculator"]
  },
  {
    slug: "salary-raise-calculator",
    name: "Salary Raise Calculator",
    category: "Planning",
    flag: "global",
    short: "Find out what a raise is really worth after tax in your country.",
    title: "Salary Raise Calculator",
    description: "Estimate the take-home difference from a raise using the selected country, current annual salary and raise percentage. Compare modeled gross and net pay.",
    keywords: ["salary raise calculator", "pay rise calculator", "raise after tax calculator", "salary increase calculator", "hike calculator"],
    intro: "A 10% raise rarely means 10% more in your bank account. Progressive tax means higher earners keep a smaller share of each extra dollar. Enter your current salary and your raise to see the extra take-home pay.",
    steps: ["Choose your country.", "Enter your current annual salary.", "Enter the raise as a percentage.", "Compare net pay before and after the raise."],
    formula: "New salary = current × (1 + raise%). Net gain = net(new) − net(current).",
    example: "A 10% raise from £50,000 to £55,000 adds £5,000 gross but only about £2,900 net because of the 40% higher rate plus 2% National Insurance.",
    faqs: [
      { q: "Why is my net raise smaller than my gross raise?", a: "Part of the raise is taxed at your marginal rate, and social contributions apply too." },
      { q: "Does it work for monthly pay?", a: "Enter the annual amount. Divide the result by 12 for a monthly view." }
    ],
    related: ["hourly-to-salary-calculator", "us-bonus-tax-calculator"]
  },
  {
    slug: "hourly-to-salary-calculator",
    name: "Hourly to Salary Calculator",
    category: "Salary",
    flag: "global",
    short: "Convert hourly pay to yearly, monthly and weekly salary and back.",
    title: "Hourly to Salary Calculator",
    description: "Convert hourly pay to annual, monthly and weekly gross pay, or estimate an hourly rate from salary, hours per week and paid weeks in your schedule for planning.",
    keywords: ["hourly to salary calculator", "hourly to annual salary", "salary to hourly calculator", "hourly wage calculator", "annual salary to hourly"],
    intro: "Compare a job quoted by the hour with one quoted by the year. Enter your hourly rate, hours per week and weeks worked and get your annual, monthly and weekly pay, or go the other way from salary to hourly rate.",
    steps: ["Pick hourly to salary or salary to hourly.", "Enter the rate or the annual amount.", "Set hours per week and paid weeks per year.", "Read all conversions at once."],
    formula: "Annual = hourly × hours per week × weeks per year. Hourly = annual ÷ (hours per week × weeks per year).",
    example: "$25 per hour × 40 hours × 52 weeks = $52,000 per year, or about $4,333 per month.",
    faqs: [
      { q: "How many working hours are in a year?", a: "A full-time year is usually 2,080 hours (40 × 52), less if you take unpaid leave." },
      { q: "Is this before or after tax?", a: "Before tax. Put the annual figure into a country salary calculator to see take-home pay." }
    ],
    related: ["salary-raise-calculator"]
  },
  // <<NEW_TOOL_META>> (do not remove — scripts/new-tool.mjs inserts new tools above this line)
];

export function getTool(slug: string): ToolDef | undefined {
  return tools.find((t) => t.slug === slug);
}
