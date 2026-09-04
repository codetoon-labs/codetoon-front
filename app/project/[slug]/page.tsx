import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProjectClient from './project-client';
import JsonLd from '@/app/components/JsonLd';
import { getProjectBySlug, getTestimonials } from '@/lib/server-data';
import { metaDescription, ogImages, pageTitle, suffixOnce } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    // Unknown slug: the page 404s, so don't advertise a fabricated title.
    if (!project) {
        return { title: 'Project not found', robots: { index: false, follow: false } };
    }

    // CMS titles carry stray whitespace; the root layout appends "| Codetoon".
    const title = suffixOnce(pageTitle(project.title, 'Project'), 'case study');
    const description = metaDescription(
        project.short_description,
        project.description,
        `A CodeToon case study: how we built ${pageTitle(project.title, 'this project')}.`
    );

    return {
        title,
        description,
        openGraph: {
            title: `${title} | Codetoon`,
            description,
            url: `https://codetoon.net/project/${slug}`,
            type: 'article',
            images: ogImages(project.main_image?.full_url),
        },
        alternates: {
            canonical: `https://codetoon.net/project/${slug}`,
        },
    };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const [project, testimonials] = await Promise.all([getProjectBySlug(slug), getTestimonials()]);

    // Real 404 for unknown slugs — otherwise every bad URL is an indexable
    // 200 with a self-referencing canonical.
    if (!project) notFound();

    const jsonLd = {
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
            <JsonLd data={jsonLd} />
            <ProjectClient project={project} testimonials={testimonials} />
        </>
    );
}
