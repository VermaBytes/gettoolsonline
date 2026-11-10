"use client";
import { type ReactNode } from "react";

export function Field({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return <div className="field"><label htmlFor={id}>{label}</label>{children}</div>;
}
export function Num({ id, value, onChange, step }: { id: string; value: string; onChange: (v: string) => void; step?: string }) {
  return <input id={id} inputMode="decimal" step={step} value={value} onChange={(e) => onChange(e.target.value.replace(/[^0-9.]/g, ""))} />;
}
export function Result({ label, value, sub, children }: { label: string; value: string; sub?: string; children?: ReactNode }) {
  return (
    <div className="calc-result" aria-live="polite">
      <div className="net-hero"><span className="net-label">{label}</span><strong>{value}</strong>{sub && <span className="net-sub">{sub}</span>}</div>
      {children}
    </div>
  );
}
export const fmt = (n: number, locale = "en-US", d = 0) => new Intl.NumberFormat(locale, { maximumFractionDigits: d, minimumFractionDigits: d }).format(n);
export const num = (s: string) => { const n = Number(s); return Number.isFinite(n) ? n : 0; };
