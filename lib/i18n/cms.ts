import { defaultLocale, locales, type Locale } from './config';

// The CMS returns every translatable field in all locales at once
// (`title { en ar }`, lists as `deliverables { en ar }`), so one query serves
// both languages. localize() collapses those objects to the page's locale,
// falling back to English for anything not translated yet, so components keep
// receiving plain strings and arrays.

const TRANSLATION_TYPES = new Set(['Translation', 'TranslationList', 'ProcessStepsTranslation', 'FaqTranslation', 'ReadingTime']);
const LOCALE_KEYS = new Set<string>([...locales, '__typename']);

function isTranslation(value: Record<string, unknown>): boolean {
    if (typeof value.__typename === 'string') return TRANSLATION_TYPES.has(value.__typename);
    const keys = Object.keys(value);
    return keys.length > 0 && keys.every((k) => LOCALE_KEYS.has(k));
}

function isEmpty(value: unknown): boolean {
    return value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0);
}

export function localize<T = any>(value: unknown, locale: Locale): T {
    if (Array.isArray(value)) return value.map((item) => localize(item, locale)) as T;
    if (value === null || typeof value !== 'object') return value as T;

    const record = value as Record<string, unknown>;
    if (isTranslation(record)) {
        const picked = isEmpty(record[locale]) ? record[defaultLocale] : record[locale];
        return localize(picked ?? null, locale);
    }

    const out: Record<string, unknown> = {};
    for (const [key, field] of Object.entries(record)) out[key] = localize(field, locale);
    return out as T;
}

/**
 * Prose and SEO copy must not cross languages: an Arabic page showing an
 * English meta description or FAQ is worse than none. Before localize(), keep
 * only the page's own language for `keys`, so those fields stay null when
 * untranslated (callers fall back within the language). Labels (names, tags)
 * are left out of `keys` and keep localize()'s English fallback.
 */
export function strictFields<T>(raw: T, locale: Locale, keys: readonly string[]): T {
    if (locale === defaultLocale || raw === null || typeof raw !== 'object') return raw;

    const out: Record<string, unknown> = { ...(raw as Record<string, unknown>) };
    for (const key of keys) {
        const value = out[key];
        if (value === null || typeof value !== 'object' || Array.isArray(value)) continue;
        const { __typename, [locale]: own } = value as Record<string, unknown>;
        out[key] = { ...(__typename === undefined ? {} : { __typename }), [locale]: own ?? null };
    }
    return out as T;
}

/** Project slugs are translatable in the CMS, but URLs always use the English one. */
export function englishSlug(slug: unknown): string | undefined {
    if (typeof slug === 'string') return slug;
    if (slug && typeof slug === 'object') return (slug as Record<string, string>)[defaultLocale] ?? undefined;
    return undefined;
}
