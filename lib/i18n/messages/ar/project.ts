import type en from '../en/project';

const project: typeof en = {
    meta: {
        notFoundTitle: 'المشروع غير موجود',
        titleSuffix: 'دراسة حالة',
        titleTemplate: '{title} - دراسة حالة',
        fallbackTitle: 'مشروع',
        fallbackDescription: 'دراسة حالة من كودتون: كيف بنينا {title}.',
        fallbackDescriptionTitle: 'هذا المشروع',
    },
    notFound: {
        title: 'المشروع غير موجود',
        body: 'لم نتمكن من العثور على المشروع الذي تبحث عنه. ربما تم نقله أو أن الرابط غير صحيح.',
        back: 'العودة إلى المشاريع',
    },
    hero: {
        fallbackDescription: 'نصنع تجربة جديدة أنيقة لابتكار عالمي.',
        coverAlt: 'صورة غلاف مشروع {title}',
    },
    overview: {
        fallbackTag: 'تفاصيل المشروع',
        noDescription: 'لا يوجد وصف متاح لهذا المشروع.',
        visitSite: 'زيارة الموقع',
    },
    objectives: 'أهداف المشروع',
    phases: 'كيف حققنا ذلك',
    galleryAlt: '{title} - صورة المعرض {n}',
    cta: {
        title: 'حوّل الأفكار إلى أثر',
        subtitle: 'من أحلام الشركات الناشئة إلى توسّع الكيانات الكبرى — نصنع تجارب رقمية تعمل بكفاءة وتُبهر.',
        question: 'الفكرة الكبيرة القادمة؟',
        button: 'ابدأ مشروعك',
    },
};

export default project;
