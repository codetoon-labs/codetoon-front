import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProjectClient from './project-client';
import JsonLd from '@/app/components/JsonLd';
import { getProjectBySlug, getTestimonials } from '@/lib/server-data';
import { metaDescription, ogImages, pageTitle, suffixOnce } from '@/lib/seo';
import { absoluteUrl, fmt, localeAlternates, ogLocale } from '@/lib/i18n/config';
import { getMessages, resolveLocale } from '@/lib/i18n/server';

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const locale = await resolveLocale(params);
    const t = getMessages(locale).project.meta;
    const project = await getProjectBySlug(slug, locale);

    // Unknown slug: the page 404s, so don't advertise a fabricated title.
    if (!project) {
        return { title: t.notFoundTitle, robots: { index: false, follow: false } };
    }

    // CMS titles carry stray whitespace; the root layout appends "| Codetoon".
    const baseTitle = pageTitle(project.title, t.fallbackTitle);
    const title = locale === 'en'
        ? suffixOnce(baseTitle, t.titleSuffix)
        : fmt(t.titleTemplate, { title: baseTitle });
    const description = metaDescription(
        project.short_description,
        project.description,
        fmt(t.fallbackDescription, { title: pageTitle(project.title, t.fallbackDescriptionTitle) })
    );

    return {
        title,
        description,
        openGraph: {
            title: `${title} | Codetoon`,
            description,
            url: absoluteUrl(`/project/${slug}`, locale),
            locale: ogLocale[locale],
            type: 'article',
            images: ogImages(project.main_image?.full_url),
        },
        alternates: localeAlternates(`/project/${slug}`, locale),
    };
}

export default async function ProjectPage({ params }: Props) {
    const { slug } = await params;
    const locale = await resolveLocale(params);
    const [project, testimonials] = await Promise.all([getProjectBySlug(slug, locale), getTestimonials(locale)]);

    // Real 404 for unknown slugs — otherwise every bad URL is an indexable
    // 200 with a self-referencing canonical.
    if (!project) notFound();

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: project.title,
        headline: project.short_title || project.title,
        description: project.short_description || project.description,
        url: absoluteUrl(`/project/${slug}`, locale),
        inLanguage: locale,
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
