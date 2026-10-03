import type { Metadata } from 'next';
import { absoluteUrl, localeAlternates, ogLocale } from '@/lib/i18n/config';
import { getMessages, resolveLocale } from '@/lib/i18n/server';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = getMessages(locale).privacy;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: localeAlternates('/privacy', locale),
    robots: { index: true, follow: true },
    openGraph: {
      title: t.metaTitle,
      description: t.ogDescription,
      url: absoluteUrl('/privacy', locale),
      siteName: 'Codetoon',
      locale: ogLocale[locale],
      type: 'website',
    },
  };
}

function renderText(text: string) {
  // Auto-link the contact email so it's clickable.
  const parts = text.split('Info@Codetoon.net');
  if (parts.length === 1) return text;
  return parts.flatMap((part, i) =>
    i < parts.length - 1
      ? [
          part,
          <a
            key={i}
            href="mailto:Info@Codetoon.net"
            dir="ltr"
            className="font-semibold text-[#0d71ba] underline decoration-[#f4d315] decoration-2 underline-offset-4 hover:text-[#0d5182] transition-colors"
          >
            Info@Codetoon.net
          </a>,
        ]
      : [part]
  );
}

export default async function PrivacyPolicyPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const t = getMessages(locale).privacy;
  return (
    <div className="px-5 pt-32 pb-14 sm:pt-40 sm:pb-20">
      <article className="mx-auto w-full max-w-[720px]">
        {/* Header */}
        <header className="mb-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#e6f0f8] px-3.5 py-1.5 text-[13px] font-semibold text-[#0d71ba]">
            {t.lastUpdated}
          </span>
          <h1 className="mt-5 text-[34px] sm:text-[44px] font-bold leading-tight tracking-tight text-[#000305]">
            {t.title}
          </h1>
          <span className="mt-4 block h-1.5 w-24 rounded-full bg-[#f4d315]" />
          <p className="mt-5 text-[17px] leading-8 text-[#535556]">
            {t.intro}
          </p>
        </header>

        {/* Card with sections */}
        <div className="rounded-2xl border border-[#e6f0f8] bg-white p-6 sm:p-10 shadow-[0_10px_40px_-15px_rgba(13,113,186,0.25)]">
          <ol className="space-y-9">
            {t.sections.map((s, idx) => (
              <li key={s.title} className="flex gap-4 sm:gap-5">
                <span
                  aria-hidden
                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0d71ba] text-[15px] font-bold text-white"
                >
                  {idx + 1}
                </span>
                <div className="min-w-0">
                  <h2 className="text-[20px] sm:text-[22px] font-bold text-[#000305]">
                    {s.title}
                  </h2>
                  <div className="mt-2.5 space-y-3">
                    {s.body.map((p, i) => (
                      <p
                        key={i}
                        className="text-[16.5px] leading-[1.85] text-[#535556]"
                      >
                        {renderText(p)}
                      </p>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Contact footer block */}
        <div className="mt-8 rounded-2xl bg-[#f3f8fc] p-6 sm:p-8 text-center">
          <h2 className="text-[20px] sm:text-[22px] font-bold text-[#0d71ba]">
            {t.contactTitle}
          </h2>
          <p className="mt-3 text-[16.5px] leading-[1.85] text-[#535556]">
            {t.contactName}
          </p>
          <p className="text-[16.5px] leading-[1.85] text-[#535556]">
            <a
              href="mailto:Info@Codetoon.net"
              dir="ltr"
              className="font-semibold text-[#0d71ba] hover:text-[#0d5182] transition-colors"
            >
              Info@Codetoon.net
            </a>
            {' · '}
            <a
              href="https://codetoon.net"
              className="font-semibold text-[#0d71ba] hover:text-[#0d5182] transition-colors"
            >
              codetoon.net
            </a>
          </p>
        </div>
      </article>
    </div>
  );
}
