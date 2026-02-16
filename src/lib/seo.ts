import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export function absoluteUrl(path: string) {
  const cleaned = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${cleaned}`;
}

export function buildMetadata(args: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  const canonical = absoluteUrl(args.path);

  return {
    title: args.title,
    description: args.description,
    alternates: { canonical },
    openGraph: {
      title: args.title,
      description: args.description,
      url: canonical,
      type: args.type ?? "website",
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: args.title,
      description: args.description,
    },
  };
}

export function formatCurrency(amount: number, currency = "USD") {
  if (!Number.isFinite(amount)) return "-";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatNumber(value: number, digits = 2) {
  if (!Number.isFinite(value)) return "-";

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: digits,
  }).format(value);
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
