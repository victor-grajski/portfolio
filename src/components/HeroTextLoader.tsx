'use client';

import dynamic from 'next/dynamic';

// Load HeroText independently - its JS bundle loads separately from the rest of the page
// This allows the typewriter animation to start before projects finish loading
const HeroText = dynamic(() => import('@/components/HeroText').then((mod) => mod.HeroText), {
  ssr: false,
  loading: () => (
    <div className="space-y-4 my-16 min-h-[12rem]">
      <div className="h-8 bg-[#454545] rounded animate-pulse w-full"></div>
      <div className="h-8 bg-[#454545] rounded animate-pulse w-5/6"></div>
      <div className="h-8 bg-[#454545] rounded animate-pulse w-4/6"></div>
    </div>
  ),
});

interface HeroTextLoaderProps {
  children: React.ReactNode;
}

export function HeroTextLoader({ children }: HeroTextLoaderProps) {
  return <HeroText>{children}</HeroText>;
}
