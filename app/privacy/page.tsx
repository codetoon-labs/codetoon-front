import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Codetoon Privacy Policy / سياسة الخصوصية',
  description:
    'Codetoon Privacy Policy — how Codetoon collects, uses, and protects your personal data.',
  alternates: { canonical: 'https://codetoon.net/privacy' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Codetoon Privacy Policy',
    description:
      'How Codetoon collects, uses, and protects your personal data.',
    url: 'https://codetoon.net/privacy',
    siteName: 'Codetoon',
    type: 'website',
  },
};

type Section = { title: string; body: string[] };

const sections: Section[] = [
  {
    title: 'Introduction',
    body: [
      'Codetoon ("we," "us," or "our") operates the website codetoon.net and can be reached by email at Info@Codetoon.net.',
      'This Privacy Policy explains how we handle your personal data when you contact us or use our services, and our commitment to protecting it and respecting your privacy.',
    ],
  },
  {
    title: 'Data We Collect',
    body: [
      'We collect the following personal data: your name, phone or WhatsApp number, email address, and company name.',
      'This data is collected through forms on our website, Facebook and Instagram lead forms, and WhatsApp messages you send us.',
    ],
  },
  {
    title: 'How We Use Your Data',
    body: [
      'We use your data to contact you about our services (including Autopilot), to qualify your inquiry, to follow up with you, and to provide the service you requested.',
      'We do not use your data for any unrelated purposes.',
    ],
  },
  {
    title: 'Legal Basis',
    body: [
      'We process your personal data on the basis of your consent, which you give when you submit a form or send us a message.',
    ],
  },
  {
    title: 'Sharing',
    body: [
      'We do not sell or rent your data.',
      'We may use trusted service providers (for example, Meta/WhatsApp and our CRM) solely to deliver our service, and we never share your data with unrelated third parties.',
    ],
  },
  {
    title: 'Data Retention',
    body: [
      'We keep your data only as long as needed to serve you, and then delete it upon your request or when it is no longer needed.',
    ],
  },
  {
    title: 'Your Rights',
    body: [
      'You can request to access, correct, or delete your personal data at any time by emailing us at Info@Codetoon.net.',
    ],
  },
  {
    title: 'Security',
    body: [
      'We apply reasonable and appropriate measures to protect your personal data against unauthorized access, loss, or misuse.',
    ],
  },
  {
    title: 'Compliance',
    body: [
      "We comply with Egypt's Personal Data Protection Law (Law No. 151 of 2020).",
    ],
  },
];

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
            className="font-semibold text-[#0d71ba] underline decoration-[#f4d315] decoration-2 underline-offset-4 hover:text-[#0d5182] transition-colors"
          >
            Info@Codetoon.net
          </a>,
        ]
      : [part]
  );
}

export default function PrivacyPolicyPage() {
  return (
    <div className="px-5 pt-32 pb-14 sm:pt-40 sm:pb-20">
      <article className="mx-auto w-full max-w-[720px]">
        {/* Header */}
        <header className="mb-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#e6f0f8] px-3.5 py-1.5 text-[13px] font-semibold text-[#0d71ba]">
            Last updated: June 2026
          </span>
          <h1 className="mt-5 text-[34px] sm:text-[44px] font-bold leading-tight tracking-tight text-[#000305]">
            Privacy Policy
          </h1>
          <span className="mt-4 block h-1.5 w-24 rounded-full bg-[#f4d315]" />
          <p className="mt-5 text-[17px] leading-8 text-[#535556]">
            At Codetoon, we respect your privacy and are committed to protecting
            your personal data. This page explains what we collect and how we
            use it.
          </p>
        </header>

        {/* Card with sections */}
        <div className="rounded-2xl border border-[#e6f0f8] bg-white p-6 sm:p-10 shadow-[0_10px_40px_-15px_rgba(13,113,186,0.25)]">
          <ol className="space-y-9">
            {sections.map((s, idx) => (
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
            Contact
          </h2>
          <p className="mt-3 text-[16.5px] leading-[1.85] text-[#535556]">
            Codetoon
          </p>
          <p className="text-[16.5px] leading-[1.85] text-[#535556]">
            <a
              href="mailto:Info@Codetoon.net"
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
