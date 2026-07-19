import { cache } from 'react';
import { createApolloClient } from '@/lib/apollo-client';
import {
    GET_CATEGORIES,
    GET_PROJECTS,
    GET_CATEGORY_BY_SLUG,
    GET_SERVICE_BY_SLUG,
    GET_TESTIMONIALS,
    GET_CUSTOMERS,
    GET_TEAMS,
} from '@/lib/graphql/queries';

// Server-side data fetchers so page content is present in the initial HTML
// (search engines and AI crawlers don't execute client-side JavaScript).
// cache() dedupes calls within a single request (e.g. generateMetadata + page).

export const getCategories = cache(async (): Promise<any[]> => {
    try {
        const client = createApolloClient();
        const { data } = await client.query<any>({ query: GET_CATEGORIES });
        return data?.allCategories ?? [];
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
});

export const getProjects = cache(async (): Promise<any[]> => {
    try {
        const client = createApolloClient();
        const { data } = await client.query<any>({ query: GET_PROJECTS });
        return data?.projects?.data ?? [];
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
});

export const getProjectBySlug = cache(async (slug: string): Promise<any | null> => {
    const projects = await getProjects();
    return projects.find((p: any) => p.slug === slug) ?? null;
});

export const getCategoryBySlug = cache(async (slug: string): Promise<any | null> => {
    try {
        const client = createApolloClient();
        const { data } = await client.query<any>({
            query: GET_CATEGORY_BY_SLUG,
            variables: { slug },
        });
        return data?.category ?? null;
    } catch (error) {
        console.error(`Error fetching category "${slug}":`, error);
        return null;
    }
});

export const getTestimonials = cache(async (): Promise<any[]> => {
    try {
        const client = createApolloClient();
        const { data } = await client.query<any>({ query: GET_TESTIMONIALS });
        return data?.allTestimonials ?? [];
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        return [];
    }
});

export const getCustomers = cache(async (): Promise<any[]> => {
    try {
        const client = createApolloClient();
        const { data } = await client.query<any>({ query: GET_CUSTOMERS });
        return data?.allCustomers ?? [];
    } catch (error) {
        console.error('Error fetching customers:', error);
        return [];
    }
});

export const getTeams = cache(async (): Promise<any[]> => {
    try {
        const client = createApolloClient();
        const { data } = await client.query<any>({ query: GET_TEAMS });
        return data?.teams ?? [];
    } catch (error) {
        console.error('Error fetching teams:', error);
        return [];
    }
});

export const getServiceBySlug = cache(async (slug: string): Promise<any | null> => {
    try {
        const client = createApolloClient();
        const { data } = await client.query<any>({
            query: GET_SERVICE_BY_SLUG,
            variables: { slug },
        });
        return data?.service ?? null;
    } catch (error) {
        console.error(`Error fetching service "${slug}":`, error);
        return null;
    }
});
