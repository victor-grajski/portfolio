import '@fontsource/mulish';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Providers } from '@/components/Providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'Victor Grajski - Design Engineer',
  description: 'Portfolio of Victor Grajski, Design Engineer',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-mulish min-h-screen bg-[#f8f8f8] text-black">
        <Providers>
          <header className="fixed top-0 left-0 right-0 bg-[#f8f8f8] z-50">
            <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
              <Link href="/" className="text-lg font-medium relative z-50">
                Victor Grajski
              </Link>
              <Navigation />
            </div>
          </header>
          <main className="pt-20">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
