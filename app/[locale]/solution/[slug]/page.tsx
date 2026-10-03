import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SolutionClient from './solution-client';
import JsonLd from '@/app/components/JsonLd';
import { getCategoryBySlug } from '@/lib/server-data';
import { metaDescription, ogImages, pageTitle, suffixOnce } from '@/lib/seo';
import { absoluteUrl, fmt, localeAlternates, ogLocale } from '@/lib/i18n/config';
import { getMessages, resolveLocale } from '@/lib/i18n/server';

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
    const title = locale === 'en'
        ? suffixOnce(baseTitle, t.titleSuffix)
        : fmt(t.titleTemplate, { title: baseTitle });
    const description = metaDescription(
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
            url: absoluteUrl(`/solution/${slug}`, locale),
            locale: ogLocale[locale],
            type: 'website',
            images: ogImages(category.main_image?.full_url),
        },
        alternates: localeAlternates(`/solution/${slug}`, locale),
    };
}

export default async function SolutionPage({ params }: Props) {
    const { slug } = await params;
    const locale = await resolveLocale(params);
    const category = await getCategoryBySlug(slug, locale);

    // Real 404 for unknown slugs — otherwise every bad URL is an indexable
    // 200 with a self-referencing canonical.
    if (!category) notFound();

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: category.title,
        description: category.overview || category.description,
        url: absoluteUrl(`/solution/${slug}`, locale),
        inLanguage: locale,
        provider: { '@id': 'https://codetoon.net/#organization' },
        ...(category.main_image?.full_url && { image: category.main_image.full_url }),
        ...(category.services?.length && {
            hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: fmt(getMessages(locale).solution.meta.offerCatalogName, { title: category.title }),
                itemListElement: category.services.map((service: any) => ({
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: service.title,
                        description: service.description,
                        url: absoluteUrl(`/service/${service.slug}`, locale),
                    },
                })),
            },
        }),
    };

    return (
        <>
            <JsonLd data={jsonLd} />
            <SolutionClient slug={slug} category={category} />
        </>
    );
}
