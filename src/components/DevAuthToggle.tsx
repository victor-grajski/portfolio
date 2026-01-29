'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';

export function DevAuthToggle() {
  const [isSkipped, setIsSkipped] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const { data: session, status } = useSession();

  // Only show in development
  const isDevelopment = process.env.NODE_ENV === 'development';

  // Load visibility preference from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('devToolsVisible');
    if (saved !== null) {
      setIsVisible(saved === 'true');
    }
  }, []);

  // Save visibility preference to localStorage
  const toggleVisibility = () => {
    const newValue = !isVisible;
    setIsVisible(newValue);
    localStorage.setItem('devToolsVisible', String(newValue));
  };

  // Keyboard shortcut: Ctrl/Cmd + Shift + D
  useEffect(() => {
    if (!isDevelopment) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        toggleVisibility();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDevelopment, isVisible]);

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

  // Minimized toggle button
  if (!isVisible) {
    return (
      <button
        onClick={toggleVisibility}
        className="fixed bottom-4 right-4 bg-gray-800 text-white p-2 rounded-lg shadow-lg z-50 hover:bg-gray-700 transition-colors"
        title="Show Dev Tools (Ctrl+Shift+D)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-3 rounded-lg shadow-lg z-50 max-w-xs">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-medium">Development Tools</div>
        <button
          onClick={toggleVisibility}
          className="text-gray-400 hover:text-white transition-colors ml-2"
          title="Hide Dev Tools (Ctrl+Shift+D)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
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
                isSkipped ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              Auth: {isSkipped ? 'Bypassed' : 'Enabled'}
            </button>

            {/* Authentication Status */}
            <div className="text-xs space-y-1">
              <div className="font-medium">Auth Status:</div>
              <div
                className={`px-2 py-1 rounded text-xs ${
                  status === 'loading'
                    ? 'bg-gray-600'
                    : status === 'authenticated'
                      ? 'bg-green-600'
                      : 'bg-red-600'
                }`}
              >
                {status === 'loading'
                  ? 'Loading...'
                  : status === 'authenticated'
                    ? 'Authenticated'
                    : 'Not Authenticated'}
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
              <button onClick={forceReload} className="text-blue-300 hover:text-blue-100">
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
              <button onClick={resetAuth} className="text-red-300 hover:text-red-100">
                Reset Auth
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
