import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description: "Who runs MoneyMentor Tools, editorial standards, and calculator methodology commitments.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-3xl font-semibold">About MoneyMentor Tools</h1>
      <p className="text-slate-700">MoneyMentor Tools is an independent educational site focused on personal finance and salary planning. We publish calculator-driven resources with transparent assumptions.</p>
      <section>
        <h2 className="text-xl font-semibold">Who runs this site</h2>
        <p className="mt-2 text-slate-700">Author: Alex Rivera (Personal Finance Editor). Editor: Jordan Lee (Senior Content Editor). Our process prioritizes practical usefulness, factual consistency, and transparent formulas.</p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Editorial standards</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">
          <li>People-first writing with concrete examples and clear assumptions.</li>
          <li>No doorway pages, auto-spam content, or near-duplicate pages.</li>
          <li>Every calculator includes formula notes, edge cases, and limitations.</li>
          <li>AI-assisted drafts are edited for usefulness, coherence, and factual consistency.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Disclaimer</h2>
        <p className="mt-2 text-slate-700">Content is informational only and not a substitute for licensed financial, legal, tax, or investment advice. Consult qualified professionals for decisions with significant risk.</p>
      </section>
    </div>
  );
}
