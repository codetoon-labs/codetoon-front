import type en from '../en/blog';

const blog: typeof en = {
    meta: {
        title: 'المدونة',
        description: 'أدلة عملية في أتمتة الذكاء الاصطناعي وتطوير البرمجيات والتصميم والتسويق الرقمي من فريق كودتون في القاهرة.',
        categoryTitle: 'مقالات {name}',
        pageTitle: '{title} — الصفحة {page}',
        notFoundTitle: 'المقال غير موجود',
    },
    hero: {
        eyebrow: 'مدونة كودتون',
        title: 'أفكار تبني وتصنع العلامة وتُنمّي',
        subtitle: 'أدلة عملية في أتمتة الذكاء الاصطناعي والتطوير والتصميم والنمو، من الفريق الذي ينفّذها.',
    },
    list: {
        all: 'الكل',
        categoriesLabel: 'تصنيفات المدونة',
        empty: 'لا توجد مقالات هنا بعد. تابعنا قريبًا.',
        minRead: 'قراءة في {minutes} دقائق',
        previous: 'السابق',
        next: 'التالي',
        pageOf: 'الصفحة {page} من {total}',
        paginationLabel: 'صفحات المدونة',
    },
    post: {
        toc: 'محتويات المقال',
        faq: 'الأسئلة الشائعة',
        tags: 'الوسوم',
        related: 'مقالات ذات صلة',
        writtenBy: 'بقلم',
        publishedOn: 'نُشر في {date}',
        updatedOn: 'حُدّث في {date}',
        coverAltFallback: 'صورة غلاف مقال {title}',
    },
    cta: {
        title: 'تريد تنفيذ ذلك لشركتك؟',
        body: 'أخبرنا بما تعمل عليه وسنرد عليك خلال يوم عمل واحد.',
        button: 'تحدّث مع فريقنا',
    },
};

export default blog;
