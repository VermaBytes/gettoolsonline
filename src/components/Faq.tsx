export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <section className="content-block" aria-labelledby="faq-h">
      <h2 id="faq-h">Frequently asked questions</h2>
      {items.map((f) => (
        <details key={f.q} className="faq-item"><summary>{f.q}</summary><p>{f.a}</p></details>
      ))}
    </section>
  );
}
export function faqSchema(items: { q: string; a: string }[]) {
  return { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
}
export function crumbSchema(items: { name: string; url: string }[]) {
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((x, i) => ({ "@type": "ListItem", position: i + 1, name: x.name, item: x.url })) };
}
