'use client';

import { signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface ProjectAuthWithUrlPasswordProps {
  projectSlug: string;
}

export function ProjectAuthWithUrlPassword({ projectSlug }: ProjectAuthWithUrlPasswordProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [autoAuthAttempted, setAutoAuthAttempted] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isDevelopment = process.env.NODE_ENV === 'development';

  // Check for password in URL and auto-authenticate
  useEffect(() => {
    const urlPassword = searchParams.get('pwd');

    if (urlPassword && !autoAuthAttempted) {
      setAutoAuthAttempted(true);
      setIsLoading(true);

      // Attempt to sign in with the URL password
      signIn('credentials', {
        password: urlPassword,
        projectSlug,
        redirect: false,
      })
        .then((result) => {
          if (result?.ok) {
            // Authentication successful - redirect to project page
            setTimeout(() => {
              router.push(`/projects/${projectSlug}`);
              router.refresh();
            }, 500);
          } else {
            // Auto-auth failed - show error and let user try manually
            setError(
              'The password in the link is incorrect. Please enter the correct password below.'
            );
            setIsLoading(false);
          }
        })
        .catch(() => {
          setError(
            'An error occurred during authentication. Please try entering the password below.'
          );
          setIsLoading(false);
        });
    }
  }, [searchParams, projectSlug, router, autoAuthAttempted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        password,
        projectSlug,
        redirect: false,
      });

      if (result?.ok) {
        // Add a small delay to ensure the session is properly set
        setTimeout(() => {
          // Navigate to the project page
          router.push(`/projects/${projectSlug}`);
          // Force a refresh to ensure the middleware picks up the new session
          router.refresh();
        }, 500);
      } else {
        setError('Incorrect password');
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state during auto-authentication
  if (isLoading && !error && searchParams.get('pwd')) {
    return (
      <div className="space-y-4">
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-black mb-4"></div>
          <p className="text-lg">Authenticating...</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-2">
          This project is password protected
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border bg-white/5 border-gray-300 focus:border-black focus:ring-1 focus:ring-black pr-12"
            placeholder="Enter password"
            required
            autoFocus
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-sm text-gray-600 hover:text-black"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={isLoading}
        className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Verifying...' : 'View Project'}
      </button>

      {isDevelopment && (
        <div className="text-sm text-gray-500 mt-4">
          <p>
            For development:{' '}
            {process.env.NEXT_PUBLIC_DEV_SKIP_AUTH === 'true'
              ? 'Auth is currently bypassed'
              : 'Auth is enabled'}
          </p>
        </div>
      )}
    </form>
  );
}
