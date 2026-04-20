import { Metadata } from 'next';
import ProjectClient from './project-client';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const { slug } = resolvedParams;
    const title = slug ? slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ') : 'Project';
    
    return {
        title: `${title} | CodeToon Projects`,
        description: `Explore our premium ${title} projects. Let's work together to build, brand, and boost your next big idea.`,
        openGraph: {
            title: `${title} | CodeToon Projects`,
            description: `Explore our premium ${title} projects.`,
            type: 'website',
        }
    };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    return <ProjectClient slug={resolvedParams.slug} />;
}
