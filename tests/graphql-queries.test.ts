import { readFileSync } from 'node:fs';
import { buildSchema, validate, type DocumentNode } from 'graphql';
import { describe, expect, it } from 'vitest';
import * as queries from '@/lib/graphql/queries';

// Codegen only partially validates operations (a selection on a scalar slips
// through), so every query is checked here with graphql-js's full rule set
// against the committed schema snapshot. Refresh it with `npm run schema:pull`.
const schema = buildSchema(readFileSync('graphql/schema.graphql', 'utf8'));

describe('GraphQL operations match the CMS schema', () => {
    for (const [name, document] of Object.entries(queries)) {
        it(name, () => {
            const errors = validate(schema, document as DocumentNode).map((e) => e.message);
            expect(errors).toEqual([]);
        });
    }
});
