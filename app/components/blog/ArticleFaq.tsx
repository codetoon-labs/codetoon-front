export default function ArticleFaq({ faqs, title }: { faqs: { question: string; answer: string }[]; title: string }) {
    return (
        <section aria-labelledby="faq-title" className="mt-14">
            <h2 id="faq-title" className="mb-5 text-[28px] font-bold text-[#000305]">{title}</h2>
            <div className="flex flex-col gap-3">
                {faqs.map((faq) => (
                    <details key={faq.question} className="group rounded-[16px] border border-[#E6E7E8] bg-white p-5 open:shadow-sm">
                        {/* Flex row: the chevron sits at the inline end in both LTR and RTL. */}
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-semibold text-[#000305] marker:hidden [&::-webkit-details-marker]:hidden">
                            <span>{faq.question}</span>
                            <svg aria-hidden="true" className="h-5 w-5 shrink-0 text-[#0d71ba] transition-transform duration-200 group-open:rotate-180" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 7.5l5 5 5-5" />
                            </svg>
                        </summary>
                        <p className="mt-3 whitespace-pre-line text-[16px] leading-7 text-[#535556]">{faq.answer}</p>
                    </details>
                ))}
            </div>
        </section>
    );
}
