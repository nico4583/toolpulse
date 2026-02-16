import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "Privacy disclosure for analytics, logs, and contact submissions.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-3xl font-semibold">Privacy Policy</h1>
      <p className="text-slate-700">We collect minimal technical logs needed for site reliability and abuse prevention. We do not sell personal data.</p>
      <p className="text-slate-700">If you email us, we keep your message to respond and improve editorial accuracy. You may request deletion by contacting us.</p>
      <p className="text-slate-700">This policy may be updated as the site evolves.</p>
    </div>
  );
}
