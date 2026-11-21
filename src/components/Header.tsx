import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site";
import { countries } from "@/lib/countries";
import { publicOnlineCategories } from "@/lib/online-tools";

export function Header() {
  return (
    <header className="site-header">
      <div className="container nav">
        <Link className="brand" href="/" aria-label={`${siteConfig.name} home`}>
          <Image className="brand-logo" src="/toolix-logo.png" alt="Toolix — Smart tools. Simpler work." width={1521} height={465} sizes="190px" priority />
        </Link>
        <nav className="nav-links" aria-label="Main navigation">
          <Link href="/tools">All tools</Link>
          <div className="dropdown">
            <Link href="/#categories">Categories ▾</Link>
            <div className="dropdown-menu">
              {publicOnlineCategories.map((c) => <Link key={c.slug} href={c.slug === "salary-tax-tools" ? "/#salary-tools" : `/tools#${c.slug}`}>{c.name}</Link>)}
            </div>
          </div>
          <div className="dropdown">
            <Link href="/#countries">Salary calculators ▾</Link>
            <div className="dropdown-menu">
              {countries.map((c) => <Link key={c.code} href={`/salary-calculator/${c.slug}`}>{c.name}</Link>)}
            </div>
          </div>
          <Link className="blog-nav-link" href="/blog">Blog</Link>
        </nav>
      </div>
    </header>
  );
}
