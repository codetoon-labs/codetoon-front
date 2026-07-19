import type { Metadata } from 'next';
import ProjectsClient from './projects-client';
import { getCategories, getProjects } from '@/lib/server-data';

export const metadata: Metadata = {
    title: 'Our Projects | Codetoon',
    description: 'Explore Codetoon\'s portfolio of digital products, branding, and marketing projects — real work with real, measurable results.',
    openGraph: {
        title: 'Our Projects | Codetoon',
        description: 'Real Work. Real Growth. Real Fast. Explore our portfolio of digital products built to solve real business problems.',
        url: 'https://codetoon.net/projects',
        siteName: 'Codetoon',
        type: 'website',
    },
    alternates: {
        canonical: 'https://codetoon.net/projects',
    },
};

export default async function ProjectsPage() {
    const [categories, projects] = await Promise.all([getCategories(), getProjects()]);
    return <ProjectsClient categories={categories} projects={projects} />;
}
