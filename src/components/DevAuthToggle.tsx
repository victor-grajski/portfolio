'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';

export function DevAuthToggle() {
  const [isSkipped, setIsSkipped] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { data: session, status } = useSession();
  
  // Only show in development
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  const fetchState = async () => {
    try {
      // Add cache-busting query parameter
      const timestamp = Date.now();
      const response = await fetch(`/api/dev/toggle-auth?t=${timestamp}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched auth state:', data);
        setIsSkipped(data.skipAuth);
      } else {
        setError('Failed to fetch auth state');
      }
    } catch (error) {
      console.error('Error fetching auth state:', error);
      setError('Error fetching auth state');
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (isDevelopment) {
      fetchState();
      
      // Set up polling to refresh state every 5 seconds
      const interval = setInterval(fetchState, 5000);
      return () => clearInterval(interval);
    } else {
      setIsLoading(false);
    }
  }, [isDevelopment]);
  
  const toggleAuth = async () => {
    setIsLoading(true);
    try {
      const timestamp = Date.now();
      const response = await fetch(`/api/dev/toggle-auth?t=${timestamp}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ skip: !isSkipped }),
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Toggle response:', data);
        setIsSkipped(data.skipAuth);
        
        // Force a hard reload to clear any caches
        window.location.href = window.location.href.split('?')[0] + '?t=' + Date.now();
      } else {
        setError('Failed to toggle auth');
      }
    } catch (error) {
      console.error('Error toggling auth:', error);
      setError('Error toggling auth');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Reset auth state to default
  const resetAuth = async () => {
    setIsLoading(true);
    try {
      // First sign out the user to clear the session
      await signOut({ redirect: false });
      
      const timestamp = Date.now();
      const response = await fetch(`/api/dev/reset-auth?t=${timestamp}`, {
        method: 'POST',
      });
      
      if (response.ok) {
        console.log('Auth state and session reset');
        // Force a hard reload to clear any caches
        window.location.href = window.location.href.split('?')[0] + '?t=' + Date.now();
      } else {
        setError('Failed to reset auth');
      }
    } catch (error) {
      console.error('Error resetting auth:', error);
      setError('Error resetting auth');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Force a hard reload of the page
  const forceReload = () => {
    window.location.href = window.location.href.split('?')[0] + '?t=' + Date.now();
  };
  
  if (!isDevelopment) return null;
  
  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-3 rounded-lg shadow-lg z-50 max-w-xs">
      <div className="text-sm font-medium mb-2">Development Tools</div>
      {isLoading ? (
        <div className="text-xs">Loading...</div>
      ) : error ? (
        <div className="text-xs text-red-300">{error}</div>
      ) : (
        <>
          <div className="space-y-2">
            <button
              onClick={toggleAuth}
              className={`text-xs px-3 py-1 rounded w-full ${
                isSkipped 
                  ? 'bg-yellow-600 hover:bg-yellow-700' 
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              Auth: {isSkipped ? 'Bypassed' : 'Enabled'}
            </button>
            
            {/* Authentication Status */}
            <div className="text-xs space-y-1">
              <div className="font-medium">Auth Status:</div>
              <div className={`px-2 py-1 rounded text-xs ${
                status === 'loading' ? 'bg-gray-600' :
                status === 'authenticated' ? 'bg-green-600' : 'bg-red-600'
              }`}>
                {status === 'loading' ? 'Loading...' :
                 status === 'authenticated' ? 'Authenticated' : 'Not Authenticated'}
              </div>
              
              {session && (
                <div className="text-xs text-gray-300">
                  <div>User: {session.user?.name || 'Unknown'}</div>
                  <div>Project: {session.user?.id || 'None'}</div>
                </div>
              )}
              
              {status === 'unauthenticated' && (
                <div className="text-xs text-gray-300">
                  <div>No active session</div>
                </div>
              )}
            </div>
            
            <div className="text-xs flex flex-wrap gap-1">
              <button 
                onClick={forceReload} 
                className="text-blue-300 hover:text-blue-100"
              >
                Force Reload
              </button>
              {status === 'authenticated' && (
                <button 
                  onClick={() => signOut({ redirect: false }).then(() => window.location.reload())} 
                  className="text-orange-300 hover:text-orange-100"
                >
                  Sign Out
                </button>
              )}
              <button 
                onClick={resetAuth} 
                className="text-red-300 hover:text-red-100"
              >
                Reset Auth
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
} 