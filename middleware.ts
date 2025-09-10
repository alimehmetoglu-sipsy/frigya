import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

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

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};