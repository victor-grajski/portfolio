'use client';

import { signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function HomepageAuthWithUrlPassword(): null {
  const [autoAuthAttempted, setAutoAuthAttempted] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Only show auth form if pwd parameter is present
  const hasPasswordParam = searchParams.get('pwd');

  // Check for password in URL and auto-authenticate
  useEffect(() => {
    // Don't do anything if no password parameter
    if (!hasPasswordParam) {
      return;
    }
    const urlPassword = searchParams.get('pwd');

    if (urlPassword && !autoAuthAttempted) {
      setAutoAuthAttempted(true);

      // Attempt to sign in with the URL password using a generic project slug
      signIn('credentials', {
        password: urlPassword,
        projectSlug: 'homepage', // Use a generic slug for homepage auth
        redirect: false,
      })
        .then((result) => {
          if (result?.ok) {
            // Authentication successful - refresh immediately (silently)
            router.refresh();
          } else {
            // Auto-auth failed silently - don't show error on homepage
            console.log('Auto-authentication failed');
          }
        })
        .catch(() => {
          console.log('An error occurred during authentication');
        });
    }
  }, [searchParams, router, autoAuthAttempted, hasPasswordParam]);

  // Don't show any UI on the homepage - authentication happens silently in the background
  return null;
}
