"use client";
import { useState } from "react";
import { SG_CPF, type SgAge } from "@/lib/tax/countries";
import { Field, Num, Result, fmt, num } from "./shared";

const EMPLOYER: Record<SgAge, number> = { "55": 0.17, "60": 0.16, "65": 0.125, "70": 0.09, "71": 0.075 };

export function SingaporeCpfTool() {
  const [salary, setSalary] = useState("6000");
  const [age, setAge] = useState<SgAge>("55");
  const wage = Math.min(num(salary), 8000);
  const ee = wage * SG_CPF[age];
  const er = wage * EMPLOYER[age];
  return (
    <div className="calc">
      <div className="calc-form">
        <Field id="s" label="Gross monthly salary (S$)"><Num id="s" value={salary} onChange={setSalary} /></Field>
        <Field id="ag" label="Age band">
          <select id="ag" value={age} onChange={(e) => setAge(e.target.value as SgAge)}>
            <option value="55">55 and below</option><option value="60">Above 55 to 60</option><option value="65">Above 60 to 65</option><option value="70">Above 65 to 70</option><option value="71">Above 70</option>
          </select>
        </Field>
      </div>
      <Result label="Monthly take-home before income tax" value={"S$" + fmt(num(salary) - ee, "en-SG", 2)} sub={`Employee CPF S$${fmt(ee, "en-SG", 2)}`}>
        <div className="views two">
          <div><small>Employee CPF</small><b>S${fmt(ee, "en-SG", 2)}</b></div>
          <div><small>Employer CPF</small><b>S${fmt(er, "en-SG", 2)}</b></div>
          <div><small>Total CPF credited</small><b>S${fmt(ee + er, "en-SG", 2)}</b></div>
          <div><small>Wage counted (cap S$8,000)</small><b>S${fmt(wage, "en-SG")}</b></div>
        </div>
      </Result>
    </div>
  );
}
