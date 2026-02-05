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

// Testimonials query - uncomment when backend is ready
export const GET_TESTIMONIALS = gql`
    query GetTestimonials {
        allTestimonials {
            description
            id
            image {
                full_url
            }
            name
            position
            title
        }
    }
`;