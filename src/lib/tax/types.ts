export type Line = { label: string; amount: number; kind: "tax" | "social" | "other" };

export type TaxResult = {
  gross: number;
  net: number;
  totalDeductions: number;
  effectiveRate: number;
  marginalRate: number;
  lines: Line[];
  notes?: string[];
};

export type Bracket = { upTo: number; rate: number };

/** Progressive tax over brackets. upTo = Infinity for the last bracket. */
export function progressive(income: number, brackets: Bracket[]): number {
  let prev = 0;
  let tax = 0;
  for (const b of brackets) {
    if (income <= prev) break;
    const slice = Math.min(income, b.upTo) - prev;
    tax += slice * b.rate;
    prev = b.upTo;
  }
  return tax;
}

export function marginalOf(income: number, brackets: Bracket[]): number {
  for (const b of brackets) {
    if (income < b.upTo) return b.rate;
  }
  return brackets[brackets.length - 1].rate;
}

export function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function finish(gross: number, lines: Line[], marginalRate: number, notes?: string[]): TaxResult {
  const clean = lines.map((l) => ({ ...l, amount: round2(Math.max(0, l.amount)) }));
  const totalDeductions = round2(clean.reduce((s, l) => s + l.amount, 0));
  const net = round2(gross - totalDeductions);
  return {
    gross,
    net,
    totalDeductions,
    effectiveRate: gross > 0 ? totalDeductions / gross : 0,
    marginalRate,
    lines: clean,
    notes
  };
}
