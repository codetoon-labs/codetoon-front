'use client';

import { createContext, useContext, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { dirOf, localizePath, stripLocale, type Locale } from './config';
import { messages, type Messages } from './messages';

type I18nValue = {
    locale: Locale;
    dir: 'rtl' | 'ltr';
    t: Messages;
    /** Locale-aware internal href: href('/projects') → '/ar/projects' on Arabic pages. */
    href: (path: string) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
    const value = useMemo<I18nValue>(
        () => ({
            locale,
            dir: dirOf(locale),
            t: messages[locale],
            href: (path: string) => localizePath(path, locale),
        }),
        [locale]
    );
    return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
    const ctx = useContext(I18nContext);
    if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>');
    return ctx;
}

/** Current path without the locale prefix, for active-link checks and the language switcher. */
export function useBarePathname(): string {
    return stripLocale(usePathname() ?? '/');
}
