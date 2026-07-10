import type { MetadataRoute } from "next";
import { properties } from "@/lib/data/properties";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3400";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/properties", "/agents", "/about", "/contact", "/login", "/register"].map(
    (path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    }),
  );

  const propertyRoutes = properties.map((p) => ({
    url: `${baseUrl}/properties/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...propertyRoutes];
}
