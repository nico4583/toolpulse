import Link from "next/link";
import { SiteSearch } from "@/components/site-search";
import { buildMetadata } from "@/lib/seo";
import { guides } from "@/lib/guides";
import { tools } from "@/lib/tools";

export const metadata = buildMetadata({
  title: "Personal Finance & Salary Tools",
  description:
    "People-first finance calculators and guides with transparent formulas, assumptions, and practical action steps.",
  path: "/",
});

export default function Home() {
  const featuredTools = tools.slice(0, 8);
  const featuredGuides = guides.slice(0, 4);

  return (
    <div className="space-y-10">
      <section className="rounded-3xl bg-gradient-to-r from-slate-900 to-slate-700 px-6 py-10 text-white sm:px-10">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-200">Personal Finance & Salary</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight">Plan money decisions with calculators that explain every assumption.</h1>
        <p className="mt-4 max-w-2xl text-slate-200">
          Every tool includes formulas, practical examples, edge cases, and related guides. Content is informational only and not individualized financial advice.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/tools" className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-slate-900">Browse Tools</Link>
          <Link href="/guides" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-white">Read Guides</Link>
        </div>
      </section>

      <SiteSearch />

      <section>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-2xl font-semibold">Featured Tools</h2>
          <Link href="/tools" className="text-sm font-medium text-slate-700 hover:text-slate-900">All tools</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredTools.map((tool) => (
            <Link key={tool.slug} href={`/tools/${tool.slug}`} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5">
              <p className="text-xs uppercase tracking-wide text-slate-500">{tool.category}</p>
              <h3 className="mt-1 text-lg font-semibold text-slate-900">{tool.name}</h3>
              <p className="mt-2 text-sm text-slate-600">{tool.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-2xl font-semibold">Featured Guides</h2>
          <Link href="/guides" className="text-sm font-medium text-slate-700 hover:text-slate-900">All guides</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {featuredGuides.map((guide) => (
            <Link key={guide.slug} href={`/guides/${guide.slug}`} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">{guide.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{guide.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
