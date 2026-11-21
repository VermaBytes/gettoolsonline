import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
export const metadata: Metadata = { title: "Contact Toolix", description: "Contact Toolix to report a tool issue, suggest a feature or flag a salary calculator error.", alternates: { canonical: "/contact" } };

export default function Contact() {
  return (
    <main className="page"><div className="container narrow">
      <h1 className="page-title">Contact</h1>
      <article className="content-block">
        <p>Contact the Toolix team to report a tool issue, suggest a feature or flag a salary calculator result that needs review.</p>
        <p>Email: <strong>{siteConfig.email}</strong></p>
      </article>
    </div></main>
  );
}
