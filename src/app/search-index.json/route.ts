import { NextResponse } from "next/server";
import { guides } from "@/lib/guides";
import { tools } from "@/lib/tools";

export function GET() {
  const payload = [
    ...tools.map((tool) => ({ title: tool.name, href: `/tools/${tool.slug}`, type: "tool" })),
    ...guides.map((guide) => ({ title: guide.title, href: `/guides/${guide.slug}`, type: "guide" })),
  ];

  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "public, max-age=3600",
    },
  });
}
