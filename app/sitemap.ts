import type { MetadataRoute } from 'next';
import { GET_PROJECTS, GET_CATEGORIES } from '@/lib/graphql/queries';
import { createApolloClient } from '@/lib/apollo-client';

// The CMS doesn't expose an updated_at on projects/categories, so a per-URL
// lastModified would just be "now" on every request — a false freshness signal.
// One build-time date for the whole file is the honest version.
const BUILD_DATE = new Date();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://codetoon.net';

  // Static routes. /products is deliberately absent — it's a placeholder and
  // is marked noindex until it has real content.
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: BUILD_DATE,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/solutions`,
      lastModified: BUILD_DATE,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: BUILD_DATE,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: BUILD_DATE,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  try {
    const client = createApolloClient();

    // Fetch projects
    const { data: projectsData } = await client.query<any>({
      query: GET_PROJECTS,
    });

    // Fetch solutions (categories) — these also carry the services beneath them
    const { data: categoriesData } = await client.query<any>({
      query: GET_CATEGORIES,
    });

    const projectRoutes: MetadataRoute.Sitemap = (projectsData?.projects?.data || [])
      .filter((project: any) => project?.slug)
      .map((project: any) => ({
        url: `${baseUrl}/project/${project.slug}`,
        lastModified: BUILD_DATE,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }));

    const categories = categoriesData?.allCategories || [];

    const solutionRoutes: MetadataRoute.Sitemap = categories
      .filter((category: any) => category?.slug)
      .map((category: any) => ({
        url: `${baseUrl}/solution/${category.slug}`,
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
      url: `${baseUrl}/service/${slug}`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    return [...staticRoutes, ...projectRoutes, ...solutionRoutes, ...serviceRoutes];
  } catch (error) {
    console.error('Error fetching dynamic routes for sitemap:', error);
    // Graceful fallback to static routes only if GraphQL API fails
    return staticRoutes;
  }
}
