import { ApolloClient, InMemoryCache, HttpLink, CombinedGraphQLErrors } from '@apollo/client';
import { ErrorLink } from '@apollo/client/link/error';

// Error handling link
const errorLink = new ErrorLink(({ error }) => {
    if (CombinedGraphQLErrors.is(error)) {
        error.errors.forEach(({ message, locations, path }) =>
            console.error(
                `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`
            )
        );
    } else {
        console.error('[Network error]:', error);
    }
});

// HTTP link to your GraphQL endpoint
const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'https://codetoon-master-zszpma.laravel.cloud/graphql',
    credentials: 'same-origin', // or 'include' for cross-origin requests
});

// Create Apollo Client instance
export const client = new ApolloClient({
    link: errorLink.concat(httpLink),
    cache: new InMemoryCache({
        typePolicies: {
            // Add your type policies here for cache normalization
            // Example:
             Query: {
               fields: {
                 users: {
                   merge(existing, incoming) {
                     return incoming;
                   },
                 },
               },
             },
        },
    }),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'cache-and-network',
            errorPolicy: 'all',
        },
        query: {
            fetchPolicy: 'network-only',
            errorPolicy: 'all',
        },
        mutate: {
            errorPolicy: 'all',
        },
    },
});

// Function to create a new client instance (useful for SSR)
export function createApolloClient() {
    return new ApolloClient({
        link: errorLink.concat(httpLink),
        cache: new InMemoryCache(),
        ssrMode: typeof window === 'undefined',
    });
}
