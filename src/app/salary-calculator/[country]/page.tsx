import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { countries, getCountry, calculate, money, pct } from "@/lib/countries";
import { siteConfig } from "@/lib/site";
import { CountryCalculator } from "@/components/CountryCalculator";
import { SalaryTable } from "@/components/SalaryTable";
import { RelatedLinks } from "@/components/RelatedLinks";
import { Faq, faqSchema, crumbSchema } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { Flag } from "@/components/Flag";
import { taxSourceNotes } from "@/lib/tax-source-notes";

export function generateStaticParams() {
  return countries.map((c) => ({ country: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
  const { country } = await params;
  const c = getCountry(country);
  if (!c) return {};
  const url = `${siteConfig.url}/salary-calculator/${c.slug}`;
  return {
    title: c.title,
    description: c.description,
    keywords: c.keywords,
    alternates: { canonical: url },
    openGraph: { type: "website", url, title: c.title, description: c.description, siteName: siteConfig.name },
    twitter: { card: "summary", title: c.title, description: c.description }
  };
}

export default async function CountryPage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  const c = getCountry(country);
  if (!c) notFound();
  const url = `${siteConfig.url}/salary-calculator/${c.slug}`;
  const sample = calculate(c.code, c.defaultSalary);
  const sourceNote = taxSourceNotes[c.code];
  const app = {
    "@context": "https://schema.org", "@type": "WebApplication", name: c.h1, url,
    applicationCategory: "FinanceApplication", operatingSystem: "Any", inLanguage: "en",
    offers: { "@type": "Offer", price: "0", priceCurrency: c.currency },
    description: c.description, areaServed: c.name
  };
  return (
    <main className="page">
      <JsonLd data={[app, faqSchema(c.faqs), crumbSchema([{ name: "Home", url: siteConfig.url }, { name: "Salary calculators", url: `${siteConfig.url}/#countries` }, { name: c.name, url }])]} />
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link> / <Link href="/#countries">Salary calculators</Link> / <span>{c.name}</span></nav>
        <h1 className="page-title title-flag"><Flag code={c.code} size={36} /> {c.h1}</h1>
        <p className="page-lede">{c.taxYear} · Free, instant and private. Nothing you type leaves your browser.</p>
        <CountryCalculator code={c.code} />

        <article className="content-block">
          {c.intro.map((p) => <p key={p}>{p}</p>)}
        </article>

        <section className="content-block">
          <h2>Worked example for {c.name}</h2>
          <p>Using the sample gross salary of {money(c.defaultSalary, c)} and the calculator’s current assumptions, the estimated result is <strong>{money(sample.net, c)}</strong> per year, or {money(sample.net / 12, c)} per month, after the modeled deductions. The effective rate shown is {pct(sample.effectiveRate)}. This is an illustration produced from the current country data, not a quote or a prediction of your payslip.</p>
        </section>

        <section className="content-block">
          <h2>How {c.name} take-home pay is calculated</h2>
          <ol className="steps">{c.howItWorks.map((s) => <li key={s}>{s}</li>)}</ol>
        </section>

        <section className="content-block">
          <h2>{c.taxTableTitle}</h2>
          <div className="table-wrap"><table className="salary-table"><thead><tr><th>Taxable income</th><th>Rate</th></tr></thead><tbody>
            {c.taxTable.map((r) => <tr key={r.range}><td>{r.range}</td><td>{r.rate}</td></tr>)}
          </tbody></table></div>
          <dl className="defs">{c.deductionsExplained.map((d) => <div key={d.name}><dt>{d.name}</dt><dd>{d.text}</dd></div>)}</dl>
        </section>

        <section className="content-block">
          <h2>How to read this {c.name} estimate</h2>
          <p>This page models take-home pay for {c.name} using the {c.taxYear} assumptions shown in the calculator and tables. Start with the gross salary and personal options that match your situation. The estimate applies the existing calculation logic to those inputs, then presents the modeled net amount and breakdown. The tax table and deduction notes explain the data currently supplied to this page; they do not confirm that every rule applies to an individual taxpayer.</p>
          <p>Use the result to compare scenarios or to understand which inputs affect the estimate. A salary quoted as CTC, gross pay, taxable income or basic pay can mean different things, so check that the field label matches the figure you enter. Country-specific rules, eligibility, tax residency, household circumstances, payroll timing and employer benefits may affect an actual assessment but are not all represented by this calculator.</p>
          <p>For a personal decision, compare the assumptions and output with your payslip, employer information and current official guidance. Update the inputs if your situation changes, and do not treat an estimate as an official tax calculation. The calculation and source details should be reviewed before each tax-year update.</p>
          <p>The default salary on this page is a sample for demonstrating the calculator; replace it with a relevant amount when exploring your own scenario. The displayed annual and monthly figures come from the same inputs, while the reference table shows other configured salary steps. Values can change as the page data and tax-year assumptions are updated, so note the applicable year when saving or sharing a result. A result cannot include information that is not represented by a field or rule in the current model.</p>
          <p><strong>Official source:</strong> {sourceNote.officialSource}<br/><strong>Data checked:</strong> {sourceNote.dataChecked}</p>
        </section>

        <section className="content-block">
          <h2>Salary after tax in {c.name} at common income levels</h2>
          <p>Click any salary for a full breakdown and monthly figures.</p>
          <SalaryTable c={c} />
        </section>

        <Faq items={c.faqs} />
        <RelatedLinks code={c.code} />
        <p className="disclaimer">Estimates only, based on {c.taxYear} rules for a standard employee. This is not tax advice — confirm your exact figures with your payslip, employer or a qualified adviser.</p>
      </div>
    </main>
  );
}
