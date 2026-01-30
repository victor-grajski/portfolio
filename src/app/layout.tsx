import '@fontsource/mulish/400.css';
import '@fontsource/mulish/700.css';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Providers } from '@/components/Providers';
import { ThemeProvider } from '@/components/ThemeProvider';
import { DevAuthToggle } from '@/components/DevAuthToggle';
import { getPortfolio } from '@/lib/contentful/api';
import './globals.css';

export const metadata: Metadata = {
  title: 'Victor Grajski - Design Engineer',
  description: 'Portfolio of Victor Grajski, Design Engineer',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const portfolio = await getPortfolio();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-mulish min-h-screen bg-[#f8f8f8] dark:bg-[#0a0a0a] text-black dark:text-white">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Providers>
            <header className="fixed top-0 left-0 right-0 bg-[#f8f8f8] dark:bg-[#0a0a0a] z-50">
              <div className="max-w-5xl mx-auto px-6 pt-4 lg:pt-8 pb-4 flex items-center justify-between">
                <Link
                  href="/"
                  className="text-[1.5rem] font-normal text-[#131313] dark:text-white tracking-[1px] relative z-50"
                >
                  Victor Grajski
                </Link>
                <Navigation githubUrl={portfolio?.githubUrl || undefined} />
              </div>
            </header>
            <main className="pt-20">{children}</main>
            {/* Development auth toggle */}
            <DevAuthToggle />
          </Providers>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
