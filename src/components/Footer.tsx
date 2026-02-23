import {
  HiOutlineMail,
  HiOutlinePhone,
} from "react-icons/hi";

const footerLinks = {
  Services: [
    "Custom App Development",
    "Business Intelligence",
    "Systems Integration",
    "AI & Automation",
    "Process Visibility",
    "BI Dashboards",
  ],
  Industries: ["Healthcare", "Manufacturing", "Real Estate", "E-Commerce"],
  Company: ["About Us", "Case Studies", "Testimonials", "Contact"],
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-light">
      {/* Subtle top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-ocean-500 to-coral-500 shadow-lg shadow-ocean-500/20">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-6 w-6 text-white"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M12 3C8 3 4 7 4 12c0 3 1.5 5.5 4 7 1-2 2-5 4-5s3 3 4 5c2.5-1.5 4-4 4-7 0-5-4-9-8-9z" />
                  <path d="M12 3c0 4-2 6-2 9s1 5 2 7c1-2 2-4 2-7s-2-5-2-9z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">TheAcropora</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              CPA-led technology consulting that combines deep industry
              expertise with cutting-edge custom application development. We
              know your business inside out.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href="mailto:hello@theacropora.com"
                className="flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
              >
                <HiOutlineMail size={16} />
                hello@theacropora.com
              </a>
              <a
                href="tel:+1234567890"
                className="flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
              >
                <HiOutlinePhone size={16} />
                (123) 456-7890
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white">
                {title}
              </h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href={
                        title === "Company"
                          ? `#${link.toLowerCase().replace(/\s/g, "-")}`
                          : "#services"
                      }
                      className="text-sm text-slate-400 transition-colors hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-4 border-t border-white/[0.06] pt-8 sm:flex-row sm:justify-between">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} TheAcropora. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
