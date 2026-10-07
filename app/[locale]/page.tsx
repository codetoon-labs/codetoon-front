import React from 'react';
import { Metadata } from 'next';
import HomeClient from './home-client';
import { getCategories, getProjects, getTestimonials, getCustomers } from '@/lib/server-data';
import { absoluteUrl, localeAlternates, ogLocale } from '@/lib/i18n/config';
import { getMessages, resolveLocale } from '@/lib/i18n/server';
import JsonLd from '@/app/components/JsonLd';
import { graph, ORGANIZATION_ID, webPage } from '@/lib/structured-data';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const locale = await resolveLocale(params);
    const { common, home } = getMessages(locale);
    return {
        // The home title already carries the brand, so skip the layout's " | Codetoon" template.
        title: { absolute: home.meta.title },
        description: home.meta.description,
        keywords: common.meta.keywords,
        openGraph: {
            title: home.meta.title,
            description: home.meta.description,
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
            title: home.meta.title,
            description: home.meta.description,
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
    const { meta } = getMessages(locale).home;
    // Testimonials are deliberately not marked up as Review/AggregateRating:
    // Google treats reviews a business hosts about itself as self-serving.
    const jsonLd = graph(
        webPage({ path: '/', locale, name: meta.title, description: meta.description, hasBreadcrumb: false, mainEntityId: ORGANIZATION_ID }),
    );
    return (
        <>
            <JsonLd data={jsonLd} />
            <HomeClient categories={categories} projects={projects} testimonials={testimonials} customers={customers} />
        </>
    );
}
