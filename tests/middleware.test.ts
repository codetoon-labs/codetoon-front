import { NextRequest } from 'next/server';
import { describe, expect, it } from 'vitest';
import { middleware } from '@/middleware';

function run(path: string, headers: Record<string, string> = {}) {
    const res = middleware(new NextRequest(`https://codetoon.net${path}`, { headers: { host: 'codetoon.net', ...headers } }));
    return {
        status: res.status,
        location: res.headers.get('location'),
        rewrite: res.headers.get('x-middleware-rewrite'),
        passthrough: res.headers.get('x-middleware-next') === '1',
    };
}

describe('locale routing', () => {
    it('serves bare paths as English via an internal rewrite', () => {
        expect(run('/').rewrite).toBe('https://codetoon.net/en');
        expect(run('/projects').rewrite).toBe('https://codetoon.net/en/projects');
        expect(run('/project/alpha?x=1').rewrite).toBe('https://codetoon.net/en/project/alpha?x=1');
    });

    it('passes Arabic paths through untouched', () => {
        expect(run('/ar').passthrough).toBe(true);
        expect(run('/ar/about-us').passthrough).toBe(true);
    });

    it('redirects the default-locale prefix to the bare path', () => {
        expect(run('/en')).toMatchObject({ status: 308, location: 'https://codetoon.net/' });
        expect(run('/en/projects')).toMatchObject({ status: 308, location: 'https://codetoon.net/projects' });
    });

    it('does not treat look-alike segments as locales', () => {
        expect(run('/arabic').rewrite).toBe('https://codetoon.net/en/arabic');
        expect(run('/english').rewrite).toBe('https://codetoon.net/en/english');
    });

    it('leaves files outside [locale]', () => {
        for (const file of ['/sitemap.xml', '/robots.txt', '/llms.txt', '/logo.svg']) {
            expect(run(file).passthrough).toBe(true);
        }
    });

    it('canonicalises www to the bare host', () => {
        expect(run('/ar/projects', { host: 'www.codetoon.net' })).toMatchObject({
            status: 308,
            location: 'https://codetoon.net/ar/projects',
        });
    });

    it('serves markdown to agents asking for it on the home page', () => {
        expect(run('/', { accept: 'text/markdown' }).rewrite).toBe('https://codetoon.net/llms.txt');
        expect(run('/', { accept: 'text/html,text/markdown' }).rewrite).toBe('https://codetoon.net/en');
    });
});
