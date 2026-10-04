import type { Metadata } from 'next';
import { findBlogCategory, getBlogPosts } from '@/lib/blog-data';
import { blogListPath, listingLocales } from '@/lib/blog';
import { fmt, localeAlternatesFor, ogLocale, type Locale } from '@/lib/i18n/config';
import { getMessages } from '@/lib/i18n/server';
import { metaDescription } from '@/lib/seo';

export async function listingMetadata({ locale, page, category }: { locale: Locale; page: number; category?: string }): Promise<Metadata> {
    const t = getMessages(locale).blog;
    const [listing, current, arabic] = await Promise.all([
        getBlogPosts(locale, page, category),
        category ? findBlogCategory(category, locale) : undefined,
        // Cached: on Arabic pages this is the same request as `listing`.
        getBlogPosts('ar', page, category),
    ]);
    if (category && !current) return { title: t.meta.notFoundTitle, robots: { index: false, follow: false } };

    const baseTitle = current ? (current.seo_title || fmt(t.meta.categoryTitle, { name: current.name ?? current.slug })) : t.meta.title;
    const title = page > 1 ? fmt(t.meta.pageTitle, { title: baseTitle, page }) : baseTitle;
    const description = metaDescription(current?.seo_description, current?.description, t.meta.description);
    const path = blogListPath(page, category);

    return {
        title,
        description,
        alternates: localeAlternatesFor(path, locale, listingLocales(arabic, page)),
        openGraph: { title: `${title} | Codetoon`, description, type: 'website', locale: ogLocale[locale] },
        // An empty listing (e.g. Arabic before any translation) shouldn't be indexed.
        ...(listing.total === 0 && { robots: { index: false, follow: true } }),
    };
}
