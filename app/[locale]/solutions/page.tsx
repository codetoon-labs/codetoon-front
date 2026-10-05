import type { Metadata } from 'next';
import SolutionClient from './solution-client';
import { getCategories } from '@/lib/server-data';
import { absoluteUrl, localeAlternates, ogLocale } from '@/lib/i18n/config';
import { getMessages, resolveLocale } from '@/lib/i18n/server';
import JsonLd from '@/app/components/JsonLd';
import { breadcrumbs, entityId, graph, itemList, webPage } from '@/lib/structured-data';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const locale = await resolveLocale(params);
    const t = getMessages(locale).solutions.meta;
    return {
        title: t.title,
        description: t.description,
        openGraph: {
            title: `${t.title} | Codetoon`,
            description: t.ogDescription,
            url: absoluteUrl('/solutions', locale),
            siteName: 'Codetoon',
            locale: ogLocale[locale],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${t.title} | Codetoon`,
            description: t.twitterDescription,
        },
        alternates: localeAlternates('/solutions', locale),
    };
}

export default async function SolutionsPage({ params }: Props) {
    const locale = await resolveLocale(params);
    const categories = await getCategories(locale);
    const t = getMessages(locale);
    const jsonLd = graph(
        webPage({ path: '/solutions', locale, type: 'CollectionPage', name: t.solutions.meta.title, description: t.solutions.meta.description, mainEntityId: entityId('/solutions', locale, 'list') }),
        breadcrumbs('/solutions', locale, [{ name: t.common.nav.solutions, path: '/solutions' }]),
        itemList('/solutions', locale, categories.filter((c: any) => c.slug).map((c: any) => ({ name: c.title, path: `/solution/${c.slug}`, image: c.main_image?.full_url }))),
    );
    return (
        <>
            <JsonLd data={jsonLd} />
            <SolutionClient categories={categories} />
        </>
    );
}
