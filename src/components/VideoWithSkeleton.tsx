'use client';

import { useState } from 'react';

interface VideoWithSkeletonProps {
  src: string;
  className?: string;
}

export default function VideoWithSkeleton({ src, className = '' }: VideoWithSkeletonProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full flex justify-center">
      {/* Skeleton loader */}
      {isLoading && (
        <div
          className={`absolute inset-0 flex items-center justify-center bg-transparent rounded-xl animate-pulse ${className}`}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full border-4 border-gray-300 dark:border-gray-700 border-t-gray-500 dark:border-t-gray-500 animate-spin" />
            <p className="text-sm text-gray-500 dark:text-gray-400">Loading video...</p>
          </div>
        </div>
      )}

      {/* Video element */}
      <video
        src={src}
        controls
        loop
        muted
        autoPlay
        playsInline
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoadedData={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
      >
        Your browser doesn&apos;t support video playback.
      </video>
    </div>
  );
}
