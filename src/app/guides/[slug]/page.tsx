import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumbs, breadcrumbSchema } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { buildMetadata } from "@/lib/seo";
import { guides, guidesBySlug, loadGuideComponent } from "@/lib/guides";
import { getToolBySlug } from "@/lib/tools";

export async function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = guidesBySlug.get(slug);
  if (!guide) return {};

  return buildMetadata({
    title: guide.title,
    description: guide.description,
    path: `/guides/${guide.slug}`,
    type: "article",
  });
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guidesBySlug.get(slug);
  if (!guide) notFound();

  const guideModule = await loadGuideComponent(slug);
  if (!guideModule?.default) notFound();
  const Content = guideModule.default;

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Guides", href: "/guides" },
    { name: guide.title, href: `/guides/${guide.slug}` },
  ];

  return (
    <article className="space-y-8">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: guide.title,
          description: guide.description,
          datePublished: guide.publishDate,
          dateModified: guide.updatedDate,
          author: { "@type": "Person", name: guide.author },
          editor: { "@type": "Person", name: guide.editor },
          mainEntityOfPage: `https://moneymentor.tools/guides/${guide.slug}`,
        }}
      />

      <Breadcrumbs crumbs={crumbs} />

      <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold">{guide.title}</h1>
        <p className="mt-3 text-slate-600">{guide.description}</p>
        <div className="mt-4 text-sm text-slate-500">
          <p>By {guide.author}</p>
          <p>Edited by {guide.editor}</p>
          <p>
            Published {guide.publishDate} and updated {guide.updatedDate}
          </p>
        </div>
      </header>

      <section className="prose-content rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <Content />
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Related tools</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {guide.toolSlugs.map((toolSlug) => {
            const tool = getToolBySlug(toolSlug);
            if (!tool) return null;
            return (
              <Link
                key={toolSlug}
                href={`/tools/${toolSlug}`}
                className="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
              >
                {tool.name}
              </Link>
            );
          })}
        </div>
      </section>

      <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        Disclaimer: This guide is informational only and does not constitute financial, tax, legal, or investment advice.
      </p>
    </article>
  );
}
