import Image from 'next/image';
import Link from 'next/link';
import type { BlogPostCard } from '@/lib/blog-data';
import { blogPostPath, formatBlogDate } from '@/lib/blog';
import { fmt, localizePath, type Locale } from '@/lib/i18n/config';
import { getMessages } from '@/lib/i18n/server';

export default function BlogCard({ post, locale }: { post: BlogPostCard; locale: Locale }) {
    const t = getMessages(locale).blog;
    const href = localizePath(blogPostPath(post.slug), locale);
    return (
        <article className="group flex flex-col overflow-hidden rounded-[24px] border border-[#E6E7E8] bg-white transition-shadow duration-300 hover:shadow-lg">
            <Link href={href} className="relative block aspect-[16/9] overflow-hidden bg-[#EFF5FB]" tabIndex={-1} aria-hidden="true">
                {post.cover?.full_url && (
                    <Image
                        src={post.cover.full_url}
                        alt={post.cover_alt || fmt(t.post.coverAltFallback, { title: post.title ?? '' })}
                        fill
                        sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                )}
            </Link>
            <div className="flex flex-1 flex-col gap-3 p-6">
                {post.category?.name && (
                    <span className="w-fit rounded-full bg-[#e6f0f8] px-3 py-1 text-[13px] font-semibold text-[#0d71ba]">{post.category.name}</span>
                )}
                <h2 className="text-[20px] font-bold leading-snug text-[#000305]">
                    <Link href={href} className="hover:text-[#0d71ba]">{post.title}</Link>
                </h2>
                {post.excerpt && <p className="line-clamp-3 text-[15px] leading-7 text-[#535556]">{post.excerpt}</p>}
                <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-2 text-[13px] text-[#718096]">
                    {post.author?.name && <span className="font-semibold text-[#2d3748]">{post.author.name}</span>}
                    <time dateTime={post.published_at}>{formatBlogDate(post.published_at, locale)}</time>
                    {post.reading_time && <span>{fmt(t.list.minRead, { minutes: post.reading_time })}</span>}
                </div>
            </div>
        </article>
    );
}
