import { cache } from 'react';
import type { Locale } from '@/lib/i18n/config';
import { localize } from '@/lib/i18n/cms';
import { cmsQuery } from '@/lib/server-data';
import { GET_BLOG_CATEGORIES, GET_BLOG_POST, GET_BLOG_POSTS, GET_RELATED_BLOG_POSTS } from '@/lib/graphql/queries';
import { onlyAvailableIn } from '@/lib/blog';

// Blog data for the pages. Queries return every locale; localize() picks the
// page's language. `available_locales` is kept raw so pages can decide whether
// an Arabic URL exists for a post.

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
        posts: localize(result?.data ?? [], locale),
        currentPage: result?.paginatorInfo?.currentPage ?? page,
        lastPage: result?.paginatorInfo?.lastPage ?? 1,
        total: result?.paginatorInfo?.total ?? 0,
    };
});

export const getBlogPost = cache(async (slug: string, locale: Locale): Promise<BlogPost | null> => {
    const data = await cmsQuery<any>(`blog post "${slug}"`, GET_BLOG_POST, { slug });
    return data?.blogPost ? localize<BlogPost>(data.blogPost, locale) : null;
});

export const getRelatedBlogPosts = cache(async (slug: string, locale: Locale): Promise<BlogPostCard[]> => {
    const data = await cmsQuery<any>(`related posts "${slug}"`, GET_RELATED_BLOG_POSTS, { slug });
    return onlyAvailableIn(localize<BlogPostCard[]>(data?.relatedBlogPosts ?? [], locale), locale);
});

export const getBlogCategories = cache(async (locale: Locale): Promise<BlogCategory[]> => {
    const data = await cmsQuery<any>('blog categories', GET_BLOG_CATEGORIES);
    return localize(data?.blogCategories ?? [], locale);
});

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
