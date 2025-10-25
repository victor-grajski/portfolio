import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getProjectBySlug } from './lib/contentful/api';

const DEV_AUTH_COOKIE = 'dev-skip-auth';

// Function to check if we should skip auth
function shouldSkipAuth(req: NextRequest) {
  // Check environment variable
  if (process.env.NEXT_PUBLIC_DEV_SKIP_AUTH === 'true') {
    return true;
  }

  // Check cookie (for dev toggle feature)
  if (process.env.NODE_ENV === 'development') {
    const devSkipCookie = req.cookies.get(DEV_AUTH_COOKIE);
    if (devSkipCookie?.value === 'true') {
      return true;
    }
  }

  return false;
}

export async function middleware(req: NextRequest) {
  // Skip auth check if we should skip auth
  if (shouldSkipAuth(req)) {
    console.log('Auth check skipped based on settings');
    return NextResponse.next();
  }

  // Skip auth check for auth pages
  if (req.nextUrl.pathname.endsWith('/auth')) {
    console.log('Auth page detected, skipping auth check');
    return NextResponse.next();
  }

  // Homepage is always public - no authentication required
  if (req.nextUrl.pathname === '/') {
    console.log('Homepage access - always allowed');
    return NextResponse.next();
  }

  // Only check project routes
  if (req.nextUrl.pathname.startsWith('/projects/')) {
    const projectSlug = req.nextUrl.pathname.split('/')[2];
    console.log('Checking project route:', projectSlug);

    try {
      const project = await getProjectBySlug(projectSlug);
      console.log('Project password protected:', project?.isPasswordProtected);

      // Only redirect if the project exists and is password protected
      if (project?.isPasswordProtected) {
        // Check for both session tokens (development and production)
        const hasSession =
          !!req.cookies.get('next-auth.session-token') ||
          !!req.cookies.get('__Secure-next-auth.session-token');

        console.log('Has session:', hasSession);

        if (!hasSession) {
          console.log('No session found, redirecting to auth page');
          // Preserve query parameters when redirecting to auth page
          const authUrl = new URL(`/projects/${projectSlug}/auth`, req.url);
          // Copy all query parameters from the original request
          req.nextUrl.searchParams.forEach((value, key) => {
            authUrl.searchParams.set(key, value);
          });
          return NextResponse.redirect(authUrl);
        }
      }
    } catch (error) {
      console.error('Error in middleware:', error);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/projects/:path*', '/'],
};
