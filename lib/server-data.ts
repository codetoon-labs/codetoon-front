import { cache } from 'react';
import type { Locale } from '@/lib/i18n/config';
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
// Every fetcher takes the page locale; the CMS falls back to English for any
// field that has no Arabic translation yet.

export const getCategories = cache(async (locale: Locale = 'en'): Promise<any[]> => {
    try {
        const client = createApolloClient(locale);
        const { data } = await client.query<any>({ query: GET_CATEGORIES });
        return data?.allCategories ?? [];
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
});

const fetchProjects = cache(async (locale: Locale): Promise<any[]> => {
    try {
        const client = createApolloClient(locale);
        const { data } = await client.query<any>({ query: GET_PROJECTS });
        return data?.projects?.data ?? [];
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
});

// Project slugs are translatable in the CMS, but URLs must be the same in
// every language (hreflang pairs, the language switcher). Localised projects
// therefore keep their English slug, matched by id.
export const getProjects = cache(async (locale: Locale = 'en'): Promise<any[]> => {
    if (locale === 'en') return fetchProjects('en');
    const [localized, english] = await Promise.all([fetchProjects(locale), fetchProjects('en')]);
    const slugById = new Map(english.map((p: any) => [p.id, p.slug]));
    return localized.map((p: any) => ({ ...p, slug: slugById.get(p.id) ?? p.slug }));
});

export const getProjectBySlug = cache(async (slug: string, locale: Locale = 'en'): Promise<any | null> => {
    const projects = await getProjects(locale);
    return projects.find((p: any) => p.slug === slug) ?? null;
});

export const getCategoryBySlug = cache(async (slug: string, locale: Locale = 'en'): Promise<any | null> => {
    try {
        const client = createApolloClient(locale);
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

export const getTestimonials = cache(async (locale: Locale = 'en'): Promise<any[]> => {
    try {
        const client = createApolloClient(locale);
        const { data } = await client.query<any>({ query: GET_TESTIMONIALS });
        return data?.allTestimonials ?? [];
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        return [];
    }
});

export const getCustomers = cache(async (locale: Locale = 'en'): Promise<any[]> => {
    try {
        const client = createApolloClient(locale);
        const { data } = await client.query<any>({ query: GET_CUSTOMERS });
        return data?.allCustomers ?? [];
    } catch (error) {
        console.error('Error fetching customers:', error);
        return [];
    }
});

export const getTeams = cache(async (locale: Locale = 'en'): Promise<any[]> => {
    try {
        const client = createApolloClient(locale);
        const { data } = await client.query<any>({ query: GET_TEAMS });
        return data?.teams ?? [];
    } catch (error) {
        console.error('Error fetching teams:', error);
        return [];
    }
});

export const getServiceBySlug = cache(async (slug: string, locale: Locale = 'en'): Promise<any | null> => {
    try {
        const client = createApolloClient(locale);
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
