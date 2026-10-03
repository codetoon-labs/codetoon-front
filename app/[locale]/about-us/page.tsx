import type { Metadata } from 'next';
import AboutUsClient from './about-us-client';
import { getTeams } from '@/lib/server-data';
import { absoluteUrl, localeAlternates, ogLocale } from '@/lib/i18n/config';
import { getMessages, resolveLocale } from '@/lib/i18n/server';
import JsonLd from '@/app/components/JsonLd';
import { breadcrumbs, graph, ORGANIZATION_ID, person, webPage } from '@/lib/structured-data';

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
  const t = getMessages(locale);
  const jsonLd = graph(
    webPage({ path: '/about-us', locale, type: 'AboutPage', name: t.about.meta.title, description: t.about.meta.description, mainEntityId: ORGANIZATION_ID }),
    breadcrumbs('/about-us', locale, [{ name: t.common.nav.aboutUs, path: '/about-us' }]),
    // The team, linked to the organization (E-E-A-T: who is behind the work).
    ...teams.map((member: any) => person(member)),
  );
  return (
    <>
      <JsonLd data={jsonLd} />
      <AboutUsClient teams={teams} />
    </>
  );
}
