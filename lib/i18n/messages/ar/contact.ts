import type en from '../en/contact';

const contact: typeof en = {
    modal: {
        close: 'إغلاق',
        title: 'لنبنِ معًا',
        subtitle: 'أدخل بياناتك وسنتواصل معك قريبًا.',
        successTitle: 'شكرًا لك!',
        successBody: 'تم استلام رسالتك.',
        nameLabel: 'الاسم الكامل',
        namePlaceholder: 'أدخل اسمك',
        phoneLabel: 'رقم الهاتف',
        phonePlaceholder: 'أدخل رقم هاتفك',
        sending: 'جارٍ الإرسال...',
        send: 'إرسال الرسالة',
        consent: 'بالإرسال، فإنك توافق على سياسة الخصوصية الخاصة بنا.',
    },
    errors: {
        tooManyAttempts: 'محاولات كثيرة جدًا، يرجى المحاولة مرة أخرى لاحقًا.',
        generic: 'حدث خطأ ما. يرجى المحاولة مرة أخرى.',
        nameRequired: 'الاسم الكامل مطلوب',
        nameTooShort: 'يجب ألا يقل الاسم عن 3 أحرف',
        phoneRequired: 'رقم الهاتف مطلوب',
        phoneInvalid: 'يرجى إدخال رقم هاتف صحيح (مثال: ‎+201234567890)',
    },
    whatsapp: {
        prefilledMessage: 'مرحبًا كودتون! أود معرفة المزيد عن خدماتكم.',
        chat: 'تحدث معنا عبر واتساب',
        callUs: 'اتصل بنا على {phone}',
    },
};

export default contact;
