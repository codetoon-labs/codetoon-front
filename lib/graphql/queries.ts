import { gql } from '@apollo/client';

export const GET_CUSTOMERS = gql`
    query GetCustomers {
        allCustomers {
            name
            image {
                full_url
            }
            id
        }
    }
`;