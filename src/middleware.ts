import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getProjectBySlug } from './lib/contentful/api';

export async function middleware(req: NextRequest) {
  // Skip auth check if DEV_SKIP_AUTH is true
  if (process.env.DEV_SKIP_AUTH === 'true') {
    return NextResponse.next();
  }

  // Skip auth check for auth pages
  if (req.nextUrl.pathname.endsWith('/auth')) {
    return NextResponse.next();
  }

  // Only check project routes
  if (req.nextUrl.pathname.startsWith('/projects/')) {
    const projectSlug = req.nextUrl.pathname.split('/')[2];
    
    try {
      const project = await getProjectBySlug(projectSlug);
      
      // Only redirect if the project exists and is password protected
      if (project?.isPasswordProtected) {
        const hasSession = !!req.cookies.get('next-auth.session-token');
        
        if (!hasSession) {
          return NextResponse.redirect(new URL(`/projects/${projectSlug}/auth`, req.url));
        }
      }
    } catch (error) {
      console.error('Error in middleware:', error);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/projects/:path*'],
}; 