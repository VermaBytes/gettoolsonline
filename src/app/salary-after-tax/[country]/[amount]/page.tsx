import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { countries, getCountry, calculate, money, pct, shortYear } from "@/lib/countries";
import { siteConfig } from "@/lib/site";
import { CountryCalculator } from "@/components/CountryCalculator";
import { SalaryTable } from "@/components/SalaryTable";
import { RelatedLinks } from "@/components/RelatedLinks";
import { Faq, faqSchema, crumbSchema } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { Flag } from "@/components/Flag";
import { taxSourceNotes } from "@/lib/tax-source-notes";
import { INDEX_SALARY_AFTER_TAX_PAGES } from "@/lib/seo-flags";

export function generateStaticParams() {
  return countries.flatMap((c) => c.salarySteps.map((s) => ({ country: c.slug, amount: String(s) })));
}
export const dynamicParams = false;

function lakh(n: number): string {
  if (n >= 10000000) return `${n / 10000000} crore`;
  if (n >= 100000) return `${n / 100000} lakh`;
  return n.toLocaleString("en-IN");
}
function label(c: ReturnType<typeof getCountry>, n: number): string {
  if (!c) return String(n);
  return c.code === "in" ? `₹${lakh(n)}` : money(n, c);
}

export async function generateMetadata({ params }: { params: Promise<{ country: string; amount: string }> }): Promise<Metadata> {
  const { country, amount } = await params;
  const c = getCountry(country);
  const n = Number(amount);
  if (!c || !c.salarySteps.includes(n)) return {};
  const r = calculate(c.code, n);
  const url = `${siteConfig.url}/salary-after-tax/${c.slug}/${n}`;
  const title = `${label(c, n)} Salary After Tax in ${c.name} (${shortYear(c)}) – ${money(r.net / 12, c)}/Month`;
  const description = `A ${label(c, n)} salary in ${c.name} leaves ${money(r.net, c)} a year (${money(r.net / 12, c)} per month) after tax and deductions — an average tax rate of ${pct(r.effectiveRate)}. See the full breakdown.`;
  return { title, description, alternates: { canonical: url }, robots: { index: INDEX_SALARY_AFTER_TAX_PAGES, follow: true }, openGraph: { type: "article", url, title, description, siteName: siteConfig.name }, keywords: [`${label(c, n)} salary after tax ${c.name}`, `${label(c, n)} take home pay`, `${label(c, n)} in hand salary`, ...c.keywords.slice(0, 3)] };
}

export default async function AmountPage({ params }: { params: Promise<{ country: string; amount: string }> }) {
  const { country, amount } = await params;
  const c = getCountry(country);
  const n = Number(amount);
  if (!c || !c.salarySteps.includes(n)) notFound();
  const r = calculate(c.code, n);
  const sourceNote = taxSourceNotes[c.code];
  const url = `${siteConfig.url}/salary-after-tax/${c.slug}/${n}`;
  const L = label(c, n);
  const faqs = [
    { q: `How much is ${L} after tax in ${c.name}?`, a: `Under ${c.taxYear} rules, ${L} gross leaves ${money(r.net, c)} per year, which is ${money(r.net / 12, c)} per month, ${money(r.net / 52, c)} per week and about ${money(r.net / 2080, c, 2)} per hour. Total deductions are ${money(r.totalDeductions, c)} (${pct(r.effectiveRate)}).` },
    { q: `What is the marginal tax rate on ${L}?`, a: `Your next ${c.symbol.trim()}1 of income is taxed at about ${pct(r.marginalRate)} including social contributions, so a raise is worth less than its headline amount.` },
    ...c.faqs.slice(0, 2)
  ];
  return (
    <main className="page">
      <JsonLd data={[faqSchema(faqs), crumbSchema([{ name: "Home", url: siteConfig.url }, { name: c.name, url: `${siteConfig.url}/salary-calculator/${c.slug}` }, { name: L, url }])]} />
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link> / <Link href={`/salary-calculator/${c.slug}`}>{c.name} salary calculator</Link> / <span>{L}</span></nav>
        <h1 className="page-title title-flag"><Flag code={c.code} size={36} /> {L} Salary After Tax in {c.name}</h1>
        <p className="page-lede">{c.taxYear} · Monthly take-home, tax breakdown and a calculator you can edit.</p>

        <div className="stat-cards">
          <div><small>Net per year</small><b>{money(r.net, c)}</b></div>
          <div><small>Net per month</small><b>{money(r.net / 12, c)}</b></div>
          <div><small>Total deductions</small><b>{money(r.totalDeductions, c)}</b></div>
          <div><small>Average tax rate</small><b>{pct(r.effectiveRate)}</b></div>
        </div>

        <CountryCalculator code={c.code} initial={n} />

        <article className="content-block">
          <h2>{L} salary breakdown</h2>
          <p>If you earn {L} a year in {c.name}, your take-home pay is {money(r.net, c)} after {r.lines.map((l) => l.label.toLowerCase()).join(", ")}. That works out to {money(r.net / 12, c)} each month, or {money(r.net / 26, c)} every two weeks.</p>
          <div className="table-wrap"><table className="salary-table"><thead><tr><th>Item</th><th>Annual</th><th>Monthly</th><th>% of gross</th></tr></thead><tbody>
            <tr><td>Gross salary</td><td>{money(r.gross, c)}</td><td>{money(r.gross / 12, c)}</td><td>100%</td></tr>
            {r.lines.map((l) => <tr key={l.label}><td>{l.label}</td><td>−{money(l.amount, c)}</td><td>−{money(l.amount / 12, c)}</td><td>{pct(l.amount / r.gross)}</td></tr>)}
            <tr className="current"><td>Net pay</td><td>{money(r.net, c)}</td><td>{money(r.net / 12, c)}</td><td>{pct(r.net / r.gross)}</td></tr>
          </tbody></table></div>
          {r.notes?.map((x) => <p key={x} className="note">{x}</p>)}
        </article>

        <section className="content-block"><h2>Compare other salaries in {c.name}</h2><SalaryTable c={c} current={n} /></section>
        <Faq items={faqs} />
        <RelatedLinks code={c.code} />
        <p className="note"><strong>Official source:</strong> {sourceNote.officialSource}<br/><strong>Data checked:</strong> {sourceNote.dataChecked}</p>
        <p className="disclaimer">Estimate for a standard employee. Not tax advice. <Link href={`/salary-calculator/${c.slug}`}>Open the full {c.name} salary calculator</Link>.</p>
      </div>
    </main>
  );
}
