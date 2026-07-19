import AboutUsClient from './about-us-client';
import { getTeams } from '@/lib/server-data';

export const metadata = {
  title: 'About Us | Codetoon',
  description: 'Learn about Codetoon — who we are, how we work, and the team behind the magic.',
};

export default async function AboutUsPage() {
  const teams = await getTeams();
  return <AboutUsClient teams={teams} />;
}
