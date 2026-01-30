'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface HeroTextProps {
  children: React.ReactNode;
}

type CursorState = 'blinking' | 'typing' | 'fading' | 'hidden';

export function HeroText({ children }: HeroTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cursorState, setCursorState] = useState<CursorState>('blinking');
  const text = String(children || '');

  // Typing effect
  useEffect(() => {
    if (currentIndex < text.length) {
      // Start typing - cursor stops blinking
      if (cursorState === 'blinking') {
        setCursorState('typing');
      }

      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 30);

      return () => clearTimeout(timeout);
    } else if (currentIndex >= text.length && text.length > 0 && cursorState === 'typing') {
      // Typing complete - fade out cursor
      setCursorState('fading');
    }
  }, [currentIndex, text, cursorState]);

  // Hide cursor after fade
  useEffect(() => {
    if (cursorState === 'fading') {
      const timeout = setTimeout(() => {
        setCursorState('hidden');
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [cursorState]);

  // Reset animation when text changes
  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
    setCursorState('blinking');
  }, [text]);

  return (
    <h1
      className="text-2xl md:text-3xl my-16 min-h-[12rem] font-normal text-[#454545] dark:text-[#f5f5f5]"
      style={{ lineHeight: '1.5' }}
    >
      {displayedText}
      {cursorState !== 'hidden' && (
        <motion.span
          initial={{ opacity: 1 }}
          animate={
            cursorState === 'blinking'
              ? { opacity: [1, 1, 0, 0] }
              : cursorState === 'typing'
                ? { opacity: 1 }
                : { opacity: 0 }
          }
          transition={
            cursorState === 'blinking'
              ? { duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }
              : cursorState === 'fading'
                ? { duration: 0.5 }
                : { duration: 0 }
          }
          className={`inline-block ${cursorState === 'blinking' ? 'cursor-initial-blink' : ''}`}
        >
          |
        </motion.span>
      )}
    </h1>
  );
}
