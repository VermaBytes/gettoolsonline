import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { countries } from "@/lib/countries";
import { onlineCategories } from "@/lib/online-tools";

export function Header() {
  return (
    <header className="site-header">
      <div className="container nav">
        <Link className="brand" href="/" aria-label={`${siteConfig.name} home`}>
          <img className="brand-logo" src="/gettools-logo.svg" alt="GetTools.online — Simple Tools. Smarter Work." width="280" height="66" />
        </Link>
        <nav className="nav-links" aria-label="Main navigation">
          <Link href="/tools">All tools</Link>
          <div className="dropdown">
            <Link href="/#categories">Categories ▾</Link>
            <div className="dropdown-menu">
              {onlineCategories.map((c) => <Link key={c.slug} href={c.slug === "salary-tax-tools" ? "/#salary-tools" : `/tools#${c.slug}`}>{c.name}</Link>)}
            </div>
          </div>
          <div className="dropdown">
            <Link href="/#countries">Salary calculators ▾</Link>
            <div className="dropdown-menu">
              {countries.map((c) => <Link key={c.code} href={`/salary-calculator/${c.slug}`}>{c.name}</Link>)}
            </div>
          </div>
          <Link href="#">Blog</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
