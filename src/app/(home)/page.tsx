import { getHeadline } from '@/lib/contentful/api';
import { HeroText } from '@/components/HeroText';
import { ProjectsListClient } from '@/components/ProjectsListClient';
import { HomepageAuthWithUrlPassword } from '@/components/HomepageAuthWithUrlPassword';
import { Suspense } from 'react';
import { Metadata } from 'next';

// Revalidate every hour (3600 seconds)
export const revalidate = 3600;

// Static metadata (no async needed)
export const metadata: Metadata = {
  title: 'Victor Grajski - Design Engineer',
  description: 'Portfolio of Victor Grajski, Design Engineer',
};

export default async function HomePage() {
  // Fetch headline server-side (fast, small query)
  const headline = await getHeadline();

  return (
    <div className="max-w-5xl mx-auto px-6 pb-16">
      {/* Silent authentication handler - no UI shown */}
      <Suspense fallback={null}>
        <HomepageAuthWithUrlPassword />
      </Suspense>

      {/* Hero Section - headline is SSR'd, animation runs on hydration */}
      <section className="py-16 md:py-24">
        <div className="w-full lg:w-2/3">
          <HeroText>{headline}</HeroText>
        </div>
      </section>

      {/* Projects load client-side so they don't block hero animation */}
      <ProjectsListClient />
    </div>
  );
}
