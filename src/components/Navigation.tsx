'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="relative flex items-center">
        <div className="hidden lg:flex items-center gap-6">
          <Link href="/" className="hover:text-gray-600">
            Work
          </Link>
          <Link href="/about" className="hover:text-gray-600">
            About
          </Link>
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-600"
          >
            GitHub
          </a>
          <a
            href="https://soundcloud.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-600"
          >
            SoundCloud
          </a>
          <a
            href="https://drive.google.com/your-resume-link"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-600"
          >
            Resume
          </a>
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
              <div className="max-w-4xl mx-auto px-6 py-4 flex flex-col space-y-4">
                <Link
                  href="/"
                  className="text-lg hover:text-gray-600"
                  onClick={() => setIsOpen(false)}
                >
                  Work
                </Link>
                <Link
                  href="/about"
                  className="text-lg hover:text-gray-600"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg hover:text-gray-600"
                  onClick={() => setIsOpen(false)}
                >
                  GitHub
                </a>
                <a
                  href="https://soundcloud.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg hover:text-gray-600"
                  onClick={() => setIsOpen(false)}
                >
                  SoundCloud
                </a>
                <a
                  href="https://drive.google.com/your-resume-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg hover:text-gray-600"
                  onClick={() => setIsOpen(false)}
                >
                  Resume
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
