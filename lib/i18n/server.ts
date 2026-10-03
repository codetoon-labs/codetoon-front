import { notFound } from 'next/navigation';
import { isLocale, type Locale } from './config';
import { messages } from './messages';

/** Validate the [locale] route param; anything else is a 404. */
export async function resolveLocale(params: Promise<{ locale: string }>): Promise<Locale> {
    const { locale } = await params;
    if (!isLocale(locale)) notFound();
    return locale;
}

export function getMessages(locale: Locale) {
    return messages[locale];
}
