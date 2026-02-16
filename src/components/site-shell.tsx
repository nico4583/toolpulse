import Link from "next/link";
import { legalNav, primaryNav, siteConfig } from "@/lib/site";

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="text-lg font-bold tracking-tight text-slate-900">
          {siteConfig.name}
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-4 text-sm font-medium">
          {primaryNav.map((item) => (
            <Link key={item.href} href={item.href} className="text-slate-700 hover:text-slate-900">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-700">Editorial standards</h2>
          <p className="mt-2 max-w-xl text-sm text-slate-600">
            We publish practical finance education with transparent formulas and assumptions. Content is informational only and not a substitute for licensed financial advice.
          </p>
        </div>
        <div className="sm:text-right">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-700">Legal</h2>
          <div className="mt-2 flex flex-wrap gap-3 sm:justify-end">
            {legalNav.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-slate-600 hover:text-slate-900">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
