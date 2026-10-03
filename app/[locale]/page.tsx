import React from 'react';
import { Metadata } from 'next';
import HomeClient from './home-client';
import { getCategories, getProjects, getTestimonials, getCustomers } from '@/lib/server-data';
import { absoluteUrl, localeAlternates, ogLocale } from '@/lib/i18n/config';
import { getMessages, resolveLocale } from '@/lib/i18n/server';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const locale = await resolveLocale(params);
    const { common, home } = getMessages(locale);
    return {
        title: common.meta.defaultTitle,
        description: common.meta.description,
        keywords: common.meta.keywords,
        openGraph: {
            title: common.meta.ogTitle,
            description: common.meta.description,
            url: absoluteUrl('/', locale),
            siteName: "Codetoon",
            locale: ogLocale[locale],
            images: [
                {
                    url: "https://codetoon.net/codetoon-og.png",
                    width: 1200,
                    height: 630,
                    alt: common.meta.ogAlt
                }
            ],
            type: "website"
        },
        twitter: {
            card: "summary_large_image",
            title: home.meta.twitterTitle,
            description: common.meta.description,
            creator: "@Codetooneg",
            images: ["https://codetoon.net/codetoon-og.png"],
        },
        alternates: localeAlternates('/', locale),
        robots: {
            index: true,
            follow: true,
            nocache: false,
            googleBot: {
                index: true,
                follow: true,
                "max-snippet": -1,
                "max-image-preview": "large",
                "max-video-preview": -1,
            }
        }
    };
}

export default async function Home({ params }: PageProps) {
    const locale = await resolveLocale(params);
    const [categories, projects, testimonials, customers] = await Promise.all([
        getCategories(locale),
        getProjects(locale),
        getTestimonials(locale),
        getCustomers(locale),
    ]);
    return <HomeClient categories={categories} projects={projects} testimonials={testimonials} customers={customers} />;
}
