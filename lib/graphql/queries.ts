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
              	gallery{
                  full_url
                }
              
              	objectives{
                  title
                  description
                }
                phases{
                  title
                  description
                }
              	counters{
                  title
                  count
                  abbreviation
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
              	main_image {
                    full_url
                }
              	sort_order
               	tags
                id
                slug
                title
                description  
              	short_title
              	short_description
              	visit_link
              	in_homepage
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

export const CREATE_LEAD = gql`
    mutation CreateLead($name: String!, $phone_number: String!) {
        createLead(name: $name, phone_number: $phone_number) {
            id
            name
            phone_number
        }
    }
`;

export const GET_TEAMS = gql`
    query GetTeams {
  teams {
    name
    id
    created_at
    title
    image {
      full_url
    }
  }
}
`;