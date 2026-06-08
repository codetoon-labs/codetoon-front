import type { Metadata } from 'next';
import SolutionClient from './solution-client';

export const metadata: Metadata = {
    title: 'Our Solutions | Codetoon',
    description: 'Explore Codetoon\'s full range of solutions including Tech, Design, and Marketing. We turn complex problems into elegant solutions.',
    openGraph: {
        title: 'Our Solutions | Codetoon',
        description: 'From pixel-perfect branding to powerful digital products—we turn complex problems into elegant solutions.',
        url: 'https://codetoon.net/solutions',
        siteName: 'Codetoon',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Our Solutions | Codetoon',
        description: 'From pixel-perfect branding to powerful digital products.',
    },
    alternates: {
        canonical: 'https://codetoon.net/solutions',
    },
};

export default function SolutionsPage() {
    return <SolutionClient />;
}
