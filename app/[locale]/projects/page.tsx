import type { Metadata } from 'next';
import ProjectsClient from './projects-client';
import { getCategories, getProjects } from '@/lib/server-data';
import { absoluteUrl, localeAlternates, ogLocale } from '@/lib/i18n/config';
import { getMessages, resolveLocale } from '@/lib/i18n/server';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const locale = await resolveLocale(params);
    const t = getMessages(locale).projects.meta;
    return {
        title: t.title,
        description: t.description,
        openGraph: {
            title: t.title,
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
    return <ProjectsClient categories={categories} projects={projects} />;
}
