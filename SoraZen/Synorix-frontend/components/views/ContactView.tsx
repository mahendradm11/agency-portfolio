'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Clock, ChevronDown, MessageSquare, ArrowUpRight } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import GlassCard from '@/components/ui/GlassCard';
import ContactForm from '@/components/forms/ContactForm';

const CONTACT_CARDS = [
  {
    icon: Mail,
    label: 'Email Inquiries',
    value: 'hello@sorazen.io',
    sub: 'Technical responses within 24h',
    href: 'mailto:hello@sorazen.io',
    glow: 'cyan' as const,
    color: '#00d4ff',
  },
  {
    icon: MapPin,
    label: 'Studio Headquarters',
    value: 'Bengaluru, India',
    sub: 'Available globally · Remote-first',
    href: undefined,
    glow: 'purple' as const,
    color: '#7c3aed',
  },
  {
    icon: Clock,
    label: 'Working Hours',
    value: 'Mon – Fri, 9am – 7pm IST',
    sub: 'Urgent sprint support available',
    href: undefined,
    glow: 'green' as const,
    color: '#10b981',
  },
];

const FAQS = [
  {
    q: 'How does the engagement process work?',
    a: 'We kick off with an architectural discovery sprint to align on business metrics, system bottlenecks, and technical constraints. Once scoped, we execute in continuous 2-week agile sprints with transparent weekly demo releases.',
  },
  {
    q: 'Do you work with early-stage startups and founders?',
    a: 'Yes. We specialize in taking ambitious 0-to-1 products from initial design wireframes to production-grade architecture built to handle explosive user adoption without rewrites.',
  },
  {
    q: 'Can we hire you for fixed-scope or milestone contracts?',
    a: 'Yes. For well-defined scopes we offer predictable milestone-based contracts. For evolving platforms requiring continuous iteration, we provide dedicated engineering pods on a monthly sprint retainer.',
  },
  {
    q: 'What is your technology stack?',
    a: 'Our core stack includes Next.js, React, TypeScript, Node.js/Express, Spring Boot, FastAPI, PostgreSQL, MongoDB, Redis, Docker, and AWS/GCP cloud environments.',
  },
];

export default function ContactView() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <SectionHeader
        badge="Direct Inquiry"
        badgeVariant="cyan"
        title="Let's build your next"
        highlight="competitive advantage."
        description="Whether you require a full-stack greenfield build, database scaling, or microservices refactoring, our engineering team is ready to deliver."
        centered
      />

      {/* 3-Column Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {CONTACT_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <GlassCard key={card.label} glowColor={card.glow} className="p-6">
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-white/[0.06]"
                  style={{
                    backgroundColor: `${card.color}15`,
                    color: card.color,
                  }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    {card.label}
                  </p>
                  {card.href ? (
                    <a
                      href={card.href}
                      className="font-syne font-bold text-white hover:text-[#00d4ff] text-base transition-colors"
                    >
                      {card.value}
                    </a>
                  ) : (
                    <p className="font-syne font-bold text-white text-base">{card.value}</p>
                  )}
                  <p className="text-xs text-slate-400">{card.sub}</p>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Main Form & FAQ Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Form */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>

        {/* Right Side: FAQs & Direct Chat */}
        <div className="lg:col-span-5 space-y-8">
          {/* WhatsApp Direct Chat card */}
          <GlassCard glowColor="green" className="p-6 bg-gradient-to-br from-[#10b981]/10 to-transparent">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-[#10b981] font-semibold tracking-wider uppercase">
                Instant Messaging
              </span>
              <MessageSquare className="w-4 h-4 text-[#10b981]" />
            </div>
            <h4 className="font-syne font-bold text-lg text-white mb-2">
              Need a rapid response?
            </h4>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              Message our lead architects directly on WhatsApp for expedited project evaluations and quick quotes.
            </p>
            <a
              href="https://wa.me/919353227875?text=Hi%20SoraZen,%20I'd%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-medium text-sm bg-[#10b981]/20 hover:bg-[#10b981]/30 text-[#10b981] border border-[#10b981]/40 transition-colors"
            >
              <span>Chat via WhatsApp</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </GlassCard>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            <h3 className="font-syne font-bold text-xl text-white">
              Frequently Asked Questions
            </h3>
            <div className="space-y-3">
              {FAQS.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={faq.q}
                    className="rounded-2xl border border-white/[0.05] bg-[#090e24]/60 backdrop-blur-md overflow-hidden transition-colors hover:border-white/[0.12]"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full p-4 text-left flex items-center justify-between gap-4 font-sans font-medium text-sm text-slate-200"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-[#00d4ff]' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <div className="px-4 pb-4 pt-1 text-xs text-slate-400 leading-relaxed border-t border-white/[0.04]">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
