import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "About Toolix – Our Tools & Methodology", description: "Learn about Toolix, our free online utilities, browser-based processing and salary calculator assumptions.", alternates: { canonical: "/about" } };

export default function About() {
  return (
    <main className="page"><div className="container narrow">
      <h1 className="page-title">About Toolix</h1>
      <article className="content-block">
        <p>Toolix is a collection of free browser-based tools for everyday work, study and personal planning. The site brings image utilities, text helpers, simple calculators, SEO generators and salary and tax calculators together so visitors can complete common tasks without installing desktop software.</p>
        <h2>What you can do here</h2>
        <p>Use image tools to resize, compress and convert supported formats. Text tools can count words, change letter case or remove duplicate lines. Everyday calculators help with percentages, discounts and age. SEO utilities create starter meta tags and robots.txt rules. Salary and workplace calculators provide estimates for take-home pay, tax comparisons, retirement contributions, gratuity and pay changes across several countries.</p>
        <h2>How the tools handle your information</h2>
        <p>Tools that accept text or files are designed to process those inputs in your browser. The site does not ask you to upload calculator inputs through a form. Avoid entering sensitive information into any website, and review each result before relying on it. Salary, tax and benefits results are estimates based on the assumptions shown on each calculator page; they are not professional advice.</p>
        <h2>Who makes Toolix</h2>
        <p>Toolix is built and maintained by <strong>[APNA NAAM/TEAM]</strong>. We aim to make useful tools clear, accessible and straightforward to use. If you find an error, have a suggestion or want to request a tool, <Link href="/contact">contact us</Link>.</p>
      </article>
    </div></main>
  );
}
