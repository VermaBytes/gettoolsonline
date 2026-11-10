"use client";
import { useState } from "react";
import { Field, Num, Result, fmt, num } from "./shared";

export function UaeGratuityTool() {
  const [basic, setBasic] = useState("10000");
  const [years, setYears] = useState("8");
  const [months, setMonths] = useState("0");
  const [misconduct, setMisconduct] = useState(false);
  const totalYears = num(years) + num(months) / 12;
  const daily = num(basic) / 30;
  let days = 0;
  if (totalYears >= 1) days = Math.min(totalYears, 5) * 21 + Math.max(0, totalYears - 5) * 30;
  let amount = misconduct ? 0 : days * daily;
  const cap = num(basic) * 24;
  const capped = amount > cap;
  if (capped) amount = cap;
  return (
    <div className="calc">
      <div className="calc-form">
        <Field id="b" label="Last monthly basic salary (AED)"><Num id="b" value={basic} onChange={setBasic} /></Field>
        <div className="field-row">
          <Field id="y" label="Years of service"><Num id="y" value={years} onChange={setYears} /></Field>
          <Field id="m" label="Extra months"><Num id="m" value={months} onChange={setMonths} /></Field>
        </div>
        <label className="check"><input type="checkbox" checked={misconduct} onChange={(e) => setMisconduct(e.target.checked)} /> Dismissed for serious misconduct (no gratuity)</label>
      </div>
      <Result label="Estimated end-of-service gratuity" value={"AED " + fmt(amount)} sub={totalYears < 1 ? "Minimum 1 year of service required" : `${fmt(days, "en-US", 1)} days of basic pay${capped ? " · capped at 2 years of pay" : ""}`}>
        <div className="views two">
          <div><small>Daily wage (basic ÷ 30)</small><b>AED {fmt(daily, "en-US", 2)}</b></div>
          <div><small>Cap (24 months of basic)</small><b>AED {fmt(cap)}</b></div>
        </div>
        <p className="note">Based on basic salary only, under UAE Federal Decree-Law 33 of 2021 for private-sector employees. Free-zone rules and contract terms may vary.</p>
      </Result>
    </div>
  );
}
