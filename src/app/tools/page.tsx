import type { Metadata } from "next";
import Link from "next/link";
import { onlineCategories, onlineTools } from "@/lib/online-tools";
import { tools as salaryTools, siteConfig } from "@/lib/site";
import { countries } from "@/lib/countries";
import { Flag } from "@/components/Flag";
import { ComingSoonTool } from "@/components/ComingSoonTool";

export const metadata: Metadata = { title: "All Free Online Tools", description: "Browse free image, PDF, text, calculator, SEO, salary and tax tools on Toolix.", alternates: { canonical: `${siteConfig.url}/tools` } };

export default function AllToolsPage() {
  const utilityCategories = onlineCategories.filter((category) => category.slug !== "salary-tax-tools" && onlineTools.some((tool) => tool.category === category.name && tool.status === "ready"));
  const comingTools = onlineTools.filter((tool) => tool.status === "coming");
  return <main className="page"><div className="container"><nav className="breadcrumbs"><Link href="/">Home</Link> / <span>All tools</span></nav><h1 className="page-title">Explore all free online tools</h1><p className="page-lede">Useful tools for images, documents, text, calculations, SEO and salary planning—all in one place.</p>
    <div className="category-jump">{utilityCategories.map((category) => <a key={category.slug} href={`#${category.slug}`}>{category.icon} {category.name}</a>)}<a href="#salary-tax-tools">Salary &amp; Tax Tools</a>{comingTools.length > 0 && <a href="#coming-soon">Coming soon</a>}</div>
    {utilityCategories.map((category) => <section className="tool-directory-section" id={category.slug} key={category.slug}><div className="directory-heading"><div><p className="tool-category-label">TOOL CATEGORY</p><h2 className="section-title">{category.name}</h2><p className="section-sub">{category.description}</p></div></div><div className="card-grid">{onlineTools.filter((tool) => tool.category === category.name && tool.status === "ready").map((tool) => <Link className="card tool-card" key={tool.slug} href={`/utilities/${tool.slug}`}><span className="tool-icon">{tool.icon}</span><span className="tag">{tool.category}</span><h3>{tool.name}</h3><p>{tool.short}</p><span className="more">Use this tool →</span></Link>)}</div></section>)}
    <section className="tool-directory-section" id="salary-tax-tools"><p className="tool-category-label">TOOL CATEGORY</p><h2 className="section-title">Salary &amp; Tax Tools</h2><p className="section-sub">Salary, take-home pay, tax and workplace benefit calculators.</p><div className="card-grid">{salaryTools.map((tool) => <Link className="card" key={tool.slug} href={`/tools/${tool.slug}`}><Flag code={tool.flag}/><span className="tag">Salary &amp; Tax</span><h3>{tool.name}</h3><p>{tool.short}</p><span className="more">Use this tool →</span></Link>)}</div></section>
    <section className="tool-directory-section" id="countries"><h2 className="section-title">Salary calculators by country</h2><p className="section-sub">Choose a country to estimate take-home pay.</p><div className="chip-row">{countries.map((country) => <Link key={country.code} href={`/salary-calculator/${country.slug}`}><Flag code={country.code} size={18}/>{country.name}</Link>)}</div></section>
    {comingTools.length > 0 && <section className="tool-directory-section" id="coming-soon"><p className="tool-category-label">IN DEVELOPMENT</p><h2 className="section-title">Coming soon</h2><p className="section-sub">These tools are in development. Ask us to let you know when one is ready.</p><div className="card-grid">{comingTools.map((tool) => <ComingSoonTool key={tool.slug} slug={tool.slug} name={tool.name} short={tool.short} />)}</div></section>}
  </div></main>;
}
