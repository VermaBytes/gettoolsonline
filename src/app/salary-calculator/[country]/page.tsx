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
          <p>As a quick reference, a gross salary of {money(c.defaultSalary, c)} leaves about <strong>{money(sample.net, c)}</strong> a year ({money(sample.net / 12, c)} per month) after deductions, an average rate of {pct(sample.effectiveRate)}.</p>
        </article>

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
