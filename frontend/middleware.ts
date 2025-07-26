import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { 
  publicRoutes, 
  authRoutes, 
  apiAuthPrefix, 
  DEFAUTL_AUTH_REDIRECT,
  DEFAUTL_UNAUTH_REDIRECT
} from '@/routes';
import { auth } from './auth';

/**
 * Authentication middleware for Next.js 15
 * Handles route protection and redirects based on authentication status
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the pathname is in the public routes or API auth routes
  // These routes are accessible without authentication
  const isPublicRoute = publicRoutes.includes(pathname);
  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(pathname);

  if (isPublicRoute || isApiAuthRoute) {
    return NextResponse.next();
  }

  // Get the session token from the request
  const session = await auth()

  
  const isAuthenticated = !!session;

  // Handle auth routes (login, register, etc.)
  // Redirect to profile if user is already logged in
  if (isAuthRoute) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL(DEFAUTL_AUTH_REDIRECT, request.url));
    }
    return NextResponse.next();
  }

  // Handle protected routes
  // Redirect to login if user is not authenticated
  if (!isAuthenticated) {
    const redirectUrl = new URL(DEFAUTL_UNAUTH_REDIRECT, request.url);
    // Preserve the original URL as a callback parameter
    redirectUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    // Match all routes except for:
    // - API routes that don't start with the auth prefix
    // - Static files (assets, images, etc.)
    // - Favicon
    '/((?!api/(?!auth)|_next/static|_next/image|favicon.ico).*)',
  ],
};