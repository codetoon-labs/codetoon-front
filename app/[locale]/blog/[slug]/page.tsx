import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import JsonLd from '@/app/components/JsonLd';
import ArticleCta from '@/app/components/blog/ArticleCta';
import ArticleFaq from '@/app/components/blog/ArticleFaq';
import ArticleToc from '@/app/components/blog/ArticleToc';
import AuthorBox from '@/app/components/blog/AuthorBox';
import BlogCard from '@/app/components/blog/BlogCard';
import { getBlogPost, getRelatedBlogPosts } from '@/lib/blog-data';
import { blogListPath, blogPostPath, extractToc, formatBlogDate, MIN_TOC_HEADINGS, postDescription, shouldRedirectToEnglish } from '@/lib/blog';
import { fmt, localeAlternatesFor, localizePath, ogLocale } from '@/lib/i18n/config';
import { getMessages, resolveLocale } from '@/lib/i18n/server';
import { ogImages, pageTitle } from '@/lib/seo';
import { blog, blogPosting, breadcrumbs, entityId, faqPage, graph, webPage } from '@/lib/structured-data';

export const revalidate = 300;

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const locale = await resolveLocale(params);
    const { slug } = await params;
    const post = await getBlogPost(slug, locale);
    const t = getMessages(locale).blog;

    if (!post) return { title: t.meta.notFoundTitle, robots: { index: false, follow: false } };
    if (shouldRedirectToEnglish(post.available_locales, locale)) return {};

    const path = blogPostPath(slug);
    const title = pageTitle(post.seo_title || post.title, t.meta.title);
    // Fields arrive in the page's language only, so this never mixes languages.
    const description = postDescription(post);
    return {
        title,
        description,
        alternates: localeAlternatesFor(path, locale, post.available_locales),
        openGraph: {
            title: `${title} | Codetoon`,
            description,
            type: 'article',
            locale: ogLocale[locale],
            publishedTime: post.published_at,
            modifiedTime: post.updated_at,
            section: post.category?.name ?? undefined,
            tags: post.tags ?? undefined,
            images: ogImages(post.cover?.full_url),
        },
    };
}

export default async function BlogPostPage({ params }: Props) {
    const locale = await resolveLocale(params);
    const { slug } = await params;
    const post = await getBlogPost(slug, locale);
    if (!post) notFound();

    const path = blogPostPath(slug);
    // Arabic only exists once translated; until then the English post is the page.
    if (shouldRedirectToEnglish(post.available_locales, locale)) redirect(localizePath(path, 'en'));

    const t = getMessages(locale);
    const related = await getRelatedBlogPosts(slug, locale);
    const toc = extractToc(post.body);

    const jsonLd = graph(
        webPage({ path, locale, name: post.title ?? slug, description: postDescription(post) || undefined, image: post.cover?.full_url, mainEntityId: entityId(path, locale, 'article'), dateModified: post.updated_at }),
        breadcrumbs(path, locale, [
            { name: t.blog.meta.title, path: '/blog' },
            ...(post.category ? [{ name: post.category.name ?? post.category.slug, path: blogListPath(1, post.category.slug) }] : []),
            { name: post.title ?? slug, path },
        ]),
        blogPosting(post, path, locale),
        // Minimal Blog node so BlogPosting.isPartOf resolves within this graph.
        blog(locale, [], t.blog.meta.title, t.blog.meta.description),
        faqPage(post.faqs, path, locale),
    );

    return (
        <article className="px-5 pt-32 pb-20 sm:pt-40">
            <JsonLd data={jsonLd} />
            <div className="mx-auto w-full max-w-[760px]">
                <header>
                    {post.category && (
                        <Link href={localizePath(blogListPath(1, post.category.slug), locale)} className="inline-flex rounded-full bg-[#e6f0f8] px-3.5 py-1.5 text-[13px] font-semibold text-[#0d71ba]">
                            {post.category.name}
                        </Link>
                    )}
                    <h1 className="mt-5 text-[32px] font-bold leading-tight text-[#000305] sm:text-[44px]">{post.title}</h1>
                    <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[15px] text-[#718096]">
                        {post.author?.name && <span className="font-semibold text-[#2d3748]">{post.author.name}</span>}
                        <time dateTime={post.published_at}>{fmt(t.blog.post.publishedOn, { date: formatBlogDate(post.published_at, locale) })}</time>
                        {post.reading_time && <span>{fmt(t.blog.list.minRead, { minutes: post.reading_time })}</span>}
                    </div>
                </header>

                {post.cover?.full_url && (
                    <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-[24px] bg-[#EFF5FB]">
                        <Image src={post.cover.full_url} alt={post.cover_alt || fmt(t.blog.post.coverAltFallback, { title: post.title ?? '' })} fill priority sizes="(min-width: 800px) 760px, 100vw" className="object-cover" />
                    </div>
                )}

                {toc.length >= MIN_TOC_HEADINGS && <div className="mt-10"><ArticleToc items={toc} title={t.blog.post.toc} /></div>}

                {post.body && <div className="prose-article mt-10" dangerouslySetInnerHTML={{ __html: post.body }} />}

                {post.faqs && post.faqs.length > 0 && <ArticleFaq faqs={post.faqs} title={t.blog.post.faq} />}

                {post.tags && post.tags.length > 0 && (
                    <div className="mt-10 flex flex-wrap items-center gap-2" aria-label={t.blog.post.tags}>
                        {post.tags.map((tag) => (
                            <span key={tag} className="rounded-full border border-[#E6E7E8] px-3 py-1 text-[13px] text-[#535556]">#{tag}</span>
                        ))}
                    </div>
                )}

                {post.author && <AuthorBox author={post.author} label={t.blog.post.writtenBy} />}

                <ArticleCta slug={slug} />
            </div>

            {related.length > 0 && (
                <section className="mx-auto mt-20 w-full max-w-[1200px]" aria-labelledby="related-title">
                    <h2 id="related-title" className="mb-6 text-[28px] font-bold text-[#000305]">{t.blog.post.related}</h2>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {related.map((p) => <BlogCard key={p.id} post={p} locale={locale} />)}
                    </div>
                </section>
            )}
        </article>
    );
}
