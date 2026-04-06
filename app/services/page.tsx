import type { Metadata } from 'next';
import ServicesClient from './services-client';

export const metadata: Metadata = {
    title: 'Our Services | Codetoon',
    description: 'Explore Codetoon\'s full range of services including Tech, Design, and Marketing. We turn complex problems into elegant solutions.',
    openGraph: {
        title: 'Our Services | Codetoon',
        description: 'From pixel-perfect branding to powerful digital products—we turn complex problems into elegant solutions.',
        url: 'https://codetoon.net/services',
        siteName: 'Codetoon',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Our Services | Codetoon',
        description: 'From pixel-perfect branding to powerful digital products.',
    },
    alternates: {
        canonical: 'https://codetoon.net/services',
    },
};

export default function ServicesPage() {
    return <ServicesClient />;
}
