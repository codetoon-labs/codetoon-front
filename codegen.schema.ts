import type { CodegenConfig } from '@graphql-codegen/cli';

// `npm run schema:pull` — refresh the committed schema snapshot from the API
// (NEXT_PUBLIC_GRAPHQL_URL, e.g. a local backend running the branch you need).
const config: CodegenConfig = {
    overwrite: true,
    schema: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'https://codetoon-master-zszpma.laravel.cloud/graphql',
    generates: {
        'graphql/schema.graphql': {
            plugins: [
                {
                    add: {
                        content: [
                            '# Snapshot of the CMS GraphQL schema (codetoon-labs/codetoon), used by codegen',
                            "# in CI so query validation doesn't depend on what's deployed.",
                            '# Refresh with: npm run schema:pull',
                            '',
                        ].join('\n'),
                    },
                },
                'schema-ast',
            ],
        },
    },
};

export default config;
