'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ProjectAuthFormProps {
  projectSlug: string;
}

export function ProjectAuthForm({ projectSlug }: ProjectAuthFormProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

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
        // Replace the current URL (auth page) with home page in history
        window.history.replaceState(null, '', '/');
        // Then navigate to the project page
        router.push(`/projects/${projectSlug}`);
      } else {
        setError('Incorrect password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
      
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
      
      <button
        type="submit"
        disabled={isLoading}
        className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Verifying...' : 'View Project'}
      </button>
    </form>
  );
} 