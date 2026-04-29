import type { MetadataRoute } from 'next';
import { GET_PROJECTS, GET_CATEGORIES } from '@/lib/graphql/queries';
import { createApolloClient } from '@/lib/apollo-client';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://codetoon.net';

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  try {
    const client = createApolloClient();
    
    // Fetch projects
    const { data: projectsData } = await client.query<any>({
      query: GET_PROJECTS,
    });
    
    // Fetch services (categories)
    const { data: categoriesData } = await client.query<any>({
      query: GET_CATEGORIES,
    });

    const projectRoutes: MetadataRoute.Sitemap = (projectsData?.projects?.data || []).map((project: any) => ({
      url: `${baseUrl}/project/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    const serviceRoutes: MetadataRoute.Sitemap = (categoriesData?.allCategories || []).map((category: any) => ({
      url: `${baseUrl}/service/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    return [...staticRoutes, ...projectRoutes, ...serviceRoutes];
  } catch (error) {
    console.error('Error fetching dynamic routes for sitemap:', error);
    // Graceful fallback to static routes only if GraphQL API fails
    return staticRoutes;
  }
}
