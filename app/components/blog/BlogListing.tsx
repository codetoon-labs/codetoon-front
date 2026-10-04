import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '@/app/components/JsonLd';
import BlogCard from '@/app/components/blog/BlogCard';
import { findBlogCategory, getBlogCategories, getBlogPosts } from '@/lib/blog-data';
import { blogListPath } from '@/lib/blog';
import { fmt, localizePath, type Locale } from '@/lib/i18n/config';
import { getMessages } from '@/lib/i18n/server';
import { blog, breadcrumbs, entityId, graph, webPage } from '@/lib/structured-data';

export default async function BlogListing({ locale, page, category }: { locale: Locale; page: number; category?: string }) {
    const t = getMessages(locale);
    const [listing, categories, current] = await Promise.all([
        getBlogPosts(locale, page, category),
        // Chips: only categories with posts in this language.
        getBlogCategories(locale),
        category ? findBlogCategory(category, locale) : undefined,
    ]);

    if (category && !current) notFound();
    if (page > 1 && page > listing.lastPage) notFound();

    const path = blogListPath(page, category);
    const title = current?.name ?? t.blog.hero.title;
    const trail = [
        { name: t.blog.meta.title, path: '/blog' },
        ...(current ? [{ name: current.name ?? current.slug, path: blogListPath(1, current.slug) }] : []),
        ...(page > 1 ? [{ name: fmt(t.blog.list.pageOf, { page, total: listing.lastPage }), path }] : []),
    ];
    const jsonLd = graph(
        webPage({ path, locale, type: 'CollectionPage', name: title, description: current?.description ?? t.blog.meta.description, mainEntityId: entityId('/blog', locale, 'blog') }),
        breadcrumbs(path, locale, trail),
        blog(locale, listing.posts, t.blog.meta.title, t.blog.meta.description),
    );

    const chip = (label: string, slug: string | undefined, active: boolean) => (
        <Link
            key={slug ?? 'all'}
            href={localizePath(blogListPath(1, slug), locale)}
            aria-current={active ? 'page' : undefined}
            className={`rounded-full border px-4 py-2 text-[15px] font-semibold transition-colors ${active ? 'border-[#0d71ba] bg-[#0d71ba] text-[#FCF6D0]' : 'border-[#E6E7E8] text-[#2d3748] hover:border-[#0d71ba] hover:text-[#0d71ba]'}`}
        >
            {label}
        </Link>
    );

    return (
        <div className="px-5 pt-32 pb-20 sm:pt-40">
            <JsonLd data={jsonLd} />
            <div className="mx-auto w-full max-w-[1200px]">
                <header className="mb-10 max-w-[760px]">
                    <span className="inline-flex rounded-full bg-[#e6f0f8] px-3.5 py-1.5 text-[13px] font-semibold text-[#0d71ba]">{t.blog.hero.eyebrow}</span>
                    <h1 className="mt-5 text-[34px] font-bold leading-tight text-[#000305] sm:text-[48px]">{title}</h1>
                    <p className="mt-4 text-[17px] leading-8 text-[#535556]">{current?.description ?? t.blog.hero.subtitle}</p>
                </header>

                {categories.length > 0 && (
                    <nav aria-label={t.blog.list.categoriesLabel} className="mb-10 flex flex-wrap gap-2">
                        {chip(t.blog.list.all, undefined, !category)}
                        {categories.map((c) => chip(c.name ?? c.slug, c.slug, c.slug === category))}
                    </nav>
                )}

                {listing.posts.length === 0 ? (
                    <p className="rounded-[24px] bg-[#EFF5FB] p-10 text-center text-[17px] text-[#535556]">{t.blog.list.empty}</p>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {listing.posts.map((post) => <BlogCard key={post.id} post={post} locale={locale} />)}
                    </div>
                )}

                {listing.lastPage > 1 && (
                    <nav aria-label={t.blog.list.paginationLabel} className="mt-12 flex items-center justify-between gap-4">
                        {page > 1 ? (
                            <Link href={localizePath(blogListPath(page - 1, category), locale)} rel="prev" className="rounded-full border border-[#E6E7E8] px-5 py-2.5 font-semibold text-[#0d71ba] hover:border-[#0d71ba]">{t.blog.list.previous}</Link>
                        ) : <span />}
                        <span className="text-[15px] text-[#718096]">{fmt(t.blog.list.pageOf, { page, total: listing.lastPage })}</span>
                        {page < listing.lastPage ? (
                            <Link href={localizePath(blogListPath(page + 1, category), locale)} rel="next" className="rounded-full border border-[#E6E7E8] px-5 py-2.5 font-semibold text-[#0d71ba] hover:border-[#0d71ba]">{t.blog.list.next}</Link>
                        ) : <span />}
                    </nav>
                )}
            </div>
        </div>
    );
}
