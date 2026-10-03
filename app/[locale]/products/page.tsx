import type { Metadata } from 'next';
import { localeAlternates } from '@/lib/i18n/config';
import { getMessages, resolveLocale } from '@/lib/i18n/server';

type PageProps = { params: Promise<{ locale: string }> };

// Placeholder route. Kept out of the sitemap and out of the index until it has
// real content — a heading-only page indexed at priority 0.8 was a thin-content
// signal on an otherwise small site.
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = getMessages(locale).products;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: localeAlternates('/products', locale),
    robots: { index: false, follow: true },
  };
}

async function Products({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const t = getMessages(locale).products;
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5fbfe] font-sans dark:bg-black">
      <h1 className="text-3xl font-bold">{t.heading}</h1>
    </div>
  );
}

export default Products;
