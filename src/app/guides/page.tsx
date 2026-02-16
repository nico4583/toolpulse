import Link from "next/link";
import type { Metadata } from "next";
import { Pagination } from "@/components/pagination";
import { buildMetadata } from "@/lib/seo";
import { guides } from "@/lib/guides";
import { pageSize } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Personal Finance Guides",
  description: "Long-form personal finance and salary guides with practical frameworks and internal tool links.",
  path: "/guides",
  type: "article",
});

export default async function GuidesPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams;
  const page = Math.max(Number(params.page ?? 1), 1);
  const totalPages = Math.ceil(guides.length / pageSize.guides);
  const start = (page - 1) * pageSize.guides;
  const paged = guides.slice(start, start + pageSize.guides);

  return (
    <div>
      <h1 className="text-3xl font-semibold">Guides</h1>
      <p className="mt-2 text-slate-600">{guides.length} in-depth articles focused on personal finance and salary decisions.</p>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {paged.map((guide) => (
          <Link key={guide.slug} href={`/guides/${guide.slug}`} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">{guide.readingMinutes} min read</p>
            <h2 className="mt-1 text-lg font-semibold">{guide.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{guide.description}</p>
          </Link>
        ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} basePath="/guides" />
    </div>
  );
}
