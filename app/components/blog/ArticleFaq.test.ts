import { renderToStaticMarkup } from 'react-dom/server';
import { createElement } from 'react';
import { describe, expect, it } from 'vitest';
import ArticleFaq from './ArticleFaq';

describe('ArticleFaq', () => {
    it('shows an expand indicator that turns when a question is open', () => {
        const html = renderToStaticMarkup(createElement(ArticleFaq, { faqs: [{ question: 'Q?', answer: 'A.' }], title: 'FAQ' }));
        const summary = html.match(/<summary[^>]*>([\s\S]*?)<\/summary>/)?.[1] ?? '';
        expect(summary).toContain('Q?');
        expect(summary).toMatch(/<svg[^>]*aria-hidden="true"[^>]*class="[^"]*group-open:rotate-180/);
    });
});
