import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { defaultLocale, locales } from '@/lib/i18n/config';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  console.log('pathname =', pathname);
  

  // Vérifier si le chemin appartient à `/api/*`
  if (pathname.startsWith('/api')) {
    console.log('pathname 22 =', pathname);
    return NextResponse.next(); // Ignorer les API routes
  }

  // Vérifier si le chemin commence par une locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    console.log('pathname 11 =', pathname);
    // Rediriger avec la locale par défaut si aucune locale n'est présente
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, request.url)
    );
  }

  // Continuer le traitement pour les autres cas
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Exclure les chemins internes comme _next, favicon, etc.
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
