import { getAllPosts } from "@/lib/blog";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/siteMetadata";
import type { Metadata } from "next";
import BlogListClient from "./BlogListClient";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
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
