import Link from "next/link";
import { calculate, money, pct, type Country } from "@/lib/countries";

export function SalaryTable({ c, current }: { c: Country; current?: number }) {
  return (
    <div className="table-wrap">
      <table className="salary-table">
        <thead><tr><th>Gross salary</th><th>Net per year</th><th>Net per month</th><th>Avg. tax rate</th></tr></thead>
        <tbody>
          {c.salarySteps.map((s) => {
            const r = calculate(c.code, s);
            return (
              <tr key={s} className={s === current ? "current" : ""}>
                <td><Link href={`/salary-after-tax/${c.slug}/${s}`}>{money(s, c)}</Link></td>
                <td>{money(r.net, c)}</td><td>{money(r.net / 12, c)}</td><td>{pct(r.effectiveRate)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
