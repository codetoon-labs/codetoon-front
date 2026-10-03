// Project (case study) detail copy. Arabic counterpart: ../ar/project.ts (typed against this shape).
const project = {
    meta: {
        notFoundTitle: 'Project not found',
        // Appended to the CMS title when it doesn't already say "case study".
        titleSuffix: 'case study',
        // Non-English locales build the title from this template instead of
        // suffixOnce, whose duplicate check only understands English.
        titleTemplate: '{title} case study',
        fallbackTitle: 'Project',
        fallbackDescription: 'A CodeToon case study: how we built {title}.',
        fallbackDescriptionTitle: 'this project',
    },
    notFound: {
        title: 'Project Not Found',
        body: 'We couldn’t find the project you’re looking for. It may have been moved or the URL might be incorrect.',
        back: 'Back to Projects',
    },
    hero: {
        fallbackDescription: 'Creating a sleek new experience for global innovation.',
        coverAlt: '{title} project cover',
    },
    overview: {
        fallbackTag: 'Project Detail',
        noDescription: 'No description available for this project.',
        visitSite: 'Visit site',
    },
    objectives: 'Project Objectives',
    phases: 'How We Made It Happen',
    galleryAlt: '{title} gallery image {n}',
    cta: {
        title: 'Turn Ideas Into Impact',
        subtitle: 'From startup dreams to scaling giants — we craft digital experiences that work and wow.',
        question: 'The Next Big Thing?',
        button: 'Start Your Project',
    },
};

export default project;
