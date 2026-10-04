import { describe, expect, it } from 'vitest';
import {
    blogListPath, blogPostPath, blogSitemapEntries, extractToc, formatBlogDate, onlyAvailableIn, parseCmsDate, parseListingPage, shouldRedirectToEnglish,
} from './blog';

describe('table of contents', () => {
    it('lists h2s with their ids and plain text, Arabic included', () => {
        const html = '<h2 id="why-ai">Why <strong>AI</strong>?</h2><p>x</p><h3 id="no">Sub</h3>'
            + '<h2 id="لماذا">لماذا &amp; كيف</h2><h2>No id</h2><h2 id="empty"> </h2>';
        expect(extractToc(html)).toEqual([
            { id: 'why-ai', text: 'Why AI?' },
            { id: 'لماذا', text: 'لماذا & كيف' },
        ]);
        expect(extractToc(null)).toEqual([]);
    });
});

describe('paths and redirects', () => {
    it('builds listing and post paths', () => {
        expect(blogListPath(1)).toBe('/blog');
        expect(blogListPath(3)).toBe('/blog/page/3');
        expect(blogListPath(1, 'ai')).toBe('/blog/category/ai');
        expect(blogListPath(2, 'ai')).toBe('/blog/category/ai/page/2');
        expect(blogPostPath('hello')).toBe('/blog/hello');
    });

    it('accepts only whole page numbers above 1 in the URL', () => {
        expect(parseListingPage('2')).toBe(2);
        expect(parseListingPage('1')).toBeNull();
        expect(parseListingPage('0')).toBeNull();
        expect(parseListingPage('2.5')).toBeNull();
        expect(parseListingPage('abc')).toBeNull();
        expect(parseListingPage('02')).toBeNull();
    });

    it('keeps English-only posts out of Arabic lists', () => {
        const posts = [{ slug: 'both', available_locales: ['en', 'ar'] }, { slug: 'en-only', available_locales: ['en'] }];
        expect(onlyAvailableIn(posts, 'ar').map((p) => p.slug)).toEqual(['both']);
        expect(onlyAvailableIn(posts, 'en')).toHaveLength(2);
    });

    it('sends untranslated Arabic posts to English only', () => {
        expect(shouldRedirectToEnglish(['en'], 'ar')).toBe(true);
        expect(shouldRedirectToEnglish(['en', 'ar'], 'ar')).toBe(false);
        expect(shouldRedirectToEnglish(['en'], 'en')).toBe(false);
    });
});

describe('dates', () => {
    it('parses CMS datetimes as UTC', () => {
        expect(parseCmsDate('2026-10-04 09:30:00').toISOString()).toBe('2026-10-04T09:30:00.000Z');
        expect(parseCmsDate('2026-10-04').toISOString()).toBe('2026-10-04T00:00:00.000Z');
    });

    it('formats dates for each language', () => {
        expect(formatBlogDate('2026-10-04 09:30:00', 'en')).toBe('October 4, 2026');
        expect(formatBlogDate('2026-10-04 09:30:00', 'ar')).toMatch(/أكتوبر/);
    });
});

describe('sitemap entries', () => {
    const post = (slug: string, available: ('en' | 'ar')[], category = 'ai') => ({
        slug, available_locales: available, updated_at: '2026-10-01 10:00:00', category: { slug: category, name: null },
    }) as any;

    it('lists Arabic URLs only for translated posts', () => {
        const entries = blogSitemapEntries([post('both', ['en', 'ar']), post('english', ['en'])], [{ slug: 'ai' }]);
        const urls = entries.map((e) => e.url);
        expect(urls).toContain('https://codetoon.net/blog/both');
        expect(urls).toContain('https://codetoon.net/ar/blog/both');
        expect(urls).toContain('https://codetoon.net/blog/english');
        expect(urls).not.toContain('https://codetoon.net/ar/blog/english');
        expect(entries.find((e) => e.url === 'https://codetoon.net/blog/english')?.alternates).toEqual({
            languages: { en: 'https://codetoon.net/blog/english' },
        });
        expect(entries.find((e) => e.url === 'https://codetoon.net/blog/both')?.lastModified).toEqual(new Date('2026-10-01T10:00:00Z'));
    });

    it('lists a category in Arabic only when it has an Arabic post', () => {
        const urls = blogSitemapEntries([post('both', ['en', 'ar'], 'ai'), post('english', ['en'], 'design')], [{ slug: 'ai' }, { slug: 'design' }]).map((e) => e.url);
        expect(urls).toContain('https://codetoon.net/ar/blog/category/ai');
        expect(urls).toContain('https://codetoon.net/blog/category/design');
        expect(urls).not.toContain('https://codetoon.net/ar/blog/category/design');
    });

    it('includes the Arabic blog index only when an Arabic post exists', () => {
        const withAr = blogSitemapEntries([post('both', ['en', 'ar'])], []).map((e) => e.url);
        const withoutAr = blogSitemapEntries([post('english', ['en'])], []).map((e) => e.url);
        expect(withAr).toContain('https://codetoon.net/ar/blog');
        expect(withoutAr).toContain('https://codetoon.net/blog');
        expect(withoutAr).not.toContain('https://codetoon.net/ar/blog');
    });
});
