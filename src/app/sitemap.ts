import type { MetadataRoute } from "next";
import { siteConfig, tools } from "@/lib/site";
import { countries } from "@/lib/countries";
import { onlineTools } from "@/lib/online-tools";
import { getBlogPosts } from "@/lib/blog";
import { INDEX_SALARY_AFTER_TAX_PAGES } from "@/lib/seo-flags";
import { getChangelog } from "@/lib/changelog";

export default function sitemap(): MetadataRoute.Sitemap {
  // Keep sitemap URLs aligned with the site's canonical host, regardless of
  // a trailing slash accidentally being added to the config later.
  const u = siteConfig.url.replace(/\/$/, "");
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [
    { url: `${u}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${u}/tools`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    ...countries.map((c) => ({ url: `${u}/salary-calculator/${c.slug}`, lastModified, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...tools.map((t) => ({ url: `${u}/tools/${t.slug}`, lastModified, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...onlineTools.filter((t) => t.status === "ready").map((t) => ({ url: `${u}/utilities/${t.slug}`, lastModified, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...(INDEX_SALARY_AFTER_TAX_PAGES ? countries.flatMap((c) => c.salarySteps.map((s) => ({ url: `${u}/salary-after-tax/${c.slug}/${s}`, lastModified, changeFrequency: "monthly" as const, priority: 0.6 }))) : []),
    { url: `${u}/blog`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    ...getBlogPosts().map((post) => ({ url: `${u}/blog/${post.slug}`, lastModified: new Date(post.updated), changeFrequency: "monthly" as const, priority: 0.6 })),
    { url: `${u}/changelog`, lastModified: new Date(getChangelog()[0]?.date ?? lastModified), changeFrequency: "monthly", priority: 0.5 },
    ...["about", "contact", "privacy", "terms"].map((p) => ({ url: `${u}/${p}`, lastModified, changeFrequency: "yearly" as const, priority: 0.3 }))
  ];
  const seen = new Set<string>();
  return entries.filter(({ url }) => {
    const normalizedUrl = url.replace(/\/$/, "");
    if (seen.has(normalizedUrl)) return false;
    seen.add(normalizedUrl);
    return true;
  });
}
