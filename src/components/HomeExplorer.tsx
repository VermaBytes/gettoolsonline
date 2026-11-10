"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { countries } from "@/lib/countries";
import { tools } from "@/lib/site";
import { onlineTools } from "@/lib/online-tools";

type Item = { href: string; title: string; text: string; tag: string };
export function HomeExplorer() {
  const [q, setQ] = useState("");
  const items: Item[] = useMemo(() => [
    ...onlineTools.map((t) => ({ href: `/utilities/${t.slug}`, title: t.name, text: t.short, tag: t.category })),
    ...countries.map((c) => ({ href: `/salary-calculator/${c.slug}`, title: `${c.name} salary calculator`, text: `${c.taxYear} · take-home pay after tax`, tag: c.region })),
    ...tools.map((t) => ({ href: `/tools/${t.slug}`, title: t.name, text: t.short, tag: "Salary & Tax Tools" }))
  ], []);
  const hits = q.trim() ? items.filter((i) => (i.title + " " + i.text + " " + i.tag).toLowerCase().includes(q.trim().toLowerCase())) : [];
  return <div className="hero-search">
    <input aria-label="Search tools" placeholder="Search free tools — e.g. image compressor, word counter, salary…" value={q} onChange={(e) => setQ(e.target.value)} />
    {q.trim() && <div className="search-hits">{hits.length ? hits.slice(0, 7).map((h) => <Link key={h.href} href={h.href}><b>{h.title}</b><span>{h.tag} · {h.text}</span></Link>) : <span className="empty">No match — try another tool or category.</span>}</div>}
  </div>;
}
