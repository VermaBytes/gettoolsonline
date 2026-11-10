"use client";
import { useState } from "react";
import { calculate, countries, getCountryByCode, money, type CountryCode } from "@/lib/countries";
import { Field, Num, Result, num } from "./shared";

export function SalaryRaiseTool() {
  const [code, setCode] = useState<CountryCode>("uk");
  const c = getCountryByCode(code);
  const [salary, setSalary] = useState("50000");
  const [raise, setRaise] = useState("10");
  const cur = num(salary);
  const next = cur * (1 + num(raise) / 100);
  const a = calculate(code, cur);
  const b = calculate(code, next);
  const gainNet = b.net - a.net;
  return (
    <div className="calc">
      <div className="calc-form">
        <Field id="c" label="Country">
          <select id="c" value={code} onChange={(e) => { const v = e.target.value as CountryCode; setCode(v); setSalary(String(getCountryByCode(v).defaultSalary)); }}>
            {countries.map((x) => <option key={x.code} value={x.code}>{x.name} ({x.currency})</option>)}
          </select>
        </Field>
        <Field id="s" label={`Current annual salary (${c.currency})`}><Num id="s" value={salary} onChange={setSalary} /></Field>
        <Field id="r" label="Raise %"><Num id="r" value={raise} onChange={setRaise} /></Field>
      </div>
      <Result label="Extra take-home per year" value={money(gainNet, c)} sub={`${money(gainNet / 12, c)} more per month · gross raise ${money(next - cur, c)}`}>
        <div className="views two">
          <div><small>Net before</small><b>{money(a.net, c)}</b></div>
          <div><small>Net after</small><b>{money(b.net, c)}</b></div>
          <div><small>New gross</small><b>{money(next, c)}</b></div>
          <div><small>Share of raise you keep</small><b>{next - cur > 0 ? ((gainNet / (next - cur)) * 100).toFixed(0) : 0}%</b></div>
        </div>
      </Result>
    </div>
  );
}
