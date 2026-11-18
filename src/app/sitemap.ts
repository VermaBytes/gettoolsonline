import type { MetadataRoute } from "next";
import { siteConfig, tools } from "@/lib/site";
import { countries } from "@/lib/countries";
import { onlineTools } from "@/lib/online-tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const u = siteConfig.url;
  const entries: MetadataRoute.Sitemap = [
    { url: u, changeFrequency: "weekly", priority: 1 },
    ...countries.map((c) => ({ url: `${u}/salary-calculator/${c.slug}`, changeFrequency: "monthly" as const, priority: 0.9 })),
    ...tools.map((t) => ({ url: `${u}/tools/${t.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${u}/tools`, changeFrequency: "weekly", priority: 0.9 },
    ...onlineTools.filter((t) => t.status === "ready").map((t) => ({ url: `${u}/utilities/${t.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...countries.flatMap((c) => c.salarySteps.map((s) => ({ url: `${u}/salary-after-tax/${c.slug}/${s}`, changeFrequency: "monthly" as const, priority: 0.6 }))),
    ...["about", "contact", "privacy", "terms"].map((p) => ({ url: `${u}/${p}`, changeFrequency: "yearly" as const, priority: 0.3 }))
  ];
  const seen = new Set<string>();
  return entries.filter(({ url }) => {
    if (seen.has(url)) return false;
    seen.add(url);
    return true;
  });
}
