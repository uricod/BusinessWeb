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
