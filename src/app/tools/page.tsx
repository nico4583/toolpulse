import Link from "next/link";
import type { Metadata } from "next";
import { Pagination } from "@/components/pagination";
import { buildMetadata } from "@/lib/seo";
import { pageSize } from "@/lib/site";
import { tools } from "@/lib/tools";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const totalPages = Math.max(Math.ceil(tools.length / pageSize.tools), 1);
  const rawPage = Number(params.page ?? 1);
  const page = Number.isFinite(rawPage) ? Math.min(Math.max(Math.trunc(rawPage), 1), totalPages) : 1;
  const title = page > 1 ? `All Finance Tools - Page ${page}` : "All Finance Tools";
  const canonicalPath = page > 1 ? `/tools?page=${page}` : "/tools";

  return buildMetadata({
    title,
    description: "Browse practical calculators for debt, salary, budgeting, housing, and investing decisions.",
    path: canonicalPath,
  });
}

export default async function ToolsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const totalPages = Math.max(Math.ceil(tools.length / pageSize.tools), 1);
  const rawPage = Number(params.page ?? 1);
  const page = Number.isFinite(rawPage) ? Math.min(Math.max(Math.trunc(rawPage), 1), totalPages) : 1;
  const start = (page - 1) * pageSize.tools;
  const paged = tools.slice(start, start + pageSize.tools);

  return (
    <div>
      <h1 className="text-3xl font-semibold">Finance Tools</h1>
      <p className="mt-2 text-slate-600">{tools.length} calculators with formulas, assumptions, and practical guidance.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {paged.map((tool) => (
          <Link key={tool.slug} href={`/tools/${tool.slug}`} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">{tool.category}</p>
            <h2 className="mt-1 text-lg font-semibold">{tool.name}</h2>
            <p className="mt-2 text-sm text-slate-600">{tool.summary}</p>
          </Link>
        ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} basePath="/tools" />
    </div>
  );
}
