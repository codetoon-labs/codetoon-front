import type { MetadataRoute } from 'next';
import { absoluteUrl, defaultLocale, type Locale } from '@/lib/i18n/config';
import type { BlogPostCard } from '@/lib/blog-data';
import { metaDescription } from '@/lib/seo';

// Pure helpers shared by the blog pages, sitemap and llms.txt.

export type TocItem = { id: string; text: string };

/** Fewer section headings than this and the table of contents isn't worth showing. */
export const MIN_TOC_HEADINGS = 3;

const ENTITIES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'", nbsp: ' ' };

function decodeEntities(value: string): string {
    return value
        .replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (_, name) => ENTITIES[name])
        .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)));
}

/** H2s with ids (added by the CMS on save) become the table of contents. */
export function extractToc(html: string | null | undefined): TocItem[] {
    if (!html) return [];
    return [...html.matchAll(/<h2\b[^>]*\bid="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/gi)]
        .map(([, id, inner]) => ({
            id,
            text: decodeEntities(inner.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim(),
        }))
        .filter((item) => item.text !== '');
}

/** Visible text of CMS HTML, for snippets. */
export function plainText(html: string | null | undefined): string {
    return html ? decodeEntities(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim() : '';
}

/**
 * Meta/JSON-LD description, falling back within the page's language only:
 * SEO description, then excerpt, then the start of the body.
 */
export function postDescription(post: { seo_description?: string | null; excerpt?: string | null; body?: string | null }): string {
    return metaDescription(post.seo_description, post.excerpt, plainText(post.body));
}

export function shouldRedirectToEnglish(available: readonly string[], locale: Locale): boolean {
    return locale !== defaultLocale && !available.includes(locale);
}

/** Arabic pages must never link to an Arabic URL that redirects away. */
export function onlyAvailableIn<T extends { available_locales: readonly string[] }>(posts: T[], locale: Locale): T[] {
    return posts.filter((post) => post.available_locales.includes(locale));
}

/** Related posts shown under an article. */
export const RELATED_COUNT = 3;

/**
 * The API is asked for twice as many related posts as shown, so dropping
 * untranslated ones on Arabic pages still leaves a full row.
 */
export function pickRelated<T extends { available_locales: readonly string[] }>(posts: T[], locale: Locale): T[] {
    return onlyAvailableIn(posts, locale).slice(0, RELATED_COUNT);
}

export function blogPostPath(slug: string): string {
    return `/blog/${slug}`;
}

export function blogListPath(page: number, category?: string): string {
    const base = category ? `/blog/category/${category}` : '/blog';
    return page > 1 ? `${base}/page/${page}` : base;
}

/** "/blog/page/<n>": only canonical integers above 1 (page 1 is the bare URL). */
export function parseListingPage(raw: string): number | null {
    return /^[1-9]\d*$/.test(raw) && Number(raw) > 1 ? Number(raw) : null;
}

/** CMS datetimes are "Y-m-d H:i:s" in UTC (or plain "Y-m-d"). */
export function parseCmsDate(value: string): Date {
    return new Date(value.includes(' ') ? `${value.replace(' ', 'T')}Z` : `${value}T00:00:00Z`);
}

export function formatBlogDate(value: string, locale: Locale): string {
    return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG' : 'en-US', { dateStyle: 'long', timeZone: 'UTC' }).format(parseCmsDate(value));
}

/**
 * hreflang languages for a listing page: Arabic only when the Arabic listing
 * for the same page/category has posts (it is noindex or 404 otherwise).
 * English always lists at least the Arabic posts.
 */
export function listingLocales(arabic: { total: number; lastPage: number }, page: number): Locale[] {
    return arabic.total > 0 && page <= arabic.lastPage ? ['en', 'ar'] : ['en'];
}

/**
 * Sitemap entries for the blog. Listings appear only once they have a post
 * (empty ones are noindex), and in Arabic only where Arabic posts exist.
 */
export function blogSitemapEntries(posts: BlogPostCard[], categories: { slug: string }[]): MetadataRoute.Sitemap {
    const localesFor = (listed: BlogPostCard[]): Locale[] => {
        if (!listed.length) return [];
        return listed.some((p) => p.available_locales.includes('ar')) ? ['en', 'ar'] : ['en'];
    };

    const entry = (path: string, available: Locale[], lastModified?: Date, priority = 0.6): MetadataRoute.Sitemap => {
        const languages = Object.fromEntries(available.map((l) => [l, absoluteUrl(path, l)]));
        return available.map((locale) => ({
            url: absoluteUrl(path, locale),
            lastModified,
            changeFrequency: 'weekly' as const,
            priority,
            alternates: { languages },
        }));
    };

    return [
        ...entry('/blog', localesFor(posts), undefined, 0.8),
        ...categories.flatMap((c) => entry(blogListPath(1, c.slug), localesFor(posts.filter((p) => p.category?.slug === c.slug)))),
        ...posts.flatMap((p) => entry(blogPostPath(p.slug), p.available_locales, parseCmsDate(p.updated_at), 0.7)),
    ];
}
