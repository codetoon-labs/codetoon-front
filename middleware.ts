import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale } from '@/lib/i18n/config';

// codetoon.net is the canonical host. www.codetoon.net resolves to the same
// worker, so without this every page exists twice and ranking signals split.
const CANONICAL_HOST = 'codetoon.net';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host');

  if (host && host.toLowerCase().replace(/:\d+$/, '') === `www.${CANONICAL_HOST}`) {
    const url = new URL(request.url);
    url.host = CANONICAL_HOST;
    url.protocol = 'https:';
    url.port = '';
    return NextResponse.redirect(url, 308);
  }

  const { pathname } = request.nextUrl;

  // Markdown for Agents: AI agents that request markdown instead of HTML
  // (Accept: text/markdown) get the machine-readable site summary.
  const accept = request.headers.get('accept') ?? '';
  if (
    pathname === '/' &&
    accept.includes('text/markdown') &&
    !accept.includes('text/html')
  ) {
    return NextResponse.rewrite(new URL('/llms.txt', request.url));
  }

  // Files (llms.txt, sitemap.xml, robots.txt, images) live outside [locale].
  if (/\.[^/]+$/.test(pathname)) return NextResponse.next();

  // Arabic is served from its public prefix as-is.
  if (pathname === '/ar' || pathname.startsWith('/ar/')) return NextResponse.next();

  // The default locale has no public prefix: /en/x would duplicate /x.
  if (pathname === `/${defaultLocale}` || pathname.startsWith(`/${defaultLocale}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || '/';
    return NextResponse.redirect(url, 308);
  }

  // Everything else is English, rendered by app/[locale] with locale=en.
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Every HTML/route request, so the www redirect applies site-wide. Static
  // assets and image requests are skipped — they never need canonicalisation.
  matcher: ['/((?!_next/static|_next/image|favicon.ico|favicon_io).*)'],
};
