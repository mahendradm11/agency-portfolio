'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Cpu, TrendingUp, Layers, Terminal } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import GlassCard from '@/components/ui/GlassCard';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

const CATEGORIES = [
  { id: 'all', label: 'All Projects' },
  { id: 'fullstack', label: 'Full-Stack Platforms' },
  { id: 'ml', label: 'AI & Data Engineering' },
  { id: 'distributed', label: 'Distributed Systems' },
];

const PROJECTS = [
  {
    id: 'trading-platform',
    title: 'High-Frequency Trading & Analytics',
    category: 'fullstack',
    tag: 'FinTech · Real-Time',
    tagline: 'Sub-80ms order execution engine with live WebSocket ticker feeds.',
    color: '#00d4ff',
    glow: 'cyan' as const,
    duration: '5 Months',
    status: 'In Production',
    desc: 'An enterprise-grade equity trading infrastructure handling concurrent WebSocket streaming, portfolio analytics, and automated order settlement.',
    challenge:
      'Handling 10,000+ simultaneous WebSocket subscriptions with sub-100ms order execution and zero slippage or state desynchronization.',
    solution:
      'Designed an event-driven architecture using Kafka for transaction queuing, Redis in-memory caches for real-time order book depth, and resilient Spring Boot services. The UI uses Next.js with optimistic state updates.',
    metrics: [
      { value: '<80ms', label: 'Order Execution Latency' },
      { value: '10K+', label: 'Concurrent WebSocket Clients' },
      { value: '99.97%', label: 'Production Uptime' },
      { value: '2M+', label: 'Trades Settled' },
    ],
    tech: ['Spring Boot', 'Next.js', 'WebSocket', 'Kafka', 'Redis', 'PostgreSQL', 'Docker', 'AWS'],
    features: [
      'Interactive candlestick charts with live market depth feeds',
      'Instantaneous multi-asset limit and market order execution',
      'Real-time P&L calculator and risk limit monitoring',
      'Hardware-level audit trails and regulatory trade export',
    ],
  },
  {
    id: 'crop-recommendation',
    title: 'Precision AgriTech Recommendation Engine',
    category: 'ml',
    tag: 'AgriTech · Machine Learning',
    tagline: 'Predictive soil composition & climate yield optimization models.',
    color: '#10b981',
    glow: 'green' as const,
    duration: '3 Months',
    status: 'In Production',
    desc: 'An automated machine learning platform analyzing soil NPK levels, rainfall trends, and historical output to recommend optimal planting schedules.',
    challenge:
      'Aggregating noisy, fragmented climate sensors and disparate agronomic datasets into a resilient, low-latency prediction pipeline.',
    solution:
      'Trained a gradient-boosted ensemble across 50,000+ geological coordinates. Packaged into a high-throughput FastAPI inference microservice with automated data ingestion from public climate satellites.',
    metrics: [
      { value: '91.4%', label: 'Recommendation Accuracy' },
      { value: '50K+', label: 'Training Samples Analyzed' },
      { value: '+32%', label: 'Average Crop Yield Increase' },
      { value: '1,200+', label: 'Farmers Onboarded' },
    ],
    tech: ['Python', 'XGBoost', 'scikit-learn', 'FastAPI', 'Next.js', 'PostgreSQL', 'Pandas', 'Docker'],
    features: [
      'NPK, pH, and soil moisture chemical analysis model',
      'Real-time weather API synchronization and drought warning alerts',
      'Confidence score ranking across 20+ regional crop varieties',
      'Multi-lingual responsive interface designed for low-bandwidth devices',
    ],
  },
  {
    id: 'telemetry-stream',
    title: 'Distributed Log & Telemetry Pipeline',
    category: 'distributed',
    tag: 'Cloud Infrastructure · DevOps',
    tagline: 'Zero-loss ingestion processing over 50M daily events with Elasticsearch.',
    color: '#7c3aed',
    glow: 'purple' as const,
    duration: '4 Months',
    status: 'Enterprise Deployed',
    desc: 'A unified observability and log aggregation pipeline designed to ingest, parse, and index distributed microservice logs in near real-time.',
    challenge:
      'Handling sudden 10x traffic bursts from multi-region microservices without memory exhaustion or log packet drops.',
    solution:
      'Implemented distributed Kafka partitioning with dead-letter queue recovery, Vector log collectors, and clustered Elasticsearch storage with automated ILM retention.',
    metrics: [
      { value: '50M+', label: 'Daily Events Ingested' },
      { value: '99.99%', label: 'Packet Ingestion Reliability' },
      { value: '<2s', label: 'End-to-End Query Availability' },
      { value: '45%', label: 'Infrastructure Cost Saved' },
    ],
    tech: ['Kafka', 'Elasticsearch', 'Docker', 'Kubernetes', 'Go', 'Grafana', 'Prometheus'],
    features: [
      'Automated schema parsing and PII redaction on ingest',
      'Elasticsearch index lifecycle management (ILM) policies',
      'Anomaly detection alerts hooked into Slack and PagerDuty',
      'High-cardinality distributed trace correlation',
    ],
  },
];

export default function ProjectsView() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects =
    activeCategory === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <SectionHeader
        badge="Case Studies"
        badgeVariant="cyan"
        title="Proven engineering results delivered for"
        highlight="demanding workloads."
        description="A selection of high-concurrency systems, machine learning engines, and distributed architectures we have conceived, engineered, and shipped."
        centered
      />

      {/* Category Filter Pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-16">
        {CATEGORIES.map((c) => {
          const isActive = activeCategory === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`text-xs px-4 py-2 rounded-xl font-medium transition-all duration-200 border ${
                isActive
                  ? 'bg-gradient-to-r from-[#00d4ff]/20 to-[#7c3aed]/20 text-white border-[#00d4ff]/60 shadow-[0_0_15px_rgba(0,212,255,0.2)]'
                  : 'bg-white/[0.03] text-slate-400 border-white/[0.05] hover:border-white/[0.1] hover:text-white'
              }`}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      {/* Projects List */}
      <div className="space-y-12">
        {filteredProjects.map((project) => (
          <GlassCard
            key={project.id}
            glowColor={project.glow}
            className="p-8 sm:p-12"
          >
            <div className="space-y-8">
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.04] pb-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs font-mono px-2 py-0.5 rounded border font-semibold"
                      style={{
                        color: project.color,
                        borderColor: `${project.color}40`,
                        backgroundColor: `${project.color}15`,
                      }}
                    >
                      {project.tag}
                    </span>
                    <span className="text-xs font-mono text-slate-400">· {project.duration}</span>
                  </div>
                  <h3 className="font-syne font-extrabold text-2xl sm:text-3xl text-white">
                    {project.title}
                  </h3>
                  <p className="text-sm font-sans text-slate-400">{project.tagline}</p>
                </div>

                <div className="shrink-0">
                  <Button
                    href="/contact"
                    variant="glass"
                    size="sm"
                    icon={<ArrowUpRight className="w-4 h-4" />}
                  >
                    Build Similar Architecture
                  </Button>
                </div>
              </div>

              {/* Metrics Showcase */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {project.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] text-center space-y-1"
                  >
                    <p
                      className="font-syne font-extrabold text-2xl sm:text-3xl"
                      style={{ color: project.color }}
                    >
                      {m.value}
                    </p>
                    <p className="text-xs font-mono text-slate-400">{m.label}</p>
                  </div>
                ))}
              </div>

              {/* Challenge vs Architecture Solution Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="p-5 rounded-2xl bg-[#050812]/70 border border-white/[0.05] space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-rose-400 font-semibold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                    The Architectural Challenge
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed font-sans">
                    {project.challenge}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#050812]/70 border border-white/[0.05] space-y-2">
                  <h4
                    className="text-xs font-mono uppercase tracking-wider font-semibold flex items-center gap-2"
                    style={{ color: project.color }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: project.color }}
                    />
                    Engineered Solution
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed font-sans">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Tech Badges & Key Features */}
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <Badge key={t} variant="neutral">
                      {t}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {project.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2
                        className="w-3.5 h-3.5 shrink-0"
                        style={{ color: project.color }}
                      />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
