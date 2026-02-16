import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AdSlot } from "@/components/ads/AdSlot";
import { Breadcrumbs, breadcrumbSchema } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { ToolCalculator } from "@/components/tool-calculator";
import { guides } from "@/lib/guides";
import { buildMetadata } from "@/lib/seo";
import { getToolBySlug, tools } from "@/lib/tools";

export async function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};

  return buildMetadata({ title: tool.name, description: tool.summary, path: `/tools/${tool.slug}` });
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  const topSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP;
  const bottomSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_BOTTOM;

  if (!tool) notFound();

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Tools", href: "/tools" },
    { name: tool.name, href: `/tools/${tool.slug}` },
  ];

  const relatedGuides = guides.filter((guide) => guide.toolSlugs.includes(tool.slug)).slice(0, 6);

  return (
    <article className="space-y-8">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: tool.faqs.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: tool.name,
          applicationCategory: "FinanceApplication",
          operatingSystem: "Any",
          description: tool.summary,
          url: `https://moneymentor.tools/tools/${tool.slug}`,
        }}
      />

      <Breadcrumbs crumbs={crumbs} />

      <header>
        <p className="text-xs uppercase tracking-wide text-slate-500">{tool.category}</p>
        <h1 className="mt-2 text-3xl font-semibold">{tool.name}</h1>
        {topSlot ? <AdSlot slot={topSlot} className="mt-4" minHeight={280} /> : null}
        <p className="mt-3 text-slate-600">{tool.summary}</p>
      </header>

      <ToolCalculator tool={tool} />

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold">How we calculate</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-700">{tool.howWeCalculate.map((line) => <li key={line}>{line}</li>)}</ul>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold">Explanation and examples</h2>
          <div className="mt-3 space-y-2 text-slate-700">{tool.explanation.map((line) => <p key={line}>{line}</p>)}</div>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-700">{tool.examples.map((line) => <li key={line}>{line}</li>)}</ul>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold">Assumptions and edge cases</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-700">{tool.edgeCases.map((line) => <li key={line}>{line}</li>)}</ul>
          <h3 className="mt-5 text-lg font-semibold">Mini guide</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">{tool.miniGuide.map((line) => <li key={line}>{line}</li>)}</ul>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold">FAQ</h2>
        <div className="mt-3 space-y-4">
          {tool.faqs.map((faq) => (
            <div key={faq.question}>
              <h3 className="text-base font-semibold text-slate-900">{faq.question}</h3>
              <p className="mt-1 text-slate-700">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold">References and methodology notes</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-700">{tool.references.map((ref) => <li key={ref}>{ref}</li>)}</ul>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold">Related tools</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {tool.related.map((relatedSlug) => {
            const relatedTool = getToolBySlug(relatedSlug);
            if (!relatedTool) return null;
            return <Link key={relatedSlug} href={`/tools/${relatedSlug}`} className="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100">{relatedTool.name}</Link>;
          })}
        </div>
      </section>

      {relatedGuides.length > 0 ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold">Related guides</h2>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {relatedGuides.map((guide) => (
              <Link key={guide.slug} href={`/guides/${guide.slug}`} className="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100">
                {guide.title}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {bottomSlot ? <AdSlot slot={bottomSlot} className="rounded-2xl bg-white" minHeight={280} /> : null}

      <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        Disclaimer: Informational estimates only. This page is not personalized financial, tax, or legal advice.
      </p>
    </article>
  );
}
