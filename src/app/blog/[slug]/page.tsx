import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { getBlogPost, getBlogPosts, renderMarkdown } from "@/lib/blog";
import { tools, siteConfig } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getBlogPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  const url = `${siteConfig.url}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: { type: "article", title: post.title, description: post.description, url, publishedTime: new Date(post.date).toISOString(), modifiedTime: new Date(post.updated).toISOString(), siteName: siteConfig.name },
    twitter: { card: "summary", title: post.title, description: post.description }
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const url = `${siteConfig.url}/blog/${post.slug}`;
  const relatedTools = post.relatedTools
    .map((slug) => tools.find((tool) => tool.slug === slug))
    .filter((tool): tool is (typeof tools)[number] => Boolean(tool));
  const ctaTool = post.ctaTool ? tools.find((tool) => tool.slug === post.ctaTool) : undefined;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.updated).toISOString(),
    mainEntityOfPage: url,
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url }
  };

  return (
    <main className="page"><div className="container narrow">
      <JsonLd data={articleSchema} />
      <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link> / <Link href="/blog">Blog</Link> / <span>{post.title}</span></nav>
      <article>
        <header className="blog-article-header">
          <time dateTime={post.date}>{new Date(`${post.date}T00:00:00`).toLocaleDateString("en", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })}</time>
          <h1 className="page-title">{post.title}</h1>
          <p className="page-lede">{post.description}</p>
          <p className="blog-byline">By {post.author} · {post.readingTime} min read{post.updated !== post.date && <> · Updated <time dateTime={post.updated}>{new Date(`${post.updated}T00:00:00`).toLocaleDateString("en", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })}</time></>}</p>
          <div className="blog-taxonomy"><Link href={`/blog?category=${encodeURIComponent(post.category)}`}>{post.category}</Link>{post.tags.map((tag) => <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>#{tag}</Link>)}</div>
        </header>
        <div className="blog-content" dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }} />
      </article>
      {ctaTool && <aside className="blog-tool-cta"><div><span className="tag">TRY THIS TOOL</span><h2>{ctaTool.name}</h2><p>{ctaTool.short}</p></div><Link className="btn" href={`/tools/${ctaTool.slug}`}>Open calculator →</Link></aside>}
      {relatedTools.length > 0 && <section className="content-block blog-related"><h2>Related tools</h2><div className="link-grid">
        {relatedTools.map((tool) => <Link key={tool.slug} href={`/tools/${tool.slug}`}><b>{tool.name}</b><span>{tool.short}</span></Link>)}
      </div></section>}
    </div></main>
  );
}
