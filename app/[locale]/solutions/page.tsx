import type { Metadata } from 'next';
import SolutionClient from './solution-client';
import { getCategories } from '@/lib/server-data';
import { absoluteUrl, localeAlternates, ogLocale } from '@/lib/i18n/config';
import { getMessages, resolveLocale } from '@/lib/i18n/server';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const locale = await resolveLocale(params);
    const t = getMessages(locale).solutions.meta;
    return {
        title: t.title,
        description: t.description,
        openGraph: {
            title: t.title,
            description: t.ogDescription,
            url: absoluteUrl('/solutions', locale),
            siteName: 'Codetoon',
            locale: ogLocale[locale],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: t.title,
            description: t.twitterDescription,
        },
        alternates: localeAlternates('/solutions', locale),
    };
}

export default async function SolutionsPage({ params }: Props) {
    const locale = await resolveLocale(params);
    const categories = await getCategories(locale);
    return <SolutionClient categories={categories} />;
}
