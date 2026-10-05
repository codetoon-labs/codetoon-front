import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SolutionClient from './solution-client';
import JsonLd from '@/app/components/JsonLd';
import { getCategoryBySlug } from '@/lib/server-data';
import { cleanText, metaDescription, ogImages, pageTitle, suffixOnce, withCanonical, type SeoOverrides } from '@/lib/seo';
import { absoluteUrl, fmt, localeAlternates, ogLocale } from '@/lib/i18n/config';
import { getMessages, resolveLocale } from '@/lib/i18n/server';
import { breadcrumbs, entityId, graph, service, webPage } from '@/lib/structured-data';

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const locale = await resolveLocale(params);
    const t = getMessages(locale).solution.meta;
    const category = await getCategoryBySlug(slug, locale);

    // Unknown slug: the page 404s, so don't advertise a fabricated title.
    if (!category) {
        return { title: t.notFoundTitle, robots: { index: false, follow: false } };
    }

    // `description` is the short, SERP-sized field; `overview` is the long
    // on-page copy (212-650 chars) and only serves as a fallback.
    const baseTitle = pageTitle(category.title, getMessages(locale).common.nav.solutions);
    // An admin-written SEO title is used as-is; otherwise build one from the content.
    const seo: SeoOverrides = category.seo;
    const title = cleanText(seo?.title) || (locale === 'en'
        ? suffixOnce(baseTitle, t.titleSuffix)
        : fmt(t.titleTemplate, { title: baseTitle }));
    const description = metaDescription(
        seo?.description,
        category.description,
        category.overview,
        fmt(t.fallbackDescription, { title: pageTitle(category.title) })
    );

    return {
        title,
        description,
        openGraph: {
            title: `${title} | Codetoon`,
            description,
            url: cleanText(seo?.canonical) || absoluteUrl(`/solution/${slug}`, locale),
            locale: ogLocale[locale],
            type: 'website',
            images: ogImages(seo?.og_image?.full_url || category.main_image?.full_url),
        },
        alternates: withCanonical(localeAlternates(`/solution/${slug}`, locale), seo?.canonical),
    };
}

export default async function SolutionPage({ params }: Props) {
    const { slug } = await params;
    const locale = await resolveLocale(params);
    const category = await getCategoryBySlug(slug, locale);

    // Real 404 for unknown slugs — otherwise every bad URL is an indexable
    // 200 with a self-referencing canonical.
    if (!category) notFound();

    const path = `/solution/${slug}`;
    const t = getMessages(locale);
    const jsonLd = graph(
        webPage({
            path,
            locale,
            name: category.title,
            description: category.description || category.overview,
            image: category.main_image?.full_url,
            mainEntityId: entityId(path, locale, 'service'),
        }),
        breadcrumbs(path, locale, [
            { name: t.common.nav.solutions, path: '/solutions' },
            { name: category.title, path },
        ]),
        service({
            path,
            locale,
            name: category.title,
            description: category.overview || category.description,
            image: category.main_image?.full_url,
            catalogName: fmt(t.solution.meta.offerCatalogName, { title: category.title }),
            offers: (category.services ?? []).map((s: any) => ({
                name: s.title,
                description: s.description,
                path: `/service/${s.slug}`,
            })),
        }),
    );

    return (
        <>
            <JsonLd data={jsonLd} />
            <SolutionClient slug={slug} category={category} />
        </>
    );
}
