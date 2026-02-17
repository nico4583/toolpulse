import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

const fallbackSiteUrl = "https://toolpulse-nine.vercel.app";

function normalizeSiteUrl(value: string) {
  return value.replace(/\/+$/, "");
}

export function getSiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return normalizeSiteUrl(fromEnv);
  if (siteConfig.url) return normalizeSiteUrl(siteConfig.url);
  return fallbackSiteUrl;
}

export const SITE_URL = getSiteUrl();

export function absoluteUrl(path: string) {
  const cleaned = path.startsWith("/") ? path : `/${path}`;
  return new URL(cleaned, SITE_URL).toString();
}

export function buildMetadata(args: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  robots?: Metadata["robots"];
}): Metadata {
  const canonical = absoluteUrl(args.path);
  const defaultOgImage = absoluteUrl(siteConfig.defaultOgImage);

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
      images: [{ url: defaultOgImage, width: 1200, height: 630, alt: siteConfig.name }],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: args.title,
      description: args.description,
      images: [defaultOgImage],
    },
    robots: args.robots ?? { index: true, follow: true },
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
