import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'https://codetoon-master-zszpma.laravel.cloud/graphql',
    documents: ['lib/**/*.{ts,graphql,tsx}', 'lib/**/**/*.{ts,graphql,tsx}'],
    generates: {
        "src/gql/": {
            preset: "client",
            plugins: [
                "typescript",
                "typescript-operations",
                "typescript-react-apollo",
            ]
        }
    }
};

export default config;
