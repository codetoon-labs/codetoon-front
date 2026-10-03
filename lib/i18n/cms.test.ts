import { describe, expect, it } from 'vitest';
import { englishSlug, localize } from './cms';

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
