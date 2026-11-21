# Add a blog post

Create a `.md` file in this folder. Its filename becomes the URL slug, so
`my-new-guide.md` is published at `/blog/my-new-guide` after the next build.

Add these fields at the top of the file:

```md
---
title: "A clear article title"
description: "A short summary for search results and the blog listing."
date: "2026-11-21"
updated: "2026-11-21"
author: "Your name or team"
category: "Guides"
tags: ["salary", "planning"]
relatedTools: ["salary-raise-calculator"]
ctaTool: "salary-raise-calculator"
---

Write the article here using headings, paragraphs, lists, links, bold, and inline code.
```

`updated`, `category`, `tags`, `relatedTools` and `ctaTool` are optional; `author`
defaults to “Toolix Editorial Team”. Use tool slugs from `src/lib/site.ts`;
unknown slugs are ignored. Reading time is estimated automatically from the
Markdown body. Blog pages, filters, metadata, Article schema and sitemap entries
are generated from these Markdown files. The listing paginates automatically
after six matching posts.
