import type { MetadataRoute } from "next";
import { guides } from "@/lib/guides";
import { siteConfig } from "@/lib/site";
import { tools } from "@/lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/tools", "/guides", "/about", "/contact", "/privacy", "/terms"];

  return [
    ...staticRoutes.map((path) => ({
      url: `${siteConfig.url}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...tools.map((tool) => ({
      url: `${siteConfig.url}/tools/${tool.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...guides.map((guide) => ({
      url: `${siteConfig.url}/guides/${guide.slug}`,
      changeFrequency: "monthly" as const,
      lastModified: guide.updatedDate,
      priority: 0.7,
    })),
  ];
}
