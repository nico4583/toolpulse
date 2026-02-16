import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Editorial contact details and feedback process for calculator corrections.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-3xl font-semibold">Contact</h1>
      <p className="mt-3 text-slate-700">Creator: Anonymous.</p>
      <p className="mt-2 text-slate-700">For suggestions or inquiries, email: <a className="underline" href="mailto:balanceo.systems@gmail.com">balanceo.systems@gmail.com</a></p>
      <p className="mt-2 text-slate-700">We review factual correction requests and calculator bug reports on a rolling basis.</p>
    </div>
  );
}
