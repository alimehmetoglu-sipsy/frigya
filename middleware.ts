import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always'
});

export function middleware(request: NextRequest) {
  // Admin sayfalarını kontrol et
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Login sayfasını bypass et
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Client-side'da sessionStorage kontrolü yapılacak
    // Server-side middleware'de cookie kontrolü yapılabilir
    // Şimdilik basit tutuyoruz
    return NextResponse.next();
  }

  // Apply internationalization middleware to other routes
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Admin routes
    '/admin/:path*',

    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(tr|en)/:path*',

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};