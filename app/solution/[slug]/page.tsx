import { Metadata } from 'next';
import SolutionClient from './solution-client';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const { slug } = resolvedParams;
    const title = slug ? slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ') : 'Solution';
    
    return {
        title: `${title} | CodeToon Solutions`,
        description: `Explore our premium ${title} solutions. Let's work together to build, brand, and boost your next big idea.`,
        openGraph: {
            title: `${title} | CodeToon Solutions`,
            description: `Explore our premium ${title} solutions.`,
            type: 'website',
        }
    };
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    return <SolutionClient slug={resolvedParams.slug} />;
}
