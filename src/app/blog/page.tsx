import type { Metadata } from "next";
import Link from "next/link";
import { getBlogPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog – Guides for Work, Money & Online Tools",
  description: "Practical guides to salary, tax, workplace benefits and useful online tools.",
  alternates: { canonical: `${siteConfig.url}/blog` }
};

type SearchParams = { page?: string; category?: string; tag?: string };
type Props = { searchParams: Promise<SearchParams> };
const PAGE_SIZE = 6;

function blogHref(values: SearchParams): string {
  const query = new URLSearchParams();
  if (values.category) query.set("category", values.category);
  if (values.tag) query.set("tag", values.tag);
  if (values.page && values.page !== "1") query.set("page", values.page);
  return `/blog${query.size ? `?${query.toString()}` : ""}`;
}

export default async function BlogPage({ searchParams }: Props) {
  const params = await searchParams;
  const posts = getBlogPosts();
  const categories = [...new Set(posts.map((post) => post.category))].sort();
  const tags = [...new Set(posts.flatMap((post) => post.tags))].sort();
  const filteredPosts = posts.filter((post) => (!params.category || post.category === params.category) && (!params.tag || post.tags.includes(params.tag)));
  const pageCount = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE));
  const requestedPage = Number.parseInt(params.page || "1", 10);
  const page = Number.isFinite(requestedPage) ? Math.min(pageCount, Math.max(1, requestedPage)) : 1;
  const visiblePosts = filteredPosts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <main className="page"><div className="container narrow">
      <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link> / <span>Blog</span></nav>
      <h1 className="page-title">The Toolix blog</h1>
      <p className="page-lede">Straightforward guides for salary decisions, workplace benefits and everyday tools.</p>
      {(categories.length > 0 || tags.length > 0) && <nav className="blog-filters" aria-label="Filter blog posts">
        {categories.map((category) => <Link className={params.category === category ? "active" : ""} key={category} href={blogHref({ category, tag: params.tag })}>{category}</Link>)}
        {tags.map((tag) => <Link className={params.tag === tag ? "active" : ""} key={tag} href={blogHref({ category: params.category, tag })}>#{tag}</Link>)}
        {(params.category || params.tag) && <Link href="/blog">Clear filters</Link>}
      </nav>}
      <p className="blog-result-count">{filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"}{params.category ? ` in ${params.category}` : ""}{params.tag ? ` tagged ${params.tag}` : ""}</p>
      <div className="blog-list">
        {visiblePosts.map((post) => (
          <article className="blog-card" key={post.slug}>
            <time dateTime={post.date}>{new Date(`${post.date}T00:00:00`).toLocaleDateString("en", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })}</time>
            <p className="blog-category">{post.category}{post.tags.length > 0 && <> · {post.tags.map((tag) => `#${tag}`).join(" ")}</>}</p>
            <h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>
            <p>{post.description}</p>
            <Link className="more" href={`/blog/${post.slug}`}>Read article →</Link>
          </article>
        ))}
        {visiblePosts.length === 0 && <p>No articles match these filters yet.</p>}
      </div>
      {pageCount > 1 && <nav className="blog-pagination" aria-label="Blog pagination">
        {page > 1 ? <Link href={blogHref({ ...params, page: String(page - 1) })}>← Newer posts</Link> : <span />}
        <span>Page {page} of {pageCount}</span>
        {page < pageCount ? <Link href={blogHref({ ...params, page: String(page + 1) })}>Older posts →</Link> : <span />}
      </nav>}
    </div></main>
  );
}
