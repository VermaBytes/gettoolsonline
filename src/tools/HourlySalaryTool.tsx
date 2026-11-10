"use client";
import { useState } from "react";
import { Field, Num, Result, fmt, num } from "./shared";

export function HourlySalaryTool() {
  const [mode, setMode] = useState<"h2s" | "s2h">("h2s");
  const [rate, setRate] = useState("25");
  const [annual, setAnnual] = useState("52000");
  const [hours, setHours] = useState("40");
  const [weeks, setWeeks] = useState("52");
  const hw = num(hours) * num(weeks);
  const yearly = mode === "h2s" ? num(rate) * hw : num(annual);
  const hourly = mode === "h2s" ? num(rate) : hw > 0 ? num(annual) / hw : 0;
  return (
    <div className="calc">
      <div className="calc-form">
        <div className="seg" role="tablist" aria-label="Conversion direction">
          <button type="button" className={mode === "h2s" ? "on" : ""} onClick={() => setMode("h2s")}>Hourly → Salary</button>
          <button type="button" className={mode === "s2h" ? "on" : ""} onClick={() => setMode("s2h")}>Salary → Hourly</button>
        </div>
        {mode === "h2s" ? <Field id="r" label="Hourly rate"><Num id="r" value={rate} onChange={setRate} /></Field> : <Field id="a" label="Annual salary"><Num id="a" value={annual} onChange={setAnnual} /></Field>}
        <div className="field-row">
          <Field id="h" label="Hours per week"><Num id="h" value={hours} onChange={setHours} /></Field>
          <Field id="w" label="Weeks per year"><Num id="w" value={weeks} onChange={setWeeks} /></Field>
        </div>
      </div>
      <Result label={mode === "h2s" ? "Annual salary" : "Hourly rate"} value={fmt(mode === "h2s" ? yearly : hourly, "en-US", 2)} sub="Before tax, in your own currency">
        <div className="views">
          <div><small>Yearly</small><b>{fmt(yearly)}</b></div>
          <div><small>Monthly</small><b>{fmt(yearly / 12)}</b></div>
          <div><small>Weekly</small><b>{fmt(num(weeks) > 0 ? yearly / num(weeks) : 0)}</b></div>
          <div><small>Daily (5-day)</small><b>{fmt(num(weeks) > 0 ? yearly / (num(weeks) * 5) : 0, "en-US", 2)}</b></div>
          <div><small>Hourly</small><b>{fmt(hourly, "en-US", 2)}</b></div>
        </div>
      </Result>
    </div>
  );
}
