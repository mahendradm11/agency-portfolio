import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.05] bg-[#03050c]/90 backdrop-blur-md pt-16 pb-12 overflow-hidden z-10">
      {/* Subtle top ambient line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-br from-[#00d4ff]/20 to-[#7c3aed]/20 border border-[#00d4ff]/30 shadow-[0_0_12px_rgba(0,212,255,0.2)] transition-all">
                <Image
                  src="/sorazen-logo.svg"
                  alt="SoraZen"
                  width={20}
                  height={20}
                />
              </div>
              <span className="font-syne font-extrabold text-xl tracking-tight">
                <span className="text-white">Sora</span>
                <span className="text-[#00d4ff]">Zen</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Engineering high-scale web platforms, distributed microservices, and AI-driven systems with obsessive craft and precision.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs font-mono text-slate-400">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]"></span>
              </span>
              <span>Available for select client partnerships</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link href="/services" className="hover:text-[#00d4ff] transition-colors">
                  Services & Architecture
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[#00d4ff] transition-colors">
                  Featured Case Studies
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#00d4ff] transition-colors">
                  About the Studio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#00d4ff] transition-colors">
                  Contact & Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
              Studio
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-4 h-4 text-[#00d4ff]" />
                <span>Bengaluru, India · Remote Global</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#7c3aed]" />
                <a
                  href="mailto:hello@sorazen.io"
                  className="hover:text-[#00d4ff] transition-colors"
                >
                  hello@sorazen.io
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919353227875"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[#10b981] hover:underline"
                >
                  <span>Chat on WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>© {new Date().getFullYear()} SoraZen Studio. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 transition-colors">Next.js Fullstack</span>
            <span className="hover:text-slate-300 transition-colors">Zero-Downtime Infrastructure</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
