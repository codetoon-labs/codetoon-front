import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SolutionClient from './solution-client';
import JsonLd from '@/app/components/JsonLd';
import { getCategoryBySlug } from '@/lib/server-data';
import { metaDescription, ogImages, pageTitle, suffixOnce } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const category = await getCategoryBySlug(slug);

    // Unknown slug: the page 404s, so don't advertise a fabricated title.
    if (!category) {
        return { title: 'Solution not found', robots: { index: false, follow: false } };
    }

    // `description` is the short, SERP-sized field; `overview` is the long
    // on-page copy (212-650 chars) and only serves as a fallback.
    const title = suffixOnce(pageTitle(category.title, 'Solutions'), 'solutions');
    const description = metaDescription(
        category.description,
        category.overview,
        `Explore CodeToon's ${pageTitle(category.title)} solutions — built, branded and boosted by one team.`
    );

    return {
        title,
        description,
        openGraph: {
            title: `${title} | Codetoon`,
            description,
            url: `https://codetoon.net/solution/${slug}`,
            type: 'website',
            images: ogImages(category.main_image?.full_url),
        },
        alternates: {
            canonical: `https://codetoon.net/solution/${slug}`,
        },
    };
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const category = await getCategoryBySlug(slug);

    // Real 404 for unknown slugs — otherwise every bad URL is an indexable
    // 200 with a self-referencing canonical.
    if (!category) notFound();

    const jsonLd = {
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
            <JsonLd data={jsonLd} />
            <SolutionClient slug={slug} category={category} />
        </>
    );
}
