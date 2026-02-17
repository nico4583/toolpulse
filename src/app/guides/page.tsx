import Link from "next/link";
import type { Metadata } from "next";
import { Pagination } from "@/components/pagination";
import { buildMetadata } from "@/lib/seo";
import { guides } from "@/lib/guides";
import { pageSize } from "@/lib/site";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const totalPages = Math.max(Math.ceil(guides.length / pageSize.guides), 1);
  const rawPage = Number(params.page ?? 1);
  const page = Number.isFinite(rawPage) ? Math.min(Math.max(Math.trunc(rawPage), 1), totalPages) : 1;
  const title = page > 1 ? `Personal Finance Guides - Page ${page}` : "Personal Finance Guides";
  const canonicalPath = page > 1 ? `/guides?page=${page}` : "/guides";

  return buildMetadata({
    title,
    description: "Long-form personal finance and salary guides with practical frameworks and internal tool links.",
    path: canonicalPath,
    type: "article",
  });
}

export default async function GuidesPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams;
  const totalPages = Math.max(Math.ceil(guides.length / pageSize.guides), 1);
  const rawPage = Number(params.page ?? 1);
  const page = Number.isFinite(rawPage) ? Math.min(Math.max(Math.trunc(rawPage), 1), totalPages) : 1;
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
