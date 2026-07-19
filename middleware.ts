import { NextRequest, NextResponse } from 'next/server';

// Markdown for Agents: AI agents that request markdown instead of HTML
// (Accept: text/markdown) get the machine-readable site summary.
export function middleware(request: NextRequest) {
  const accept = request.headers.get('accept') ?? '';
  if (accept.includes('text/markdown') && !accept.includes('text/html')) {
    return NextResponse.rewrite(new URL('/llms.txt', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
