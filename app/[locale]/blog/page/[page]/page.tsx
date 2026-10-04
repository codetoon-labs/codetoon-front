import { notFound, permanentRedirect } from 'next/navigation';
import BlogListing from '@/app/components/blog/BlogListing';
import { listingMetadata } from '@/app/components/blog/listing-metadata';
import { parseListingPage } from '@/lib/blog';
import { localizePath } from '@/lib/i18n/config';
import { resolveLocale } from '@/lib/i18n/server';

export const revalidate = 300;

type Props = { params: Promise<{ locale: string; page: string }> };

export async function generateMetadata({ params }: Props) {
    const page = parseListingPage((await params).page);
    return page ? listingMetadata({ locale: await resolveLocale(params), page }) : {};
}

export default async function BlogPageN({ params }: Props) {
    const locale = await resolveLocale(params);
    const raw = (await params).page;
    if (raw === '1') permanentRedirect(localizePath('/blog', locale));
    const page = parseListingPage(raw);
    if (!page) notFound();
    return <BlogListing locale={locale} page={page} />;
}
