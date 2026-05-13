import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/siteMetadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleClient from "./ArticleClient";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    keywords: post.keywords,
    openGraph: {
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
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

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
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
