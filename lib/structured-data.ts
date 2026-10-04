// schema.org JSON-LD for every page, in one place.
//
// The root layout emits the site-wide entities (Organization, WebSite). Each
// page emits its own @graph: a WebPage (or AboutPage / CollectionPage), its
// BreadcrumbList, and the page's main entity. Nodes reference each other by
// @id, which is how search engines join them across <script> blocks.

import { absoluteUrl, SITE_URL, type Locale } from '@/lib/i18n/config';
import type { BlogPost, BlogPostCard } from '@/lib/blog-data';
import { getMessages } from '@/lib/i18n/server';
import { cleanText } from '@/lib/seo';

type Node = Record<string, unknown>;
export type Crumb = { name: string; path: string };

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

const LOGO = `${SITE_URL}/logo.svg`;
const OG_IMAGE = `${SITE_URL}/codetoon-og.png`;
const TELEPHONE = '+201156167758';
const EMAIL = 'Info@Codetoon.net';

/** Locale-specific @ids: each language version is its own WebSite / WebPage. */
export const websiteId = (locale: Locale) => `${absoluteUrl('/', locale)}/#website`;
const pageUrl = (path: string, locale: Locale) => absoluteUrl(path, locale);
const pageId = (path: string, locale: Locale) => `${pageUrl(path, locale)}#webpage`;
const breadcrumbId = (path: string, locale: Locale) => `${pageUrl(path, locale)}#breadcrumb`;
export const entityId = (path: string, locale: Locale, kind: string) => `${pageUrl(path, locale)}#${kind}`;

/** Drop undefined, null, empty strings and empty arrays so no node advertises a blank property. */
function compact<T extends Node>(node: T): T {
    return Object.fromEntries(
        Object.entries(node).filter(([, v]) => v !== undefined && v !== null && v !== '' && !(Array.isArray(v) && v.length === 0)),
    ) as T;
}

/** CMS text arrives with stray whitespace and newlines; schema values should be clean. */
export function text(value?: string | null): string | undefined {
    return cleanText(value) || undefined;
}

export function graph(...nodes: (Node | null | undefined | false)[]) {
    return { '@context': 'https://schema.org', '@graph': nodes.filter(Boolean) as Node[] };
}

export function organization(locale: Locale): Node {
    const t = getMessages(locale).common;
    return compact({
        '@type': 'ProfessionalService',
        '@id': ORGANIZATION_ID,
        name: 'Codetoon',
        alternateName: ['CodeToon', 'كودتون'],
        url: SITE_URL,
        logo: { '@type': 'ImageObject', '@id': `${SITE_URL}/#logo`, url: LOGO, caption: 'Codetoon' },
        image: OG_IMAGE,
        description: t.meta.description,
        email: EMAIL,
        telephone: TELEPHONE,
        address: {
            '@type': 'PostalAddress',
            streetAddress: '316 Ninety Road, Sector 2, Office No. 3, Third Floor, 5th Settlement',
            addressLocality: 'New Cairo',
            addressRegion: 'Cairo',
            addressCountry: 'EG',
        },
        // Coordinates of the office pin the site links to (maps.app.goo.gl/VcaAJGKX93yuiG4j9).
        geo: { '@type': 'GeoCoordinates', latitude: 30.025859, longitude: 31.464509 },
        hasMap: 'https://maps.app.goo.gl/VcaAJGKX93yuiG4j9',
        areaServed: { '@type': 'Country', name: 'Egypt' },
        knowsLanguage: ['en', 'ar'],
        contactPoint: [
            {
                '@type': 'ContactPoint',
                contactType: 'sales',
                telephone: TELEPHONE,
                email: EMAIL,
                areaServed: 'EG',
                availableLanguage: ['English', 'Arabic'],
            },
        ],
        sameAs: [
            'https://www.facebook.com/codetoon.net',
            'https://www.linkedin.com/company/codetoon',
            'https://x.com/Codetooneg',
        ],
    });
}

export function website(locale: Locale): Node {
    return {
        '@type': 'WebSite',
        '@id': websiteId(locale),
        name: 'Codetoon',
        alternateName: 'كودتون',
        url: absoluteUrl('/', locale),
        inLanguage: locale,
        publisher: { '@id': ORGANIZATION_ID },
    };
}

/** Home is always the first crumb, so callers pass only the trail below it. */
export function breadcrumbs(path: string, locale: Locale, trail: Crumb[]): Node {
    const home = getMessages(locale).common.nav.home;
    const items = [{ name: home, path: '/' }, ...trail];
    return {
        '@type': 'BreadcrumbList',
        '@id': breadcrumbId(path, locale),
        itemListElement: items.map((crumb, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: text(crumb.name) ?? crumb.path,
            item: absoluteUrl(crumb.path, locale),
        })),
    };
}

export function webPage(options: {
    path: string;
    locale: Locale;
    name: string;
    description?: string;
    type?: 'WebPage' | 'AboutPage' | 'CollectionPage';
    image?: string | null;
    hasBreadcrumb?: boolean;
    mainEntityId?: string;
    dateModified?: string | null;
}): Node {
    const { path, locale } = options;
    return compact({
        '@type': options.type ?? 'WebPage',
        '@id': pageId(path, locale),
        url: pageUrl(path, locale),
        name: text(options.name),
        description: text(options.description),
        inLanguage: locale,
        isPartOf: { '@id': websiteId(locale) },
        about: { '@id': ORGANIZATION_ID },
        primaryImageOfPage: options.image ? { '@type': 'ImageObject', url: options.image } : undefined,
        breadcrumb: options.hasBreadcrumb === false ? undefined : { '@id': breadcrumbId(path, locale) },
        mainEntity: options.mainEntityId ? { '@id': options.mainEntityId } : undefined,
        dateModified: toIsoDate(options.dateModified),
    });
}

/** An ordered list of links (portfolio, solutions), used as a CollectionPage's main entity. */
export function itemList(path: string, locale: Locale, items: { name?: string | null; path: string; image?: string | null }[]): Node {
    return {
        '@type': 'ItemList',
        '@id': entityId(path, locale, 'list'),
        numberOfItems: items.length,
        itemListElement: items.map((item, i) => compact({
            '@type': 'ListItem',
            position: i + 1,
            url: absoluteUrl(item.path, locale),
            name: text(item.name),
            image: item.image ?? undefined,
        })),
    };
}

export function person(member: { id?: string | number; name?: string | null; title?: string | null; image?: { full_url?: string } | null }): Node | null {
    const name = text(member.name);
    if (!name) return null;
    return compact({
        '@type': 'Person',
        '@id': `${SITE_URL}/about-us#person-${member.id ?? name}`,
        name,
        jobTitle: text(member.title),
        image: member.image?.full_url,
        worksFor: { '@id': ORGANIZATION_ID },
    });
}

export function service(options: {
    path: string;
    locale: Locale;
    name?: string | null;
    description?: string | null;
    image?: string | null;
    category?: string | null;
    catalogName?: string;
    offers?: { name?: string | null; description?: string | null; path?: string }[];
}): Node {
    const name = text(options.name);
    const offers = (options.offers ?? []).filter((o) => text(o.name));
    return compact({
        '@type': 'Service',
        '@id': entityId(options.path, options.locale, 'service'),
        name,
        serviceType: name,
        category: text(options.category),
        description: text(options.description),
        url: pageUrl(options.path, options.locale),
        image: options.image ?? undefined,
        // No inLanguage: it isn't a Service property (the WebPage carries it).
        provider: { '@id': ORGANIZATION_ID },
        areaServed: { '@type': 'Country', name: 'Egypt' },
        hasOfferCatalog: offers.length
            ? {
                '@type': 'OfferCatalog',
                name: text(options.catalogName),
                itemListElement: offers.map((offer) => ({
                    '@type': 'Offer',
                    itemOffered: compact({
                        '@type': 'Service',
                        name: text(offer.name),
                        description: text(offer.description),
                        url: offer.path ? pageUrl(offer.path, options.locale) : undefined,
                    }),
                })),
            }
            : undefined,
    });
}

export function caseStudy(project: any, path: string, locale: Locale): Node {
    const name = text(project.title);
    const headline = text(project.short_title) ?? name;
    const images = [project.main_image?.full_url, ...(project.gallery ?? []).map((m: any) => m?.full_url)].filter(Boolean);
    return compact({
        '@type': 'CreativeWork',
        '@id': entityId(path, locale, 'project'),
        name,
        headline: capHeadline(headline),
        description: text(project.short_description) ?? text(project.description),
        url: pageUrl(path, locale),
        inLanguage: locale,
        image: images,
        dateCreated: toIsoDate(project.date),
        dateModified: toIsoDate(project.updated_at),
        keywords: (project.tags ?? []).map(text).filter(Boolean).join(', '),
        creator: { '@id': ORGANIZATION_ID },
        publisher: { '@id': ORGANIZATION_ID },
        about: (project.services ?? [])
            .map((s: any) => text(s.title))
            .filter(Boolean)
            .map((serviceName: string) => ({ '@type': 'Service', name: serviceName })),
        genre: (project.categories ?? []).map((c: any) => text(c.title)).filter(Boolean),
        locationCreated: text(project.country?.name) ? { '@type': 'Country', name: text(project.country.name) } : undefined,
    });
}

/** CMS dates are "Y-m-d" or "Y-m-d H:i:s"; schema.org wants ISO 8601. */
function toIsoDate(value?: string | null): string | undefined {
    if (!value) return undefined;
    const iso = value.includes(' ') ? `${value.replace(' ', 'T')}Z` : value;
    return Number.isNaN(Date.parse(iso)) ? undefined : iso;
}

/** Google truncates headlines past 110 characters. */
function capHeadline(value?: string): string | undefined {
    return value && value.length > 110 ? `${value.slice(0, 109)}…` : value;
}

export const blogId = (locale: Locale) => entityId('/blog', locale, 'blog');

export function blogPosting(post: BlogPost, path: string, locale: Locale): Node {
    const plain = text(post.body?.replace(/<[^>]+>/g, ' '));
    return compact({
        '@type': 'BlogPosting',
        '@id': entityId(path, locale, 'article'),
        headline: capHeadline(text(post.title)),
        description: text(post.seo_description) ?? text(post.excerpt),
        image: post.cover?.full_url,
        datePublished: toIsoDate(post.published_at),
        dateModified: toIsoDate(post.updated_at),
        // A deleted author leaves the organization as the author.
        author: (post.author && person(post.author)) || { '@id': ORGANIZATION_ID },
        publisher: { '@id': ORGANIZATION_ID },
        mainEntityOfPage: { '@id': pageId(path, locale) },
        isPartOf: { '@id': blogId(locale) },
        articleSection: text(post.category?.name),
        keywords: (post.tags ?? []).map(text).filter(Boolean).join(', '),
        wordCount: plain ? plain.split(' ').length : undefined,
        inLanguage: locale,
        url: pageUrl(path, locale),
    });
}

export function faqPage(faqs: BlogPost['faqs'], path: string, locale: Locale): Node | null {
    const items = (faqs ?? []).filter((f) => text(f.question) && text(f.answer));
    if (!items.length) return null;
    return {
        '@type': 'FAQPage',
        '@id': entityId(path, locale, 'faq'),
        mainEntity: items.map((f) => ({
            '@type': 'Question',
            name: text(f.question),
            acceptedAnswer: { '@type': 'Answer', text: text(f.answer) },
        })),
    };
}

export function blog(locale: Locale, posts: BlogPostCard[], name: string, description: string): Node {
    return compact({
        '@type': 'Blog',
        '@id': blogId(locale),
        name: text(name),
        description: text(description),
        url: pageUrl('/blog', locale),
        inLanguage: locale,
        publisher: { '@id': ORGANIZATION_ID },
        blogPost: posts.map((p) => compact({
            '@type': 'BlogPosting',
            '@id': entityId(`/blog/${p.slug}`, locale, 'article'),
            headline: capHeadline(text(p.title)),
            url: pageUrl(`/blog/${p.slug}`, locale),
            datePublished: toIsoDate(p.published_at),
        })),
    });
}
