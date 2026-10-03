'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n/provider';

export default function NotFound() {
  const { t, href } = useI18n();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-3xl font-bold text-[#0d71ba]">{t.common.notFound.title}</h1>
      <p className="text-[#4A5568]">{t.common.notFound.body}</p>
      <Link href={href('/')} className="rounded-[40px] bg-[#0d71ba] px-6 py-3 font-bold text-[#FCF6D0] hover:bg-[#0a5a95]">
        {t.common.notFound.backHome}
      </Link>
    </div>
  );
}
