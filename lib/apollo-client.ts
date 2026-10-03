import { ApolloClient, ApolloLink, InMemoryCache, HttpLink, CombinedGraphQLErrors } from '@apollo/client';
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

// Function to create a new client instance (useful for SSR).
// The CMS stores en/ar copy for every translatable field and picks the
// language from Accept-Language, so each server fetch states its locale.
export function createApolloClient(locale: string = 'en') {
    const localeLink = new ApolloLink((operation, forward) => {
        operation.setContext(({ headers = {} }: { headers?: Record<string, string> }) => ({
            headers: { ...headers, 'Accept-Language': locale },
        }));
        return forward(operation);
    });
    return new ApolloClient({
        link: ApolloLink.from([errorLink, localeLink, httpLink]),
        cache: new InMemoryCache(),
        ssrMode: typeof window === 'undefined',
    });
}
