import type { MetadataRoute } from "next";
import { siteConfig, tools } from "@/lib/site";
import { countries } from "@/lib/countries";
import { onlineTools } from "@/lib/online-tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const u = siteConfig.url;
  return [
    { url: u, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...countries.map((c) => ({ url: `${u}/salary-calculator/${c.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 })),
    ...tools.map((t) => ({ url: `${u}/tools/${t.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${u}/tools`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...onlineTools.map((t) => ({ url: `${u}/utilities/${t.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...countries.flatMap((c) => c.salarySteps.map((s) => ({ url: `${u}/salary-after-tax/${c.slug}/${s}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 }))),
    ...["about", "contact", "privacy", "terms"].map((p) => ({ url: `${u}/${p}`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 }))
  ];
}
