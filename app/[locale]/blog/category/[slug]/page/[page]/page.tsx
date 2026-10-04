import { notFound, permanentRedirect } from 'next/navigation';
import BlogListing from '@/app/components/blog/BlogListing';
import { listingMetadata } from '@/app/components/blog/listing-metadata';
import { blogListPath, parseListingPage } from '@/lib/blog';
import { localizePath } from '@/lib/i18n/config';
import { resolveLocale } from '@/lib/i18n/server';

export const revalidate = 300;

type Props = { params: Promise<{ locale: string; slug: string; page: string }> };

export async function generateMetadata({ params }: Props) {
    const { slug, page: raw } = await params;
    const page = parseListingPage(raw);
    return page ? listingMetadata({ locale: await resolveLocale(params), page, category: slug }) : {};
}

export default async function BlogCategoryPageN({ params }: Props) {
    const locale = await resolveLocale(params);
    const { slug, page: raw } = await params;
    if (raw === '1') permanentRedirect(localizePath(blogListPath(1, slug), locale));
    const page = parseListingPage(raw);
    if (!page) notFound();
    return <BlogListing locale={locale} page={page} category={slug} />;
}
