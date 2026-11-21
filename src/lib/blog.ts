import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated: string;
  author: string;
  category: string;
  tags: string[];
  content: string;
  relatedTools: string[];
  ctaTool?: string;
  readingTime: number;
};

const blogDirectory = path.join(process.cwd(), "content", "blog");

function parsePost(fileName: string): BlogPost {
  const raw = readFileSync(path.join(blogDirectory, fileName), "utf8");
  const match = raw.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?/);
  if (!match) throw new Error(`Blog post ${fileName} needs YAML frontmatter.`);

  const fields = new Map<string, string>();
  for (const line of match[1].split(/\r?\n/)) {
    const field = line.match(/^([\w-]+):\s*(.*)$/);
    if (field) fields.set(field[1], field[2].trim().replace(/^(["'])(.*)\1$/, "$2"));
  }

  const title = fields.get("title");
  const description = fields.get("description");
  const date = fields.get("date");
  if (!title || !description || !date) {
    throw new Error(`Blog post ${fileName} needs title, description, and date fields.`);
  }
  if (Number.isNaN(Date.parse(date))) throw new Error(`Blog post ${fileName} has an invalid date.`);

  const slug = fileName.replace(/\.md$/, "");
  const relatedTools = (fields.get("relatedTools") ?? "")
    .replace(/^\[|\]$/g, "")
    .split(",")
    .map((tool) => tool.trim().replace(/^(["'])(.*)\1$/, "$2"))
    .filter(Boolean);

  const tags = (fields.get("tags") ?? "").replace(/^\[|\]$/g, "").split(",").map((tag) => tag.trim().replace(/^("|')(.*)\1$/, "$2")).filter(Boolean);
  const content = raw.slice(match[0].length).trim();
  const updated = fields.get("updated") || date;
  if (Number.isNaN(Date.parse(updated))) throw new Error(`Blog post ${fileName} has an invalid updated date.`);
  const words = content.replace(/[#*_`\[\]()!-]/g, " ").split(/\s+/).filter(Boolean).length;
  return {
    slug, title, description, date, updated,
    author: fields.get("author") || "Toolix Editorial Team",
    category: fields.get("category") || "Guides",
    tags,
    content,
    relatedTools,
    ctaTool: fields.get("ctaTool"),
    readingTime: Math.max(1, Math.ceil(words / 200))
  };
}

export function getBlogPosts(): BlogPost[] {
  return readdirSync(blogDirectory)
    .filter((fileName) => fileName.endsWith(".md") && fileName.toLowerCase() !== "readme.md")
    .map(parsePost)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return getBlogPosts().find((post) => post.slug === slug);
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#39;");
}

function renderInline(value: string): string {
  return escapeHtml(value)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\[([^\]]+)\]\(([^\s)]+)\)/g, (_match, label: string, href: string) => {
      const safeHref = /^(https?:|mailto:|\/|#)/i.test(href) ? href : "#";
      return `<a href="${safeHref}">${label}</a>`;
    })
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>");
}

/** Render the common Markdown blocks used by blog articles without allowing raw HTML. */
export function renderMarkdown(markdown: string): string {
  const lines = markdown.split(/\r?\n/);
  const html: string[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length) html.push(`<p>${renderInline(paragraph.join(" "))}</p>`);
    paragraph = [];
  };
  const flushList = () => {
    if (list.length) html.push(`<ul>${list.map((item) => `<li>${renderInline(item)}</li>`).join("")}</ul>`);
    list = [];
  };

  for (const line of lines) {
    const text = line.trim();
    const heading = text.match(/^(#{1,3})\s+(.+)$/);
    const item = text.match(/^[-*]\s+(.+)$/);
    if (heading) {
      flushParagraph(); flushList();
      const level = heading[1].length + 1;
      html.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
    } else if (item) {
      flushParagraph(); list.push(item[1]);
    } else if (!text) {
      flushParagraph(); flushList();
    } else {
      flushList(); paragraph.push(text);
    }
  }
  flushParagraph(); flushList();
  return html.join("\n");
}
