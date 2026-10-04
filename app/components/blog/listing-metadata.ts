import type { Metadata } from 'next';
import { getBlogCategories, getBlogPosts } from '@/lib/blog-data';
import { blogListPath } from '@/lib/blog';
import { fmt, localeAlternates, ogLocale, type Locale } from '@/lib/i18n/config';
import { getMessages } from '@/lib/i18n/server';
import { metaDescription } from '@/lib/seo';

export async function listingMetadata({ locale, page, category }: { locale: Locale; page: number; category?: string }): Promise<Metadata> {
    const t = getMessages(locale).blog;
    const [listing, categories] = await Promise.all([getBlogPosts(locale, page, category), getBlogCategories(locale)]);
    const current = category ? categories.find((c) => c.slug === category) : undefined;
    if (category && !current) return { title: t.meta.notFoundTitle, robots: { index: false, follow: false } };

    const baseTitle = current ? (current.seo_title || fmt(t.meta.categoryTitle, { name: current.name ?? current.slug })) : t.meta.title;
    const title = page > 1 ? fmt(t.meta.pageTitle, { title: baseTitle, page }) : baseTitle;
    const description = metaDescription(current?.seo_description, current?.description, t.meta.description);
    const path = blogListPath(page, category);

    return {
        title,
        description,
        alternates: localeAlternates(path, locale),
        openGraph: { title: `${title} | Codetoon`, description, type: 'website', locale: ogLocale[locale] },
        // An empty listing (e.g. Arabic before any translation) shouldn't be indexed.
        ...(listing.total === 0 && { robots: { index: false, follow: true } }),
    };
}
