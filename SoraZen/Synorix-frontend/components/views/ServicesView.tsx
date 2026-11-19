'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, Layers, Cpu, Database, Globe, Zap, ShieldCheck } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import GlassCard from '@/components/ui/GlassCard';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

const SERVICES = [
  {
    id: 'web-dev',
    tag: '01',
    icon: Globe,
    title: 'Full-Stack Web Engineering',
    tagline: 'Pixel-perfect, hyper-optimized digital products that convert.',
    color: '#00d4ff',
    glow: 'cyan' as const,
    stat: { value: '40+', label: 'Web Platforms Shipped' },
    desc: 'We engineer end-to-end web applications with Next.js, React, and TypeScript. Designed for sub-second page loads, responsive accessibility, and robust enterprise scale.',
    features: [
      'Server-Side Rendering (SSR) & Static Site Generation (SSG)',
      'Design System Architecture & Atomic UI Components',
      'Core Web Vitals Optimization (95+ Lighthouse scores)',
      'Progressive Web App (PWA) & Offline-First capabilities',
      'Automated CI/CD deployment pipelines',
      'Enterprise-grade SEO & Structured Meta Schemas',
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Node.js'],
    process: [
      { step: '01. Discovery', desc: 'User persona analysis, UX flows, and benchmark technical requirements.' },
      { step: '02. System Architecture', desc: 'Component design tokens, state management paradigms, and API contracts.' },
      { step: '03. Agile Sprints', desc: 'Bi-weekly builds with automated test suites and live demo staging environments.' },
      { step: '04. Production Launch', desc: 'Edge CDN distribution, telemetry tracking, and zero-downtime deployment.' },
    ],
  },
  {
    id: 'rest-api',
    tag: '02',
    icon: Zap,
    title: 'High-Throughput REST APIs',
    tagline: 'Documented, secure, and versioned APIs ready for high concurrency.',
    color: '#7c3aed',
    glow: 'purple' as const,
    stat: { value: '25M+', label: 'API Requests / Day' },
    desc: 'Architecting resilient backend services and RESTful APIs with developer ergonomics, strict type safety, predictable serialization, and defense-in-depth security.',
    features: [
      'OpenAPI 3.0 & Swagger interactive contract documentation',
      'OAuth2, JWT, and Role-Based Access Control (RBAC)',
      'Token bucket rate-limiting, IP throttling, and DDoS resilience',
      'Consistent API versioning and deprecation lifecycles',
      'Keyset pagination, multi-field filtering, and sparse fieldsets',
      'Structured telemetry logging and error tracing',
    ],
    tech: ['Node.js', 'Express', 'Spring Boot', 'FastAPI', 'Redis', 'Postman'],
    process: [
      { step: '01. Contract Definition', desc: 'Specifying strict input/output schemas before writing implementation code.' },
      { step: '02. Security & Auth', desc: 'Configuring cryptographic tokens, header protections, and permission scopes.' },
      { step: '03. Performance Tuning', desc: 'In-memory caching with Redis and database query optimization.' },
      { step: '04. Automated Docs', desc: 'Interactive developer sandbox portals for seamless client SDK generation.' },
    ],
  },
  {
    id: 'microservices',
    tag: '03',
    icon: Cpu,
    title: 'Microservices & Distributed Systems',
    tagline: 'Decompose monoliths into fault-tolerant, independently deployable services.',
    color: '#10b981',
    glow: 'green' as const,
    stat: { value: '99.98%', label: 'Average Production Uptime' },
    desc: 'Decoupling heavy monolithic architectures into agile, containerized microservices that communicate over event buses and scale elastically under traffic spikes.',
    features: [
      'Asynchronous event-driven architecture using Kafka & RabbitMQ',
      'Docker containerization and Kubernetes cluster orchestration',
      'Resilient circuit breaker patterns and self-healing fallbacks',
      'Centralized secret management and configuration servers',
      'Distributed tracing and APM performance monitoring',
      'Blue-green and canary deployment strategies',
    ],
    tech: ['Docker', 'Kubernetes', 'Kafka', 'Spring Boot', 'Go', 'AWS'],
    process: [
      { step: '01. Domain Decomposition', desc: 'Mapping bounded contexts to identify clean service isolation boundaries.' },
      { step: '02. Event Mesh', desc: 'Deploying high-throughput pub/sub brokers for asynchronous messaging.' },
      { step: '03. Containerization', desc: 'Creating multi-stage Docker builds and Kubernetes deployment manifests.' },
      { step: '04. Telemetry', desc: 'Unified Prometheus and Grafana dashboards for health monitoring.' },
    ],
  },
  {
    id: 'database',
    tag: '04',
    icon: Database,
    title: 'Database Architecture & Tuning',
    tagline: 'Zero-loss data modeling, indexing, and multi-region replication.',
    color: '#f59e0b',
    glow: 'amber' as const,
    stat: { value: '5x', label: 'Average Query Latency Reduction' },
    desc: 'From schema normalization to complex multi-layer caching topologies, we optimize relational and NoSQL databases to handle high-frequency reads and writes.',
    features: [
      'Data modeling and normalization for PostgreSQL and MongoDB',
      'Compound index optimization and EXPLAIN ANALYZE tuning',
      'Multi-tier caching strategies with Redis and memory clusters',
      'Automated schema migration pipelines and rollbacks',
      'Read-replica synchronization and database failover strategies',
      'Compliance-ready automated backups and encryption at rest',
    ],
    tech: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma', 'Mongoose', 'ElasticSearch'],
    process: [
      { step: '01. Query Profiling', desc: 'Isolating slow transactions, table locks, and inefficient queries.' },
      { step: '02. Schema Refactoring', desc: 'Normalizing redundant data structures and establishing compound indexes.' },
      { step: '03. Cache Invalidation', desc: 'Designing write-through and cache-aside layers for hotspot mitigation.' },
      { step: '04. Continuous Tuning', desc: 'Connection pool right-sizing and real-time query latency alerting.' },
    ],
  },
];

export default function ServicesView() {
  const [activeTab, setActiveTab] = useState(0);
  const currentService = SERVICES[activeTab];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <SectionHeader
        badge="Engineering Capabilities"
        badgeVariant="cyan"
        title="Bespoke software architecture engineered for"
        highlight="extreme resilience."
        description="We don't do cookie-cutter templates. Every system we ship is precision-engineered from first principles for performance, maintainability, and enterprise scale."
        centered
      />

      {/* Service Selector Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-16">
        {SERVICES.map((s, index) => {
          const isSelected = activeTab === index;
          const Icon = s.icon;
          return (
            <button
              key={s.id}
              onClick={() => setActiveTab(index)}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl font-syne font-bold text-sm transition-all duration-300 border ${
                isSelected
                  ? 'bg-gradient-to-r from-white/[0.08] to-white/[0.03] text-white border-white/[0.1] shadow-lg'
                  : 'bg-[#090e24]/40 text-slate-400 border-white/[0.05] hover:border-white/[0.1] hover:text-white'
              }`}
              style={{
                borderColor: isSelected ? `${s.color}60` : undefined,
                boxShadow: isSelected ? `0 0 25px -5px ${s.color}35` : undefined,
              }}
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor: `${s.color}20`,
                  color: s.color,
                }}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span>{s.title}</span>
            </button>
          );
        })}
      </div>

      {/* Active Service Showcase */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentService.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="space-y-12"
        >
          {/* Main Hero Card for Selected Service */}
          <GlassCard glowColor={currentService.glow} className="p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span
                    className="font-mono text-xs px-2.5 py-1 rounded-md border font-semibold"
                    style={{
                      color: currentService.color,
                      borderColor: `${currentService.color}40`,
                      backgroundColor: `${currentService.color}15`,
                    }}
                  >
                    SERVICE {currentService.tag}
                  </span>
                  <span className="text-xs font-mono text-slate-400">{currentService.tagline}</span>
                </div>
                <h3 className="font-syne font-extrabold text-2xl sm:text-4xl text-white">
                  {currentService.title}
                </h3>
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-sans">
                  {currentService.desc}
                </p>

                {/* Tech Badges */}
                <div className="pt-2 flex flex-wrap gap-2">
                  {currentService.tech.map((t) => (
                    <Badge key={t} variant="neutral">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Stat Highlight Card */}
              <div className="lg:col-span-4 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-2 text-center lg:text-left">
                <p className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Performance Metric
                </p>
                <p
                  className="font-syne font-extrabold text-4xl sm:text-5xl"
                  style={{ color: currentService.color }}
                >
                  {currentService.stat.value}
                </p>
                <p className="text-sm text-slate-300 font-medium">{currentService.stat.label}</p>
                <div className="pt-4">
                  <Button
                    href="/contact"
                    size="sm"
                    variant="primary"
                    className="w-full justify-center"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Request Proposal
                  </Button>
                </div>
              </div>
            </div>

            {/* Core Features Grid */}
            <div className="mt-12 pt-8 border-t border-white/[0.06]">
              <h4 className="font-syne font-bold text-lg text-white mb-6">
                Key Architectural Deliverables
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentService.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] transition-colors"
                  >
                    <CheckCircle
                      className="w-4 h-4 shrink-0 mt-0.5"
                      style={{ color: currentService.color }}
                    />
                    <span className="text-sm text-slate-300 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* 4-Step Execution Process */}
          <div className="space-y-6">
            <h3 className="font-syne font-extrabold text-2xl text-white text-center">
              Our 4-Stage Execution Methodology
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {currentService.process.map((p, idx) => (
                <GlassCard
                  key={p.step}
                  glowColor={currentService.glow}
                  hoverEffect={false}
                  className="p-6 space-y-2"
                >
                  <p
                    className="font-mono text-xs font-bold uppercase tracking-wider"
                    style={{ color: currentService.color }}
                  >
                    {p.step}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
