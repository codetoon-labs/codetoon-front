// Locale routing contract.
//
// English is the default and lives at the bare path (codetoon.net/projects);
// Arabic is prefixed (codetoon.net/ar/projects). Internally every page sits
// under app/[locale], and middleware rewrites unprefixed requests to /en/…,
// so /en/… is never a public URL — it 308s back to the bare path.

export const locales = ['en', 'ar'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const SITE_URL = 'https://codetoon.net';

export function isLocale(value: unknown): value is Locale {
    return typeof value === 'string' && (locales as readonly string[]).includes(value);
}

export function dirOf(locale: Locale): 'rtl' | 'ltr' {
    return locale === 'ar' ? 'rtl' : 'ltr';
}

/** "/projects" → "/projects" (en) or "/ar/projects" (ar). Leaves hashes, queries and external URLs alone. */
export function localizePath(path: string, locale: Locale): string {
    if (!path.startsWith('/') || path.startsWith('//')) return path;
    const bare = stripLocale(path);
    if (locale === defaultLocale) return bare;
    return bare === '/' ? `/${locale}` : `/${locale}${bare}`;
}

/** "/ar/projects" → "/projects"; "/en" → "/". */
export function stripLocale(path: string): string {
    const match = path.match(/^\/(en|ar)(?=\/|$|\?|#)(.*)$/);
    if (!match) return path || '/';
    const rest = match[2];
    return rest === '' || rest.startsWith('?') || rest.startsWith('#') ? `/${rest}` : rest;
}

/** Absolute URL of a path in the given locale. */
export function absoluteUrl(path: string, locale: Locale): string {
    const localized = localizePath(path, locale);
    return localized === '/' ? SITE_URL : `${SITE_URL}${localized}`;
}

/**
 * Metadata `alternates` for a locale-agnostic path: a self-referencing
 * canonical plus hreflang links to every language version.
 */
export function localeAlternates(path: string, locale: Locale) {
    return {
        canonical: absoluteUrl(path, locale),
        languages: {
            en: absoluteUrl(path, 'en'),
            ar: absoluteUrl(path, 'ar'),
            'x-default': absoluteUrl(path, defaultLocale),
        },
    };
}

/** Like localeAlternates, but for pages that exist in only some languages (blog posts). */
export function localeAlternatesFor(path: string, locale: Locale, available: readonly Locale[]) {
    return {
        canonical: absoluteUrl(path, locale),
        languages: {
            ...Object.fromEntries(available.map((l) => [l, absoluteUrl(path, l)])),
            'x-default': absoluteUrl(path, defaultLocale),
        },
    };
}

export const ogLocale: Record<Locale, string> = { en: 'en_US', ar: 'ar_EG' };

/** Replace {name} placeholders. */
export function fmt(template: string, vars: Record<string, string | number>): string {
    return template.replace(/\{(\w+)\}/g, (_, key) => (key in vars ? String(vars[key]) : `{${key}}`));
}
