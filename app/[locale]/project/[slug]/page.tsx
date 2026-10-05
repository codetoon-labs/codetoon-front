import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProjectClient from './project-client';
import JsonLd from '@/app/components/JsonLd';
import { getProjectBySlug, getTestimonials } from '@/lib/server-data';
import { cleanText, metaDescription, ogImages, pageTitle, suffixOnce, withCanonical, type SeoOverrides } from '@/lib/seo';
import { absoluteUrl, fmt, localeAlternates, ogLocale } from '@/lib/i18n/config';
import { getMessages, resolveLocale } from '@/lib/i18n/server';
import { breadcrumbs, caseStudy, entityId, graph, webPage } from '@/lib/structured-data';

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
    // An admin-written SEO title is used as-is; otherwise build one from the content.
    const seo: SeoOverrides = project.seo;
    const title = cleanText(seo?.title) || (locale === 'en'
        ? suffixOnce(baseTitle, t.titleSuffix)
        : fmt(t.titleTemplate, { title: baseTitle }));
    const description = metaDescription(
        seo?.description,
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
            url: cleanText(seo?.canonical) || absoluteUrl(`/project/${slug}`, locale),
            locale: ogLocale[locale],
            type: 'article',
            images: ogImages(seo?.og_image?.full_url || project.main_image?.full_url),
        },
        alternates: withCanonical(localeAlternates(`/project/${slug}`, locale), seo?.canonical),
    };
}

export default async function ProjectPage({ params }: Props) {
    const { slug } = await params;
    const locale = await resolveLocale(params);
    const [project, testimonials] = await Promise.all([getProjectBySlug(slug, locale), getTestimonials(locale)]);

    // Real 404 for unknown slugs — otherwise every bad URL is an indexable
    // 200 with a self-referencing canonical.
    if (!project) notFound();

    const path = `/project/${slug}`;
    const nav = getMessages(locale).common.nav;
    const jsonLd = graph(
        webPage({
            path,
            locale,
            name: project.title,
            description: project.short_description || project.description,
            image: project.main_image?.full_url,
            mainEntityId: entityId(path, locale, 'project'),
            dateModified: project.updated_at,
        }),
        breadcrumbs(path, locale, [
            { name: nav.projects, path: '/projects' },
            { name: project.title, path },
        ]),
        caseStudy(project, path, locale),
    );

    return (
        <>
            <JsonLd data={jsonLd} />
            <ProjectClient project={project} testimonials={testimonials} />
        </>
    );
}
