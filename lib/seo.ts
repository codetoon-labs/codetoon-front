// Shared SEO normalisation for CMS-driven metadata.
//
// CMS copy is written for on-page display, not for SERPs: titles arrive with
// stray whitespace and inconsistent casing, and the description fields run
// 200-650 characters where Google renders ~155. These helpers make page
// metadata resilient to that instead of relying on editors to get it right.

export const OG_FALLBACK_IMAGE = 'https://codetoon.net/codetoon-og.png';

/** Collapse newlines and runs of whitespace, then trim. */
export function cleanText(value?: string | null): string {
  return (value ?? '').replace(/\s+/g, ' ').trim();
}

/**
 * First non-empty candidate, cleaned and truncated on a word boundary so the
 * SERP snippet ends in a word rather than mid-sentence.
 */
export function metaDescription(
  ...candidates: (string | null | undefined)[]
): string {
  const text = candidates.map(cleanText).find(Boolean) ?? '';
  if (text.length <= 155) return text;

  const cut = text.slice(0, 155);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > 100 ? cut.slice(0, lastSpace) : cut).replace(/[,;:.\-–—]$/, '')}…`;
}

/**
 * Page title for the <title> template. The root layout appends "| Codetoon",
 * so titles here must not carry their own brand suffix.
 */
export function pageTitle(value?: string | null, fallback = 'Codetoon'): string {
  return cleanText(value) || fallback;
}

/**
 * Append a qualifier only when the title doesn't already say it — several CMS
 * titles already end in "Services", and "… Services services" reads as spam.
 */
export function suffixOnce(title: string, suffix: string): string {
  const head = suffix.split(' ')[0].toLowerCase();
  return new RegExp(`\\b${head}\\b`, 'i').test(title)
    ? title
    : `${title} ${suffix}`;
}

/** Prefer a CMS image, fall back to the site OG card. */
export function ogImages(url?: string | null) {
  return [{ url: cleanText(url) || OG_FALLBACK_IMAGE }];
}
