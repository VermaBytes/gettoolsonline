import { type Bracket, type Line, type TaxResult, finish, progressive, marginalOf } from "./types";

/* ------------------------------------------------------------------ */
/* INDIA — FY 2026-27 (AY 2027-28)                                     */
/* ------------------------------------------------------------------ */
export const IN_NEW: Bracket[] = [
  { upTo: 400000, rate: 0 }, { upTo: 800000, rate: 0.05 }, { upTo: 1200000, rate: 0.10 },
  { upTo: 1600000, rate: 0.15 }, { upTo: 2000000, rate: 0.20 }, { upTo: 2400000, rate: 0.25 },
  { upTo: Infinity, rate: 0.30 }
];
export const IN_OLD: Bracket[] = [
  { upTo: 250000, rate: 0 }, { upTo: 500000, rate: 0.05 }, { upTo: 1000000, rate: 0.20 }, { upTo: Infinity, rate: 0.30 }
];

function inSurcharge(income: number, regime: "new" | "old"): number {
  if (income > 20000000) return regime === "old" ? 0.37 : 0.25;
  if (income > 10000000) return 0.15;
  if (income > 5000000) return 0.10;
  return 0;
}

export function indiaTax(opts: { gross: number; regime: "new" | "old"; epfPercentOfBasic?: number; basicPercent?: number; deductions80C?: number; otherDeductions?: number }): TaxResult {
  const { gross, regime } = opts;
  const basic = gross * (opts.basicPercent ?? 0.4);
  const epf = Math.min(basic, basic) * (opts.epfPercentOfBasic ?? 0.12);
  const stdDed = regime === "new" ? 75000 : 50000;
  let deductions = stdDed;
  if (regime === "old") deductions += Math.min(150000, (opts.deductions80C ?? 0) + epf) + (opts.otherDeductions ?? 0);
  const taxable = Math.max(0, gross - deductions);
  const slabs = regime === "new" ? IN_NEW : IN_OLD;
  let tax = progressive(taxable, slabs);
  const rebateLimit = regime === "new" ? 1200000 : 500000;
  const rebateMax = regime === "new" ? 60000 : 12500;
  if (taxable <= rebateLimit) tax = Math.max(0, tax - rebateMax);
  else if (regime === "new") {
    // marginal relief: tax cannot exceed income over 12L
    tax = Math.min(tax, taxable - rebateLimit);
  }
  const sur = tax > 0 ? inSurcharge(taxable, regime) : 0;
  const surcharge = tax * sur;
  const cess = (tax + surcharge) * 0.04;
  const lines: Line[] = [
    { label: "Income tax (after rebate)", amount: tax, kind: "tax" },
    { label: "Surcharge", amount: surcharge, kind: "tax" },
    { label: "Health & education cess (4%)", amount: cess, kind: "tax" },
    { label: "Employee EPF (12% of basic)", amount: epf, kind: "social" }
  ];
  const marg = marginalOf(taxable, slabs) * (1 + sur) * 1.04;
  return finish(gross, lines, marg, [
    `Assumes basic pay = ${Math.round((opts.basicPercent ?? 0.4) * 100)}% of CTC; employer EPF is part of CTC and is not shown here.`,
    regime === "new" ? "New regime: standard deduction ₹75,000, Section 87A rebate up to ₹60,000 for taxable income up to ₹12 lakh." : "Old regime: standard deduction ₹50,000, Section 80C (incl. EPF) up to ₹1.5 lakh."
  ]);
}

/* ------------------------------------------------------------------ */
/* UNITED STATES — 2026 federal + FICA + optional flat state rate     */
/* ------------------------------------------------------------------ */
export type UsStatus = "single" | "married" | "head";
export const US_STD: Record<UsStatus, number> = { single: 16100, married: 32200, head: 24150 };
export const US_BRACKETS: Record<UsStatus, Bracket[]> = {
  single: [
    { upTo: 12400, rate: 0.10 }, { upTo: 50400, rate: 0.12 }, { upTo: 105700, rate: 0.22 },
    { upTo: 201775, rate: 0.24 }, { upTo: 256225, rate: 0.32 }, { upTo: 640600, rate: 0.35 }, { upTo: Infinity, rate: 0.37 }
  ],
  married: [
    { upTo: 24800, rate: 0.10 }, { upTo: 100800, rate: 0.12 }, { upTo: 211400, rate: 0.22 },
    { upTo: 403550, rate: 0.24 }, { upTo: 512450, rate: 0.32 }, { upTo: 768700, rate: 0.35 }, { upTo: Infinity, rate: 0.37 }
  ],
  head: [
    { upTo: 17700, rate: 0.10 }, { upTo: 67450, rate: 0.12 }, { upTo: 105700, rate: 0.22 },
    { upTo: 201750, rate: 0.24 }, { upTo: 256200, rate: 0.32 }, { upTo: 640600, rate: 0.35 }, { upTo: Infinity, rate: 0.37 }
  ]
};

export function usTax(opts: { gross: number; status: UsStatus; stateRate?: number; retirementPercent?: number }): TaxResult {
  const { gross, status } = opts;
  const k401 = Math.min(gross * (opts.retirementPercent ?? 0), 24500);
  const taxable = Math.max(0, gross - k401 - US_STD[status]);
  const fed = progressive(taxable, US_BRACKETS[status]);
  const ss = Math.min(gross, 184500) * 0.062;
  const addlThreshold = status === "married" ? 250000 : 200000;
  const medicare = gross * 0.0145 + Math.max(0, gross - addlThreshold) * 0.009;
  const state = Math.max(0, gross - k401) * (opts.stateRate ?? 0);
  const lines: Line[] = [
    { label: "Federal income tax", amount: fed, kind: "tax" },
    { label: "Social Security (6.2%)", amount: ss, kind: "social" },
    { label: "Medicare (1.45% + 0.9% surtax)", amount: medicare, kind: "social" }
  ];
  if ((opts.stateRate ?? 0) > 0) lines.push({ label: `State income tax (~${((opts.stateRate ?? 0) * 100).toFixed(1)}% flat estimate)`, amount: state, kind: "tax" });
  if (k401 > 0) lines.push({ label: "401(k) contribution", amount: k401, kind: "other" });
  const marg = marginalOf(taxable, US_BRACKETS[status]) + (gross < 184500 ? 0.062 : 0) + 0.0145 + (opts.stateRate ?? 0);
  return finish(gross, lines, marg, [
    "Standard deduction applied. No credits, itemised deductions or local taxes included.",
    "State tax is a flat estimate that you choose — real state systems differ."
  ]);
}

/* ------------------------------------------------------------------ */
/* UNITED KINGDOM — 2026/27 England, Wales & NI                        */
/* ------------------------------------------------------------------ */
export function ukTax(opts: { gross: number; pensionPercent?: number }): TaxResult {
  const { gross } = opts;
  const pension = gross * (opts.pensionPercent ?? 0);
  const adjusted = gross - pension;
  let pa = 12570;
  if (adjusted > 100000) pa = Math.max(0, 12570 - (adjusted - 100000) / 2);
  const taxable = Math.max(0, adjusted - pa);
  const basicBand = 37700;
  let tax = 0;
  if (taxable <= basicBand) tax = taxable * 0.2;
  else if (taxable <= 125140 - 0) {
    // higher rate until 125,140 of gross-ish taxable (£112,570 taxable when PA is full)
    const higherLimit = 125140 - 12570;
    if (taxable <= higherLimit) tax = basicBand * 0.2 + (taxable - basicBand) * 0.4;
    else tax = basicBand * 0.2 + (higherLimit - basicBand) * 0.4 + (taxable - higherLimit) * 0.45;
  }
  if (taxable > 125140) {
    const higherLimit = 125140 - 12570;
    tax = basicBand * 0.2 + (higherLimit - basicBand) * 0.4 + (taxable - higherLimit) * 0.45;
  }
  // NI is on gross (relief-at-source pension assumed; salary sacrifice would lower NI too)
  const ni = Math.max(0, Math.min(gross, 50270) - 12570) * 0.08 + Math.max(0, gross - 50270) * 0.02;
  const lines: Line[] = [
    { label: "Income tax", amount: tax, kind: "tax" },
    { label: "National Insurance (Class 1)", amount: ni, kind: "social" }
  ];
  if (pension > 0) lines.push({ label: "Workplace pension", amount: pension, kind: "other" });
  let marg = 0.2 + 0.08;
  if (adjusted <= 12570) marg = 0;
  else if (adjusted > 125140) marg = 0.45 + 0.02;
  else if (adjusted > 100000) marg = 0.6 + 0.02;
  else if (adjusted > 50270) marg = 0.4 + 0.02;
  return finish(gross, lines, marg, [
    "Applies to England, Wales and Northern Ireland. Scotland has different income tax bands.",
    "Personal allowance £12,570 (tapered above £100,000). Student loans and benefits in kind not included."
  ]);
}

/* ------------------------------------------------------------------ */
/* CANADA — 2026 federal + Ontario / Alberta                           */
/* ------------------------------------------------------------------ */
export const CA_FED: Bracket[] = [
  { upTo: 58523, rate: 0.14 }, { upTo: 117045, rate: 0.205 }, { upTo: 181440, rate: 0.26 },
  { upTo: 258482, rate: 0.29 }, { upTo: Infinity, rate: 0.33 }
];
export const CA_ON: Bracket[] = [
  { upTo: 53891, rate: 0.0505 }, { upTo: 107785, rate: 0.0915 }, { upTo: 150000, rate: 0.1116 },
  { upTo: 220000, rate: 0.1216 }, { upTo: Infinity, rate: 0.1316 }
];
export const CA_AB: Bracket[] = [
  { upTo: 61200, rate: 0.08 }, { upTo: 154259, rate: 0.10 }, { upTo: 185111, rate: 0.12 },
  { upTo: 246813, rate: 0.13 }, { upTo: 370220, rate: 0.14 }, { upTo: Infinity, rate: 0.15 }
];
export type CaProvince = "ON" | "AB";

export function canadaTax(opts: { gross: number; province: CaProvince }): TaxResult {
  const { gross, province } = opts;
  // CPP / EI
  const cpp1 = Math.max(0, Math.min(gross, 74600) - 3500) * 0.0595;
  const cpp2 = Math.max(0, Math.min(gross, 85000) - 74600) * 0.04;
  const ei = Math.min(gross, 68900) * 0.0163;
  // Federal BPA phases from 16,452 down to 14,829 between 181,440 and 258,482
  let fedBpa = 16452;
  if (gross > 258482) fedBpa = 14829;
  else if (gross > 181440) fedBpa = 16452 - (16452 - 14829) * ((gross - 181440) / (258482 - 181440));
  const cppBase = Math.max(0, Math.min(gross, 74600) - 3500) * 0.0495; // base CPP => tax credit
  const cppEnhancedDeduction = cpp1 - cppBase + cpp2; // enhanced CPP + CPP2 => deduction
  const taxable = Math.max(0, gross - cppEnhancedDeduction);
  const cppCredit = cppBase;
  const fedCredits = (fedBpa + 1501 + 0) * 0.14 + (cppCredit + ei) * 0.14;
  const fed = Math.max(0, progressive(taxable, CA_FED) - fedCredits);
  let prov = 0;
  const lines: Line[] = [{ label: "Federal income tax", amount: fed, kind: "tax" }];
  if (province === "ON") {
    const bpa = 12989;
    const base = Math.max(0, progressive(taxable, CA_ON) - (bpa + cppCredit + ei) * 0.0505);
    const surtax = Math.max(0, base - 5818) * 0.2 + Math.max(0, base - 7446) * 0.36;
    let ohp = 0;
    const t = taxable;
    if (t > 200600) ohp = 900; else if (t > 200000) ohp = 750 + (t - 200000) * 0.25;
    else if (t > 72600) ohp = 750; else if (t > 72000) ohp = 600 + (t - 72000) * 0.25;
    else if (t > 48600) ohp = 600; else if (t > 48000) ohp = 450 + (t - 48000) * 0.25;
    else if (t > 38500) ohp = 450; else if (t > 36000) ohp = 300 + (t - 36000) * 0.06;
    else if (t > 25000) ohp = 300; else if (t > 20000) ohp = (t - 20000) * 0.06;
    prov = base + surtax;
    lines.push({ label: "Ontario income tax (incl. surtax)", amount: prov, kind: "tax" });
    lines.push({ label: "Ontario Health Premium", amount: ohp, kind: "tax" });
  } else {
    const bpa = 22769;
    prov = Math.max(0, progressive(taxable, CA_AB) - (bpa + cppCredit + ei) * 0.08);
    lines.push({ label: "Alberta income tax", amount: prov, kind: "tax" });
  }
  lines.push({ label: "CPP contributions (CPP + CPP2)", amount: cpp1 + cpp2, kind: "social" });
  lines.push({ label: "EI premiums (1.63%)", amount: ei, kind: "social" });
  const fedM = marginalOf(taxable, CA_FED);
  const provM = province === "ON" ? marginalOf(taxable, CA_ON) * 1.0 : marginalOf(taxable, CA_AB);
  return finish(gross, lines, fedM + provM, [
    province === "ON" ? "Ontario 2026: brackets, basic personal amount, surtax and Health Premium included." : "Alberta 2026: 8% bracket on the first ~$61,200 and higher basic personal amount included.",
    "Federal rate 14% on the first $58,523 from 2026. Outside Quebec. No RRSP deduction or other credits included."
  ]);
}

/* ------------------------------------------------------------------ */
/* AUSTRALIA — 2026-27                                                  */
/* ------------------------------------------------------------------ */
export const AU: Bracket[] = [
  { upTo: 18200, rate: 0 }, { upTo: 45000, rate: 0.15 }, { upTo: 135000, rate: 0.30 },
  { upTo: 190000, rate: 0.37 }, { upTo: Infinity, rate: 0.45 }
];
export function australiaTax(opts: { gross: number }): TaxResult {
  const { gross } = opts;
  const tax0 = progressive(gross, AU);
  let lito = 0;
  if (gross <= 37500) lito = 700;
  else if (gross <= 45000) lito = 700 - (gross - 37500) * 0.05;
  else if (gross <= 66667) lito = 325 - (gross - 45000) * 0.015;
  const tax = Math.max(0, tax0 - lito);
  let medicare = 0;
  if (gross > 35014) medicare = gross * 0.02;
  else if (gross > 28011) medicare = (gross - 28011) * 0.1;
  const super12 = gross * 0.12;
  const lines: Line[] = [
    { label: "Income tax (after LITO)", amount: tax, kind: "tax" },
    { label: "Medicare levy (2%)", amount: medicare, kind: "social" }
  ];
  const marg = marginalOf(gross, AU) + (gross > 35014 ? 0.02 : 0);
  return finish(gross, lines, marg, [
    `Employer super guarantee of 12% (about A$${Math.round(super12).toLocaleString("en-AU")}) is paid on top and is not deducted from take-home pay.`,
    "Resident rates for 2026-27: 15% on A$18,201–45,000 after the 1 July 2026 cut. No HELP debt or Medicare Levy Surcharge included."
  ]);
}

/* ------------------------------------------------------------------ */
/* SINGAPORE — YA 2026, citizens / PR                                   */
/* ------------------------------------------------------------------ */
export const SG: Bracket[] = [
  { upTo: 20000, rate: 0 }, { upTo: 30000, rate: 0.02 }, { upTo: 40000, rate: 0.035 }, { upTo: 80000, rate: 0.07 },
  { upTo: 120000, rate: 0.115 }, { upTo: 160000, rate: 0.15 }, { upTo: 200000, rate: 0.18 }, { upTo: 240000, rate: 0.19 },
  { upTo: 280000, rate: 0.195 }, { upTo: 320000, rate: 0.20 }, { upTo: 500000, rate: 0.22 }, { upTo: 1000000, rate: 0.23 },
  { upTo: Infinity, rate: 0.24 }
];
export type SgAge = "55" | "60" | "65" | "70" | "71";
export const SG_CPF: Record<SgAge, number> = { "55": 0.20, "60": 0.18, "65": 0.125, "70": 0.075, "71": 0.05 };
export function singaporeTax(opts: { gross: number; age?: SgAge; cpf?: boolean }): TaxResult {
  const { gross } = opts;
  const useCpf = opts.cpf !== false;
  const rate = SG_CPF[opts.age ?? "55"];
  const cpfBase = Math.min(gross, 102000);
  const cpf = useCpf ? cpfBase * rate : 0;
  const taxable = Math.max(0, gross - cpf - 1000);
  const tax = progressive(taxable, SG);
  const lines: Line[] = [{ label: "Income tax", amount: tax, kind: "tax" }];
  if (useCpf) lines.push({ label: `CPF employee contribution (${(rate * 100).toFixed(1).replace(".0", "")}%)`, amount: cpf, kind: "social" });
  return finish(gross, lines, marginalOf(taxable, SG), [
    "Assumes full-year employment income only; CPF capped at S$102,000 annual wages (S$8,000 monthly ordinary wage ceiling).",
    "Earned income relief S$1,000 and CPF relief applied. Foreigners do not pay CPF — switch CPF off to see that case."
  ]);
}

/* ------------------------------------------------------------------ */
/* UAE — no personal income tax                                        */
/* ------------------------------------------------------------------ */
export function uaeTax(opts: { gross: number; gpssaPercent?: number }): TaxResult {
  const { gross } = opts;
  const lines: Line[] = [];
  if ((opts.gpssaPercent ?? 0) > 0) lines.push({ label: "Pension contribution (UAE nationals)", amount: gross * (opts.gpssaPercent ?? 0), kind: "social" });
  return finish(gross, lines, 0, [
    "The UAE levies no personal income tax on salary. Expats have no mandatory social security deduction.",
    "UAE nationals contribute to the pension fund (GPSSA / ADRBF); enter your rate if that applies to you."
  ]);
}

/* ------------------------------------------------------------------ */
/* IRELAND — 2026                                                       */
/* ------------------------------------------------------------------ */
export function irelandTax(opts: { gross: number; status?: "single" | "married1" }): TaxResult {
  const { gross } = opts;
  const band = opts.status === "married1" ? 53000 : 44000;
  const credits = opts.status === "married1" ? 4000 + 2000 : 4000;
  const gt = Math.min(gross, band) * 0.2 + Math.max(0, gross - band) * 0.4;
  const incomeTax = Math.max(0, gt - credits);
  let usc = 0;
  if (gross > 13000) usc = Math.min(gross, 12012) * 0.005 + Math.max(0, Math.min(gross, 28700) - 12012) * 0.02 + Math.max(0, Math.min(gross, 70044) - 28700) * 0.03 + Math.max(0, gross - 70044) * 0.08;
  const prsiRate = 0.0435;
  const prsi = gross * prsiRate;
  const lines: Line[] = [
    { label: "Income tax (after credits)", amount: incomeTax, kind: "tax" },
    { label: "Universal Social Charge (USC)", amount: usc, kind: "tax" },
    { label: "PRSI (4.35%)", amount: prsi, kind: "social" }
  ];
  const marg = (gross > band ? 0.4 : 0.2) + (gross > 70044 ? 0.08 : gross > 28700 ? 0.03 : 0.02) + prsiRate;
  return finish(gross, lines, marg, [
    "PAYE employee with Personal and Employee tax credits (€2,000 each). Standard rate band €44,000 (single).",
    "PRSI at 4.35% (rate from 1 October 2026). Budget 2027 changes take effect from January 2027."
  ]);
}
