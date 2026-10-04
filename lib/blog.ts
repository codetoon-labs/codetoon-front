import { type Locale } from '@/lib/i18n/config';

/** Arabic pages must never link to an Arabic URL that redirects away. */
export function onlyAvailableIn<T extends { available_locales: readonly string[] }>(posts: T[], locale: Locale): T[] {
    return posts.filter((post) => post.available_locales.includes(locale));
}
