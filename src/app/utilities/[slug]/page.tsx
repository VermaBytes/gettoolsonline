import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getOnlineTool, onlineTools } from "@/lib/online-tools";
import { OnlineToolWorkspace } from "@/tools/OnlineToolWorkspace";
import { siteConfig } from "@/lib/site";
import { utilityContent } from "@/lib/utility-content";
import { Faq, faqSchema, crumbSchema } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";

export function generateStaticParams() { return onlineTools.map((tool) => ({ slug: tool.slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const tool = getOnlineTool(slug); if (!tool) return {};
  return { title: `${tool.name} – Free Online Tool`, description: tool.description, keywords: tool.keywords, alternates: { canonical: `${siteConfig.url}/utilities/${tool.slug}` }, ...(tool.status === "coming" ? { robots: { index: false, follow: true } } : {}), openGraph: { type: "website", title: `${tool.name} | ${siteConfig.name}`, description: tool.description, url: `${siteConfig.url}/utilities/${tool.slug}`, siteName: siteConfig.name } };
}

export default async function UtilityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const tool = getOnlineTool(slug); if (!tool) notFound();
  const related = onlineTools.filter((item) => item.status === "ready" && item.category === tool.category && item.slug !== tool.slug).slice(0, 3);
  const content = utilityContent[tool.slug];
  if (tool.status === "ready" && !content) throw new Error(`Missing editorial content for ready utility: ${tool.slug}`);
  const schema = { "@context": "https://schema.org", "@type": "WebApplication", name: tool.name, url: `${siteConfig.url}/utilities/${tool.slug}`, applicationCategory: "UtilitiesApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: tool.description };
  return <main className="page"><div className="container">
    <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link> / <Link href="/tools">All tools</Link> / <span>{tool.name}</span></nav>
    <p className="tool-category-label">{tool.category}</p><h1 className="page-title">{tool.name}</h1><p className="page-lede">{tool.description}</p>
    <JsonLd data={[schema, ...(content ? [faqSchema(content.faqs), crumbSchema([{ name: "Home", url: siteConfig.url }, { name: "All tools", url: `${siteConfig.url}/tools` }, { name: tool.name, url: `${siteConfig.url}/utilities/${tool.slug}` }])] : [])]} />
    <OnlineToolWorkspace tool={tool} />
    {content && <>
      <section className="content-block"><h2>How to use</h2><ol className="steps">{content.howTo.map((step) => <li key={step}>{step}</li>)}</ol></section>
      <article className="content-block"><h2>About {tool.name}</h2>{content.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</article>
      <section className="content-block"><h2>Common use cases</h2><ul className="steps">{content.useCases.map((item) => <li key={item}>{item}</li>)}</ul><h2>Example</h2>{content.examples.map((example) => <p key={example}>{example}</p>)}</section>
      <Faq items={content.faqs} />
      <p className="note">Last updated: <time dateTime={content.lastUpdated}>{new Date(`${content.lastUpdated}T00:00:00`).toLocaleDateString("en", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })}</time></p>
    </>}
    {related.length > 0 && <section className="content-block related"><h2>Related {tool.category.toLowerCase()}</h2><div className="link-grid">{related.map((item) => <Link key={item.slug} href={`/utilities/${item.slug}`}><b>{item.name}</b><span>{item.short}</span></Link>)}</div></section>}
  </div></main>;
}
