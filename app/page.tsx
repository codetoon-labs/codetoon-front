import React from 'react';
import { Metadata } from 'next';
import HomeClient from './home-client';

export const metadata: Metadata = {
    title: "Codetoon | transform your ideas into reality",
    description: "Full service digital agency, crafting tech and design solutions based in Egypt",
    keywords: ["Codetoon", "digital agency", "tech solutions", "design solutions", "Egypt"],
    openGraph: {
        title: "Codetoon - Digital Agency in Egypt | Transform Your Ideas into Reality",
        description: "Full service digital agency, crafting tech and design solutions based in Egypt",
        url: "https://codetoon.net",
        siteName: "Codetoon",
        images: [
            {
                url: "https://codetoon.net/codetoon-og.png",
                width: 1200,
                height: 630,
                alt: "Codetoon - Transform your ideas into reality"
            }
        ],
        type: "website"
    },
    twitter: {
        card: "summary_large_image",
        title: "Codetoon - transform your ideas into reality",
        description: "Full service digital agency, crafting tech and design solutions based in Egypt",
        creator: "@Codetooneg",
        images: ["https://codetoon.net/codetoon-og.png"],
    },
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

export default function Home() {
    return <HomeClient />;
}
