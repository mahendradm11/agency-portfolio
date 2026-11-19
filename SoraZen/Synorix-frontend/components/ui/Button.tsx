import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glass' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  icon,
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    'relative inline-flex items-center justify-center font-sans font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#050812] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none group';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white shadow-[0_0_20px_-3px_rgba(0,212,255,0.4)] hover:shadow-[0_0_28px_0_rgba(124,58,237,0.5)] hover:brightness-110 focus:ring-[#00d4ff]',
    secondary:
      'bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/[0.08] hover:border-white/[0.15] backdrop-blur-md focus:ring-white/20',
    glass:
      'bg-[#0a0f24]/80 hover:bg-[#0f1738] text-slate-200 border border-white/[0.06] hover:border-[#00d4ff]/40 shadow-sm hover:shadow-[0_0_15px_rgba(0,212,255,0.2)] focus:ring-[#00d4ff]',
    outline:
      'bg-transparent hover:bg-white/[0.04] text-slate-300 hover:text-white border border-white/[0.08] hover:border-white/[0.18] focus:ring-white/20',
  };

  const combinedClasses = cn(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    className
  );

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
        {icon && <span className="transition-transform group-hover:translate-x-0.5">{icon}</span>}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
      {icon && <span className="transition-transform group-hover:translate-x-0.5">{icon}</span>}
    </button>
  );
}

export default Button;
