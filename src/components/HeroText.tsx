'use client';

import { motion } from 'framer-motion';

interface HeroTextProps {
  children: React.ReactNode;
}

export function HeroText({ children }: HeroTextProps) {
  return (
    <h1
      className="text-2xl md:text-3xl my-16 min-h-[12rem] font-normal"
      style={{ lineHeight: '1.5', color: '#454545' }}
    >
      {children}
    </h1>
  );
}
