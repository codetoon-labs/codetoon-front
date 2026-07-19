import { Metadata } from 'next';
import ProjectClient from './project-client';
import JsonLd from '@/app/components/JsonLd';
import { getProjectBySlug, getTestimonials } from '@/lib/server-data';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);
    const fallbackTitle = slug ? slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ') : 'Project';
    const title = project?.title || fallbackTitle;
    const description = project?.short_description || project?.description
        || `Explore our premium ${title} projects. Let's work together to build, brand, and boost your next big idea.`;

    return {
        title: `${title} | CodeToon Projects`,
        description,
        openGraph: {
            title: `${title} | CodeToon Projects`,
            description,
            url: `https://codetoon.net/project/${slug}`,
            type: 'website',
            ...(project?.main_image?.full_url && { images: [{ url: project.main_image.full_url }] }),
        },
        alternates: {
            canonical: `https://codetoon.net/project/${slug}`,
        },
    };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const [project, testimonials] = await Promise.all([getProjectBySlug(slug), getTestimonials()]);

    const jsonLd = project && {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: project.title,
        headline: project.short_title || project.title,
        description: project.short_description || project.description,
        url: `https://codetoon.net/project/${slug}`,
        creator: { '@id': 'https://codetoon.net/#organization' },
        ...(project.main_image?.full_url && { image: project.main_image.full_url }),
        ...(project.services?.length && {
            about: project.services.map((s: any) => s.title).join(', '),
        }),
        ...(project.country?.name && {
            locationCreated: { '@type': 'Country', name: project.country.name },
        }),
    };

    return (
        <>
            {jsonLd && <JsonLd data={jsonLd} />}
            <ProjectClient project={project} testimonials={testimonials} />
        </>
    );
}
