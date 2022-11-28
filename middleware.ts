import { NextRequest, NextFetchEvent, NextResponse } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|favicon.ico).*)',
  ],
};

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (
    !req.nextUrl.pathname.startsWith('/enter') &&
    !req.cookies.has('carrotsession')
  ) {
    req.nextUrl.searchParams.set('from', req.nextUrl.pathname);
    req.nextUrl.pathname = '/enter';

    return NextResponse.redirect(req.nextUrl);
  }
  return NextResponse.next();
}
