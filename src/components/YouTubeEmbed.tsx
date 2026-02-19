'use client';

import { useState } from 'react';

interface YouTubeEmbedProps {
  url: string;
  className?: string;
}

export function extractYouTubeId(url: string): string | null {
  // youtube.com/watch?v=ID
  const watchMatch = url.match(/[?&]v=([^&]+)/);
  if (watchMatch) return watchMatch[1];

  // youtu.be/ID
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  if (shortMatch) return shortMatch[1];

  // youtube.com/embed/ID
  const embedMatch = url.match(/youtube\.com\/embed\/([^?&]+)/);
  if (embedMatch) return embedMatch[1];

  return null;
}

export default function YouTubeEmbed({ url, className = '' }: YouTubeEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const videoId = extractYouTubeId(url);

  if (!videoId) return null;

  return (
    <div className="relative w-full flex justify-center">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-transparent rounded-xl animate-pulse">
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full border-4 border-gray-300 dark:border-gray-700 border-t-gray-500 dark:border-t-gray-500 animate-spin" />
            <p className="text-sm text-gray-500 dark:text-gray-400">Loading video...</p>
          </div>
        </div>
      )}

      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
