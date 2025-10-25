import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getProjectBySlug } from './lib/contentful/api';
import fs from 'fs';
import path from 'path';

// Use a file to store state instead of memory
const getStateFilePath = () => {
  return path.join(process.cwd(), '.dev-auth-state.json');
};

const getAuthState = (): boolean => {
  try {
    // Always read fresh from disk, no caching
    if (fs.existsSync(getStateFilePath())) {
      // Add a cache-busting timestamp to avoid Node.js module caching
      const timestamp = Date.now();
      const fileContent = fs.readFileSync(getStateFilePath(), 'utf8');
      console.log(`[${timestamp}] Auth state file content:`, fileContent);
      const data = JSON.parse(fileContent);
      return data.skipAuth === true;
    }
  } catch (error) {
    console.error('Error reading auth state file:', error);
  }
  
  // Default to environment variable if file doesn't exist
  return process.env.DEV_SKIP_AUTH === 'true';
};

// Function to check if we should skip auth
function shouldSkipAuth() {
  // In production, always use the environment variable
  if (process.env.NODE_ENV === 'production') {
    return process.env.DEV_SKIP_AUTH === 'true';
  }
  
  // In development, use the file-based state with no caching
  const shouldSkip = getAuthState();
  console.log('Should skip auth check?', shouldSkip);
  return shouldSkip;
}

export async function middleware(req: NextRequest) {
  // Debug environment variables
  console.log('DEV_SKIP_AUTH value:', process.env.DEV_SKIP_AUTH);
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('Auth state from file:', getAuthState());
  
  // Skip auth check if we should skip auth
  if (shouldSkipAuth()) {
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