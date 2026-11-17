"use client";

import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/predict", label: "Predict" },
  { href: "/#about", label: "About" },
  { href: "/#insights", label: "Insights" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar({ active }: { active?: string }) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white">
            <HouseIcon className="h-4 w-4" />
          </span>
          <span className="text-lg font-semibold text-ink-900">
            HousePrice<span className="text-brand-500">AI</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-ink-700 md:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={
                active === link.label
                  ? "border-b-2 border-brand-500 pb-1 text-brand-600"
                  : "pb-1 transition hover:text-brand-600"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/predict"
          className="flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-600"
        >
          <BarsIcon className="h-4 w-4" />
          Get Started
        </Link>
      </div>
    </header>
  );
}

function HouseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M3 11.5 12 4l9 7.5M5.5 10v9.5a1 1 0 0 0 1 1H10v-6h4v6h3.5a1 1 0 0 0 1-1V10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BarsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M5 19V13M12 19V9M19 19V5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
