import { Metadata } from 'next';
import ServiceClient from './service-client';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const { slug } = resolvedParams;
    const title = slug ? slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ') : 'Service';

    return {
        title: `${title} | CodeToon Services`,
        description: `Discover our ${title} service. Let's work together to build, brand, and boost your next big idea.`,
        openGraph: {
            title: `${title} | CodeToon Services`,
            description: `Discover our ${title} service.`,
            type: 'website',
        }
    };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    return <ServiceClient slug={resolvedParams.slug} />;
}
