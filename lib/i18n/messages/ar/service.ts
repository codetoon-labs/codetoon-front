import type en from '../en/service';

const service: typeof en = {
    meta: {
        notFoundTitle: 'الخدمة غير موجودة',
        titleSuffix: 'في مصر',
        titleTemplate: 'خدمات {title} في مصر',
        fallbackTitle: 'الخدمات',
        fallbackDescription: 'اكتشف خدمة {title} من كودتون — لنبنِ فكرتك الكبيرة القادمة ونصنع هويتها وننمّيها.',
        deliverablesCatalogName: 'مخرجات {title}',
    },
    notFound: {
        title: 'الخدمة غير موجودة',
        body: 'لم نتمكن من العثور على الخدمة التي تبحث عنها.',
        back: 'العودة إلى الحلول',
    },
    eyebrow: 'خدماتنا',
    overview: {
        eyebrow: 'نظرة عامة',
        title: 'عن هذه الخدمة',
    },
    deliverables: {
        eyebrow: 'المخرجات',
        title: 'ما نقدّمه',
    },
    process: {
        eyebrow: 'منهجية عملنا',
        title: 'كيف نحقق ذلك',
    },
    gallery: {
        eyebrow: 'معرض الأعمال',
        title: 'لمحة من أعمالنا',
        imageAlt: '{title} - صورة المعرض {n}',
    },
    stack: {
        eyebrow: 'التقنيات',
        title: 'التقنيات ومجالات التركيز',
    },
    backTo: 'العودة إلى {title}',
    browseAll: 'تصفّح جميع الحلول',
    cta: {
        titleStart: 'هل أنت مستعد لتحويل',
        titleEmphasis: 'أعمالك؟',
        subtitle: 'لنعمل معًا على بناء فكرتك الكبيرة القادمة وصناعة هويتها وتنميتها.',
        button: 'ابدأ مشروعك',
    },
};

export default service;
