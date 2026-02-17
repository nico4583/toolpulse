import type { MetadataRoute } from "next";
import { guides } from "@/lib/guides";
import { SITE_URL } from "@/lib/seo";
import { tools } from "@/lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/tools", "/guides", "/about", "/contact", "/privacy", "/terms"];

  return [
    ...staticRoutes.map((path) => ({
      url: `${SITE_URL}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
      lastModified: new Date(),
    })),
    ...tools.map((tool) => ({
      url: `${SITE_URL}/tools/${tool.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      lastModified: new Date(),
    })),
    ...guides.map((guide) => ({
      url: `${SITE_URL}/guides/${guide.slug}`,
      changeFrequency: "monthly" as const,
      lastModified: guide.updatedDate,
      priority: 0.7,
    })),
  ];
}
