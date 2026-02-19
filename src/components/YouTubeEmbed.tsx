'use client';

import { useState, useEffect } from 'react';
import { extractYouTubeId } from '@/lib/youtube';

interface YouTubeEmbedProps {
  url: string;
  className?: string;
}

export default function YouTubeEmbed({ url, className = '' }: YouTubeEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const videoId = extractYouTubeId(url);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!videoId) return null;

  return (
    <div className={`relative w-full ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-transparent rounded-xl animate-pulse">
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full border-4 border-gray-300 dark:border-gray-700 border-t-gray-500 dark:border-t-gray-500 animate-spin" />
            <p className="text-sm text-gray-500 dark:text-gray-400">Loading video...</p>
          </div>
        </div>
      )}

      {isMounted && (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
          className={`w-full h-full rounded-xl ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setIsLoading(false)}
        />
      )}
    </div>
  );
}
