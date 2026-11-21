import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { getChangelog } from "@/lib/changelog";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Recent updates to Toolix online tools, calculators and site features.",
  alternates: { canonical: `${siteConfig.url}/changelog` }
};

export default function ChangelogPage() {
  return <main className="page"><div className="container narrow">
    <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link> / <span>Changelog</span></nav>
    <h1 className="page-title">Changelog</h1>
    <p className="page-lede">Updates to Toolix tools and site features.</p>
    <div className="changelog-list">{getChangelog().map((entry) => <article className="changelog-entry" key={`${entry.date}-${entry.tool}-${entry.changes}`}>
      <time dateTime={entry.date}>{new Date(`${entry.date}T00:00:00`).toLocaleDateString("en", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })}</time>
      <h2>{entry.tool}</h2>
      <p>{entry.changes}</p>
    </article>)}</div>
  </div></main>;
}
