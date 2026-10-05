import { describe, expect, it } from 'vitest';
import { englishSlug, localize, strictFields, strictSeo } from './cms';

const T = (en: unknown, ar: unknown, __typename = 'Translation') => ({ __typename, en, ar });

const service = {
    __typename: 'Service',
    id: '1',
    slug: 'design',
    banner: { __typename: 'Media', full_url: 'x.png' },
    title: T('Design', 'تصميم'),
    description: T('Desc', null),
    short_description: T(null, null),
    deliverables: T(['Logo'], [], 'TranslationList'),
    tags: [T('n8n', null), T('seo', 'سيو')],
    process_steps: {
        __typename: 'ProcessStepsTranslation',
        en: [{ __typename: 'ProcessStep', title: 'Plan', description: null }],
        ar: [{ __typename: 'ProcessStep', title: 'خطة', description: 'وصف' }],
    },
};

describe('localize', () => {
    it('picks the requested locale', () => {
        const ar = localize<any>(service, 'ar');
        expect(ar.title).toBe('تصميم');
        expect(ar.tags).toEqual(['n8n', 'سيو']);
        expect(ar.process_steps).toEqual([{ __typename: 'ProcessStep', title: 'خطة', description: 'وصف' }]);

        const en = localize<any>(service, 'en');
        expect(en.title).toBe('Design');
        expect(en.tags).toEqual(['n8n', 'seo']);
        expect(en.process_steps[0].title).toBe('Plan');
    });

    it('falls back to English per field and per list', () => {
        const ar = localize<any>(service, 'ar');
        expect(ar.description).toBe('Desc');
        expect(ar.deliverables).toEqual(['Logo']);
        expect(ar.short_description).toBeNull();
    });

    it('leaves non-translation objects and scalars intact', () => {
        const ar = localize<any>(service, 'ar');
        expect(ar.banner).toEqual({ __typename: 'Media', full_url: 'x.png' });
        expect(ar.slug).toBe('design');
        expect(ar.id).toBe('1');
    });

    it('recognises translations without __typename', () => {
        expect(localize<any>({ name: { en: 'Acme', ar: 'أكمي' } }, 'ar').name).toBe('أكمي');
        expect(localize<any>({ meta: {} }, 'ar').meta).toEqual({});
    });

    it('keeps project URLs on the English slug', () => {
        expect(englishSlug({ en: 'alpha', ar: 'alfa' })).toBe('alpha');
        expect(englishSlug('alpha')).toBe('alpha');
        expect(englishSlug(null)).toBeUndefined();
    });
});

describe('blog shapes', () => {
    it('localizes FAQ lists and reading time with English fallback', () => {
        const post = {
            faqs: { __typename: 'FaqTranslation', en: [{ __typename: 'Faq', question: 'Q', answer: 'A' }], ar: null },
            reading_time: { __typename: 'ReadingTime', en: 6, ar: 7 },
        };
        expect(localize<any>(post, 'ar')).toEqual({
            faqs: [{ __typename: 'Faq', question: 'Q', answer: 'A' }],
            reading_time: 7,
        });
        expect(localize<any>({ reading_time: { __typename: 'ReadingTime', en: 6, ar: null } }, 'ar').reading_time).toBe(6);
    });
});

describe('strictFields', () => {
    const PROSE = ['seo_title', 'seo_description', 'excerpt', 'faqs', 'cover_alt'];
    const post = {
        slug: 'hello',
        title: T('Hello', 'مرحبا'),
        seo_title: T('SEO title', null),
        seo_description: T('SEO description', ''),
        excerpt: T('Excerpt', 'مقتطف'),
        faqs: { __typename: 'FaqTranslation', en: [{ question: 'Q', answer: 'A' }], ar: null },
        cover_alt: T('Cover', null),
        author: { name: T('Omar', null) },
    };

    it('keeps English-only prose off Arabic pages', () => {
        expect(localize<any>(strictFields(post, 'ar', PROSE), 'ar')).toEqual({
            slug: 'hello',
            title: 'مرحبا',
            seo_title: null,
            seo_description: null,
            excerpt: 'مقتطف',
            faqs: null,
            cover_alt: null,
            // Labels still fall back to English.
            author: { name: 'Omar' },
        });
    });

    it('uses the Arabic value when there is one', () => {
        const translated = { ...post, faqs: { __typename: 'FaqTranslation', en: [{ question: 'Q', answer: 'A' }], ar: [{ question: 'س', answer: 'ج' }] } };
        expect(localize<any>(strictFields(translated, 'ar', PROSE), 'ar').faqs).toEqual([{ question: 'س', answer: 'ج' }]);
    });

    it('leaves English pages and missing fields alone', () => {
        expect(strictFields(post, 'en', PROSE)).toBe(post);
        expect(localize<any>(strictFields(post, 'en', PROSE), 'en').seo_title).toBe('SEO title');
        expect(strictFields({ slug: 'x', excerpt: null }, 'ar', PROSE)).toEqual({ slug: 'x', excerpt: null });
    });
});

describe('strictSeo', () => {
    const project = {
        __typename: 'Project',
        title: T('Alpha', 'ألفا'),
        seo: {
            __typename: 'Seo',
            title: T('EN SEO title', null),
            description: T('EN SEO description', 'وصف'),
            canonical: T('https://codetoon.net/x', null),
            og_image: { __typename: 'Media', full_url: 'og.png' },
        },
    };

    it('keeps English SEO overrides off Arabic pages', () => {
        const ar = localize<any>(strictSeo(project, 'ar'), 'ar');
        expect(ar.seo.title).toBeNull();
        expect(ar.seo.canonical).toBeNull();
        expect(ar.seo.description).toBe('وصف');
        expect(ar.seo.og_image.full_url).toBe('og.png');
        // Content fields keep the normal English fallback.
        expect(ar.title).toBe('ألفا');
    });

    it('leaves English pages and records without overrides untouched', () => {
        expect(localize<any>(strictSeo(project, 'en'), 'en').seo.title).toBe('EN SEO title');
        expect(strictSeo({ seo: null }, 'ar')).toEqual({ seo: null });
        expect(strictSeo(null, 'ar')).toBeNull();
    });
});
