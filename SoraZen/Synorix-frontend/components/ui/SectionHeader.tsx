import React from 'react';
import { cn } from '@/lib/utils';
import Badge from '@/components/ui/Badge';

interface SectionHeaderProps {
  badge?: string;
  badgeVariant?: 'cyan' | 'purple' | 'green' | 'amber';
  title: string;
  highlight?: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({
  badge,
  badgeVariant = 'cyan',
  title,
  highlight,
  description,
  centered = false,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'space-y-4 max-w-3xl mb-12',
        centered && 'mx-auto text-center',
        className
      )}
    >
      {badge && (
        <div>
          <Badge variant={badgeVariant} dot>
            {badge}
          </Badge>
        </div>
      )}
      <h2 className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.15]">
        {title}{' '}
        {highlight && (
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]">
            {highlight}
          </span>
        )}
      </h2>
      {description && (
        <p className="text-slate-400 text-base sm:text-lg leading-relaxed font-sans">
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionHeader;
