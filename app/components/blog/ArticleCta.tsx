'use client';

import { useModal } from '@/app/context/ModalContext';
import { useI18n } from '@/lib/i18n/provider';

export default function ArticleCta({ slug }: { slug: string }) {
    const { t } = useI18n();
    const { openContactModal } = useModal();
    return (
        <section className="mt-14 rounded-[24px] bg-[#102A43] p-8 text-center sm:p-10">
            <h2 className="text-[26px] font-bold text-white">{t.blog.cta.title}</h2>
            <p className="mx-auto mt-3 max-w-[520px] text-[16px] leading-7 text-[#CBD5E0]">{t.blog.cta.body}</p>
            <button
                type="button"
                onClick={() => openContactModal({ source: 'blog', slug })}
                className="mt-6 h-[48px] rounded-[40px] bg-[#0d71ba] px-6 font-bold text-[#FCF6D0] transition-colors hover:bg-[#0a5a95]"
            >
                {t.blog.cta.button}
            </button>
        </section>
    );
}
