import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'purple' | 'green' | 'amber' | 'neutral';
  className?: string;
  dot?: boolean;
}

export function Badge({
  children,
  variant = 'cyan',
  className,
  dot = false,
}: BadgeProps) {
  const variantStyles = {
    cyan: 'bg-[#00d4ff]/10 text-[#00d4ff] border-[#00d4ff]/20',
    purple: 'bg-[#7c3aed]/10 text-[#c084fc] border-[#7c3aed]/20',
    green: 'bg-[#10b981]/10 text-[#34d399] border-[#10b981]/20',
    amber: 'bg-[#f59e0b]/10 text-[#fbbf24] border-[#f59e0b]/20',
    neutral: 'bg-white/[0.03] text-slate-300 border-white/[0.06]',
  };

  const dotColors = {
    cyan: 'bg-[#00d4ff]',
    purple: 'bg-[#a855f7]',
    green: 'bg-[#10b981]',
    amber: 'bg-[#f59e0b]',
    neutral: 'bg-slate-400',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono tracking-wide border backdrop-blur-md transition-all duration-300',
        variantStyles[variant],
        className
      )}
    >
      {dot && (
        <span className={cn('w-1.5 h-1.5 rounded-full animate-pulse', dotColors[variant])} />
      )}
      {children}
    </span>
  );
}

export default Badge;
