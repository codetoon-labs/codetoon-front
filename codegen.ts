import type { CodegenConfig } from '@graphql-codegen/cli';

// Deploys validate against the live API. CI sets GRAPHQL_SCHEMA to the
// committed snapshot (graphql/schema.graphql), so a PR is checked against the
// schema it was written for, not whatever is deployed at the time.
const config: CodegenConfig = {
    overwrite: true,
    schema: process.env.GRAPHQL_SCHEMA || process.env.NEXT_PUBLIC_GRAPHQL_URL || 'https://codetoon-master-zszpma.laravel.cloud/graphql',
    documents: ['lib/**/*.{ts,graphql,tsx}', 'lib/**/**/*.{ts,graphql,tsx}', '!lib/**/*.test.ts'],
    generates: {
        "src/gql/graphql.ts": {
            plugins: [
                // Generated hooks target Apollo 3 typings; don't fail typecheck on them.
                { add: { content: '// @ts-nocheck' } },
                "typescript",
                "typescript-operations",
                "typescript-react-apollo",
            ],
            config: {
                reactApolloVersion: 3,
                apolloReactCommonImportFrom: "@apollo/client",
                apolloReactHooksImportFrom: "@apollo/client/react",
            }
        }
    }
};

export default config;
