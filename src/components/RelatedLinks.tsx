import Link from "next/link";
import { countries, type CountryCode } from "@/lib/countries";
import { tools } from "@/lib/site";
import { Flag } from "./Flag";

const toolsFor: Record<CountryCode, string[]> = {
  in: ["india-new-vs-old-tax-regime-calculator", "india-epf-calculator", "salary-raise-calculator"],
  us: ["us-bonus-tax-calculator", "hourly-to-salary-calculator", "salary-raise-calculator"],
  uk: ["salary-raise-calculator", "hourly-to-salary-calculator"],
  ca: ["salary-raise-calculator", "hourly-to-salary-calculator"],
  au: ["salary-raise-calculator", "hourly-to-salary-calculator"],
  sg: ["singapore-cpf-calculator", "salary-raise-calculator"],
  ae: ["uae-gratuity-calculator", "salary-raise-calculator"],
  ie: ["salary-raise-calculator", "hourly-to-salary-calculator"]
};

export function RelatedLinks({ code }: { code: CountryCode }) {
  const t = toolsFor[code].map((s) => tools.find((x) => x.slug === s)).filter((x): x is NonNullable<typeof x> => Boolean(x));
  return (
    <section className="content-block related">
      <h2>Related tools</h2>
      <div className="link-grid">{t.map((x) => <Link key={x.slug} href={`/tools/${x.slug}`}><Flag code={x.flag} size={28} /><b>{x.name}</b><span>{x.short}</span></Link>)}</div>
      <h2>Salary calculators for other countries</h2>
      <div className="chip-row">{countries.filter((c) => c.code !== code).map((c) => <Link key={c.code} href={`/salary-calculator/${c.slug}`}><Flag code={c.code} size={18} /> {c.name}</Link>)}</div>
    </section>
  );
}
