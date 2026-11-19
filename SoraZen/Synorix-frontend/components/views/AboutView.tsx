'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Code2, Zap, Rocket, Terminal, CheckCircle2, ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import GlassCard from '@/components/ui/GlassCard';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

const VALUES = [
  {
    icon: Code2,
    title: 'First-Principles Engineering',
    desc: 'We do not rely on bloated templates or superficial shortcuts. Every system is conceived from the database schema up to guarantee maximum throughput and maintainability.',
    color: '#00d4ff',
    glow: 'cyan' as const,
  },
  {
    icon: Zap,
    title: 'Uncompromising Performance',
    desc: 'From sub-80ms API latencies to 95+ Core Web Vitals, speed is treated as a fundamental feature, not an afterthought.',
    color: '#7c3aed',
    glow: 'purple' as const,
  },
  {
    icon: ShieldCheck,
    title: 'Zero-Downtime Reliability',
    desc: 'Distributed systems built with circuit breakers, idempotent retry patterns, and automated failover to survive real-world traffic storms.',
    color: '#10b981',
    glow: 'green' as const,
  },
  {
    icon: Rocket,
    title: 'Rapid Iterative Delivery',
    desc: 'We operate in 2-week agile sprints with staged demo environments, giving stakeholders full transparency into code quality and milestones.',
    color: '#f59e0b',
    glow: 'amber' as const,
  },
];

const STACK_CATEGORIES = [
  {
    title: 'Frontend & Edge',
    technologies: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel Edge'],
  },
  {
    title: 'Backend & APIs',
    technologies: ['Node.js', 'Express', 'Spring Boot', 'FastAPI', 'RESTful OpenAPI', 'GraphQL'],
  },
  {
    title: 'Distributed & Data',
    technologies: ['PostgreSQL', 'MongoDB', 'Redis', 'Apache Kafka', 'Elasticsearch', 'Docker'],
  },
];

export default function AboutView() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <SectionHeader
        badge="About SoraZen"
        badgeVariant="purple"
        title="We build digital infrastructure that"
        highlight="scales without breaking."
        description="SoraZen is a boutique software engineering studio based out of Bengaluru, India. We partner with visionary tech founders and engineering leaders to design, build, and deploy mission-critical software."
        centered
      />

      {/* Core Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
        {VALUES.map((val) => {
          const Icon = val.icon;
          return (
            <GlassCard key={val.title} glowColor={val.glow} className="p-8">
              <div className="space-y-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/[0.06]"
                  style={{
                    backgroundColor: `${val.color}15`,
                    color: val.color,
                  }}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-syne font-bold text-xl text-white">{val.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-sans">{val.desc}</p>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Technology Mastery Section */}
      <div className="rounded-3xl bg-[#090e24]/70 border border-white/[0.05] p-8 sm:p-12 mb-20 backdrop-blur-xl">
        <div className="max-w-2xl mb-8 space-y-2">
          <Badge variant="cyan" dot>
            Production Stack
          </Badge>
          <h3 className="font-syne font-extrabold text-2xl sm:text-3xl text-white">
            Our Battle-Tested Technology Arsenal
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed font-sans">
            We intentionally curate our stack around tools with strong type safety, massive ecosystem support, and demonstrated longevity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STACK_CATEGORIES.map((cat) => (
            <div key={cat.title} className="space-y-4">
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#00d4ff]">
                {cat.title}
              </h4>
              <div className="space-y-2">
                {cat.technologies.map((tech) => (
                  <div
                    key={tech}
                    className="flex items-center gap-2 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05] text-xs text-slate-300 font-mono"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action Banner */}
      <GlassCard glowColor="cyan" className="p-8 sm:p-12 text-center max-w-4xl mx-auto">
        <div className="space-y-4">
          <Badge variant="green" dot>
            Ready to Collaborate
          </Badge>
          <h3 className="font-syne font-extrabold text-2xl sm:text-4xl text-white">
            Have a project in mind?
          </h3>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto font-sans leading-relaxed">
            Let's evaluate your roadmap, estimate implementation timelines, and build a system that stands out.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Button
              href="/contact"
              size="lg"
              variant="primary"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Start Your Project
            </Button>
            <Button
              href="/projects"
              size="lg"
              variant="secondary"
            >
              Explore Case Studies
            </Button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
