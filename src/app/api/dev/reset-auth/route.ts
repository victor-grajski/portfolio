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
    
    return NextResponse.json({ 
      success: true, 
      message: 'Auth state reset to default'
    });
  } catch (error) {
    console.error('Error resetting auth state:', error);
    return NextResponse.json({ error: 'Failed to reset auth state' }, { status: 500 });
  }
} 