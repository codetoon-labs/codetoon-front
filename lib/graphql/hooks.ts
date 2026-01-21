import { useQuery, useMutation } from '@apollo/client/react';
import { DocumentNode, OperationVariables } from '@apollo/client';

/**
 * Custom hook for queries with better error handling and loading states
 */
export function useGraphQLQuery<TData = any, TVariables extends OperationVariables = OperationVariables>(
    query: DocumentNode,
    options?: useQuery.Options<TData, TVariables>
) {
    const { loading, error, data, refetch, fetchMore } = useQuery<TData, TVariables>(
        query,
        {
            errorPolicy: 'all',
            ...options,
        } as any
    );

    return {
        loading,
        error,
        data,
        refetch,
        fetchMore,
        hasError: !!error,
        hasData: !!data && !loading,
    };
}

/**
 * Custom hook for mutations with better error handling
 */
export function useGraphQLMutation<TData = any, TVariables extends OperationVariables = OperationVariables>(
    mutation: DocumentNode,
    options?: useMutation.Options<TData, TVariables>
) {
    const [mutate, { loading, error, data, reset }] = useMutation<TData, TVariables>(mutation, {
        errorPolicy: 'all',
        ...options,
    } as any);

    const execute = async (variables?: TVariables) => {
        try {
            const result = await mutate({ variables } as any);
            return { success: true, data: result.data, error: null };
        } catch (err) {
            return { success: false, data: null, error: err };
        }
    };

    return {
        execute,
        loading,
        error,
        data,
        reset,
        hasError: !!error,
    };
}

/**
 * Hook for pagination support
 */
export function usePaginatedQuery<TData = any, TVariables extends OperationVariables = OperationVariables>(
    query: DocumentNode,
    options?: useQuery.Options<TData, TVariables>
) {
    const { data, loading, error, fetchMore } = useQuery<TData, TVariables>(query, {
        ...options,
    } as any);

    const loadMore = (variables: Partial<TVariables>) => {
        return fetchMore({
            variables: variables as TVariables,
        });
    };

    return {
        data,
        loading,
        error,
        loadMore,
    };
}
