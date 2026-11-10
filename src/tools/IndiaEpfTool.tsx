"use client";
import { useState } from "react";
import { Field, Num, Result, fmt, num } from "./shared";

const inr = (n: number) => "₹" + fmt(n, "en-IN");

export function IndiaEpfTool() {
  const [basic, setBasic] = useState("50000");
  const [age, setAge] = useState("28");
  const [ret, setRet] = useState("58");
  const [bal, setBal] = useState("0");
  const [inc, setInc] = useState("6");
  const [rate, setRate] = useState("8.25");
  let balance = num(bal), monthly = num(basic), contributed = 0;
  const years = Math.max(0, num(ret) - num(age));
  const r = num(rate) / 100 / 12;
  for (let y = 0; y < years; y++) {
    for (let m = 0; m < 12; m++) {
      const employee = monthly * 0.12;
      const employer = monthly * 0.12 - Math.min(monthly, 15000) * 0.0833;
      balance = (balance + employee + employer) * (1 + r);
      contributed += employee + employer;
    }
    monthly *= 1 + num(inc) / 100;
  }
  return (
    <div className="calc">
      <div className="calc-form">
        <Field id="b" label="Monthly basic + DA (₹)"><Num id="b" value={basic} onChange={setBasic} /></Field>
        <div className="field-row">
          <Field id="a" label="Current age"><Num id="a" value={age} onChange={setAge} /></Field>
          <Field id="r" label="Retirement age"><Num id="r" value={ret} onChange={setRet} /></Field>
        </div>
        <Field id="bal" label="Current EPF balance (₹)"><Num id="bal" value={bal} onChange={setBal} /></Field>
        <div className="field-row">
          <Field id="i" label="Yearly increment %"><Num id="i" value={inc} onChange={setInc} /></Field>
          <Field id="ra" label="Interest rate %"><Num id="ra" value={rate} onChange={setRate} /></Field>
        </div>
      </div>
      <Result label="Projected EPF corpus" value={inr(balance)} sub={`After ${years} years of service`}>
        <div className="views two">
          <div><small>Total contributed</small><b>{inr(contributed + num(bal))}</b></div>
          <div><small>Interest earned</small><b>{inr(Math.max(0, balance - contributed - num(bal)))}</b></div>
        </div>
        <p className="note">Estimate only. Interest is credited annually by EPFO; the rate changes every year.</p>
      </Result>
    </div>
  );
}
