import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "About GetTools.online – Our Tools & Methodology", description: "Learn about GetTools.online, our free online utilities, browser-based processing and salary calculator assumptions.", alternates: { canonical: "/about" } };

export default function About() {
  return (
    <main className="page"><div className="container narrow">
      <h1 className="page-title">About GetTools.online</h1>
      <article className="content-block">
        <p>GetTools.online brings practical free online tools together in one place. Use image, text, calculator, SEO and salary utilities without installing desktop software. Tools that support local processing work directly in your browser.</p>
        <h2>How our tools work</h2>
        <p>Salary calculators use published rates for the selected tax year: Indian FY 2026-27 slabs, the 2026 IRS brackets and FICA wage base, UK 2026/27 income tax and National Insurance, 2026 Canadian federal and provincial rates, Australian 2026-27 resident rates, Singapore YA 2026 and CPF ceilings, and Irish 2026 PAYE, USC and PRSI.</p>
        <h2>What is not included</h2>
        <p>Results assume a standard employee. Individual tax credits, benefits in kind, student loans, local taxes and employer-specific deductions are not modelled, so your payslip can differ. Always confirm important decisions with your tax authority or a qualified adviser.</p>
        <h2>Keeping rates current</h2>
        <p>Tax rules change every year. We review each country when budgets or tax-year changes are announced and update the figures and page content together. See a rate or tool result that looks out of date? <Link href="/contact">Tell us</Link>.</p>
      </article>
    </div></main>
  );
}
