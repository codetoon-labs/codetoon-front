import { Metadata } from 'next';
import ServiceClient from './service-client';
import JsonLd from '@/app/components/JsonLd';
import { getServiceBySlug } from '@/lib/server-data';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const service = await getServiceBySlug(slug);
    const fallbackTitle = slug ? slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ') : 'Service';
    const title = service?.title || fallbackTitle;
    const description = service?.short_description || service?.description
        || `Discover our ${title} service. Let's work together to build, brand, and boost your next big idea.`;

    return {
        title: `${title} | CodeToon Services`,
        description,
        openGraph: {
            title: `${title} | CodeToon Services`,
            description,
            url: `https://codetoon.net/service/${slug}`,
            type: 'website',
            ...(service?.banner?.full_url && { images: [{ url: service.banner.full_url }] }),
        },
        alternates: {
            canonical: `https://codetoon.net/service/${slug}`,
        },
    };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = await getServiceBySlug(slug);

    const jsonLd = service && {
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
            {jsonLd && <JsonLd data={jsonLd} />}
            <ServiceClient service={service} />
        </>
    );
}
