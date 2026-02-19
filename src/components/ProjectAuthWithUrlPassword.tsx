'use client';

import { signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { EyeIcon, EyeSlashIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectAuthWithUrlPasswordProps {
  projectSlug: string;
}

export function ProjectAuthWithUrlPassword({ projectSlug }: ProjectAuthWithUrlPasswordProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [autoAuthAttempted, setAutoAuthAttempted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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
            // Show success state
            setIsSuccess(true);
            // Wait for animation, then redirect
            setTimeout(() => {
              window.location.href = `/projects/${projectSlug}`;
            }, 1500);
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
  }, [searchParams, projectSlug, autoAuthAttempted]);

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
        // Show success state
        setIsSuccess(true);
        setIsLoading(false);
        // Wait for animation, then redirect
        setTimeout(() => {
          window.location.href = `/projects/${projectSlug}`;
        }, 1500);
      } else {
        setError('Incorrect password');
        setIsLoading(false);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  // Show loading state during auto-authentication
  if (isLoading && !error && searchParams.get('pwd')) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 dark:border-white p-8"
      >
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-black dark:border-white mb-4"></div>
          <p className="text-lg">Authenticating...</p>
        </div>
      </motion.div>
    );
  }

  // Show success state
  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 dark:border-white p-8"
      >
        <div className="text-center py-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg font-medium"
          >
            Access granted! Redirecting...
          </motion.p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 dark:border-white p-8"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
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
              className="w-full px-4 py-3 rounded-lg border bg-white/5 dark:bg-black border-gray-300 dark:border-white focus:border-black dark:focus:border-white focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10 transition-all duration-200 pr-12 outline-none dark:text-white"
              placeholder="Enter password"
              required
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-700/50"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-red-500 dark:text-red-400 text-sm"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: isLoading ? 1 : 1.02 }}
          whileTap={{ scale: isLoading ? 1 : 0.98 }}
          className="w-full bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-black/20 dark:hover:shadow-white/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
        >
          {isLoading ? 'Verifying...' : 'View Project'}
        </motion.button>

        {isDevelopment && (
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-4 pt-4 border-t border-gray-200 dark:border-white/20">
            <p>
              For development:{' '}
              {process.env.NEXT_PUBLIC_DEV_SKIP_AUTH === 'true'
                ? 'Auth is currently bypassed'
                : 'Auth is enabled'}
            </p>
          </div>
        )}
      </form>
    </motion.div>
  );
}
