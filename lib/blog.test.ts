import { describe, expect, it } from 'vitest';
import {
    blogListPath, blogPostPath, blogSitemapEntries, listingLocales, pickRelated, postDescription, extractToc, formatBlogDate, onlyAvailableIn, parseCmsDate, parseListingPage, shouldRedirectToEnglish,
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

    it('leaves out categories without posts', () => {
        const urls = blogSitemapEntries([post('both', ['en', 'ar'], 'ai')], [{ slug: 'ai' }, { slug: 'empty' }]).map((e) => e.url);
        expect(urls).toContain('https://codetoon.net/blog/category/ai');
        expect(urls).not.toContain('https://codetoon.net/blog/category/empty');
        expect(urls).not.toContain('https://codetoon.net/ar/blog/category/empty');
    });

    it('lists nothing before the first post', () => {
        expect(blogSitemapEntries([], [{ slug: 'ai' }])).toEqual([]);
    });
});

describe('post description', () => {
    it('prefers the SEO description, then the excerpt, then the body text', () => {
        expect(postDescription({ seo_description: ' SEO ', excerpt: 'Excerpt', body: '<p>Body</p>' })).toBe('SEO');
        expect(postDescription({ seo_description: null, excerpt: 'Excerpt', body: '<p>Body</p>' })).toBe('Excerpt');
        expect(postDescription({ seo_description: '', excerpt: null, body: '<h2 id="a">لماذا</h2><p>نص &amp; <strong>مهم</strong></p>' })).toBe('لماذا نص & مهم');
        expect(postDescription({ seo_description: null, excerpt: null })).toBe('');
    });

    it('cuts a long body down to a snippet', () => {
        const body = `<p>${'word '.repeat(80)}</p>`;
        const description = postDescription({ seo_description: null, excerpt: null, body });
        expect(description.length).toBeLessThanOrEqual(156);
        expect(description.endsWith('…')).toBe(true);
    });
});

describe('listing hreflang', () => {
    it('links the Arabic listing only when that page has Arabic posts', () => {
        expect(listingLocales({ total: 3, lastPage: 1 }, 1)).toEqual(['en', 'ar']);
        expect(listingLocales({ total: 0, lastPage: 1 }, 1)).toEqual(['en']);
        expect(listingLocales({ total: 13, lastPage: 2 }, 2)).toEqual(['en', 'ar']);
        expect(listingLocales({ total: 13, lastPage: 2 }, 3)).toEqual(['en']);
    });
});

describe('related posts', () => {
    it('keeps three posts in the page language even when some are untranslated', () => {
        const posts = ['a', 'b', 'c', 'd', 'e', 'f'].map((slug, i) => ({ slug, available_locales: i % 2 ? ['en', 'ar'] : ['en'] }));
        expect(pickRelated(posts, 'en').map((p) => p.slug)).toEqual(['a', 'b', 'c']);
        expect(pickRelated(posts, 'ar').map((p) => p.slug)).toEqual(['b', 'd', 'f']);
    });
});
