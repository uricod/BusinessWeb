"use client";

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
            {navLinks.map((link) => (
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
