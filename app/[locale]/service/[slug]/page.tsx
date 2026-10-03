import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ServiceClient from './service-client';
import JsonLd from '@/app/components/JsonLd';
import { getServiceBySlug } from '@/lib/server-data';
import { metaDescription, ogImages, pageTitle, suffixOnce } from '@/lib/seo';
import { absoluteUrl, fmt, localeAlternates, ogLocale } from '@/lib/i18n/config';
import { getMessages, resolveLocale } from '@/lib/i18n/server';

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const locale = await resolveLocale(params);
    const t = getMessages(locale).service.meta;
    const service = await getServiceBySlug(slug, locale);

    // Unknown slug: the page 404s, so don't advertise a fabricated title.
    if (!service) {
        return { title: t.notFoundTitle, robots: { index: false, follow: false } };
    }

    // Only 1 of 7 services has a short_description, so `description` (218-580
    // chars) is the usual source and has to be truncated for the SERP.
    const baseTitle = pageTitle(service.title, t.fallbackTitle);
    const title = locale === 'en'
        ? suffixOnce(baseTitle, t.titleSuffix)
        : fmt(t.titleTemplate, { title: baseTitle });
    const description = metaDescription(
        service.short_description,
        service.description,
        fmt(t.fallbackDescription, { title: pageTitle(service.title) })
    );

    return {
        title,
        description,
        openGraph: {
            title: `${title} | Codetoon`,
            description,
            url: absoluteUrl(`/service/${slug}`, locale),
            locale: ogLocale[locale],
            type: 'website',
            images: ogImages(service.banner?.full_url),
        },
        alternates: localeAlternates(`/service/${slug}`, locale),
    };
}

export default async function ServicePage({ params }: Props) {
    const { slug } = await params;
    const locale = await resolveLocale(params);
    const service = await getServiceBySlug(slug, locale);

    // Real 404 for unknown slugs — otherwise every bad URL is an indexable
    // 200 with a self-referencing canonical.
    if (!service) notFound();

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.title,
        description: service.short_description || service.description,
        url: absoluteUrl(`/service/${slug}`, locale),
        inLanguage: locale,
        provider: { '@id': 'https://codetoon.net/#organization' },
        ...(service.banner?.full_url && { image: service.banner.full_url }),
        ...(service.deliverables?.length && {
            hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: fmt(getMessages(locale).service.meta.deliverablesCatalogName, { title: service.title }),
                itemListElement: service.deliverables.map((item: string) => ({
                    '@type': 'Offer',
                    itemOffered: { '@type': 'Service', name: item },
                })),
            },
        }),
    };

    return (
        <>
            <JsonLd data={jsonLd} />
            <ServiceClient service={service} />
        </>
    );
}
