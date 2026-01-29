'use client';

import { motion } from 'framer-motion';

interface HeroTextProps {
  children: React.ReactNode;
}

export function HeroText({ children }: HeroTextProps) {
  return (
    <p
      className="text-2xl md:text-3xl my-16 min-h-[12rem]"
      style={{ lineHeight: '1.5', color: '#454545' }}
    >
      {children}
    </p>
  );
}
