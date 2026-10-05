import type { Metadata } from 'next';
import ProjectsClient from './projects-client';
import { getCategories, getProjects } from '@/lib/server-data';
import { absoluteUrl, localeAlternates, ogLocale } from '@/lib/i18n/config';
import { getMessages, resolveLocale } from '@/lib/i18n/server';
import JsonLd from '@/app/components/JsonLd';
import { breadcrumbs, entityId, graph, itemList, webPage } from '@/lib/structured-data';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const locale = await resolveLocale(params);
    const t = getMessages(locale).projects.meta;
    return {
        title: t.title,
        description: t.description,
        openGraph: {
            title: `${t.title} | Codetoon`,
            description: t.ogDescription,
            url: absoluteUrl('/projects', locale),
            siteName: 'Codetoon',
            locale: ogLocale[locale],
            type: 'website',
        },
        alternates: localeAlternates('/projects', locale),
    };
}

export default async function ProjectsPage({ params }: Props) {
    const locale = await resolveLocale(params);
    const [categories, projects] = await Promise.all([getCategories(locale), getProjects(locale)]);
    const t = getMessages(locale);
    const jsonLd = graph(
        webPage({ path: '/projects', locale, type: 'CollectionPage', name: t.projects.meta.title, description: t.projects.meta.description, mainEntityId: entityId('/projects', locale, 'list') }),
        breadcrumbs('/projects', locale, [{ name: t.common.nav.projects, path: '/projects' }]),
        itemList('/projects', locale, projects.map((p: any) => ({ name: p.title, path: `/project/${p.slug}`, image: p.main_image?.full_url }))),
    );
    return (
        <>
            <JsonLd data={jsonLd} />
            <ProjectsClient categories={categories} projects={projects} />
        </>
    );
}
