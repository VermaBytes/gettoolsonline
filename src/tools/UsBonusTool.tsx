"use client";
import { useState } from "react";
import { usTax, type UsStatus } from "@/lib/tax/countries";
import { Field, Num, Result, fmt, num } from "./shared";

const usd = (n: number) => "$" + fmt(n, "en-US", 0);

export function UsBonusTool() {
  const [salary, setSalary] = useState("75000");
  const [bonus, setBonus] = useState("10000");
  const [status, setStatus] = useState<UsStatus>("single");
  const s = num(salary), b = num(bonus);
  const base = usTax({ gross: s, status });
  const withBonus = usTax({ gross: s + b, status });
  const aggregate = withBonus.lines[0].amount - base.lines[0].amount;
  const flatRate = b > 1000000 ? 0.37 : 0.22;
  const flat = b * flatRate;
  const fica = (withBonus.lines[1].amount + withBonus.lines[2].amount) - (base.lines[1].amount + base.lines[2].amount);
  const keep = b - aggregate - fica;
  return (
    <div className="calc">
      <div className="calc-form">
        <Field id="s" label="Annual salary ($)"><Num id="s" value={salary} onChange={setSalary} /></Field>
        <Field id="b" label="Bonus ($)"><Num id="b" value={bonus} onChange={setBonus} /></Field>
        <Field id="st" label="Filing status">
          <select id="st" value={status} onChange={(e) => setStatus(e.target.value as UsStatus)}>
            <option value="single">Single</option><option value="married">Married filing jointly</option><option value="head">Head of household</option>
          </select>
        </Field>
      </div>
      <Result label="You keep from your bonus" value={usd(keep)} sub={`${b > 0 ? ((keep / b) * 100).toFixed(1) : 0}% of ${usd(b)} after federal tax and FICA`}>
        <div className="views two">
          <div><small>Flat withholding ({flatRate * 100}%)</small><b>{usd(flat)}</b></div>
          <div><small>True federal tax on bonus</small><b>{usd(aggregate)}</b></div>
          <div><small>FICA on bonus</small><b>{usd(fica)}</b></div>
          <div><small>Any difference</small><b>{flat > aggregate ? "Refund at filing" : "Owe at filing"}</b></div>
        </div>
        <p className="note">State and local taxes are not included.</p>
      </Result>
    </div>
  );
}
