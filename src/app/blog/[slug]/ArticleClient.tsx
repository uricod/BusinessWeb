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
