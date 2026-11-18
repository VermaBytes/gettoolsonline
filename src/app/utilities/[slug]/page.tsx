import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getOnlineTool, onlineTools } from "@/lib/online-tools";
import { OnlineToolWorkspace } from "@/tools/OnlineToolWorkspace";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() { return onlineTools.map((tool) => ({ slug: tool.slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const tool = getOnlineTool(slug); if (!tool) return {};
  return { title: `${tool.name} – Free Online Tool`, description: tool.description, keywords: tool.keywords, alternates: { canonical: `${siteConfig.url}/utilities/${tool.slug}` }, ...(tool.status === "coming" ? { robots: { index: false, follow: true } } : {}), openGraph: { type: "website", title: `${tool.name} | ${siteConfig.name}`, description: tool.description, url: `${siteConfig.url}/utilities/${tool.slug}`, siteName: siteConfig.name } };
}

export default async function UtilityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const tool = getOnlineTool(slug); if (!tool) notFound();
  const related = onlineTools.filter((item) => item.category === tool.category && item.slug !== tool.slug).slice(0, 3);
  const schema = { "@context": "https://schema.org", "@type": "WebApplication", name: tool.name, url: `${siteConfig.url}/utilities/${tool.slug}`, applicationCategory: "UtilitiesApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: tool.description };
  return <main className="page"><div className="container">
    <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link> / <Link href="/tools">All tools</Link> / <span>{tool.name}</span></nav>
    <p className="tool-category-label">{tool.category}</p><h1 className="page-title">{tool.name}</h1><p className="page-lede">{tool.description}</p>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <OnlineToolWorkspace tool={tool} />
    <section className="content-block"><h2>About this tool</h2><p>{tool.description} Toolix keeps everyday utilities simple, accessible and easy to use. Where supported, processing happens directly in your browser.</p><h2>How to use</h2><ol className="steps"><li>Enter your information or select the file requested by the tool.</li><li>Review the available settings and choose the options you need.</li><li>Run the tool and review the result before copying or downloading it.</li></ol></section>
    {related.length > 0 && <section className="content-block related"><h2>Related {tool.category.toLowerCase()}</h2><div className="link-grid">{related.map((item) => <Link key={item.slug} href={`/utilities/${item.slug}`}><b>{item.name}</b><span>{item.short}</span></Link>)}</div></section>}
  </div></main>;
}
