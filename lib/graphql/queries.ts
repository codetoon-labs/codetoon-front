import { gql } from '@apollo/client';

// Translatable fields are requested as `{ en ar }` — one query serves both
// languages. lib/server-data.ts collapses them to the page locale with
// localize() before they reach components.

export const GET_CUSTOMERS = gql`
    query GetCustomers {
        allCustomers {
            name { en ar }
            image {
                full_url
            }
            id
        }
    }
`;

export const GET_TESTIMONIALS = gql`
    query GetTestimonials {
        allTestimonials {
            description { en ar }
            id
            image {
                full_url
            }
            name { en ar }
            position { en ar }
            title { en ar }
        }
    }
`;

export const GET_PROJECTS = gql`
    query GetProjects {
        projects {
            data {
                categories {
                    title { en ar }
                    type
                }
                gallery {
                    full_url
                }
                objectives {
                    title { en ar }
                    description { en ar }
                }
                phases {
                    title { en ar }
                    description { en ar }
                }
                counters {
                    title { en ar }
                    count
                    abbreviation
                }
                country {
                    id
                    name { en ar }
                    image {
                        full_url
                    }
                }
                services {
                    id
                    title { en ar }
                    description { en ar }
                }
                main_image {
                    full_url
                }
                sort_order
                tags { en ar }
                id
                slug { en ar }
                title { en ar }
                description { en ar }
                short_title { en ar }
                short_description { en ar }
                visit_link
                in_homepage
                date
                updated_at
            }
        }
    }
`;

export const GET_CATEGORIES = gql`
    query GetAllCategories {
        allCategories {
            id
            title { en ar }
            slug
            description { en ar }
            overview { en ar }
            type
            main_image {
                id
                full_url
            }
            services {
                id
                title { en ar }
                slug
                description { en ar }
            }
        }
    }
`;

export const GET_CATEGORY_BY_SLUG = gql`
    query GetCategory($slug: String!) {
        category(slug: $slug) {
            id
            title { en ar }
            slug
            description { en ar }
            overview { en ar }
            main_image {
                full_url
            }
            services {
                id
                title { en ar }
                slug
                description { en ar }
                deliverables { en ar }
                tags { en ar }
            }
        }
    }
`;

export const GET_SERVICE_BY_SLUG = gql`
    query GetService($slug: String!) {
        service(slug: $slug) {
            id
            title { en ar }
            slug
            description { en ar }
            short_description { en ar }
            deliverables { en ar }
            tags { en ar }
            banner {
                full_url
            }
            process_steps {
                en { title description }
                ar { title description }
            }
            gallery {
                full_url
            }
            categories {
                id
                title { en ar }
                slug
                main_image {
                    full_url
                }
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
            name { en ar }
            id
            created_at
            title { en ar }
            image {
                full_url
            }
        }
    }
`;

// Card fields are written out in each query (not interpolated): codegen's
// document plucking can't resolve string interpolation inside gql``.
export const GET_BLOG_POSTS = gql`
    query GetBlogPosts($first: Int!, $page: Int, $category: String, $locale: String) {
        blogPosts(first: $first, page: $page, category: $category, locale: $locale) {
            data {
                id
                slug
                title { en ar }
                excerpt { en ar }
                cover_alt { en ar }
                reading_time { en ar }
                available_locales
                published_at
                updated_at
                cover { full_url }
                category { slug name { en ar } }
                author { id name { en ar } title { en ar } image { full_url } }
            }
            paginatorInfo { currentPage lastPage total }
        }
    }
`;

export const GET_BLOG_POST = gql`
    query GetBlogPost($slug: String!) {
        blogPost(slug: $slug) {
            id
            slug
            title { en ar }
            excerpt { en ar }
            cover_alt { en ar }
            reading_time { en ar }
            available_locales
            published_at
            updated_at
            cover { full_url }
            category { slug name { en ar } }
            body { en ar }
            seo_title { en ar }
            seo_description { en ar }
            faqs { en { question answer } ar { question answer } }
            tags { en ar }
            author { id name { en ar } title { en ar } bio { en ar } image { full_url } }
        }
    }
`;

export const GET_RELATED_BLOG_POSTS = gql`
    query GetRelatedBlogPosts($slug: String!) {
        relatedBlogPosts(slug: $slug, first: 3) {
            id
            slug
            title { en ar }
            excerpt { en ar }
            cover_alt { en ar }
            reading_time { en ar }
            available_locales
            published_at
            updated_at
            cover { full_url }
            category { slug name { en ar } }
            author { id name { en ar } title { en ar } image { full_url } }
        }
    }
`;

export const GET_BLOG_CATEGORIES = gql`
    query GetBlogCategories {
        blogCategories {
            id
            slug
            name { en ar }
            description { en ar }
            seo_title { en ar }
            seo_description { en ar }
            posts_count
        }
    }
`;
