'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';

const NAV_ITEMS = [
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            className={`flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-300 ${
              scrolled
                ? 'bg-[#050812]/85 backdrop-blur-xl border border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
                : 'bg-transparent border border-transparent'
            }`}
          >
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#00d4ff]/20 to-[#7c3aed]/20 border border-[#00d4ff]/40 shadow-[0_0_15px_rgba(0,212,255,0.25)] transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]">
                <Image
                  src="/sorazen-logo.svg"
                  alt="SoraZen"
                  width={24}
                  height={24}
                  className="transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <span className="font-syne font-extrabold text-xl tracking-tight transition-transform duration-300">
                <span className="text-white">Sora</span>
                <span className="text-[#00d4ff]">Zen</span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.05] rounded-full px-4 py-1.5 backdrop-blur-md">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-white/10 rounded-full border border-white/[0.08]"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                href="/contact"
                size="sm"
                variant="primary"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Start a Project
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-40 md:hidden rounded-2xl bg-[#090e24]/95 backdrop-blur-2xl border border-white/[0.06] p-6 shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-lg font-medium py-2 border-b border-white/[0.04] transition-colors ${
                    pathname === item.href ? 'text-[#00d4ff]' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-2">
                <Button
                  href="/contact"
                  size="md"
                  variant="primary"
                  className="w-full justify-center"
                  onClick={() => setMobileMenuOpen(false)}
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Start a Project
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
