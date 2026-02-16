import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms",
  description: "Terms of use and informational disclaimer for calculator and guide content.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-3xl font-semibold">Terms of Use</h1>
      <p className="text-slate-700">All content is provided for informational purposes only. Using this site does not create advisory, legal, or fiduciary relationships.</p>
      <p className="text-slate-700">Calculator outputs are estimates based on user-provided data and stated assumptions. You are responsible for verifying decisions using official documents and qualified professionals.</p>
      <p className="text-slate-700">We may revise content and formulas to improve accuracy and clarity.</p>
    </div>
  );
}
