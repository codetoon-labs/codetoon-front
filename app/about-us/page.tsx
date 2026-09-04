import type { Metadata } from 'next';
import AboutUsClient from './about-us-client';
import { getTeams } from '@/lib/server-data';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Codetoon — who we are, how we work, and the team behind the magic.',
  alternates: { canonical: 'https://codetoon.net/about-us' },
  openGraph: {
    title: 'About Us | Codetoon',
    description: 'Learn about Codetoon — who we are, how we work, and the team behind the magic.',
    url: 'https://codetoon.net/about-us',
    siteName: 'Codetoon',
    type: 'website',
  },
};

export default async function AboutUsPage() {
  const teams = await getTeams();
  return <AboutUsClient teams={teams} />;
}
