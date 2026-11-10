"use client";
import { useState } from "react";
import { indiaTax } from "@/lib/tax/countries";
import { Field, Num, Result, fmt, num } from "./shared";

const inr = (n: number) => "₹" + fmt(n, "en-IN");

export function IndiaRegimeTool() {
  const [gross, setGross] = useState("1800000");
  const [ded, setDed] = useState("350000");
  const g = num(gross);
  const nw = indiaTax({ gross: g, regime: "new" });
  const od = indiaTax({ gross: g, regime: "old", otherDeductions: num(ded), deductions80C: 0 });
  const taxNew = nw.lines[0].amount + nw.lines[1].amount + nw.lines[2].amount;
  const taxOld = od.lines[0].amount + od.lines[1].amount + od.lines[2].amount;
  const better = taxNew <= taxOld ? "New regime" : "Old regime";
  const saving = Math.abs(taxNew - taxOld);
  return (
    <div className="calc">
      <div className="calc-form">
        <Field id="g" label="Annual gross salary / CTC (₹)"><Num id="g" value={gross} onChange={setGross} /></Field>
        <Field id="d" label="Old-regime deductions (80C, 80D, HRA, home loan…) (₹)"><Num id="d" value={ded} onChange={setDed} /></Field>
        <p className="note">EPF at 12% of a 40% basic is counted toward the ₹1.5 lakh 80C limit in the old regime.</p>
      </div>
      <Result label="Better for you" value={better} sub={`Saves ${inr(saving)} in tax per year`}>
        <div className="views two">
          <div><small>New regime tax</small><b>{inr(taxNew)}</b></div>
          <div><small>Old regime tax</small><b>{inr(taxOld)}</b></div>
          <div><small>New in-hand / month</small><b>{inr(nw.net / 12)}</b></div>
          <div><small>Old in-hand / month</small><b>{inr(od.net / 12)}</b></div>
        </div>
      </Result>
    </div>
  );
}
