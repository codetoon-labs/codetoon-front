import BlogListing from '@/app/components/blog/BlogListing';
import { listingMetadata } from '@/app/components/blog/listing-metadata';
import { resolveLocale } from '@/lib/i18n/server';

export const revalidate = 300;

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props) {
    return listingMetadata({ locale: await resolveLocale(params), page: 1, category: (await params).slug });
}

export default async function BlogCategoryPage({ params }: Props) {
    return <BlogListing locale={await resolveLocale(params)} page={1} category={(await params).slug} />;
}
