import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { countries } from "@/lib/countries";
import { tools } from "@/lib/site";
import { onlineTools } from "@/lib/online-tools";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link className="footer-brand" href="/" aria-label={`${siteConfig.name} home`}><img className="footer-logo" src="/gettools-logo-footer.svg" alt="GetTools.online" width="280" height="66" /></Link>
          <p className="footer-muted">{siteConfig.tagline}. Estimates for planning only, not tax advice.</p>
        </div>
        <div>
          <h4>Salary calculators</h4>
          <ul>{countries.map((c) => <li key={c.code}><Link href={`/salary-calculator/${c.slug}`}>{c.name}</Link></li>)}</ul>
        </div>
        <div>
          <h4>Popular tools</h4>
          <ul>{onlineTools.filter((t) => t.featured).slice(0, 6).map((t) => <li key={t.slug}><Link href={`/utilities/${t.slug}`}>{t.name}</Link></li>)}<li><Link href="/tools">Browse all tools</Link></li></ul>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li><Link href="/about">About</Link></li><li><Link href="/contact">Contact</Link></li>
            <li><Link href="/privacy">Privacy</Link></li><li><Link href="/terms">Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">© {new Date().getFullYear()} {siteConfig.name}. Free browser-based tools for everyday work. Salary and tax estimates are for planning only; confirm with official sources.</div>
    </footer>
  );
}
