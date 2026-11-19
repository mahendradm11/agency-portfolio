'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Globe,
  Server,
  Cpu,
  Database,
  CheckCircle2,
  Terminal,
} from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

const STATS = [
  { value: '50+', label: 'Projects Shipped' },
  { value: '30+', label: 'Enterprise Clients' },
  { value: '5+', label: 'Years Experience' },
  { value: '99%', label: 'Client Satisfaction' },
];

const SERVICES = [
  {
    icon: Globe,
    tag: '01',
    title: 'Web Engineering',
    desc: 'Crafting responsive, lightning-fast web applications with modern component design systems and pixel-perfect fidelity.',
    accent: '#00d4ff',
    glow: 'cyan' as const,
    href: '/services',
  },
  {
    icon: Server,
    tag: '02',
    title: 'REST API & Backend',
    desc: 'Robust, production-grade APIs engineered with strict contracts, automated documentation, and bulletproof auth.',
    accent: '#7c3aed',
    glow: 'purple' as const,
    href: '/services',
  },
  {
    icon: Cpu,
    tag: '03',
    title: 'Microservices & Events',
    desc: 'Decomposing complex monoliths into resilient, independently deployable services powered by Kafka & Docker.',
    accent: '#10b981',
    glow: 'green' as const,
    href: '/services',
  },
  {
    icon: Database,
    tag: '04',
    title: 'Database Architecture',
    desc: 'Schema design, compound indexing, and multi-tier Redis caching layers for mission-critical relational and NoSQL data.',
    accent: '#f59e0b',
    glow: 'amber' as const,
    href: '/services',
  },
];

const PROJECTS = [
  {
    id: 'trading-platform',
    tag: 'FinTech · Real-Time',
    title: 'High-Frequency Trading Platform',
    desc: 'Low-latency trading engine handling live WebSocket candlestick feeds, portfolio analytics, and automated order execution under heavy market volume.',
    tech: ['Spring Boot', 'Next.js', 'WebSocket', 'Kafka', 'Redis', 'PostgreSQL'],
    stat: '<80ms execution latency',
    color: '#00d4ff',
    glow: 'cyan' as const,
  },
  {
    id: 'crop-recommendation',
    tag: 'AgriTech · Machine Learning',
    title: 'Predictive Crop Recommendation Engine',
    desc: 'Machine learning platform synthesizing soil nutrients, rainfall forecasts, and historical crop yields to optimize agricultural output.',
    tech: ['Python', 'XGBoost', 'FastAPI', 'Next.js', 'PostgreSQL'],
    stat: '91.4% predictive accuracy',
    color: '#10b981',
    glow: 'green' as const,
  },
];

const CODE_LINES = [
  { color: '#7c3aed', text: 'class SoraZenSolutions {' },
  { color: '#00d4ff', text: '  stack = [' },
  { color: 'rgba(255,255,255,0.6)', text: '    "Next.js", "React",' },
  { color: 'rgba(255,255,255,0.6)', text: '    "Spring Boot", "Kafka",' },
  { color: 'rgba(255,255,255,0.6)', text: '    "Microservices", "Python ML",' },
  { color: '#00d4ff', text: '  ];' },
  { color: 'transparent', text: '' },
  { color: '#10b981', text: '  async build(productIdea) {' },
  { color: 'rgba(255,255,255,0.6)', text: '    const solution = await' },
  { color: 'rgba(255,255,255,0.6)', text: '      this.architect(productIdea);' },
  { color: '#f59e0b', text: '    return solution.deploy();' },
  { color: '#10b981', text: '  }' },
  { color: '#7c3aed', text: '}' },
];

export default function HomeView() {
  const [activeService, setActiveService] = useState<number | null>(null);

  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* ── 1. HERO SECTION (2-COLUMN BALANCED GRID) ─────────────── */}
      <section className="relative pt-6 sm:pt-14 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & Action Buttons */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/25 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#00d4ff] animate-pulse" />
                <span className="font-mono text-xs text-[#00d4ff] tracking-wider uppercase font-semibold">
                  AVAILABLE FOR PROJECTS
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-syne font-extrabold text-3xl sm:text-5xl lg:text-[3.5rem] tracking-tight text-white leading-[1.12]"
            >
              We Build{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]">
                Intelligent
              </span>{' '}
              Digital Solutions
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-400 text-base sm:text-lg font-sans leading-relaxed max-w-xl"
            >
              SoraZen crafts scalable, modern software — from reactive frontends to distributed backend architectures — tailored for the products of tomorrow.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Button
                href="/services"
                size="lg"
                variant="primary"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Get Started
              </Button>
              <Button
                href="/projects"
                size="lg"
                variant="secondary"
              >
                View Projects
              </Button>
            </motion.div>
          </div>

          {/* Right Column: Interactive Code Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-2xl bg-gradient-to-br from-[#00d4ff]/[0.05] to-[#7c3aed]/[0.05] border border-white/[0.08] p-6 sm:p-7 backdrop-blur-xl shadow-2xl overflow-hidden">
              {/* Terminal Titlebar */}
              <div className="flex items-center gap-2 mb-5 pb-3 border-b border-white/[0.05]">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="font-mono text-xs text-slate-500 ml-auto">sorazen.dev</span>
              </div>

              {/* Code Lines */}
              <div className="space-y-1 font-mono text-xs sm:text-[13px] leading-relaxed">
                {CODE_LINES.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 + i * 0.04 }}
                    style={{ color: line.color, minHeight: line.text ? undefined : '0.75rem' }}
                  >
                    {line.text}
                  </motion.div>
                ))}
              </div>

              {/* Blinking Terminal Cursor */}
              <div className="inline-block w-2 h-4 bg-[#00d4ff] animate-pulse mt-2 rounded-[1px]" />

              {/* Ambient terminal corner glow */}
              <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-[#7c3aed]/20 blur-2xl pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. METRICS STRIP ─────────────────────────────────────── */}
      <section className="border-y border-white/[0.05] py-10 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="space-y-1"
              >
                <div className="font-syne font-extrabold text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]">
                  {s.value}
                </div>
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. CORE SERVICES SECTION (2-COLUMN BALANCED) ─────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <div className="font-mono text-xs text-[#00d4ff] tracking-widest uppercase font-semibold">
              // What We Do
            </div>
            <h2 className="font-syne font-bold text-2xl sm:text-4xl text-white tracking-tight">
              Our Core Services
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-medium text-[#00d4ff] bg-[#00d4ff]/10 border border-[#00d4ff]/25 hover:bg-[#00d4ff]/20 transition-all self-start sm:self-auto"
          >
            <span>View All Services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 2-Column Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onMouseEnter={() => setActiveService(i)}
                onMouseLeave={() => setActiveService(null)}
                className="relative p-7 sm:p-8 rounded-2xl bg-[#090e24]/70 backdrop-blur-xl border border-white/[0.05] transition-all duration-300 hover:border-white/[0.12] overflow-hidden group"
              >
                {/* Header: Matching Icon Beside the Title */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border border-white/[0.08] transition-transform duration-300 group-hover:scale-105"
                    style={{
                      backgroundColor: `${svc.accent}15`,
                      color: svc.accent,
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-syne font-bold text-xl text-white tracking-tight">
                    {svc.title}
                  </h3>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed font-sans mb-5">
                  {svc.desc}
                </p>

                <Link
                  href={svc.href}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-medium transition-colors"
                  style={{ color: svc.accent }}
                >
                  <span>Explore capability</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                {/* Bottom active hover glow line */}
                {activeService === i && (
                  <div
                    className="absolute bottom-0 inset-x-0 h-[2px]"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${svc.accent}, transparent)`,
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── 4. FEATURED PROJECTS SECTION (2-COLUMN BALANCED) ──────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <div className="font-mono text-xs text-[#7c3aed] tracking-widest uppercase font-semibold">
              // Our Work
            </div>
            <h2 className="font-syne font-bold text-2xl sm:text-4xl text-white tracking-tight">
              Featured Case Studies
            </h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-medium text-[#c084fc] bg-[#7c3aed]/10 border border-[#7c3aed]/25 hover:bg-[#7c3aed]/20 transition-all self-start sm:self-auto"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 2-Column Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((proj, i) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -4 }}
              className="relative p-7 sm:p-8 rounded-2xl bg-[#090e24]/70 backdrop-blur-xl border border-white/[0.05] hover:border-white/[0.12] transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              {/* Top Accent Line */}
              <div
                className="absolute top-0 inset-x-0 h-[2px]"
                style={{
                  background: `linear-gradient(90deg, transparent, ${proj.color}, transparent)`,
                }}
              />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs font-mono px-2.5 py-0.5 rounded-full border font-semibold uppercase tracking-wider"
                    style={{
                      color: proj.color,
                      borderColor: `${proj.color}40`,
                      backgroundColor: `${proj.color}15`,
                    }}
                  >
                    {proj.tag}
                  </span>
                  <span className="text-xs font-mono text-[#10b981] font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                    {proj.stat}
                  </span>
                </div>

                <h3 className="font-syne font-bold text-2xl text-white tracking-tight">
                  {proj.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed font-sans">
                  {proj.desc}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {proj.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.05] text-xs font-mono text-slate-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-medium hover:underline"
                  style={{ color: proj.color }}
                >
                  <span>Read case study breakdown</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Ambient bottom corner blur */}
              <div
                className="absolute -bottom-8 -right-8 w-28 h-28 rounded-full blur-2xl pointer-events-none"
                style={{ backgroundColor: `${proj.color}18` }}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 5. BOTTOM CALL TO ACTION BANNER ──────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-br from-[#090e24]/90 via-[#0a102d]/70 to-[#050812]/90 border border-white/[0.06] backdrop-blur-2xl text-center space-y-6">
          <div className="font-mono text-xs text-[#00d4ff] tracking-widest uppercase font-semibold">
            // Ready to Start?
          </div>
          <h2 className="font-syne font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Let's scope your project
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto font-sans leading-relaxed">
            Have an upcoming build, API integration, or microservices refactoring? Book a discovery sprint with our engineering team.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Button
              href="/contact"
              size="lg"
              variant="primary"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Get Started
            </Button>
            <a
              href="https://wa.me/919353227875"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-sans font-semibold rounded-xl text-sm px-6 py-3 gap-2 bg-[#10b981]/15 hover:bg-[#10b981]/25 text-[#10b981] border border-[#10b981]/30 transition-all"
            >
              <span>Chat on WhatsApp</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
