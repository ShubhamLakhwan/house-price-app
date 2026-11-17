import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar active="Home" />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full bg-brand-100/60 blur-3xl" />
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 pb-16 pt-16 md:grid-cols-2 md:pt-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-xs font-semibold text-brand-600">
              <TrendIcon className="h-3.5 w-3.5" />
              Smart Real Estate Insights
            </span>

            <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] text-ink-900 md:text-6xl">
              House Price
              <br />
              Predictor
            </h1>

            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-500">
              Discover the estimated value of any home with a machine
              learning regression model trained on area, bedrooms, and
              property age.
            </p>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-700">
              {["Instant Predictions", "Easy to Use", "Data-Driven Estimate"].map(
                (item) => (
                  <span key={item} className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-brand-500" />
                    {item}
                  </span>
                )
              )}
            </div>

            <div className="mt-8 flex items-center gap-6">
              <Link
                href="/predict"
                className="flex items-center gap-2 rounded-lg bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-brand-500/20 transition hover:bg-brand-600"
              >
                Start Predicting
                <ArrowIcon className="h-4 w-4" />
              </Link>
              <a
                href="#about"
                className="flex items-center gap-2 text-sm font-semibold text-ink-700 transition hover:text-brand-600"
              >
                Learn More
                <PlayIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <HouseIllustration />
            <div className="absolute -right-4 top-6 w-56 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-slate-100 md:-right-10">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-500">
                  <HouseIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs text-ink-500">Sample Estimate</p>
                  <p className="text-lg font-bold text-ink-900">₹91 Lakhs</p>
                </div>
              </div>
              <p className="mt-2 text-xs text-ink-500">
                2,000 sqft · 3 BHK · 5 yrs old
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature strip */}
      <section id="about" className="border-y border-slate-100 bg-slate-50/60">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: <ChartIcon className="h-5 w-5" />,
              title: "Regression Model",
              desc: "A LinearRegression model trained on area, bedrooms, and age.",
            },
            {
              icon: <BoltIcon className="h-5 w-5" />,
              title: "Instant Results",
              desc: "Get a price estimate in under a second.",
            },
            {
              icon: <ShieldIcon className="h-5 w-5" />,
              title: "Transparent Metrics",
              desc: "Real R² and error figures, shown as-is on the Insights page.",
            },
            {
              icon: <HandshakeIcon className="h-5 w-5" />,
              title: "Portfolio Ready",
              desc: "Built and deployed end-to-end as a showcase project.",
            },
          ].map((f) => (
            <div key={f.title} className="flex flex-col gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-500">
                {f.icon}
              </span>
              <p className="text-sm font-semibold text-ink-900">{f.title}</p>
              <p className="text-xs leading-relaxed text-ink-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Insights / disclosure section */}
      <section id="insights" className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-ink-900">
              How this model was built
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-500">
              This predictor uses a scikit-learn LinearRegression model with
              three inputs — built-up area, number of bedrooms, and property
              age — to estimate price. It's trained on a synthetic dataset
              generated for this project, not real listings, so treat
              predictions as illustrative rather than a market valuation.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-6">
            <p className="text-sm font-semibold text-ink-900">
              Model performance (on held-out synthetic data)
            </p>
            <p className="mt-1 text-xs text-ink-500">
              Computed once during training — see{" "}
              <code className="rounded bg-slate-200 px-1 py-0.5">
                /model-info
              </code>{" "}
              on the API for live figures.
            </p>
            <dl className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <dt className="text-xs text-ink-500">R² Score</dt>
                <dd className="mt-1 text-lg font-bold text-ink-900">0.96</dd>
              </div>
              <div>
                <dt className="text-xs text-ink-500">MAE</dt>
                <dd className="mt-1 text-lg font-bold text-ink-900">
                  ₹6.8L
                </dd>
              </div>
              <div>
                <dt className="text-xs text-ink-500">RMSE</dt>
                <dd className="mt-1 text-lg font-bold text-ink-900">
                  ₹8.3L
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <footer id="contact" className="border-t border-slate-100 py-8">
        <div className="mx-auto max-w-6xl px-6 text-xs text-ink-500">
          Built with Next.js, FastAPI, and scikit-learn.
        </div>
      </footer>
    </main>
  );
}

function HouseIllustration() {
  return (
    <svg viewBox="0 0 400 320" className="w-full">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#eff6ff" />
          <stop offset="100%" stopColor="#dbeafe" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="400" height="320" rx="24" fill="url(#sky)" />
      <rect x="40" y="260" width="320" height="10" rx="5" fill="#bfdbfe" />
      <path d="M90 180 L200 100 L310 180 V260 H90 Z" fill="#1d4ed8" opacity="0.08" />
      <rect x="110" y="180" width="180" height="80" rx="6" fill="white" stroke="#93c5fd" strokeWidth="2" />
      <path d="M100 190 L200 115 L300 190" fill="none" stroke="#2563eb" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="185" y="210" width="30" height="50" rx="2" fill="#2563eb" />
      <rect x="130" y="200" width="30" height="30" rx="2" fill="#bfdbfe" />
      <rect x="240" y="200" width="30" height="30" rx="2" fill="#bfdbfe" />
    </svg>
  );
}

function TrendIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M3 17l6-6 4 4 8-8M21 7h-6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.12" />
      <path d="M8 12.5l2.5 2.5L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10 8.5l6 3.5-6 3.5v-7z" fill="currentColor" />
    </svg>
  );
}
function HouseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M3 11.5 12 4l9 7.5M5.5 10v9.5a1 1 0 0 0 1 1H10v-6h4v6h3.5a1 1 0 0 0 1-1V10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ChartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M4 20V10M12 20V4M20 20v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function BoltIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}
function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}
function HandshakeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M2 12l5-4 4 2 3-3 5 2 3 3-4 4-3-2-2 2h-3l-2-2-3 1-3-3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
