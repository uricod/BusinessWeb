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
