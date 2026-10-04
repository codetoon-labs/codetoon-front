import { cache } from 'react';
import type { Locale } from '@/lib/i18n/config';
import { localize, strictFields } from '@/lib/i18n/cms';
import { cmsQuery } from '@/lib/server-data';
import { GET_BLOG_CATEGORIES, GET_BLOG_POST, GET_BLOG_POSTS, GET_RELATED_BLOG_POSTS } from '@/lib/graphql/queries';
import { pickRelated } from '@/lib/blog';

// Blog data for the pages. Queries return every locale; localize() picks the
// page's language. `available_locales` is kept raw so pages can decide whether
// an Arabic URL exists for a post.
//
// Prose and SEO fields never fall back to English on other-language pages
// (strictFields); pages fall back within their own language instead. Labels
// (category and author names, tags) keep the English fallback.

const POST_PROSE = ['seo_title', 'seo_description', 'excerpt', 'faqs', 'cover_alt'];
const CATEGORY_PROSE = ['description', 'seo_title', 'seo_description'];

function localizePosts<T>(raw: unknown[] | null | undefined, locale: Locale): T[] {
    return localize<T[]>((raw ?? []).map((post) => strictFields(post, locale, POST_PROSE)), locale);
}

export const BLOG_PAGE_SIZE = 12;

export type BlogAuthor = {
    id: string;
    name: string | null;
    title: string | null;
    bio?: string | null;
    image?: { full_url: string } | null;
};

export type BlogCategory = {
    id: string;
    slug: string;
    name: string | null;
    description?: string | null;
    seo_title?: string | null;
    seo_description?: string | null;
    posts_count?: number;
};

export type BlogPostCard = {
    id: string;
    slug: string;
    title: string | null;
    excerpt: string | null;
    cover_alt: string | null;
    reading_time: number | null;
    available_locales: Locale[];
    published_at: string;
    updated_at: string;
    cover: { full_url: string } | null;
    category: { slug: string; name: string | null } | null;
    author: BlogAuthor | null;
};

export type BlogPost = BlogPostCard & {
    body: string | null;
    seo_title: string | null;
    seo_description: string | null;
    faqs: { question: string; answer: string }[] | null;
    tags: string[] | null;
};

export type BlogPage = { posts: BlogPostCard[]; currentPage: number; lastPage: number; total: number };

export const getBlogPosts = cache(async (locale: Locale, page: number, category?: string): Promise<BlogPage> => {
    const data = await cmsQuery<any>('blog posts', GET_BLOG_POSTS, {
        first: BLOG_PAGE_SIZE,
        page,
        category: category ?? null,
        // English listings show every post; other languages only translated ones.
        locale: locale === 'en' ? null : locale,
    });
    const result = data?.blogPosts;
    return {
        posts: localizePosts<BlogPostCard>(result?.data, locale),
        currentPage: result?.paginatorInfo?.currentPage ?? page,
        lastPage: result?.paginatorInfo?.lastPage ?? 1,
        total: result?.paginatorInfo?.total ?? 0,
    };
});

export const getBlogPost = cache(async (slug: string, locale: Locale): Promise<BlogPost | null> => {
    const data = await cmsQuery<any>(`blog post "${slug}"`, GET_BLOG_POST, { slug });
    return data?.blogPost ? localize<BlogPost>(strictFields(data.blogPost, locale, POST_PROSE), locale) : null;
});

export const getRelatedBlogPosts = cache(async (slug: string, locale: Locale): Promise<BlogPostCard[]> => {
    const data = await cmsQuery<any>(`related posts "${slug}"`, GET_RELATED_BLOG_POSTS, { slug });
    return pickRelated(localizePosts<BlogPostCard>(data?.relatedBlogPosts, locale), locale);
});

const fetchBlogCategories = cache(async (locale: Locale, withPostsOnly: boolean): Promise<BlogCategory[]> => {
    const data = await cmsQuery<any>('blog categories', GET_BLOG_CATEGORIES, { locale: withPostsOnly ? locale : null });
    return localize<BlogCategory[]>((data?.blogCategories ?? []).map((c: unknown) => strictFields(c, locale, CATEGORY_PROSE)), locale);
});

/** Categories with at least one live post in `locale` (chips, sitemap). */
export async function getBlogCategories(locale: Locale): Promise<BlogCategory[]> {
    return fetchBlogCategories(locale, true);
}

/** Any category by slug, even an empty one: its page stays reachable (noindex) rather than 404. */
export async function findBlogCategory(slug: string, locale: Locale): Promise<BlogCategory | undefined> {
    return (await fetchBlogCategories(locale, false)).find((c) => c.slug === slug);
}

/** Every live post (English fields), for the sitemap and llms.txt. */
export const getAllBlogPosts = cache(async (): Promise<BlogPostCard[]> => {
    const posts: BlogPostCard[] = [];
    for (let page = 1; page <= 50; page++) {
        const data = await cmsQuery<any>('all blog posts', GET_BLOG_POSTS, { first: 100, page, category: null, locale: null });
        const result = data?.blogPosts;
        posts.push(...localize<BlogPostCard[]>(result?.data ?? [], 'en'));
        if (!result || page >= (result.paginatorInfo?.lastPage ?? 1)) break;
    }
    return posts;
});
