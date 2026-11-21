import type { Metadata } from "next";
import Link from "next/link";
import { countries, calculate, money, pct } from "@/lib/countries";
import { tools as salaryTools, siteConfig } from "@/lib/site";
import { onlineTools, publicOnlineCategories } from "@/lib/online-tools";
import { HomeExplorer } from "@/components/HomeExplorer";
import { Faq, faqSchema } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { Flag } from "@/components/Flag";

export const metadata: Metadata = {
  title: { absolute: "Toolix – Free Online Tools for Everyday Work" },
  description: siteConfig.description,
  alternates: { canonical: siteConfig.url }
};

const faqs = [
  { q: "Are the tools on Toolix free?", a: "Yes. The available tools are free to use." },
  { q: "Do I need to install software?", a: "No. Available tools run in your web browser, so you can use them without installing a desktop application." },
  { q: "Are my files uploaded?", a: "Image and text tools that support local processing work directly in your browser. Your selected files are not uploaded by those tools." },
  { q: "Which salary calculators are available?", a: "Toolix includes salary and tax calculators for India, the United States, the United Kingdom, Canada, Australia, Singapore, the UAE and Ireland." }
];

export default function Home() {
  const site = { "@context": "https://schema.org", "@type": "WebSite", name: siteConfig.name, url: siteConfig.url, description: siteConfig.description };
  const featured = onlineTools.filter((t) => t.status === "ready").slice(0, 8);
  return <main>
    <JsonLd data={[site, faqSchema(faqs)]} />
    <section className="hero"><div className="container">
      <span className="hero-eyebrow">TOOLS THAT MAKE EVERYDAY WORK EASIER</span>
      <h1>Free online tools.<br/><span>Simple, fast, all in one place.</span></h1>
      <p>Compress images, work with text, calculate everyday numbers and explore salary tools—all from one simple workspace.</p>
      <HomeExplorer />
      <div className="hero-trust"><span>✓ Free to use</span><span>✓ No installation</span><span>✓ Browser-based tools</span></div>
    </div></section>

    <section className="section" id="categories"><div className="container"><div className="section-topline"><div><h2 className="section-title">Browse tool categories</h2><p className="section-sub">Find the right utility for the task at hand.</p></div><Link className="section-link" href="/tools">View all tools →</Link></div>
      <div className="category-grid">{publicOnlineCategories.map((c) => <Link key={c.slug} href={c.slug === "salary-tax-tools" ? "/#salary-tools" : `/tools#${c.slug}`} className="category-card"><span className="category-symbol">{c.icon}</span><h3>{c.name}</h3><p>{c.description}</p><span className="more">Explore category →</span></Link>)}</div>
    </div></section>

    <section className="section alt" id="popular-tools"><div className="container"><div className="section-topline"><div><h2 className="section-title">Popular free tools</h2><p className="section-sub">Quick, practical utilities for everyday tasks.</p></div><Link className="section-link" href="/tools">Explore all tools →</Link></div>
      <div className="card-grid">{featured.map((t) => <Link key={t.slug} href={`/utilities/${t.slug}`} className="card tool-card"><span className="tool-icon">{t.icon}</span><span className="tag">{t.category}</span><h3>{t.name}</h3><p>{t.short}</p><span className="more">{t.status === "ready" ? "Use this tool →" : "Coming soon"}</span></Link>)}</div>
    </div></section>

    <section className="section" id="salary-tools"><div className="container"><div className="section-topline"><div><h2 className="section-title">Salary &amp; tax calculators</h2><p className="section-sub">Plan your take-home pay and understand salary deductions.</p></div><Link className="section-link" href="/tools#salary-tax-tools">View all salary tools →</Link></div>
      <div className="card-grid">{salaryTools.map((t) => <Link key={t.slug} href={`/tools/${t.slug}`} className="card"><Flag code={t.flag}/><span className="tag">{t.category}</span><h3>{t.name}</h3><p>{t.short}</p><span className="more">Use this tool →</span></Link>)}</div>
    </div></section>

    <section className="section alt" id="countries"><div className="container"><h2 className="section-title">Salary calculators by country</h2><p className="section-sub">Pick your country for yearly, monthly, weekly and hourly take-home pay.</p><div className="card-grid">{countries.map((c) => { const r = calculate(c.code, c.defaultSalary); return <Link key={c.code} href={`/salary-calculator/${c.slug}`} className="card"><Flag code={c.code}/><span className="tag">{c.region}</span><h3>{c.name}</h3><p>{money(c.defaultSalary, c)} gross → <b>{money(r.net / 12, c)}</b> per month ({pct(r.effectiveRate)} avg. tax)</p><span className="more">Open calculator →</span></Link>; })}</div></div></section>

    <section className="section"><div className="container"><Faq items={faqs}/></div></section>

    <section className="founder-section" aria-label="About the founder">
      <div className="container"><div className="founder-note">
        <h2>From the Founder</h2>
        <div className="founder-note-copy">
          <p>Toolix brings practical browser-based utilities and calculators together to make everyday digital tasks simpler. From working with images and text to exploring salary estimates, the goal is to help you get useful work done with clear, easy-to-use tools.</p>
          <p>Built with care in Lakhimpur Kheri, Toolix is continually growing around what people need: straightforward experiences, helpful guidance, and transparent calculator estimates.</p>
          <p className="founder-note-byline"><strong>Shobhit Verma</strong><span>Lakhimpur Kheri, Uttar Pradesh, India</span></p>
        </div>
      </div></div>
    </section>
  </main>;
}
