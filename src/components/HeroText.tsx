'use client';

import { motion } from 'framer-motion';

interface HeroTextProps {
  children: React.ReactNode;
}

export function HeroText({ children }: HeroTextProps) {
  return (
    <motion.p 
      className="text-2xl md:text-3xl leading-relaxed"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.p>
  );
} 