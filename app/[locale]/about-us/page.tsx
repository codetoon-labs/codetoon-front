import type { Metadata } from 'next';
import AboutUsClient from './about-us-client';
import { getTeams } from '@/lib/server-data';
import { absoluteUrl, localeAlternates, ogLocale } from '@/lib/i18n/config';
import { getMessages, resolveLocale } from '@/lib/i18n/server';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = getMessages(locale).about.meta;
  return {
    title: t.title,
    description: t.description,
    alternates: localeAlternates('/about-us', locale),
    openGraph: {
      title: t.ogTitle,
      description: t.description,
      url: absoluteUrl('/about-us', locale),
      siteName: 'Codetoon',
      locale: ogLocale[locale],
      type: 'website',
    },
  };
}

export default async function AboutUsPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const teams = await getTeams(locale);
  return <AboutUsClient teams={teams} />;
}
