import { describe, expect, it } from 'vitest';
import { absoluteUrl, fmt, isLocale, localeAlternates, localizePath, stripLocale } from './config';

describe('locale paths', () => {
    it('prefixes Arabic and leaves English bare', () => {
        expect(localizePath('/', 'en')).toBe('/');
        expect(localizePath('/projects', 'en')).toBe('/projects');
        expect(localizePath('/', 'ar')).toBe('/ar');
        expect(localizePath('/projects', 'ar')).toBe('/ar/projects');
    });

    it('re-localizes already-prefixed paths', () => {
        expect(localizePath('/ar/projects', 'en')).toBe('/projects');
        expect(localizePath('/en/projects', 'ar')).toBe('/ar/projects');
    });

    it('leaves external, protocol-relative and hash links alone', () => {
        for (const href of ['https://wa.me/1', '//cdn.example.com/x', '#contact', 'tel:+20']) {
            expect(localizePath(href, 'ar')).toBe(href);
        }
    });

    it('strips the locale prefix only for whole segments', () => {
        expect(stripLocale('/ar')).toBe('/');
        expect(stripLocale('/ar/about-us')).toBe('/about-us');
        expect(stripLocale('/en')).toBe('/');
        expect(stripLocale('/arabic')).toBe('/arabic');
        expect(stripLocale('/')).toBe('/');
    });

    it('builds absolute URLs and hreflang alternates', () => {
        expect(absoluteUrl('/', 'en')).toBe('https://codetoon.net');
        expect(absoluteUrl('/', 'ar')).toBe('https://codetoon.net/ar');
        expect(localeAlternates('/projects', 'ar')).toEqual({
            canonical: 'https://codetoon.net/ar/projects',
            languages: {
                en: 'https://codetoon.net/projects',
                ar: 'https://codetoon.net/ar/projects',
                'x-default': 'https://codetoon.net/projects',
            },
        });
    });

    it('validates locales and fills placeholders', () => {
        expect(isLocale('ar')).toBe(true);
        expect(isLocale('fr')).toBe(false);
        expect(fmt('© {year} Codetoon', { year: 2026 })).toBe('© 2026 Codetoon');
        expect(fmt('{missing}', {})).toBe('{missing}');
    });
});
