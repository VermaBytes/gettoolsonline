import type { Metadata } from "next";
import Link from "next/link";
import { onlineCategories, onlineTools } from "@/lib/online-tools";
import { tools as salaryTools } from "@/lib/site";
import { countries } from "@/lib/countries";
import { Flag } from "@/components/Flag";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = { title: "All Free Online Tools", description: "Browse free image, PDF, text, calculator, SEO, salary and tax tools on GetTools.online.", alternates: { canonical: `${siteConfig.url}/tools` } };

export default function AllToolsPage() {
  return <main className="page"><div className="container"><nav className="breadcrumbs"><Link href="/">Home</Link> / <span>All tools</span></nav><h1 className="page-title">Explore all free online tools</h1><p className="page-lede">Useful tools for images, documents, text, calculations, SEO and salary planning—all in one place.</p>
    <div className="category-jump">{onlineCategories.map((c) => <a key={c.slug} href={`#${c.slug}`}>{c.icon} {c.name}</a>)}</div>
    {onlineCategories.filter((c) => c.slug !== "salary-tax-tools").map((category) => <section className="tool-directory-section" id={category.slug} key={category.slug}><div className="directory-heading"><div><p className="tool-category-label">TOOL CATEGORY</p><h2 className="section-title">{category.name}</h2><p className="section-sub">{category.description}</p></div></div><div className="card-grid">{onlineTools.filter((t) => t.category === category.name).map((t) => <Link className="card tool-card" key={t.slug} href={`/utilities/${t.slug}`}><span className="tool-icon">{t.icon}</span><span className="tag">{t.category}</span><h3>{t.name}</h3><p>{t.short}</p><span className="more">{t.status === "ready" ? "Use this tool →" : "Coming soon"}</span></Link>)}</div></section>)}
    <section className="tool-directory-section" id="salary-tax-tools"><p className="tool-category-label">TOOL CATEGORY</p><h2 className="section-title">Salary &amp; Tax Tools</h2><p className="section-sub">Salary, take-home pay, tax and workplace benefit calculators.</p><div className="card-grid">{salaryTools.map((t) => <Link className="card" key={t.slug} href={`/tools/${t.slug}`}><Flag code={t.flag}/><span className="tag">Salary &amp; Tax</span><h3>{t.name}</h3><p>{t.short}</p><span className="more">Use this tool →</span></Link>)}</div></section>
    <section className="tool-directory-section" id="countries"><h2 className="section-title">Salary calculators by country</h2><p className="section-sub">Choose a country to estimate take-home pay.</p><div className="chip-row">{countries.map((c) => <Link key={c.code} href={`/salary-calculator/${c.slug}`}><Flag code={c.code} size={18}/>{c.name}</Link>)}</div></section>
  </div></main>;
}
