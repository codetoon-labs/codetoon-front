import { renderToStaticMarkup } from 'react-dom/server';
import { createElement } from 'react';
import { describe, expect, it } from 'vitest';
import JsonLd from '@/app/components/JsonLd';
import {
    breadcrumbs, caseStudy, entityId, graph, itemList, organization, ORGANIZATION_ID, person, service, webPage, website, websiteId,
} from './structured-data';

/** Every value a builder emits should be meaningful: no blanks, no undefined. */
function blanks(value: unknown, path = ''): string[] {
    if (value === undefined || value === null || value === '') return [path];
    if (Array.isArray(value)) return value.length ? value.flatMap((v, i) => blanks(v, `${path}[${i}]`)) : [path];
    if (typeof value === 'object') return Object.entries(value).flatMap(([k, v]) => blanks(v, path ? `${path}.${k}` : k));
    return [];
}

const project = {
    id: '1',
    title: '  Buongo ERP     - Smart Business Management ',
    short_title: null,
    short_description: 'Cloud ERP\nfor SMEs',
    description: 'Long description',
    main_image: { full_url: 'https://cdn.example/main.webp' },
    gallery: [{ full_url: 'https://cdn.example/1.webp' }],
    date: '2025-10-01',
    updated_at: '2026-05-18 20:44:51',
    tags: ['ERP', 'SaaS'],
    services: [{ title: 'Website' }, { title: 'Mobile App' }],
    categories: [{ title: 'Technology' }],
    country: { name: 'Egypt' },
    visit_link: 'https://buongo.example',
};

describe('site-wide entities', () => {
    it('describes the organization in the page language', () => {
        const en = organization('en');
        const ar = organization('ar');
        expect(en['@id']).toBe(ORGANIZATION_ID);
        expect(ar['@id']).toBe(ORGANIZATION_ID);
        expect(en.description).not.toBe(ar.description);
        expect(ar.description).toMatch(/[؀-ۿ]/);
        expect(en.sameAs).toHaveLength(3);
        expect(en.geo).toMatchObject({ latitude: 30.025859, longitude: 31.464509 });
        expect(blanks(en)).toEqual([]);
    });

    it('gives each language its own WebSite', () => {
        expect(website('en')).toMatchObject({ '@id': 'https://codetoon.net/#website', url: 'https://codetoon.net', inLanguage: 'en' });
        expect(website('ar')).toMatchObject({ '@id': 'https://codetoon.net/ar/#website', url: 'https://codetoon.net/ar', inLanguage: 'ar' });
    });
});

describe('page graph', () => {
    it('builds localized breadcrumbs starting at Home', () => {
        const crumbs = breadcrumbs('/project/x', 'ar', [{ name: 'المشاريع', path: '/projects' }, { name: ' Alpha ', path: '/project/x' }]);
        expect(crumbs['@id']).toBe('https://codetoon.net/ar/project/x#breadcrumb');
        expect(crumbs.itemListElement).toEqual([
            { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: 'https://codetoon.net/ar' },
            { '@type': 'ListItem', position: 2, name: 'المشاريع', item: 'https://codetoon.net/ar/projects' },
            { '@type': 'ListItem', position: 3, name: 'Alpha', item: 'https://codetoon.net/ar/project/x' },
        ]);
    });

    it('links the page to its website, breadcrumb and main entity', () => {
        const page = webPage({ path: '/projects', locale: 'en', type: 'CollectionPage', name: 'Projects', mainEntityId: entityId('/projects', 'en', 'list') });
        expect(page).toEqual({
            '@type': 'CollectionPage',
            '@id': 'https://codetoon.net/projects#webpage',
            url: 'https://codetoon.net/projects',
            name: 'Projects',
            inLanguage: 'en',
            isPartOf: { '@id': websiteId('en') },
            about: { '@id': ORGANIZATION_ID },
            breadcrumb: { '@id': 'https://codetoon.net/projects#breadcrumb' },
            mainEntity: { '@id': 'https://codetoon.net/projects#list' },
        });
    });

    it('lists collection items in order with absolute URLs', () => {
        const list = itemList('/projects', 'ar', [{ name: 'A', path: '/project/a' }, { name: null, path: '/project/b' }]);
        expect(list.numberOfItems).toBe(2);
        expect(list.itemListElement).toEqual([
            { '@type': 'ListItem', position: 1, url: 'https://codetoon.net/ar/project/a', name: 'A' },
            { '@type': 'ListItem', position: 2, url: 'https://codetoon.net/ar/project/b' },
        ]);
    });

    it('wraps nodes in one @graph and skips empty ones', () => {
        expect(graph(website('en'), null, person({ name: '  ' }))).toEqual({ '@context': 'https://schema.org', '@graph': [website('en')] });
    });
});

describe('main entities', () => {
    it('cleans CMS text and dates on case studies', () => {
        const node = caseStudy(project, '/project/buongo', 'en');
        expect(node).toMatchObject({
            '@id': 'https://codetoon.net/project/buongo#project',
            name: 'Buongo ERP - Smart Business Management',
            headline: 'Buongo ERP - Smart Business Management',
            description: 'Cloud ERP for SMEs',
            image: ['https://cdn.example/main.webp', 'https://cdn.example/1.webp'],
            dateCreated: '2025-10-01',
            dateModified: '2026-05-18T20:44:51Z',
            keywords: 'ERP, SaaS',
            about: [{ '@type': 'Service', name: 'Website' }, { '@type': 'Service', name: 'Mobile App' }],
            locationCreated: { '@type': 'Country', name: 'Egypt' },
        });
        // The client's own website is not the same entity as the case study.
        expect(node).not.toHaveProperty('sameAs');
        expect(blanks(node)).toEqual([]);
    });

    it('caps headlines at Google’s 110 characters', () => {
        const node = caseStudy({ ...project, short_title: 'x'.repeat(200) }, '/project/long', 'en');
        expect((node.headline as string).length).toBe(110);
    });

    it('describes services with their catalog, omitting it when empty', () => {
        const withOffers = service({ path: '/solution/design', locale: 'ar', name: 'Design', catalogName: 'خدمات Design', offers: [{ name: 'Branding', path: '/service/branding' }, { name: '' }] });
        expect(withOffers).toMatchObject({
            '@id': 'https://codetoon.net/ar/solution/design#service',
            serviceType: 'Design',
            provider: { '@id': ORGANIZATION_ID },
            hasOfferCatalog: {
                itemListElement: [{ '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Branding', url: 'https://codetoon.net/ar/service/branding' } }],
            },
        });
        expect(service({ path: '/service/x', locale: 'en', name: 'X', offers: [] })).not.toHaveProperty('hasOfferCatalog');
    });

    it('links team members to the organization', () => {
        expect(person({ id: 7, name: 'Omar', title: ' CTO ', image: { full_url: 'https://cdn.example/o.webp' } })).toEqual({
            '@type': 'Person',
            '@id': 'https://codetoon.net/about-us#person-7',
            name: 'Omar',
            jobTitle: 'CTO',
            image: 'https://cdn.example/o.webp',
            worksFor: { '@id': ORGANIZATION_ID },
        });
    });
});

describe('JsonLd', () => {
    it('cannot be broken out of by CMS text', () => {
        const html = renderToStaticMarkup(createElement(JsonLd, { data: { name: '</script><script>alert(1)</script>' } }));
        expect(html).not.toContain('</script><script>');
        expect(JSON.parse(html.replace(/^<script[^>]*>|<\/script>$/g, ''))).toEqual({ name: '</script><script>alert(1)</script>' });
    });
});
