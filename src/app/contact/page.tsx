import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
export const metadata: Metadata = { title: "Contact Toolix", description: "Contact Toolix to report a tool issue, suggest a feature or flag a salary calculator error.", alternates: { canonical: "/contact" } };

export default function Contact() {
  return (
    <main className="page"><div className="container narrow">
      <h1 className="page-title">Contact</h1>
      <article className="content-block">
        <p>Found a rate that looks out of date, or want a country or calculator added? We read every message.</p>
        {siteConfig.email ? <p>Email us at <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.</p> : <p>Our contact email will be published here shortly.</p>}
      </article>
    </div></main>
  );
}
