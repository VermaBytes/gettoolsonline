import type { Metadata } from "next";
export const metadata: Metadata = { title: "Terms of Use", description: "Terms for using GetTools.online free online tools and calculators.", alternates: { canonical: "/terms" } };

export default function Terms() {
  return (
    <main className="page"><div className="container narrow">
      <h1 className="page-title">Terms of Use</h1>
      <article className="content-block">
        <p>GetTools.online tools and calculators are provided for general informational purposes only. They are not tax, legal or financial advice, and results can differ from your actual payslip or tax assessment.</p>
        <p>We work to keep tax rates current but do not guarantee accuracy or completeness. Verify important figures with your employer, tax authority or a qualified professional before making decisions.</p>
        <p>You may use the site for personal and business planning. Automated scraping or republishing of content without permission is not allowed.</p>
        <p className="note">Replace with terms reviewed for your business and target markets before launch.</p>
      </article>
    </div></main>
  );
}
