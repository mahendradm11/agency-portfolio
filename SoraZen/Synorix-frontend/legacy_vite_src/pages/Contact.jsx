import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import useContactForm from '../hooks/useContactForm';

/* --- static data -------------------------------------------- */
const contactInfo = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: 'Email Us', value: 'hello@sorazen.io',
    sub: 'We reply within 24 hours', href: 'mailto:hello@sorazen.io', color: '#4f8eff',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: 'Location', value: 'Bengaluru, India',
    sub: 'Available globally � Remote-first', href: null, color: '#7c3aed',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    label: 'Working Hours', value: 'Mon � Fri, 9am � 7pm IST',
    sub: 'Urgent? We check messages daily', href: null, color: '#10b981',
  },
];

const services  = ['Web Development', 'UI / UX Design', 'Mobile App', 'Cloud & DevOps', 'Consulting', 'Other'];
const budgets   = ['Below ₹5,000', '₹5,000 – ₹10,000', 'Above ₹10,000', 'Not sure yet'];
const timelines = ['ASAP', '1 � 3 months', '3 � 6 months', '6+ months', 'Just exploring'];

const faqs = [
  { q: 'How does the engagement process work?', a: "We start with a discovery call to understand your goals, then provide a detailed proposal. Once approved, we kick off with sprints and weekly check-ins." },
  { q: 'Do you work with early-stage startups?', a: "Absolutely. We love working with founders to shape and build their first product. We're comfortable with ambiguity and moving fast." },
  { q: 'Can we hire you for a fixed-price project?', a: "Yes � we offer both fixed-scope and time-and-materials engagements depending on how well-defined the requirements are." },
];

/* --- helpers ------------------------------------------------ */
const inputBase = (hasError, isTouched) => ({
  width: '100%', padding: '11px 14px',
  background: 'var(--bg-2)',
  border: `1px solid ${hasError && isTouched ? '#f87171' : 'var(--border)'}`,
  borderRadius: 10, color: 'var(--text)',
  fontFamily: 'var(--font-body)', fontSize: 14,
  outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
  boxSizing: 'border-box',
});

function onFocusStyle(e)  { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px rgba(79,142,255,0.12)'; }
function onBlurStyle(err, touched) {
  return (e) => { e.target.style.borderColor = err && touched ? '#f87171' : 'var(--border)'; e.target.style.boxShadow = 'none'; };
}

function FormField({ label, required, error, touched, children }) {
  return (
    <div>
      <label style={{
        display: 'flex', justifyContent: 'space-between',
        fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-display)',
        letterSpacing: '0.1em', textTransform: 'uppercase',
        color: 'var(--text-muted)', marginBottom: 8,
      }}>
        {label}
        {required && <span style={{ color: 'var(--accent)', fontSize: 14 }}>*</span>}
      </label>
      {children}
      <AnimatePresence>
        {touched && error && (
          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{ color: '#f87171', fontSize: 12, marginTop: 6, display: 'flex', gap: 4 }}>
            <span>?</span> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, overflow: 'hidden' }}>
      <button onClick={() => setOpen(!open)} style={{
        width: '100%', padding: '16px 20px', display: 'flex',
        alignItems: 'center', justifyContent: 'space-between',
        background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 12,
      }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 600, color: '#f8fafc' }}>{q}</span>
        <span style={{ fontSize: 20, color: '#7c3aed', flexShrink: 0, transition: 'transform 0.25s', transform: open ? 'rotate(45deg)' : 'none' }}>+</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} style={{ overflow: 'hidden' }}>
            <p style={{ padding: '0 20px 16px', color: '#cbd5e1', fontSize: 13.5, lineHeight: 1.7 }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PageBackground() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(circle at top left, rgba(0,212,255,0.10), transparent 30%), radial-gradient(circle at top right, rgba(124,58,237,0.08), transparent 28%), radial-gradient(circle at bottom left, rgba(255,255,255,0.03), transparent 40%)',
      }} />
      <svg width="100%" height="100%" style={{ position: 'absolute', opacity: 0.05 }}>
        <defs>
          <pattern id="contact-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#fff" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#contact-grid)" />
      </svg>
    </div>
  );
}

const NAV_ITEMS = [
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
  { label: 'Home', to: '/' },
];

const linkStyle = {
  color: 'rgba(255,255,255,0.65)',
  textDecoration: 'none',
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '0.875rem',
  fontWeight: 500,
  letterSpacing: '0.02em',
  transition: 'color 0.2s',
};

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        padding: '1rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled ? 'rgba(5,8,18,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'all 0.4s ease',
      }}
    >
      <Link to='/' style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
        <img src="/sorazen-logo.svg" alt="SoraZen" style={{ width: 40, height: 40, flexShrink: 0 }} />
        <span style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800, fontSize: '1.1rem',
          color: '#fff', letterSpacing: '-0.02em',
        }}>SoraZen</span>
      </Link>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        {NAV_ITEMS.map(item => (
          <Link
            key={item.label}
            to={item.to}
            style={linkStyle}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
          >
            {item.label}
          </Link>
        ))}

        <Link to='/contact'>
          <button style={{
            padding: '0.5rem 1.25rem',
            background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
            border: 'none',
            borderRadius: 8,
            color: '#fff',
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            fontSize: '0.875rem',
            cursor: 'pointer',
            letterSpacing: '0.02em',
          }}>
            Contact Us
          </button>
        </Link>
      </div>
    </motion.nav>
  );
}

function SuccessView({ onReset }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
      style={{ textAlign: 'center', padding: '48px 24px' }}>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
        style={{
          width: 72, height: 72, borderRadius: '50%',
          background: 'rgba(16,185,129,0.12)', border: '2px solid rgba(16,185,129,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px', fontSize: 28, color: '#10b981',
        }}>✓</motion.div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, marginBottom: 10 }}>Submitted Successfully!</h3>
      <p style={{ color: 'var(--text-muted)', fontSize: 15, lineHeight: 1.7, maxWidth: 340, margin: '0 auto 32px' }}>
        Thanks for reaching out. We'll review your message and get back to you within 24 hours.
      </p>
      <button onClick={onReset} className="btn btn-outline" style={{ fontSize: 14 }}>Send Another Message</button>
    </motion.div>
  );
}

/* --- main page ---------------------------------------------- */
export default function Contact() {
  const {
    form, errors, touched, status, serverError,
    handleChange, handleBlur, handleSubmit, reset,
  } = useContactForm();

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#050812', color: '#fff', overflow: 'hidden', paddingTop: 80 }}>
      <Navbar />
      <PageBackground />

      {/* Hero */}
      <section style={{ padding: '72px 0 48px' }}>
        <div className="container" style={{ maxWidth: 700, textAlign: 'center' }}>
          <motion.span className="tag" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Get In Touch</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ fontSize: 'clamp(36px, 5vw, 60px)', marginTop: 18, marginBottom: 18 }}>
            Let's Build Something{' '}
            <span style={{ background: 'linear-gradient(135deg, #4f8eff, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Together</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ color: 'var(--text-muted)', fontSize: 17, lineHeight: 1.75 }}>
            Whether you have a full brief or just an idea on a napkin � we'd love to hear from you.
            Fill out the form and we'll get back to you within 24 hours.
          </motion.p>
        </div>
      </section>

      {/* Info Cards */}
      <section style={{ paddingBottom: 52 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {contactInfo.map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '22px 22px', display: 'flex', gap: 14 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                  background: `${item.color}15`, border: `1px solid ${item.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.color,
                }}>{item.icon}</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 3 }}>{item.label}</div>
                  {item.href
                    ? <a href={item.href} style={{ fontSize: 14, fontWeight: 600, color: item.color, display: 'block', marginBottom: 2 }}>{item.value}</a>
                    : <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{item.value}</div>}
                  <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>{item.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + FAQ */}
      <section style={{ paddingBottom: 100 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.65fr 1fr', gap: 40, alignItems: 'start' }} className="contact-main-grid">

            {/* Form Card */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, overflow: 'hidden' }}>

              <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e' }} />
                <span style={{ marginLeft: 12, fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 600, color: 'var(--text-dim)', letterSpacing: '0.06em' }}>
                  NEW INQUIRY
                </span>
              </div>

              <div style={{ padding: '32px' }}>
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <SuccessView key="success" onReset={reset} />
                  ) : (
                    <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-row">
                        <FormField label="Full Name" required error={errors.name} touched={touched.name}>
                          <input name="name" type="text" placeholder="Jane Doe" value={form.name}
                            onChange={handleChange} onBlur={handleBlur}
                            style={inputBase(errors.name, touched.name)}
                            onFocus={onFocusStyle} onBlurCapture={onBlurStyle(errors.name, touched.name)} />
                        </FormField>
                        <FormField label="Email Address" required error={errors.email} touched={touched.email}>
                          <input name="email" type="email" placeholder="jane@company.com" value={form.email}
                            onChange={handleChange} onBlur={handleBlur}
                            style={inputBase(errors.email, touched.email)}
                            onFocus={onFocusStyle} onBlurCapture={onBlurStyle(errors.email, touched.email)} />
                        </FormField>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-row">
                        <FormField label="Phone (optional)" error={errors.phone} touched={touched.phone}>
                          <input name="phone" type="tel" placeholder="+91 98765 43210" value={form.phone}
                            onChange={handleChange} onBlur={handleBlur}
                            style={inputBase(errors.phone, touched.phone)}
                            onFocus={onFocusStyle} onBlurCapture={onBlurStyle(errors.phone, touched.phone)} />
                        </FormField>
                        <FormField label="Service Needed" required error={errors.service} touched={touched.service}>
                          <select name="service" value={form.service} onChange={handleChange} onBlur={handleBlur}
                            style={{ ...inputBase(errors.service, touched.service), appearance: 'none', cursor: 'pointer',
                              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7a99' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                              backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center' }}
                            onFocus={onFocusStyle} onBlurCapture={onBlurStyle(errors.service, touched.service)}>
                            <option value="" disabled>Select a service</option>
                            {services.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </FormField>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-row">
                        <FormField label="Budget Range" required error={errors.budget} touched={touched.budget}>
                          <select name="budget" value={form.budget} onChange={handleChange} onBlur={handleBlur}
                            style={{ ...inputBase(errors.budget, touched.budget), appearance: 'none', cursor: 'pointer',
                              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7a99' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                              backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center' }}
                            onFocus={onFocusStyle} onBlurCapture={onBlurStyle(errors.budget, touched.budget)}>
                            <option value="" disabled>Estimated budget</option>
                            {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                          </select>
                        </FormField>
                        <FormField label="Timeline" required error={errors.timeline} touched={touched.timeline}>
                          <select name="timeline" value={form.timeline} onChange={handleChange} onBlur={handleBlur}
                            style={{ ...inputBase(errors.timeline, touched.timeline), appearance: 'none', cursor: 'pointer',
                              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7a99' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                              backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center' }}
                            onFocus={onFocusStyle} onBlurCapture={onBlurStyle(errors.timeline, touched.timeline)}>
                            <option value="" disabled>When to start?</option>
                            {timelines.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                        </FormField>
                      </div>

                      <FormField label="Project Details" required error={errors.message} touched={touched.message}>
                        <textarea name="message" value={form.message} onChange={handleChange} onBlur={handleBlur}
                          rows={5} placeholder="Describe your project, goals, and any technical requirements..."
                          style={{ ...inputBase(errors.message, touched.message), resize: 'vertical', minHeight: 120 }}
                          onFocus={onFocusStyle} onBlurCapture={onBlurStyle(errors.message, touched.message)} />
                      </FormField>

                      <AnimatePresence>
                        {status === 'error' && serverError && (
                          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: 10, padding: '12px 16px', color: '#f87171', fontSize: 13, display: 'flex', gap: 8 }}>
                            <span>?</span> {serverError}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <button type="submit" disabled={status === 'loading'} className="btn btn-primary"
                        style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: 15, opacity: status === 'loading' ? 0.75 : 1, cursor: status === 'loading' ? 'not-allowed' : 'pointer' }}>
                        {status === 'loading' ? (
                          <><span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} /> Sending�</>
                        ) : 'Send Message ?'}
                      </button>

                      <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-dim)' }}>
                        No spam. Your info is never shared or sold.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, marginBottom: 20, color: '#fff' }}>Common Questions</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {faqs.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} />)}
              </div>

              <div style={{ marginTop: 28, background: 'rgba(79,142,255,0.07)', border: '1px solid rgba(79,142,255,0.15)', borderRadius: 14, padding: '20px 20px', display: 'flex', gap: 14 }}>
                <div style={{ fontSize: 22, flexShrink: 0 }}>?</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>Fast Response Guaranteed</div>
                  <p style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.6 }}>
                    We review every inquiry personally and respond within one business day � usually faster.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 900px) { .contact-main-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 560px) { .form-row { grid-template-columns: 1fr !important; } }
        select option { background: #0d1220; color: #f0f4ff; }
      `}</style>
    </div>
  );
}
