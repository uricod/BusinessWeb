# Blog System Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a markdown-powered, SEO-optimized blog to theacropora.com with listing and article pages, while keeping the homepage unchanged.

**Architecture:** Markdown files in `src/content/blog/` are parsed at build time using `gray-matter` and `react-markdown`. Next.js static export generates `/blog` and `/blog/[slug]` pages. Navbar adapts behavior based on route (hidden-until-scroll on homepage, always-visible on blog pages).

**Tech Stack:** Next.js 16, React 19, gray-matter, react-markdown, remark-gfm, Tailwind 4, Framer Motion

---

### Task 1: Install Markdown Dependencies

**Files:**
- Modify: `package.json`

**Step 1: Install packages**

Run:
```bash
cd /c/Users/uri/Documents/AiBit/businessweb && npm install gray-matter react-markdown remark-gfm
```

**Step 2: Verify installation**

Run:
```bash
cd /c/Users/uri/Documents/AiBit/businessweb && node -e "require('gray-matter'); require('react-markdown'); console.log('OK')"
```
Expected: `OK`

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add gray-matter, react-markdown, remark-gfm dependencies"
```

---

### Task 2: Create Blog Utility Functions

**Files:**
- Create: `src/lib/blog.ts`

**Step 1: Create the blog utility module**

This module reads markdown files from `src/content/blog/`, parses frontmatter, and returns structured post data. It uses Node.js `fs` which runs at build time only (static export).

```typescript
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  keywords: string[];
  author: string;
  content: string;
  readTime: number;
}

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

function calculateReadTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const filePath = path.join(BLOG_DIR, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    return {
      slug,
      title: data.title || slug,
      description: data.description || "",
      date: data.date || "",
      keywords: data.keywords || [],
      author: data.author || "TheAcropora",
      content,
      readTime: calculateReadTime(content),
    };
  });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}
```

**Step 2: Create content directory and a sample post**

Create: `src/content/blog/sample-post.md`

```markdown
---
title: "How AI Is Transforming Nursing Home Operations"
description: "A practical look at how skilled nursing facilities are using AI to automate billing, detect fraud, and improve operational efficiency."
date: "2026-03-05"
keywords: ["ai nursing homes", "nursing home ai", "healthcare automation"]
author: "TheAcropora"
---

## The Current State of AI in Nursing Homes

Most nursing home groups are still running critical operations manually. Billing teams spend weeks generating invoices. Compliance monitoring is reactive rather than proactive. And data lives in disconnected systems that don't talk to each other.

That's changing fast.

## What's Actually Working

We've seen three areas where AI delivers immediate, measurable results for skilled nursing facilities:

### 1. Automated Billing and Invoice Generation

The biggest time sink for most nursing home groups is billing. The typical process involves pulling data from the EHR, cross-referencing contracts, and manually building invoices -- a cycle that takes one to two weeks.

Automated billing pipelines can reduce this to seconds. The system connects directly to the EHR, matches treatments against contracted rates, and generates audit-ready invoices automatically.

### 2. Fraud Detection and Compliance Monitoring

AI-powered monitoring systems can flag anomalies in EVV data, billing patterns, and documentation in real time -- catching issues before they become audit findings.

### 3. Operational Dashboards

Real-time dashboards that pull from multiple systems give administrators visibility into census, staffing, financials, and compliance metrics without waiting for periodic reports.

## Getting Started

The key is starting with one high-impact workflow rather than trying to transform everything at once. Identify the process that consumes the most manual hours and has the most error-prone steps. That's your first automation candidate.

If you're evaluating AI for your nursing home group, [get in touch](https://theacropora.com/#contact) -- we can help you identify where automation will have the biggest impact.
```

**Step 3: Commit**

```bash
git add src/lib/blog.ts src/content/blog/sample-post.md
git commit -m "feat: add blog utility functions and sample post"
```

---

### Task 3: Create Blog Listing Page

**Files:**
- Create: `src/app/blog/page.tsx`

**Step 1: Build the blog listing page**

This page displays all posts in a card grid. It matches the existing site aesthetic (dark background, gradient accents). SEO metadata is set via Next.js `generateMetadata`.

```tsx
import { getAllPosts } from "@/lib/blog";
import type { Metadata } from "next";
import BlogListClient from "./BlogListClient";

export const metadata: Metadata = {
  title: "Blog | TheAcropora",
  description:
    "Insights on AI automation, healthcare technology, and custom software for mid-size businesses. Practical guides from real implementations.",
  keywords: [
    "ai automation blog",
    "healthcare technology",
    "custom software insights",
    "business automation",
  ],
};

export default function BlogPage() {
  const posts = getAllPosts();

  return <BlogListClient posts={posts} />;
}
```

**Step 2: Create the client component for blog listing**

Create: `src/app/blog/BlogListClient.tsx`

```tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

function PostCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/blog/${post.slug}`} className="group block">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-yellow-400/30 hover:bg-white/10 sm:p-8">
          {/* Date and read time */}
          <div className="mb-3 flex items-center gap-3 text-sm text-slate-400">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
            <span className="text-slate-600">|</span>
            <span>{post.readTime} min read</span>
          </div>

          {/* Title */}
          <h2 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-yellow-400 sm:text-2xl">
            {post.title}
          </h2>

          {/* Description */}
          <p className="mb-4 line-clamp-3 text-slate-400">
            {post.description}
          </p>

          {/* Keywords */}
          <div className="flex flex-wrap gap-2">
            {post.keywords.slice(0, 3).map((kw) => (
              <span
                key={kw}
                className="rounded-full bg-ocean-500/10 px-3 py-1 text-xs text-ocean-400"
              >
                {kw}
              </span>
            ))}
          </div>

          {/* Read more indicator */}
          <div className="mt-4 flex items-center text-sm font-medium text-yellow-400 opacity-0 transition-opacity group-hover:opacity-100">
            Read article
            <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function BlogListClient({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="min-h-screen bg-navy">
      {/* Header */}
      <div className="relative overflow-hidden pb-16 pt-32">
        {/* Background gradient orbs */}
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-ocean-500/10 blur-3xl" />
        <div className="absolute top-20 right-1/4 h-72 w-72 rounded-full bg-yellow-400/5 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
              Blog
            </h1>
            <p className="max-w-2xl text-lg text-slate-400">
              Practical insights on AI automation, healthcare technology, and
              building custom software for mid-size businesses.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Post Grid */}
      <div className="mx-auto max-w-5xl px-4 pb-24 sm:px-6 lg:px-8">
        {posts.length === 0 ? (
          <p className="text-center text-slate-500">
            No posts yet. Check back soon.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {posts.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

**Step 3: Commit**

```bash
git add src/app/blog/page.tsx src/app/blog/BlogListClient.tsx
git commit -m "feat: add blog listing page with post cards"
```

---

### Task 4: Create Blog Article Page

**Files:**
- Create: `src/app/blog/[slug]/page.tsx`
- Create: `src/app/blog/[slug]/ArticleClient.tsx`

**Step 1: Build the article server component with SEO metadata and static params**

```tsx
import { getAllSlugs, getPostBySlug, getAllPosts } from "@/lib/blog";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleClient from "./ArticleClient";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: `${post.title} | TheAcropora`,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      url: `https://theacropora.com/blog/${post.slug}`,
    },
    alternates: {
      canonical: `https://theacropora.com/blog/${post.slug}`,
    },
  };
}

export default function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: post.author,
      url: "https://theacropora.com",
    },
    publisher: {
      "@type": "Organization",
      name: "TheAcropora",
      url: "https://theacropora.com",
    },
    mainEntityOfPage: `https://theacropora.com/blog/${post.slug}`,
    keywords: post.keywords.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleClient post={post} />
    </>
  );
}
```

**Step 2: Build the article client component with markdown rendering**

```tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { BlogPost } from "@/lib/blog";

export default function ArticleClient({ post }: { post: BlogPost }) {
  return (
    <div className="min-h-screen bg-navy">
      {/* Article Header */}
      <div className="relative overflow-hidden pb-12 pt-32">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-ocean-500/10 blur-3xl" />
        <div className="absolute top-20 right-1/3 h-72 w-72 rounded-full bg-yellow-400/5 blur-3xl" />

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/blog"
              className="mb-8 inline-flex items-center text-sm text-slate-400 transition-colors hover:text-yellow-400"
            >
              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Back to Blog
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Meta */}
            <div className="mb-4 flex items-center gap-3 text-sm text-slate-400">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
              <span className="text-slate-600">|</span>
              <span>{post.readTime} min read</span>
            </div>

            {/* Title */}
            <h1 className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            {/* Keywords */}
            <div className="flex flex-wrap gap-2">
              {post.keywords.map((kw) => (
                <span
                  key={kw}
                  className="rounded-full bg-ocean-500/10 px-3 py-1 text-xs text-ocean-400"
                >
                  {kw}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Article Body */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8"
      >
        <article className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-headings:font-bold prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-2xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-xl prose-p:text-slate-300 prose-p:leading-relaxed prose-a:text-yellow-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-li:text-slate-300 prose-code:text-yellow-400 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-blockquote:border-yellow-400/50 prose-blockquote:text-slate-400 prose-table:text-slate-300 prose-th:text-white prose-hr:border-white/10">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </article>

        {/* CTA Section */}
        <div className="mt-16 rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm">
          <h3 className="mb-3 text-xl font-bold text-white">
            Have a similar challenge?
          </h3>
          <p className="mb-6 text-slate-400">
            We help mid-size businesses automate complex operations with custom AI solutions. Let&apos;s talk about what&apos;s possible for your organization.
          </p>
          <a
            href="https://theacropora.com/#contact"
            className="inline-block rounded-full bg-yellow-400 px-8 py-3 text-sm font-semibold text-navy transition-all hover:bg-yellow-300 hover:shadow-lg hover:shadow-yellow-400/20"
          >
            Get in Touch
          </a>
        </div>
      </motion.div>
    </div>
  );
}
```

**Step 3: Commit**

```bash
git add src/app/blog/[slug]/page.tsx src/app/blog/[slug]/ArticleClient.tsx
git commit -m "feat: add blog article page with markdown rendering and SEO"
```

---

### Task 5: Create Blog Navbar

**Files:**
- Create: `src/components/BlogNavbar.tsx`

**Step 1: Build a blog-specific navbar that's always visible**

This navbar is used on blog pages only. It's always visible (no scroll-triggered appearance), links logo to homepage, and includes Blog / Our Work / Contact links.

```tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { label: "Blog", href: "/blog" },
  { label: "Our Work", href: "/#testimonials" },
  { label: "Contact", href: "/#contact" },
];

export default function BlogNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl shadow-[0_1px_30px_rgba(0,0,0,0.08)]">
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ocean-500/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-300 shadow-lg shadow-yellow-400/20 transition-shadow group-hover:shadow-yellow-400/40">
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" strokeWidth={1.8}>
                <path d="M12 21c0-4 0-6-1-9s-3-5-3-8c0-1.5 1-2 2-1.5s2 2 2 4" stroke="white" strokeLinecap="round" />
                <path d="M12 12c1-2 3-3.5 5-4.5 1-.5 2 0 1.5 1s-2 2.5-3.5 3.5" stroke="white" strokeLinecap="round" />
                <path d="M10 14c-1.5-1-3.5-1.5-5-1-.8.3-.5 1.2.3 1.5s3 .5 4.2-.5" stroke="white" strokeLinecap="round" />
                <circle cx="8" cy="4" r="1" fill="white" />
                <circle cx="17.5" cy="8" r="1" fill="white" />
                <circle cx="5.5" cy="13.5" r="0.8" fill="white" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-navy">
              TheAcropora
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-100 hover:text-navy"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              className="ml-4 rounded-full bg-yellow-400 px-6 py-2.5 text-sm font-semibold text-navy shadow-lg shadow-yellow-400/20 transition-all hover:bg-yellow-300 hover:shadow-yellow-400/40"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile: simple links */}
          <div className="flex items-center gap-4 md:hidden">
            <Link href="/blog" className="text-sm font-medium text-slate-600">
              Blog
            </Link>
            <Link
              href="/#contact"
              className="rounded-full bg-yellow-400 px-4 py-2 text-sm font-semibold text-navy"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/BlogNavbar.tsx
git commit -m "feat: add always-visible blog navbar component"
```

---

### Task 6: Add Blog Layout with BlogNavbar and Footer

**Files:**
- Create: `src/app/blog/layout.tsx`

**Step 1: Create the blog layout that wraps all blog pages**

```tsx
import BlogNavbar from "@/components/BlogNavbar";
import Footer from "@/components/Footer";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BlogNavbar />
      {children}
      <Footer />
    </>
  );
}
```

**Step 2: Commit**

```bash
git add src/app/blog/layout.tsx
git commit -m "feat: add blog layout with navbar and footer"
```

---

### Task 7: Add Blog Link to Homepage Navbar

**Files:**
- Modify: `src/components/Navbar.tsx`

**Step 1: Add "Blog" link to the homepage navbar's navLinks array**

Change line 8 from:
```typescript
const navLinks = [
  { label: "Our Work", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];
```
To:
```typescript
const navLinks = [
  { label: "Blog", href: "/blog" },
  { label: "Our Work", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];
```

This only appears when the navbar fades in after scrolling -- the homepage above-the-fold experience is unchanged.

**Step 2: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: add blog link to homepage navbar"
```

---

### Task 8: Add Tailwind Typography Plugin

**Files:**
- Modify: `package.json`

**Step 1: Install the typography plugin**

The article page uses `prose` classes for markdown styling. Tailwind 4 needs the typography plugin.

Run:
```bash
cd /c/Users/uri/Documents/AiBit/businessweb && npm install @tailwindcss/typography
```

**Step 2: Import in globals.css**

Add to the top of `src/app/globals.css` (after the tailwindcss import on line 1):

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
```

**Step 3: Commit**

```bash
git add package.json package-lock.json src/app/globals.css
git commit -m "chore: add tailwind typography plugin for blog prose styling"
```

---

### Task 9: Build and Verify

**Step 1: Run the build**

```bash
cd /c/Users/uri/Documents/AiBit/businessweb && NODE_OPTIONS="--max-old-space-size=8192" npm run build 2>&1
```

Expected: Build succeeds, generates static pages for `/`, `/blog`, and `/blog/sample-post`.

**Step 2: Verify generated pages**

```bash
ls -la /c/Users/uri/Documents/AiBit/businessweb/out/blog/
ls -la /c/Users/uri/Documents/AiBit/businessweb/out/blog/sample-post/
```

Expected: `index.html` files exist in both directories.

**Step 3: Commit all remaining changes**

```bash
git add -A
git commit -m "feat: complete blog system with listing page, article pages, and SEO"
```

---

### Task 10: Verify and Clean Up Sample Post (Optional)

After verifying the build works, you can either:
- Keep the sample post as your first article
- Replace it with real SEOmachine output
- Delete it once you've confirmed everything works

The blog listing gracefully handles zero posts (shows "No posts yet. Check back soon.").
