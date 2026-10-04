import { describe, expect, it } from 'vitest';
import { messages } from './index';
import { fmt } from '@/lib/i18n/config';

// TypeScript already checks that Arabic has every key. These catch what types
// can't: lists with a different number of items, and copy left empty.

// Intentionally empty in Arabic: the English hero splits "Be|comes" into two
// colours, which Arabic can't do, so the first half is blank.
const INTENTIONALLY_EMPTY = new Set(['about.hero.becomesA']);

// Free-form lists whose length legitimately differs per language.
const FREE_LENGTH = new Set(['common.meta.keywords']);

function walk(en: unknown, ar: unknown, path: string, problems: string[]) {
    if (Array.isArray(en)) {
        if (FREE_LENGTH.has(path)) return;
        if (!Array.isArray(ar) || ar.length !== en.length) {
            problems.push(`${path}: ${Array.isArray(ar) ? ar.length : typeof ar} items in ar, ${en.length} in en`);
            return;
        }
        en.forEach((item, i) => walk(item, ar[i], `${path}[${i}]`, problems));
        return;
    }
    if (en && typeof en === 'object') {
        for (const key of Object.keys(en)) {
            walk((en as any)[key], (ar as any)?.[key], path ? `${path}.${key}` : key, problems);
        }
        return;
    }
    if (typeof en === 'string' && en.trim() !== '' && (typeof ar !== 'string' || ar.trim() === '') && !INTENTIONALLY_EMPTY.has(path)) {
        problems.push(`${path}: empty in ar`);
    }
}

describe('Arabic messages', () => {
    it('mirror the English structure with no missing copy', () => {
        const problems: string[] = [];
        walk(messages.en, messages.ar, '', problems);
        expect(problems).toEqual([]);
    });

    it('are actually Arabic where English has words', () => {
        const ar = JSON.stringify(messages.ar);
        expect(ar).toMatch(/[؀-ۿ]/);
    });

    it('Arabic minRead is number-neutral (no plural noun that breaks for 1 or 12)', () => {
        for (const minutes of [1, 12]) {
            const out = fmt(messages.ar.blog.list.minRead, { minutes });
            expect(out).toContain(String(minutes));
            expect(out).not.toContain('دقائق');
        }
    });
});
