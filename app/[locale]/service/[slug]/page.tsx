import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ServiceClient from './service-client';
import JsonLd from '@/app/components/JsonLd';
import { getServiceBySlug } from '@/lib/server-data';
import { metaDescription, ogImages, pageTitle, suffixOnce } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const service = await getServiceBySlug(slug);

    // Unknown slug: the page 404s, so don't advertise a fabricated title.
    if (!service) {
        return { title: 'Service not found', robots: { index: false, follow: false } };
    }

    // Only 1 of 7 services has a short_description, so `description` (218-580
    // chars) is the usual source and has to be truncated for the SERP.
    const title = suffixOnce(pageTitle(service.title, 'Services'), 'services in Egypt');
    const description = metaDescription(
        service.short_description,
        service.description,
        `Discover CodeToon's ${pageTitle(service.title)} service — build, brand and boost your next big idea.`
    );

    return {
        title,
        description,
        openGraph: {
            title: `${title} | Codetoon`,
            description,
            url: `https://codetoon.net/service/${slug}`,
            type: 'website',
            images: ogImages(service.banner?.full_url),
        },
        alternates: {
            canonical: `https://codetoon.net/service/${slug}`,
        },
    };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = await getServiceBySlug(slug);

    // Real 404 for unknown slugs — otherwise every bad URL is an indexable
    // 200 with a self-referencing canonical.
    if (!service) notFound();

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.title,
        description: service.short_description || service.description,
        url: `https://codetoon.net/service/${slug}`,
        provider: { '@id': 'https://codetoon.net/#organization' },
        ...(service.banner?.full_url && { image: service.banner.full_url }),
        ...(service.deliverables?.length && {
            hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: `${service.title} Deliverables`,
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
