import { describe, expect, it } from 'vitest';
import { withCanonical } from './seo';

describe('withCanonical', () => {
    const alternates = {
        canonical: 'https://codetoon.net/project/alpha',
        languages: { en: 'https://codetoon.net/project/alpha', ar: 'https://codetoon.net/ar/project/alpha' },
    };

    it('replaces the canonical and keeps hreflang', () => {
        expect(withCanonical(alternates, ' https://codetoon.net/other ')).toEqual({
            ...alternates,
            canonical: 'https://codetoon.net/other',
        });
    });

    it('keeps the self-referencing canonical without an override', () => {
        expect(withCanonical(alternates, null)).toBe(alternates);
        expect(withCanonical(alternates, '  ')).toBe(alternates);
    });
});
