import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Use a file to store state instead of memory
const getStateFilePath = () => {
  return path.join(process.cwd(), '.dev-auth-state.json');
};

export async function POST() {
  // Only allow in development
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Only available in development' }, { status: 403 });
  }

  try {
    const filePath = getStateFilePath();

    // Delete the file if it exists
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`Auth state file deleted: ${filePath}`);
    }

    // Create response with session clearing cookies
    const response = NextResponse.json({
      success: true,
      message: 'Auth state and session reset to default',
    });

    // Clear NextAuth session cookies
    response.cookies.set('next-auth.session-token', '', {
      expires: new Date(0),
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
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
