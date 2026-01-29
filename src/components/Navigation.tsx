'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface NavigationProps {
  githubUrl?: string;
}

export function Navigation({ githubUrl }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isWorkActive = mounted && pathname === '/';
  const isAboutActive = mounted && pathname.startsWith('/about');

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="relative flex items-center">
        <div className="hidden lg:flex items-center gap-12">
          <Link
            href="/"
            className={`text-[20px] font-light transition-opacity hover:opacity-100 ${
              isWorkActive ? 'opacity-100' : 'opacity-40'
            }`}
          >
            Work
          </Link>
          <Link
            href="/about"
            className={`text-[20px] font-light transition-opacity hover:opacity-100 ${
              isAboutActive ? 'opacity-100' : 'opacity-40'
            }`}
          >
            About
          </Link>
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[20px] font-light opacity-40 transition-opacity hover:opacity-100"
            >
              GitHub
            </a>
          )}
        </div>

        {/* Mobile/Tablet Hamburger Button */}
        <button
          className="lg:hidden p-2 hover:bg-black/5 rounded-md"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <span
              className={`w-full h-0.5 bg-black transition-transform duration-300 ${
                isOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`w-full h-0.5 bg-black transition-opacity duration-300 ${
                isOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-full h-0.5 bg-black transition-transform duration-300 ${
                isOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile/Tablet Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/10 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Menu */}
            <motion.div
              className="fixed left-0 right-0 top-[72px] bg-[#f8f8f8] lg:hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="max-w-5xl mx-auto px-6 pt-8 pb-4 flex flex-col space-y-4">
                <Link
                  href="/"
                  className={`text-[20px] font-light transition-opacity hover:opacity-100 ${
                    isWorkActive ? 'opacity-100' : 'opacity-40'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Work
                </Link>
                <Link
                  href="/about"
                  className={`text-[20px] font-light transition-opacity hover:opacity-100 ${
                    isAboutActive ? 'opacity-100' : 'opacity-40'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[20px] font-light opacity-40 transition-opacity hover:opacity-100"
                    onClick={() => setIsOpen(false)}
                  >
                    GitHub
                  </a>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
