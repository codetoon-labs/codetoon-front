// Service detail copy. Arabic counterpart: ../ar/service.ts (typed against this shape).
const service = {
    meta: {
        notFoundTitle: 'Service not found',
        // Appended to the CMS title when it doesn't already say "services".
        titleSuffix: 'services in Egypt',
        // Non-English locales build the title from this template instead of
        // suffixOnce, whose duplicate check only understands English.
        titleTemplate: '{title} services in Egypt',
        fallbackTitle: 'Services',
        fallbackDescription: "Discover CodeToon's {title} service — build, brand and boost your next big idea.",
        deliverablesCatalogName: '{title} Deliverables',
    },
    notFound: {
        title: 'Service Not Found',
        body: "We couldn't locate the service you were looking for.",
        back: 'Back to Solutions',
    },
    eyebrow: 'Our Services',
    overview: {
        eyebrow: 'Overview',
        title: 'What this service is about',
    },
    deliverables: {
        eyebrow: 'Deliverables',
        title: 'What We Deliver',
    },
    process: {
        eyebrow: 'Our Process',
        title: 'How we make it happen',
    },
    gallery: {
        eyebrow: 'Gallery',
        title: 'A look at our work',
        imageAlt: '{title} gallery image {n}',
    },
    stack: {
        eyebrow: 'Stack',
        title: 'Technologies & Focus Areas',
    },
    backTo: 'Back to {title}',
    browseAll: 'Browse all Solutions',
    cta: {
        titleStart: 'Ready to Transform Your',
        titleEmphasis: 'Business?',
        subtitle: "Let's work together to build, brand, and boost your next big idea.",
        button: 'Start a Project',
    },
};

export default service;
