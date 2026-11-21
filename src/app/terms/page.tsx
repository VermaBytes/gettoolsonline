import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
export const metadata: Metadata = { title: "Terms of Use", description: "Terms for using Toolix browser-based tools, calculators and informational content.", alternates: { canonical: "/terms" } };

export default function Terms() {
  return (
    <main className="page"><div className="container narrow">
      <h1 className="page-title">Terms of Use</h1>
      <article className="content-block">
        <p><strong>Last updated: 21 November 2026</strong></p>
        <p>These terms apply when you use Toolix, a collection of browser-based utilities and informational calculators. By using the site, you agree to these terms. If you do not agree, do not use the site.</p>

        <h2>Tools and estimates</h2>
        <p>Tools are provided for general information and convenience. Calculator results are estimates only, based on the inputs and assumptions shown. They are not tax, legal, accounting, employment or financial advice, and are not a promise of any particular result. Your actual pay, tax, benefits or obligations may differ. Check important results against current official sources and consult a qualified professional where appropriate.</p>

        <h2>Your responsibilities</h2>
        <p>You are responsible for the information you enter and for reviewing a tool’s output before using it. Do not use the site unlawfully, interfere with its operation or attempt to gain unauthorised access to its systems. Do not submit sensitive personal information to a tool.</p>

        <h2>Intellectual property and availability</h2>
        <p>Unless a page says otherwise, Toolix’s original site content and design belong to its operator. You may use the tools for personal or business tasks, but may not republish substantial site content as your own. We may update, suspend or remove a tool or page, and do not guarantee uninterrupted availability.</p>

        <h2>Third-party services and links</h2>
        <p>The site may link to third-party websites or use third-party hosting, analytics or advertising services. Those services operate under their own terms and privacy policies. Toolix does not control third-party websites or services.</p>

        <h2>Limitation</h2>
        <p>To the extent permitted by applicable law, Toolix is provided “as is” without warranties that the site or its results will be accurate, complete or available. Nothing in these terms excludes rights or liabilities that cannot legally be excluded.</p>

        <h2>Contact</h2>
        <p>Questions about these terms? Contact us at <strong>{siteConfig.email}</strong>.</p>
        <p><Link href="/contact">Contact page</Link></p>
      </article>
    </div></main>
  );
}
