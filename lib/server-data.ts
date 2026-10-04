import { cache } from 'react';
import type { Locale } from '@/lib/i18n/config';
import { englishSlug, localize } from '@/lib/i18n/cms';
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
//
// The CMS returns every translatable field in all locales (`title { en ar }`),
// so each query runs once regardless of language; the exported fetchers then
// localize() the result for the page, falling back to English per field.

export async function cmsQuery<T>(label: string, document: any, variables?: Record<string, unknown>): Promise<T | null> {
    try {
        const client = createApolloClient();
        const { data } = await client.query<any>({ query: document, variables });
        return data ?? null;
    } catch (error) {
        console.error(`Error fetching ${label}:`, error);
        return null;
    }
}

const fetchCategories = cache(async () => (await cmsQuery<any>('categories', GET_CATEGORIES))?.allCategories ?? []);
const fetchProjects = cache(async () => (await cmsQuery<any>('projects', GET_PROJECTS))?.projects?.data ?? []);
const fetchTestimonials = cache(async () => (await cmsQuery<any>('testimonials', GET_TESTIMONIALS))?.allTestimonials ?? []);
const fetchCustomers = cache(async () => (await cmsQuery<any>('customers', GET_CUSTOMERS))?.allCustomers ?? []);
const fetchTeams = cache(async () => (await cmsQuery<any>('teams', GET_TEAMS))?.teams ?? []);
const fetchCategory = cache(async (slug: string) =>
    (await cmsQuery<any>(`category "${slug}"`, GET_CATEGORY_BY_SLUG, { slug }))?.category ?? null);
const fetchService = cache(async (slug: string) =>
    (await cmsQuery<any>(`service "${slug}"`, GET_SERVICE_BY_SLUG, { slug }))?.service ?? null);

export const getCategories = cache(async (locale: Locale = 'en'): Promise<any[]> =>
    localize(await fetchCategories(), locale));

// Project slugs are translatable in the CMS, but URLs must be the same in
// every language (hreflang pairs, the language switcher), so projects always
// carry their English slug.
export const getProjects = cache(async (locale: Locale = 'en'): Promise<any[]> =>
    (await fetchProjects()).map((project: any) => ({
        ...localize(project, locale),
        slug: englishSlug(project.slug),
    })));

export const getProjectBySlug = cache(async (slug: string, locale: Locale = 'en'): Promise<any | null> => {
    const projects = await getProjects(locale);
    return projects.find((p: any) => p.slug === slug) ?? null;
});

export const getCategoryBySlug = cache(async (slug: string, locale: Locale = 'en'): Promise<any | null> =>
    localize(await fetchCategory(slug), locale));

export const getTestimonials = cache(async (locale: Locale = 'en'): Promise<any[]> =>
    localize(await fetchTestimonials(), locale));

export const getCustomers = cache(async (locale: Locale = 'en'): Promise<any[]> =>
    localize(await fetchCustomers(), locale));

export const getTeams = cache(async (locale: Locale = 'en'): Promise<any[]> =>
    localize(await fetchTeams(), locale));

export const getServiceBySlug = cache(async (slug: string, locale: Locale = 'en'): Promise<any | null> =>
    localize(await fetchService(slug), locale));
