'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface HeroTextProps {
  children: React.ReactNode;
}

export function HeroText({ children }: HeroTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const text = String(children || '');

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 30); // Speed of typing (lower = faster)

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  // Hide cursor after a delay when typing finishes
  useEffect(() => {
    if (currentIndex >= text.length && text.length > 0) {
      const timeout = setTimeout(() => {
        setShowCursor(false);
      }, 500); // Delay before hiding cursor (in ms)

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text.length]);

  // Reset animation when text changes
  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
    setShowCursor(true);
  }, [text]);

  return (
    <h1
      className="text-2xl md:text-3xl my-16 min-h-[12rem] font-normal text-[#454545] dark:text-[#f5f5f5]"
      style={{ lineHeight: '1.5' }}
    >
      {displayedText}
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
          className="inline-block"
        >
          |
        </motion.span>
      )}
    </h1>
  );
}
