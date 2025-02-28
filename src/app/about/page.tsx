import React from 'react';

export const metadata = {
  title: 'About | Victor Grajski',
  description: 'Learn more about Victor Grajski - background, skills, and experience.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column - Title */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
          <h1 className="text-4xl font-bold mb-4 lg:mb-0">About</h1>
        </div>
        
        {/* Right column - Content */}
        <div className="lg:col-span-8">
          <div className="prose prose-lg max-w-none">
            <p className="mb-4">
              I&apos;m a passionate developer and designer with expertise in creating beautiful, 
              functional digital experiences. With a background in both design and engineering, 
              I bring a unique perspective to every project I work on.
            </p>
            <p className="mb-4">
              My journey in technology began with a fascination for how things work, which 
              eventually led me to pursue formal education in computer science and design. 
              Since then, I&apos;ve worked on a variety of projects, from web applications to 
              mobile apps, always striving to create solutions that are both technically 
              sound and user-friendly.
            </p>
            <p className="mb-8">
              When I&apos;m not coding, you can find me exploring new technologies, contributing 
              to open-source projects, or enjoying the outdoors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 