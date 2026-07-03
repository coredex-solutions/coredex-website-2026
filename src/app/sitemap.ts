import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import prisma from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ["", "/about", "/services", "/projects", "/contact", "/privacy", "/terms", "/cookies"];
  const locales = ["en", "ar"];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      sitemapEntries.push({
        url: `${SITE_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route === "" ? 1.0 : 0.8,
        alternates: {
          languages: {
            en: `${SITE_URL}/en${route}`,
            ar: `${SITE_URL}/ar${route}`,
            "x-default": `${SITE_URL}/en${route}`,
          },
        },
      });
    }
  }

  try {
    const projects = await prisma.project.findMany({
      where: { isActive: true },
      select: { slug: true, updatedAt: true },
    });

    for (const locale of locales) {
      for (const project of projects) {
        sitemapEntries.push({
          url: `${SITE_URL}/${locale}/projects/${project.slug}`,
          lastModified: project.updatedAt,
          changeFrequency: "monthly",
          priority: 0.6,
          alternates: {
            languages: {
              en: `${SITE_URL}/en/projects/${project.slug}`,
              ar: `${SITE_URL}/ar/projects/${project.slug}`,
              "x-default": `${SITE_URL}/en/projects/${project.slug}`,
            },
          },
        });
      }
    }
  } catch (e) {
    console.error("Failed to fetch projects for sitemap", e);
  }

  return sitemapEntries;
}
