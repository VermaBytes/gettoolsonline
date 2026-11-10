import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { tools, getTool, siteConfig } from "@/lib/site";
import { toolComponents } from "@/tools";
import { Faq, faqSchema, crumbSchema } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { Flag } from "@/components/Flag";

export function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = getTool(slug);
  if (!t) return {};
  const url = `${siteConfig.url}/tools/${t.slug}`;
  return { title: t.title, description: t.description, keywords: t.keywords, alternates: { canonical: url }, openGraph: { type: "website", url, title: t.title, description: t.description, siteName: siteConfig.name } };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = getTool(slug);
  const Tool = toolComponents[slug];
  if (!t || !Tool) notFound();
  const url = `${siteConfig.url}/tools/${t.slug}`;
  const app = { "@context": "https://schema.org", "@type": "WebApplication", name: t.name, url, applicationCategory: "FinanceApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: t.description };
  const related = t.related.map((s) => getTool(s)).filter((x): x is NonNullable<typeof x> => Boolean(x));
  return (
    <main className="page">
      <JsonLd data={[app, faqSchema(t.faqs), crumbSchema([{ name: "Home", url: siteConfig.url }, { name: t.category, url: `${siteConfig.url}/#tools` }, { name: t.name, url }])]} />
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link> / <Link href="/#tools">{t.category}</Link> / <span>{t.name}</span></nav>
        <h1 className="page-title title-flag"><Flag code={t.flag} size={36} /> {t.name}</h1>
        <p className="page-lede">{t.short}</p>
        <Tool />
        <article className="content-block">
          <p>{t.intro}</p>
          <h2>How to use this calculator</h2>
          <ol className="steps">{t.steps.map((s) => <li key={s}>{s}</li>)}</ol>
          <h2>Formula</h2>
          <p className="formula">{t.formula}</p>
          <h2>Example</h2>
          <p>{t.example}</p>
        </article>
        <Faq items={t.faqs} />
        {related.length > 0 && (
          <section className="content-block related"><h2>More calculators</h2>
            <div className="link-grid">{related.map((x) => <Link key={x.slug} href={`/tools/${x.slug}`}><Flag code={x.flag} size={28} /><b>{x.name}</b><span>{x.short}</span></Link>)}</div>
          </section>
        )}
        <p className="disclaimer">Estimates for planning only, not tax or legal advice.</p>
      </div>
    </main>
  );
}
