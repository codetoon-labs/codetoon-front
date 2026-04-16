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

export const GET_PROJECTS = gql`
    query GetProjects {
        projects {
            data {
                categories {
                    title
                    type
                }   
                id
                title
                description
                main_image {
                    full_url
                }
                country {
                    id
                    name
                    image {
                        full_url
                    }
                }
                services{
                    id
                    title
                    description
                }
            }
        }
    }
`;




export const GET_CATEGORIES = gql`
    query GetAllCategories {
        allCategories {
            id
            title
            slug
            description
            overview
            type
            main_image{
                id
                full_url
            }
            services{
                id
                title
                description
            }
        }
    }
`;

export const GET_CATEGORY_BY_SLUG = gql`
    query GetCategory($slug: String!) {
        category(slug: $slug) {
            id
            title
            slug
            description
            overview
            main_image {
                full_url
            }
            services {
                id
                title
                description
                deliverables
                tags
            }
        }
    }
`;

export const GET_SERVICE_BY_SLUG = gql`
query GetService($slug: String!) {
  service(slug: $slug) {
    id
    title
    slug
    description
    deliverables
    tags
    categories {
      id
      title
    }
  }
}

`;
