import { NextResponse } from 'next/server';

const DEV_AUTH_COOKIE = 'dev-skip-auth';

export async function POST() {
  // Only allow in development
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Only available in development' }, { status: 403 });
  }

  try {
    // Create response with cookies cleared
    const response = NextResponse.json({
      success: true,
      message: 'Auth state and session reset to default',
    });

    // Clear the dev auth skip cookie
    response.cookies.set(DEV_AUTH_COOKIE, '', {
      expires: new Date(0),
      path: '/',
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });

    // Clear NextAuth session cookies
    response.cookies.set('next-auth.session-token', '', {
      expires: new Date(0),
      path: '/',
      httpOnly: true,
      secure: false, // Always false in dev (this route only runs in development)
      sameSite: 'lax',
    });

    response.cookies.set('__Secure-next-auth.session-token', '', {
      expires: new Date(0),
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });

    return response;
  } catch (error) {
    console.error('Error resetting auth state:', error);
    return NextResponse.json({ error: 'Failed to reset auth state' }, { status: 500 });
  }
}
