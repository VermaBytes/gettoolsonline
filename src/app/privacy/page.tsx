import type { Metadata } from "next";
export const metadata: Metadata = { title: "Privacy Policy", description: "How GetTools.online handles your data when you use browser-based online tools and calculators.", alternates: { canonical: "/privacy" } };

export default function Privacy() {
  return (
    <main className="page"><div className="container narrow">
      <h1 className="page-title">Privacy Policy</h1>
      <article className="content-block">
        <p>For browser-based tools, text and selected files are processed locally where stated. We do not receive those inputs through the tool interface. Avoid entering sensitive personal information into any online service.</p>
        <h2>Analytics and advertising</h2>
        <p>If we add analytics or advertising, they may use cookies or similar technologies. We will describe each service here and request consent where the law requires it before enabling them.</p>
        <h2>Your rights</h2>
        <p>Depending on where you live (for example under GDPR or similar laws) you may have rights to access or delete data held about you. Because calculator inputs are not stored, there is generally nothing to retrieve.</p>
        <p className="note">Replace this summary with a policy reviewed for your final analytics, ad and hosting setup before launch.</p>
      </article>
    </div></main>
  );
}
