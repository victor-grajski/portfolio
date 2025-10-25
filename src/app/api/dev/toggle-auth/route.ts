import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const DEV_AUTH_COOKIE = 'dev-skip-auth';

export async function GET() {
  // Only allow in development
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Only available in development' }, { status: 403 });
  }

  const cookieStore = await cookies();
  const skipAuth = cookieStore.get(DEV_AUTH_COOKIE)?.value === 'true';
  console.log('GET - Current auth state:', skipAuth);
  return NextResponse.json({ skipAuth });
}

export async function POST(request: Request) {
  // Only allow in development
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Only available in development' }, { status: 403 });
  }

  try {
    const { skip } = await request.json();
    console.log('POST - Setting auth state to:', skip);

    const response = NextResponse.json({
      success: true,
      skipAuth: skip,
    });

    // Set cookie to store the auth skip state
    response.cookies.set(DEV_AUTH_COOKIE, skip ? 'true' : 'false', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Error in POST:', error);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
