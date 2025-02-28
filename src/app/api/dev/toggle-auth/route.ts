import { NextResponse } from 'next/server';
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
      const timestamp = Date.now();
      const fileContent = fs.readFileSync(getStateFilePath(), 'utf8');
      console.log(`[${timestamp}] API - Auth state file content:`, fileContent);
      const data = JSON.parse(fileContent);
      return data.skipAuth === true;
    }
  } catch (error) {
    console.error('Error reading auth state file:', error);
  }
  
  // Default to environment variable if file doesn't exist
  return process.env.DEV_SKIP_AUTH === 'true';
};

const setAuthState = (skipAuth: boolean): void => {
  try {
    const filePath = getStateFilePath();
    const content = JSON.stringify({ skipAuth, timestamp: Date.now() });
    fs.writeFileSync(filePath, content);
    console.log(`Auth state file updated at ${filePath}:`, content);
    
    // Verify the file was written correctly
    if (fs.existsSync(filePath)) {
      const verifyContent = fs.readFileSync(filePath, 'utf8');
      console.log('Verification - file content after write:', verifyContent);
    }
  } catch (error) {
    console.error('Error writing auth state file:', error);
  }
};

export async function GET() {
  // Only allow in development
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Only available in development' }, { status: 403 });
  }

  const skipAuth = getAuthState();
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
    setAuthState(skip === true);
    
    // Force a small delay to ensure file is written
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Verify the state was set correctly
    const verifiedState = getAuthState();
    console.log('POST - Verified auth state after setting:', verifiedState);
    
    return NextResponse.json({ 
      success: true, 
      skipAuth: skip,
      verified: verifiedState
    });
  } catch (error) {
    console.error('Error in POST:', error);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
} 