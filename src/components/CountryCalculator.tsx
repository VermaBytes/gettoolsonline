"use client";
import { useMemo, useState } from "react";
import { calculate, getCountryByCode, money, pct, type CountryCode, type Options } from "@/lib/countries";

type Period = "year" | "month" | "week" | "day" | "hour";
const periodDiv: Record<Period, number> = { year: 1, month: 12, week: 52, day: 260, hour: 2080 };

export function CountryCalculator({ code, initial }: { code: CountryCode; initial?: number }) {
  const c = getCountryByCode(code);
  const [period, setPeriod] = useState<Period>("year");
  const [value, setValue] = useState(String(initial ?? c.defaultSalary));
  const [opts, setOpts] = useState<Options>({ regime: "new", status: "single", province: "ON", age: "55", cpf: true, stateRate: 0, pensionPercent: 0, marriedIe: false });
  const set = (patch: Partial<Options>) => setOpts((o) => ({ ...o, ...patch }));

  const annual = useMemo(() => {
    const n = Number(value.replace(/,/g, ""));
    return Number.isFinite(n) && n > 0 ? n * periodDiv[period] : 0;
  }, [value, period]);
  const r = useMemo(() => (annual > 0 ? calculate(code, annual, opts) : null), [annual, code, opts]);

  const views: { label: string; div: number }[] = [
    { label: "Yearly", div: 1 }, { label: "Monthly", div: 12 }, { label: "Weekly", div: 52 }, { label: "Daily", div: 260 }, { label: "Hourly", div: 2080 }
  ];
  const kindColor = { tax: "#e5484d", social: "#f5a524", other: "#8b5cf6" } as const;

  return (
    <div className="calc">
      <div className="calc-form">
        <div className="field">
          <label htmlFor={`gross-${code}`}>{code === "in" ? "Salary / CTC" : "Gross salary"} ({c.currency})</label>
          <div className="input-row">
            <input id={`gross-${code}`} inputMode="decimal" value={value} onChange={(e) => setValue(e.target.value.replace(/[^0-9.,]/g, ""))} />
            <select aria-label="Pay period" value={period} onChange={(e) => setPeriod(e.target.value as Period)}>
              <option value="year">per year</option><option value="month">per month</option><option value="week">per week</option><option value="day">per day</option><option value="hour">per hour</option>
            </select>
          </div>
        </div>

        {code === "in" && (
          <div className="field"><label htmlFor="regime">Tax regime</label>
            <select id="regime" value={opts.regime} onChange={(e) => set({ regime: e.target.value as "new" | "old" })}>
              <option value="new">New regime (default)</option><option value="old">Old regime (80C incl. EPF)</option>
            </select></div>
        )}
        {code === "us" && (<>
          <div className="field"><label htmlFor="status">Filing status</label>
            <select id="status" value={opts.status} onChange={(e) => set({ status: e.target.value as Options["status"] })}>
              <option value="single">Single</option><option value="married">Married filing jointly</option><option value="head">Head of household</option>
            </select></div>
          <div className="field-row">
            <div className="field"><label htmlFor="st">State tax rate %</label><input id="st" inputMode="decimal" value={String((opts.stateRate ?? 0) * 100)} onChange={(e) => set({ stateRate: Math.max(0, Number(e.target.value) || 0) / 100 })} /></div>
            <div className="field"><label htmlFor="k">401(k) %</label><input id="k" inputMode="decimal" value={String((opts.pensionPercent ?? 0) * 100)} onChange={(e) => set({ pensionPercent: Math.min(100, Math.max(0, Number(e.target.value) || 0)) / 100 })} /></div>
          </div>
        </>)}
        {code === "uk" && (
          <div className="field"><label htmlFor="pen">Workplace pension %</label><input id="pen" inputMode="decimal" value={String((opts.pensionPercent ?? 0) * 100)} onChange={(e) => set({ pensionPercent: Math.min(100, Math.max(0, Number(e.target.value) || 0)) / 100 })} /></div>
        )}
        {code === "ca" && (
          <div className="field"><label htmlFor="prov">Province</label>
            <select id="prov" value={opts.province} onChange={(e) => set({ province: e.target.value as Options["province"] })}>
              <option value="ON">Ontario</option><option value="AB">Alberta</option>
            </select></div>
        )}
        {code === "sg" && (<>
          <div className="field"><label htmlFor="age">Age band</label>
            <select id="age" value={opts.age} onChange={(e) => set({ age: e.target.value as Options["age"] })}>
              <option value="55">55 and below</option><option value="60">Above 55 to 60</option><option value="65">Above 60 to 65</option><option value="70">Above 65 to 70</option><option value="71">Above 70</option>
            </select></div>
          <label className="check"><input type="checkbox" checked={opts.cpf} onChange={(e) => set({ cpf: e.target.checked })} /> Citizen / PR (pay CPF)</label>
        </>)}
        {code === "ae" && (
          <div className="field"><label htmlFor="gp">Pension % (UAE nationals only)</label><input id="gp" inputMode="decimal" value={String((opts.pensionPercent ?? 0) * 100)} onChange={(e) => set({ pensionPercent: Math.min(100, Math.max(0, Number(e.target.value) || 0)) / 100 })} /></div>
        )}
        {code === "ie" && (
          <label className="check"><input type="checkbox" checked={opts.marriedIe} onChange={(e) => set({ marriedIe: e.target.checked })} /> Married / civil partner, one income</label>
        )}
      </div>

      <div className="calc-result" aria-live="polite">
        {r ? (<>
          <div className="net-hero">
            <span className="net-label">Take-home pay · {c.taxYear}</span>
            <strong>{money(r.net, c)}</strong>
            <span className="net-sub">per year · {money(r.net / 12, c)} per month · keeps {pct(1 - r.effectiveRate)}</span>
          </div>
          <div className="bar" role="img" aria-label="Share of gross pay">
            <span style={{ width: `${(r.net / r.gross) * 100}%`, background: "#18a96b" }} />
            {r.lines.map((l) => <span key={l.label} style={{ width: `${(l.amount / r.gross) * 100}%`, background: kindColor[l.kind] }} />)}
          </div>
          <div className="views">
            {views.map((v) => (<div key={v.label}><small>{v.label}</small><b>{money(r.net / v.div, c, v.div >= 52 ? 2 : 0)}</b></div>))}
          </div>
          <table className="breakdown">
            <tbody>
              <tr><th>Gross pay</th><td>{money(r.gross, c)}</td><td>100%</td></tr>
              {r.lines.map((l) => (<tr key={l.label}><th><i style={{ background: kindColor[l.kind] }} />{l.label}</th><td>−{money(l.amount, c)}</td><td>{pct(l.amount / r.gross)}</td></tr>))}
              <tr className="total"><th>Net pay</th><td>{money(r.net, c)}</td><td>{pct(r.net / r.gross)}</td></tr>
            </tbody>
          </table>
          <div className="chips"><span>Average tax rate <b>{pct(r.effectiveRate)}</b></span><span>Marginal rate <b>{pct(r.marginalRate)}</b></span></div>
          {r.notes?.map((n) => <p key={n} className="note">{n}</p>)}
        </>) : <p className="note">Enter a salary greater than zero to see your take-home pay.</p>}
      </div>
    </div>
  );
}
