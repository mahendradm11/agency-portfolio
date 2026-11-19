'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'purple' | 'green' | 'amber';
  hoverEffect?: boolean;
}

export function GlassCard({
  children,
  className,
  glowColor = 'cyan',
  hoverEffect = true,
}: GlassCardProps) {
  const glowHoverClasses = {
    cyan: 'hover:border-[#00d4ff]/40 hover:shadow-[0_0_30px_-5px_rgba(0,212,255,0.2)]',
    purple: 'hover:border-[#7c3aed]/50 hover:shadow-[0_0_30px_-5px_rgba(124,58,237,0.25)]',
    green: 'hover:border-[#10b981]/40 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.2)]',
    amber: 'hover:border-[#f59e0b]/40 hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.2)]',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={hoverEffect ? { y: -4, transition: { duration: 0.2 } } : undefined}
      className={cn(
        'relative rounded-2xl bg-[#090e24]/75 backdrop-blur-xl border border-white/[0.05] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)] transition-all duration-300 overflow-hidden group',
        hoverEffect && glowHoverClasses[glowColor],
        className
      )}
    >
      {/* Subtle directional top highlight */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none" />
      {children}
    </motion.div>
  );
}

export default GlassCard;
