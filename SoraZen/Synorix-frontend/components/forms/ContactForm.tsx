'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Send, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';

const SERVICES = [
  'Web Development',
  'REST API & Backend',
  'Microservices',
  'Database Design',
  'UI / UX & Frontend',
  'Other',
];

const BUDGETS = ['Below $5,000', '$5,000 – $15,000', '$15,000 – $30,000', '$30,000+', 'Flexible'];
const TIMELINES = ['Immediate / ASAP', '1 – 2 months', '3 – 6 months', 'Exploratory'];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: SERVICES[0],
    budget: BUDGETS[1],
    timeline: TIMELINES[1],
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error('Please provide your name and email address.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit contact inquiry');
      }

      setSubmitted(true);
      toast.success('Your message has been sent directly to our engineering team!');
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 sm:p-12 rounded-3xl bg-[#090e24]/90 backdrop-blur-2xl border border-[#10b981]/30 text-center space-y-6 shadow-[0_0_50px_-10px_rgba(16,185,129,0.2)]"
      >
        <div className="w-16 h-16 mx-auto rounded-2xl bg-[#10b981]/15 border border-[#10b981]/30 flex items-center justify-center text-[#10b981]">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="font-syne font-extrabold text-2xl text-white">Inquiry Received</h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
            Thank you, <span className="text-white font-medium">{formData.name}</span>. Our technical leads review all submissions and will reply to <span className="text-[#00d4ff]">{formData.email}</span> within 24 hours.
          </p>
        </div>
        <div className="pt-2">
          <Button
            variant="glass"
            size="sm"
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: '',
                email: '',
                phone: '',
                service: SERVICES[0],
                budget: BUDGETS[1],
                timeline: TIMELINES[1],
                message: '',
              });
            }}
          >
            Submit Another Request
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 sm:p-10 rounded-3xl bg-[#090e24]/80 backdrop-blur-2xl border border-white/[0.05] shadow-[0_4px_30px_rgba(0,0,0,0.5)] space-y-8"
    >
      {/* Service Selector Pills */}
      <div className="space-y-3">
        <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider">
          1. What service do you need?
        </label>
        <div className="flex flex-wrap gap-2">
          {SERVICES.map((s) => {
            const isSelected = formData.service === s;
            return (
              <button
                type="button"
                key={s}
                onClick={() => setFormData({ ...formData, service: s })}
                className={`text-xs px-3.5 py-2 rounded-xl font-medium transition-all duration-200 border ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#00d4ff]/20 to-[#7c3aed]/20 text-white border-[#00d4ff]/60 shadow-[0_0_15px_rgba(0,212,255,0.2)]'
                    : 'bg-white/[0.03] text-slate-400 border-white/[0.05] hover:border-white/20 hover:text-white'
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      {/* Input Grid */}
      <div className="space-y-4">
        <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider">
          2. Your Details
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              required
              placeholder="Your Name *"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00d4ff] focus:ring-1 focus:ring-[#00d4ff] transition-all"
            />
          </div>
          <div>
            <input
              type="email"
              required
              placeholder="Email Address *"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00d4ff] focus:ring-1 focus:ring-[#00d4ff] transition-all"
            />
          </div>
        </div>
        <div>
          <input
            type="tel"
            placeholder="Phone / WhatsApp Number (Optional)"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00d4ff] focus:ring-1 focus:ring-[#00d4ff] transition-all"
          />
        </div>
      </div>

      {/* Budget & Timeline Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider">
            3. Estimated Budget
          </label>
          <div className="flex flex-wrap gap-2">
            {BUDGETS.map((b) => (
              <button
                type="button"
                key={b}
                onClick={() => setFormData({ ...formData, budget: b })}
                className={`text-xs px-3 py-1.5 rounded-lg border font-mono transition-all ${
                  formData.budget === b
                    ? 'bg-[#00d4ff]/15 text-[#00d4ff] border-[#00d4ff]/50'
                    : 'bg-white/[0.02] text-slate-400 border-white/[0.05] hover:text-white'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider">
            4. Timeline
          </label>
          <div className="flex flex-wrap gap-2">
            {TIMELINES.map((t) => (
              <button
                type="button"
                key={t}
                onClick={() => setFormData({ ...formData, timeline: t })}
                className={`text-xs px-3 py-1.5 rounded-lg border font-mono transition-all ${
                  formData.timeline === t
                    ? 'bg-[#7c3aed]/15 text-[#c084fc] border-[#7c3aed]/50'
                    : 'bg-white/[0.02] text-slate-400 border-white/[0.05] hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Message textarea */}
      <div className="space-y-3">
        <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider">
          5. Tell us about the project
        </label>
        <textarea
          rows={4}
          placeholder="Briefly describe your goals, target audience, architectural expectations, or key features..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00d4ff] focus:ring-1 focus:ring-[#00d4ff] transition-all resize-none"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          size="lg"
          variant="primary"
          disabled={loading}
          className="w-full justify-center"
          icon={loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-4 h-4" />}
        >
          {loading ? 'Submitting Inquiry...' : 'Send Project Inquiry'}
        </Button>
        <p className="text-center text-xs text-slate-500 mt-3 font-mono">
          🔒 Your data is stored securely. No spam, ever.
        </p>
      </div>
    </form>
  );
}
