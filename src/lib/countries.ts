import { type TaxResult } from "./tax/types";
import {
  indiaTax, usTax, ukTax, canadaTax, australiaTax, singaporeTax, uaeTax, irelandTax,
  IN_NEW, IN_OLD, US_BRACKETS, CA_FED, CA_ON, CA_AB, AU, SG,
  type UsStatus, type CaProvince, type SgAge
} from "./tax/countries";
import type { Bracket } from "./tax/types";

export type CountryCode = "in" | "us" | "uk" | "ca" | "au" | "sg" | "ae" | "ie";

export type Options = {
  regime?: "new" | "old";
  status?: UsStatus;
  province?: CaProvince;
  age?: SgAge;
  stateRate?: number;
  pensionPercent?: number;
  cpf?: boolean;
  marriedIe?: boolean;
};

export type Faq = { q: string; a: string };

export type Country = {
  code: CountryCode;
  slug: string;           // url slug under /salary-calculator/
  name: string;
  demonym: string;
  currency: string;
  symbol: string;
  locale: string;
  region: string;
  taxYear: string;
  defaultSalary: number;
  salarySteps: number[];  // used for programmatic salary pages
  title: string;
  h1: string;
  description: string;
  keywords: string[];
  intro: string[];
  howItWorks: string[];
  faqs: Faq[];
  taxTableTitle: string;
  taxTable: { range: string; rate: string }[];
  deductionsExplained: { name: string; text: string }[];
};

const fmtNum = (n: number, locale: string) => new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(n);

function rowsFromBrackets(b: Bracket[], locale: string, symbol: string, offset = 0): { range: string; rate: string }[] {
  const rows: { range: string; rate: string }[] = [];
  let prev = offset;
  for (const br of b) {
    const rate = `${parseFloat((br.rate * 100).toFixed(2))}%`;
    if (br.upTo === Infinity) rows.push({ range: `Over ${symbol}${fmtNum(prev, locale)}`, rate });
    else rows.push({ range: `${symbol}${fmtNum(prev === 0 ? 0 : prev + 1, locale)} – ${symbol}${fmtNum(br.upTo, locale)}`, rate });
    prev = br.upTo;
  }
  return rows;
}

export const countries: Country[] = [
  {
    code: "in", slug: "india", name: "India", demonym: "Indian", currency: "INR", symbol: "₹", locale: "en-IN", region: "Asia",
    taxYear: "FY 2026-27 (AY 2027-28)", defaultSalary: 1200000,
    salarySteps: [300000, 500000, 600000, 800000, 1000000, 1200000, 1500000, 1800000, 2000000, 2500000, 3000000, 5000000],
    title: "India Salary Calculator 2026-27: CTC to In-Hand Salary",
    h1: "India Salary Calculator — CTC to In-Hand Salary",
    description: "Free India salary calculator for FY 2026-27. Convert CTC to monthly in-hand salary after income tax, 4% cess and EPF under the new and old tax regime.",
    keywords: ["india salary calculator", "in hand salary calculator", "ctc to in hand salary", "salary after tax india", "income tax calculator 2026-27", "new tax regime calculator", "take home salary calculator india"],
    intro: [
      "Use this India salary calculator to turn your annual CTC into the monthly in-hand salary that actually reaches your bank account. It applies the FY 2026-27 income tax slabs, the ₹75,000 standard deduction, the Section 87A rebate, 4% health and education cess and your employee EPF contribution.",
      "Under the new tax regime, taxable income up to ₹12 lakh is fully rebated, which means a salaried employee earning up to about ₹12.75 lakh pays no income tax. Switch to the old regime to see how Section 80C and other deductions change your take-home pay."
    ],
    howItWorks: [
      "Start with your annual CTC or gross salary and subtract the standard deduction (₹75,000 in the new regime, ₹50,000 in the old regime).",
      "Apply the slab rates to the remaining taxable income, then subtract the Section 87A rebate if you qualify.",
      "Add surcharge for high incomes and 4% health and education cess.",
      "Subtract employee EPF (12% of basic pay) to arrive at annual in-hand salary, then divide by 12 for the monthly figure."
    ],
    faqs: [
      { q: "How much tax do I pay on ₹12 lakh salary in India?", a: "Under the new regime for FY 2026-27, a salary of ₹12 lakh has taxable income of ₹11.25 lakh after the ₹75,000 standard deduction, which is fully covered by the Section 87A rebate. Income tax is therefore zero." },
      { q: "What is the difference between CTC and in-hand salary?", a: "CTC includes everything your employer spends on you, including employer EPF, gratuity and insurance. In-hand salary is what remains after income tax and employee-side deductions such as EPF and professional tax." },
      { q: "Is the new or old tax regime better?", a: "The new regime usually wins when your deductions are low. The old regime can win if you claim large deductions such as HRA, home loan interest and Section 80C. Use the India new vs old regime calculator to compare both on your numbers." },
      { q: "Does this calculator include professional tax?", a: "No. Professional tax differs by state (up to ₹2,500 per year in most states). Subtract it separately for an exact figure." },
      { q: "Are these rates updated for the 2026-27 budget?", a: "Yes. The Union Budget 2026 left the slabs unchanged for FY 2026-27, so the calculator uses the slabs and rebate announced in the previous budget." }
    ],
    taxTableTitle: "New regime slabs (FY 2026-27)",
    taxTable: rowsFromBrackets(IN_NEW, "en-IN", "₹"),
    deductionsExplained: [
      { name: "Income tax", text: "Calculated on taxable income after the standard deduction using progressive slabs, reduced by the Section 87A rebate." },
      { name: "Cess", text: "A 4% health and education cess is added on the income tax payable." },
      { name: "EPF", text: "Employees contribute 12% of basic pay to the Employees' Provident Fund. It is your savings, so it is deducted from in-hand pay but not lost." }
    ]
  },
  {
    code: "us", slug: "united-states", name: "United States", demonym: "American", currency: "USD", symbol: "$", locale: "en-US", region: "North America",
    taxYear: "2026 tax year", defaultSalary: 75000,
    salarySteps: [30000, 40000, 50000, 60000, 75000, 80000, 90000, 100000, 120000, 150000, 200000, 250000],
    title: "US Salary After Tax Calculator 2026 – Take-Home Pay",
    h1: "US Salary After Tax Calculator 2026",
    description: "Estimate your 2026 US take-home pay after federal income tax, Social Security and Medicare. Choose filing status, add a state tax rate and 401(k).",
    keywords: ["salary after tax calculator", "take home pay calculator usa", "paycheck calculator 2026", "federal income tax calculator", "net pay calculator", "fica tax calculator"],
    intro: [
      "This calculator estimates your 2026 take-home pay in the United States using the federal tax brackets from IRS Revenue Procedure 2025-32, the 2026 standard deduction and FICA payroll taxes. Pick your filing status, add a flat state tax estimate and an optional 401(k) contribution.",
      "Social Security tax of 6.2% applies to wages up to $184,500 in 2026 and Medicare tax of 1.45% applies to all wages, with an extra 0.9% above $200,000 for single filers."
    ],
    howItWorks: [
      "Subtract pre-tax 401(k) contributions and the 2026 standard deduction ($16,100 single, $32,200 married filing jointly, $24,150 head of household) from your gross pay.",
      "Apply the seven federal brackets from 10% to 37% to the remaining taxable income.",
      "Add FICA: 6.2% Social Security up to the wage base plus 1.45% Medicare.",
      "Add your state estimate, then subtract all of it from gross pay to find annual, monthly, bi-weekly and hourly take-home pay."
    ],
    faqs: [
      { q: "How much is $75,000 a year after taxes in the US?", a: "For a single filer with no state tax, 401(k) or credits, $75,000 leaves roughly $61,600 after federal income tax and FICA in 2026, about $5,130 per month. A state income tax lowers that figure." },
      { q: "What is the Social Security wage base for 2026?", a: "$184,500. Earnings above this amount are not subject to the 6.2% Social Security tax, although Medicare still applies." },
      { q: "Does this include state income tax?", a: "Only if you enter a flat state rate. Nine states have no wage income tax, while others use their own brackets, so treat the state line as an estimate." },
      { q: "Is this the same as my actual paycheck?", a: "It is an estimate. Your W-4, health insurance premiums, HSA and local taxes can change the final amount." }
    ],
    taxTableTitle: "2026 federal brackets — single filer",
    taxTable: rowsFromBrackets(US_BRACKETS.single, "en-US", "$"),
    deductionsExplained: [
      { name: "Federal income tax", text: "Progressive tax from 10% to 37% applied after the standard deduction." },
      { name: "Social Security", text: "6.2% of wages up to $184,500, matched by your employer." },
      { name: "Medicare", text: "1.45% of all wages plus a 0.9% additional Medicare tax above $200,000 (single)." }
    ]
  },
  {
    code: "uk", slug: "united-kingdom", name: "United Kingdom", demonym: "British", currency: "GBP", symbol: "£", locale: "en-GB", region: "Europe",
    taxYear: "2026/27 tax year", defaultSalary: 50000,
    salarySteps: [25000, 30000, 35000, 40000, 45000, 50000, 60000, 70000, 80000, 100000, 125000, 150000],
    title: "UK Take Home Pay Calculator 2026/27 – Salary After Tax",
    h1: "UK Salary After Tax Calculator 2026/27",
    description: "Work out your UK take-home pay for 2026/27 after income tax, National Insurance and pension. England, Wales and Northern Ireland rates with yearly, monthly and weekly results.",
    keywords: ["uk take home pay calculator", "salary after tax uk", "uk income tax calculator 2026/27", "national insurance calculator", "net salary calculator uk", "paye calculator"],
    intro: [
      "This UK take-home pay calculator uses the 2026/27 income tax and National Insurance rules for England, Wales and Northern Ireland. The personal allowance stays at £12,570, the basic rate is 20% up to £50,270 and the higher rate is 40% up to £125,140.",
      "Employee Class 1 National Insurance is 8% between £12,570 and £50,270 and 2% above that. Add a workplace pension percentage to see how it changes your net pay."
    ],
    howItWorks: [
      "Deduct pension contributions and your personal allowance (reduced by £1 for every £2 earned above £100,000).",
      "Apply 20%, 40% and 45% income tax bands to the remaining taxable income.",
      "Work out National Insurance on gross earnings: 8% on the main band and 2% above £50,270.",
      "Subtract tax, NI and pension from gross salary to get net annual, monthly, weekly and daily pay."
    ],
    faqs: [
      { q: "How much is £50,000 after tax in the UK?", a: "On a £50,000 salary with no pension, income tax is £7,486 and National Insurance is £2,994, leaving about £39,520 a year or £3,293 per month." },
      { q: "Why is the effective tax rate high between £100,000 and £125,140?", a: "The personal allowance is withdrawn at £1 for every £2 above £100,000. That creates an effective marginal income tax rate of 60% in this range." },
      { q: "Does this include Scottish tax rates?", a: "No. Scotland sets its own income tax bands, so results here apply to England, Wales and Northern Ireland." },
      { q: "Are student loan repayments included?", a: "Not in this version. Student loan deductions depend on your plan type and are taken in addition to tax and National Insurance." }
    ],
    taxTableTitle: "2026/27 income tax bands (rest of UK)",
    taxTable: [
      { range: "Up to £12,570 (Personal Allowance)", rate: "0%" },
      { range: "£12,571 – £50,270", rate: "20%" },
      { range: "£50,271 – £125,140", rate: "40%" },
      { range: "Over £125,140", rate: "45%" }
    ],
    deductionsExplained: [
      { name: "Income tax", text: "Charged at 20%, 40% or 45% on income above your personal allowance." },
      { name: "National Insurance", text: "Class 1 employee contributions of 8% and 2% that build your State Pension record." },
      { name: "Pension", text: "A percentage of salary paid into a workplace pension that reduces taxable pay." }
    ]
  },
  {
    code: "ca", slug: "canada", name: "Canada", demonym: "Canadian", currency: "CAD", symbol: "$", locale: "en-CA", region: "North America",
    taxYear: "2026 tax year", defaultSalary: 80000,
    salarySteps: [40000, 50000, 60000, 70000, 80000, 90000, 100000, 120000, 150000, 200000],
    title: "Canada Salary After Tax Calculator 2026 – Take-Home Pay",
    h1: "Canada Salary After Tax Calculator 2026",
    description: "Calculate your 2026 Canadian take-home pay after federal and provincial tax, CPP and EI. Includes Ontario and Alberta with the new 14% lowest federal rate.",
    keywords: ["canada salary calculator", "salary after tax canada", "take home pay calculator canada", "ontario tax calculator 2026", "alberta tax calculator", "cpp ei calculator"],
    intro: [
      "Estimate your 2026 Canadian net pay after federal tax, provincial tax, Canada Pension Plan contributions and Employment Insurance premiums. The lowest federal tax rate is now 14% on the first $58,523 of taxable income, and the federal basic personal amount is $16,452.",
      "Choose Ontario or Alberta to include the matching provincial brackets, basic personal amount and, for Ontario, the surtax and Health Premium."
    ],
    howItWorks: [
      "Deduct enhanced CPP and CPP2 contributions from income, then apply federal brackets from 14% to 33%.",
      "Subtract non-refundable credits: basic personal amount, Canada employment amount, base CPP and EI.",
      "Add provincial income tax with its own brackets and credits (plus Ontario surtax and Health Premium).",
      "Subtract CPP (5.95% up to $74,600 plus 4% CPP2 up to $85,000) and EI (1.63% up to $68,900) to reach net pay."
    ],
    faqs: [
      { q: "How much is $80,000 after tax in Ontario?", a: "Use the calculator with Ontario selected. At $80,000 you pay federal tax, Ontario tax, CPP and EI, leaving a little over $60,000 a year, which is about $5,000 a month." },
      { q: "What are the 2026 CPP and EI limits?", a: "CPP is 5.95% on earnings between $3,500 and $74,600, with CPP2 of 4% up to $85,000. EI is 1.63% up to $68,900, a maximum premium of $1,123.07." },
      { q: "Is Quebec included?", a: "Not yet. Quebec has its own income tax system, QPP and a lower EI rate, so use a Quebec-specific tool." },
      { q: "Does the calculator include RRSP deductions?", a: "No. RRSP contributions would lower your taxable income and increase your refund." }
    ],
    taxTableTitle: "2026 federal tax brackets",
    taxTable: rowsFromBrackets(CA_FED, "en-CA", "$"),
    deductionsExplained: [
      { name: "Federal & provincial tax", text: "Progressive income tax levied by both levels of government." },
      { name: "CPP / CPP2", text: "Mandatory pension contributions that build your retirement benefit." },
      { name: "EI", text: "Employment Insurance premiums that fund unemployment and parental benefits." }
    ]
  },
  {
    code: "au", slug: "australia", name: "Australia", demonym: "Australian", currency: "AUD", symbol: "A$", locale: "en-AU", region: "Oceania",
    taxYear: "2026-27 financial year", defaultSalary: 100000,
    salarySteps: [50000, 60000, 70000, 80000, 90000, 100000, 120000, 150000, 180000, 200000],
    title: "Australia Take Home Pay Calculator 2026-27 – After Tax",
    h1: "Australia Salary After Tax Calculator 2026-27",
    description: "Calculate your Australian take-home pay for 2026-27 using the new 15% tax rate, LITO and 2% Medicare levy. See the 12% employer super on top of your salary.",
    keywords: ["australia salary calculator", "take home pay calculator australia", "income tax calculator australia 2026-27", "salary after tax australia", "medicare levy calculator", "super guarantee calculator"],
    intro: [
      "This Australian pay calculator uses the 2026-27 resident tax rates, including the second tax rate cut from 16% to 15% that began on 1 July 2026. It applies the Low Income Tax Offset and the 2% Medicare levy to estimate your annual, monthly, fortnightly and weekly take-home pay.",
      "Your employer pays the 12% superannuation guarantee on top of your salary, so it is shown as an extra line rather than deducted from your take-home pay."
    ],
    howItWorks: [
      "Apply the resident rates: 0% to A$18,200, 15% to A$45,000, 30% to A$135,000, 37% to A$190,000 and 45% above.",
      "Subtract the Low Income Tax Offset (up to A$700) where it applies.",
      "Add the 2% Medicare levy, which phases in above A$28,011.",
      "Subtract tax and Medicare from gross pay to find your net salary."
    ],
    faqs: [
      { q: "How much tax do I pay on A$100,000 in Australia?", a: "In 2026-27 a resident on A$100,000 pays A$20,520 income tax plus A$2,000 Medicare levy, leaving A$77,480 or roughly A$6,457 a month." },
      { q: "Is superannuation taken out of my take-home pay?", a: "No. The 12% super guarantee is paid by your employer on top of your salary unless you salary sacrifice." },
      { q: "Does this include HECS-HELP or the Medicare Levy Surcharge?", a: "No. Add HELP repayments or the surcharge separately if they apply to you." },
      { q: "What changes in 2027?", a: "The 15% rate is legislated to fall to 14% from 1 July 2027." }
    ],
    taxTableTitle: "2026-27 resident tax rates",
    taxTable: rowsFromBrackets(AU, "en-AU", "A$"),
    deductionsExplained: [
      { name: "Income tax", text: "Progressive tax on taxable income, reduced by the Low Income Tax Offset." },
      { name: "Medicare levy", text: "2% of taxable income funding Australia's public health system." },
      { name: "Superannuation", text: "12% employer contribution paid into your super fund in addition to salary." }
    ]
  },
  {
    code: "sg", slug: "singapore", name: "Singapore", demonym: "Singaporean", currency: "SGD", symbol: "S$", locale: "en-SG", region: "Asia",
    taxYear: "YA 2026", defaultSalary: 96000,
    salarySteps: [36000, 48000, 60000, 72000, 84000, 96000, 120000, 150000, 200000, 300000],
    title: "Singapore Take Home Pay Calculator 2026 – CPF & Tax",
    h1: "Singapore Salary After Tax & CPF Calculator 2026",
    description: "Calculate Singapore take-home pay after CPF and income tax for YA 2026. Choose age band, switch CPF on or off for foreigners, and see monthly net salary.",
    keywords: ["singapore salary calculator", "take home pay singapore", "cpf calculator 2026", "singapore income tax calculator", "net salary singapore", "salary after cpf"],
    intro: [
      "Singapore has no payroll tax, but citizens and permanent residents pay employee CPF contributions and resident income tax. This calculator applies the S$8,000 monthly ordinary wage ceiling, the S$102,000 annual wage ceiling and the YA 2026 progressive rates from 0% to 24%.",
      "Foreigners on an Employment Pass or S Pass do not contribute to CPF, so switch CPF off to see their take-home pay."
    ],
    howItWorks: [
      "Work out employee CPF on wages up to S$102,000 a year using the rate for your age band (20% for ages 55 and below).",
      "Deduct CPF relief and S$1,000 earned income relief to find chargeable income.",
      "Apply the resident progressive tax rates.",
      "Subtract CPF and income tax from gross salary for your net pay."
    ],
    faqs: [
      { q: "How much CPF is deducted from my salary?", a: "Employees aged 55 and below pay 20% of wages, up to the S$8,000 monthly ceiling. That is a maximum of S$1,600 per month in 2026." },
      { q: "Do foreigners pay CPF?", a: "No. Work pass holders do not contribute to CPF, but they still pay income tax if they are tax residents." },
      { q: "How much income tax do I pay on S$96,000?", a: "After S$19,200 of CPF relief and S$1,000 earned income relief, chargeable income is about S$75,800, which gives income tax of roughly S$3,000." },
      { q: "Are bonuses included?", a: "Enter your total annual pay. CPF on bonuses follows the S$102,000 annual wage ceiling, which the calculator applies." }
    ],
    taxTableTitle: "YA 2026 resident tax rates",
    taxTable: rowsFromBrackets(SG, "en-SG", "S$"),
    deductionsExplained: [
      { name: "CPF", text: "Mandatory savings for retirement, housing and healthcare, split between you and your employer." },
      { name: "Income tax", text: "Progressive tax from 0% to 24% on chargeable income after reliefs." }
    ]
  },
  {
    code: "ae", slug: "uae", name: "United Arab Emirates", demonym: "Emirati", currency: "AED", symbol: "AED ", locale: "en-AE", region: "Middle East",
    taxYear: "2026", defaultSalary: 240000,
    salarySteps: [60000, 96000, 120000, 180000, 240000, 300000, 360000, 480000, 600000],
    title: "UAE Salary Calculator 2026 – Tax-Free Net Pay & Gratuity",
    h1: "UAE Salary Calculator — Tax-Free Take-Home Pay",
    description: "UAE salary calculator for 2026. There is no personal income tax, so see your gross-to-net pay, monthly breakdown and end-of-service gratuity.",
    keywords: ["uae salary calculator", "dubai salary calculator", "tax free salary uae", "uae net salary", "salary in dubai after tax", "uae gratuity calculator"],
    intro: [
      "The United Arab Emirates does not levy personal income tax on employment income, so your gross salary is your net salary. This calculator shows your yearly, monthly, weekly and daily pay in AED, and lets UAE nationals include their pension contribution.",
      "The real money question for UAE employees is end-of-service gratuity. Use the dedicated UAE gratuity calculator to estimate it from your basic salary and years of service."
    ],
    howItWorks: [
      "Enter your total monthly or annual salary in AED.",
      "UAE nationals can add their pension contribution rate; expats have no mandatory deduction.",
      "The result shows net pay across yearly, monthly, weekly, daily and hourly views.",
      "Open the gratuity calculator to estimate your end-of-service payout."
    ],
    faqs: [
      { q: "Is there income tax in the UAE?", a: "No. The UAE has no personal income tax on salary. Corporate tax of 9% applies to business profits above AED 375,000, and VAT is 5%." },
      { q: "How is UAE gratuity calculated?", a: "For the first five years you get 21 days of basic pay per year, and 30 days of basic pay for each year after that, capped at two years of total pay." },
      { q: "Do expats pay social security?", a: "No. Social security contributions apply only to UAE and GCC nationals." }
    ],
    taxTableTitle: "UAE personal income tax rates",
    taxTable: [{ range: "All employment income", rate: "0%" }],
    deductionsExplained: [
      { name: "Income tax", text: "There is no personal income tax on salary in the UAE." },
      { name: "Pension", text: "UAE nationals contribute to the pension authority; expats do not." }
    ]
  },
  {
    code: "ie", slug: "ireland", name: "Ireland", demonym: "Irish", currency: "EUR", symbol: "€", locale: "en-IE", region: "Europe",
    taxYear: "2026", defaultSalary: 55000,
    salarySteps: [30000, 40000, 50000, 55000, 60000, 70000, 80000, 100000, 120000, 150000],
    title: "Ireland Take Home Pay Calculator 2026 – PAYE, USC, PRSI",
    h1: "Ireland Salary After Tax Calculator 2026",
    description: "Calculate your Irish take-home pay for 2026 after PAYE income tax, USC and PRSI. Includes the €44,000 standard rate band and €4,000 tax credits.",
    keywords: ["ireland salary calculator", "take home pay ireland", "paye calculator ireland 2026", "usc calculator", "prsi calculator", "net salary ireland"],
    intro: [
      "Irish pay is reduced by three deductions: income tax at 20% and 40%, the Universal Social Charge and PRSI. This calculator applies the 2026 standard rate band of €44,000, the €2,000 personal and €2,000 employee tax credits, the 2026 USC bands and the 4.35% PRSI rate that began on 1 October 2026.",
      "Budget 2027 changes, including higher tax credits, take effect from January 2027."
    ],
    howItWorks: [
      "Tax income at 20% up to the standard rate band and 40% above it.",
      "Subtract tax credits from the tax due, never below zero.",
      "Add USC on a tiered scale from 0.5% to 8%.",
      "Add PRSI at 4.35% on all pay and subtract everything from gross."
    ],
    faqs: [
      { q: "How much is €55,000 after tax in Ireland?", a: "On €55,000, a single PAYE worker pays about €9,200 income tax after credits, €1,180 USC and €2,390 PRSI, leaving roughly €42,200 a year, or about €3,520 a month." },
      { q: "What is the 2026 standard rate band?", a: "€44,000 for a single person and €53,000 for a married couple with one income." },
      { q: "What are the USC rates?", a: "0.5% up to €12,012, 2% up to €28,700, 3% up to €70,044 and 8% above." },
      { q: "Why does PRSI show 4.35%?", a: "The employee Class A1 rate rose from 4.2% to 4.35% on 1 October 2026." }
    ],
    taxTableTitle: "2026 income tax (single person)",
    taxTable: [
      { range: "Up to €44,000", rate: "20%" },
      { range: "Over €44,000", rate: "40%" }
    ],
    deductionsExplained: [
      { name: "Income tax", text: "20% standard rate and 40% higher rate, reduced by tax credits." },
      { name: "USC", text: "A social charge on gross income with rates from 0.5% to 8%." },
      { name: "PRSI", text: "Social insurance of 4.35% that funds the State Pension and benefits." }
    ]
  }
];

export function shortYear(c: Country): string {
  return c.taxYear.replace(/ \(.*\)/, "").replace(/ (tax|financial) year/, "");
}

export function getCountry(slug: string): Country | undefined {
  return countries.find((c) => c.slug === slug);
}
export function getCountryByCode(code: CountryCode): Country {
  const c = countries.find((x) => x.code === code);
  if (!c) throw new Error(`Unknown country ${code}`);
  return c;
}

export function calculate(code: CountryCode, gross: number, o: Options = {}): TaxResult {
  switch (code) {
    case "in": return indiaTax({ gross, regime: o.regime ?? "new" });
    case "us": return usTax({ gross, status: o.status ?? "single", stateRate: o.stateRate ?? 0, retirementPercent: o.pensionPercent ?? 0 });
    case "uk": return ukTax({ gross, pensionPercent: o.pensionPercent ?? 0 });
    case "ca": return canadaTax({ gross, province: o.province ?? "ON" });
    case "au": return australiaTax({ gross });
    case "sg": return singaporeTax({ gross, age: o.age ?? "55", cpf: o.cpf ?? true });
    case "ae": return uaeTax({ gross, gpssaPercent: o.pensionPercent ?? 0 });
    case "ie": return irelandTax({ gross, status: o.marriedIe ? "married1" : "single" });
  }
}

export function money(n: number, c: Country, digits = 0): string {
  const s = new Intl.NumberFormat(c.locale, { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(Math.abs(n));
  return `${n < 0 ? "-" : ""}${c.symbol}${s}`;
}
export function pct(n: number, digits = 1): string {
  return `${(n * 100).toFixed(digits)}%`;
}

export { CA_ON, CA_AB, IN_OLD };
