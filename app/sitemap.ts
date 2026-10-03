import type { MetadataRoute } from 'next';
import { getCategories, getProjects } from '@/lib/server-data';
import { absoluteUrl, locales } from '@/lib/i18n/config';

// The CMS doesn't expose an updated_at on projects/categories, so a per-URL
// lastModified would just be "now" on every request — a false freshness signal.
// One build-time date for the whole file is the honest version.
const BUILD_DATE = new Date();

// Each page exists once per locale (/x and /ar/x). Both get an entry, and each
// entry lists every language version so search engines pair them (hreflang).
function localized(entries: MetadataRoute.Sitemap): MetadataRoute.Sitemap {
  return entries.flatMap((entry) => {
    const path = entry.url || '/';
    const languages = Object.fromEntries(locales.map((l) => [l, absoluteUrl(path, l)]));
    return locales.map((locale) => ({
      ...entry,
      url: absoluteUrl(path, locale),
      alternates: { languages },
    }));
  });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Locale-agnostic paths here; localized() expands them to absolute URLs.

  // Static routes. /products is deliberately absent — it's a placeholder and
  // is marked noindex until it has real content.
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: '/',
      lastModified: BUILD_DATE,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: '/about-us',
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: '/solutions',
      lastModified: BUILD_DATE,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: '/projects',
      lastModified: BUILD_DATE,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: '/privacy',
      lastModified: BUILD_DATE,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  try {
    // Solutions (categories) also carry the services beneath them. Projects
    // come back with their English slug, which is the URL in every language.
    const [projects, categories] = await Promise.all([getProjects('en'), getCategories('en')]);

    const projectRoutes: MetadataRoute.Sitemap = projects
      .filter((project: any) => project?.slug)
      .map((project: any) => ({
        url: `/project/${project.slug}`,
        lastModified: BUILD_DATE,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }));

    const solutionRoutes: MetadataRoute.Sitemap = categories
      .filter((category: any) => category?.slug)
      .map((category: any) => ({
        url: `/solution/${category.slug}`,
        lastModified: BUILD_DATE,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }));

    // Service pages carry the commercial-intent keywords and were missing
    // entirely. They live one level under each solution; dedupe because a
    // service can be attached to more than one category.
    const serviceSlugs = new Set<string>();
    for (const category of categories) {
      for (const service of category?.services || []) {
        if (service?.slug) serviceSlugs.add(service.slug);
      }
    }

    const serviceRoutes: MetadataRoute.Sitemap = [...serviceSlugs].map((slug) => ({
      url: `/service/${slug}`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    return localized([...staticRoutes, ...projectRoutes, ...solutionRoutes, ...serviceRoutes]);
  } catch (error) {
    console.error('Error fetching dynamic routes for sitemap:', error);
    // Graceful fallback to static routes only if GraphQL API fails
    return localized(staticRoutes);
  }
}
