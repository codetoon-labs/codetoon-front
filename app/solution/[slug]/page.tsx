import { Metadata } from 'next';
import SolutionClient from './solution-client';
import JsonLd from '@/app/components/JsonLd';
import { getCategoryBySlug } from '@/lib/server-data';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const category = await getCategoryBySlug(slug);
    const fallbackTitle = slug ? slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ') : 'Solution';
    const title = category?.title || fallbackTitle;
    const description = category?.overview || category?.description
        || `Explore our premium ${title} solutions. Let's work together to build, brand, and boost your next big idea.`;

    return {
        title: `${title} | CodeToon Solutions`,
        description,
        openGraph: {
            title: `${title} | CodeToon Solutions`,
            description,
            url: `https://codetoon.net/solution/${slug}`,
            type: 'website',
            ...(category?.main_image?.full_url && { images: [{ url: category.main_image.full_url }] }),
        },
        alternates: {
            canonical: `https://codetoon.net/solution/${slug}`,
        },
    };
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const category = await getCategoryBySlug(slug);

    const jsonLd = category && {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: category.title,
        description: category.overview || category.description,
        url: `https://codetoon.net/solution/${slug}`,
        provider: { '@id': 'https://codetoon.net/#organization' },
        ...(category.main_image?.full_url && { image: category.main_image.full_url }),
        ...(category.services?.length && {
            hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: `${category.title} Services`,
                itemListElement: category.services.map((service: any) => ({
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: service.title,
                        description: service.description,
                        url: `https://codetoon.net/service/${service.slug}`,
                    },
                })),
            },
        }),
    };

    return (
        <>
            {jsonLd && <JsonLd data={jsonLd} />}
            <SolutionClient slug={slug} category={category} />
        </>
    );
}
