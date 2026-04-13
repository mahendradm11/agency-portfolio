import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

/* ─────────────── DATA ─────────────── */

const projects = [
  {
    id: "trading-platform",
    tag: "FinTech",
    category: "fullstack",
    title: "Trading Platform",
    tagline: "Real-time stock trading at scale.",
    color: "#00d4ff",
    year: "2024",
    duration: "5 months",
    status: "Live",
    desc: "A high-performance stock trading system supporting real-time price streaming, order management, and portfolio analytics for thousands of concurrent users.",
    challenge: "Handling thousands of simultaneous WebSocket connections while maintaining sub-100ms latency for order execution and live price feeds.",
    solution: "Designed an event-driven microservices architecture with Kafka for message brokering, Redis for low-latency caching of ticker data, and Spring Boot services for trade execution. Frontend uses React with optimistic UI updates.",
    results: [
      { metric: "<80ms", label: "Order execution latency" },
      { metric: "10K+", label: "Concurrent users" },
      { metric: "99.97%", label: "System uptime" },
      { metric: "2M+", label: "Trades processed" },
    ],
    tech: ["Spring Boot", "React", "WebSocket", "Kafka", "Redis", "PostgreSQL", "Docker", "AWS"],
    features: [
      "Real-time candlestick charts with WebSocket feeds",
      "Order book with live bid/ask depth",
      "Portfolio P&L analytics dashboard",
      "Multi-asset watchlists with alerts",
      "Secure JWT-based auth with 2FA",
      "Audit trail and trade history export",
    ],
  },
  {
    id: "crop-recommendation",
    tag: "AgriTech · ML",
    category: "ml",
    title: "Crop Recommendation Engine",
    tagline: "Precision agriculture powered by ML.",
    color: "#10b981",
    year: "2024",
    duration: "3 months",
    status: "Live",
    desc: "An ML-powered platform that analyzes soil composition, climate data, and historical yield records to recommend the most profitable and sustainable crops for any given land.",
    challenge: "Gathering clean, labeled training data from fragmented agricultural datasets and building a model that generalizes well across diverse regional climates and soil types.",
    solution: "Trained a gradient boosting ensemble on 50K+ data points spanning soil pH, NPK ratios, rainfall, temperature, and humidity. Deployed via FastAPI with a React dashboard for farmer-facing recommendations.",
    results: [
      { metric: "91.4%", label: "Recommendation accuracy" },
      { metric: "50K+", label: "Training records" },
      { metric: "32%",   label: "Avg yield improvement" },
      { metric: "1,200+", label: "Farmers onboarded" },
    ],
    tech: ["Python", "scikit-learn", "XGBoost", "FastAPI", "React", "PostgreSQL", "Pandas", "Docker"],
    features: [
      "Soil data input with NPK, pH, and moisture analysis",
      "Weather API integration for climate context",
      "Probability-ranked crop recommendations",
      "Historical yield comparison by region",
      "Seasonal planting calendar",
      "Multilingual farmer-facing interface",
    ],
  },
  {
    id: "ecommerce-platform",
    tag: "eCommerce",
    category: "fullstack",
    title: "Multi-Vendor Marketplace",
    tagline: "A scalable B2C commerce engine.",
    color: "#7c3aed",
    year: "2023",
    duration: "6 months",
    status: "Live",
    desc: "A full-featured multi-vendor e-commerce platform supporting independent seller storefronts, dynamic product catalogs, and integrated payment processing.",
    challenge: "Designing a tenant-isolated data model that allows thousands of independent vendors while keeping the storefront fast, searchable, and consistent.",
    solution: "Built a shared-schema multi-tenancy model with vendor-level scoping. Used Elasticsearch for full-text product search, Stripe Connect for split payments, and Next.js for SEO-optimized storefronts.",
    results: [
      { metric: "500+",   label: "Active vendors"         },
      { metric: "120ms",  label: "Avg page load"          },
      { metric: "$2M+",   label: "GMV processed"          },
      { metric: "4.8★",   label: "Seller satisfaction"    },
    ],
    tech: ["Next.js", "Spring Boot", "Elasticsearch", "Stripe", "PostgreSQL", "Redis", "AWS S3", "Kubernetes"],
    features: [
      "Vendor onboarding with KYC verification",
      "Dynamic product catalog with variant support",
      "Elasticsearch-powered search and filtering",
      "Stripe Connect for automatic split payouts",
      "Order tracking with real-time notifications",
      "Admin dashboard with revenue analytics",
    ],
  },
  {
    id: "hospital-mgmt",
    tag: "HealthTech",
    category: "fullstack",
    title: "Hospital Management System",
    tagline: "End-to-end clinical operations platform.",
    color: "#f43f5e",
    year: "2023",
    duration: "8 months",
    status: "Live",
    desc: "A comprehensive hospital management system covering patient registration, appointment scheduling, EMR, billing, and pharmacy inventory — deployed across 3 hospitals.",
    challenge: "Integrating legacy HL7 data feeds from existing diagnostic equipment while ensuring HIPAA-compliant data handling and role-based access across clinical staff.",
    solution: "Microservices architecture with dedicated modules for OPD, IPD, pharmacy, billing, and lab. Used Spring Security with fine-grained RBAC, PDF report generation, and HL7 FHIR adapters for device integration.",
    results: [
      { metric: "3",      label: "Hospitals deployed"     },
      { metric: "40%",    label: "Admin time saved"       },
      { metric: "200K+",  label: "Patient records managed"},
      { metric: "HIPAA",  label: "Compliant architecture" },
    ],
    tech: ["Spring Boot", "React", "PostgreSQL", "HL7 FHIR", "Spring Security", "iText PDF", "Docker", "Nginx"],
    features: [
      "Patient registration and OPD/IPD management",
      "Doctor scheduling and appointment booking",
      "Electronic Medical Records (EMR) with history",
      "Pharmacy inventory and prescription tracking",
      "Automated billing and insurance claims",
      "Lab results with HL7 device integration",
    ],
  },
  {
    id: "devops-platform",
    tag: "DevOps · Internal Tool",
    category: "devops",
    title: "Internal CI/CD Dashboard",
    tagline: "Deployment visibility for engineering teams.",
    color: "#f59e0b",
    year: "2024",
    duration: "2 months",
    status: "Live",
    desc: "A unified deployment dashboard that aggregates CI/CD pipeline status, container health, and infrastructure metrics across multiple services and environments.",
    challenge: "Engineers were context-switching between GitHub Actions, Grafana, and AWS Console to understand deployment state — causing slow incident response.",
    solution: "Built a React dashboard that polls GitHub Actions API, AWS CloudWatch, and Prometheus. Unified deployment timeline, rollback controls, and alert routing into a single pane of glass.",
    results: [
      { metric: "60%",   label: "MTTR reduction"    },
      { metric: "15+",   label: "Services monitored" },
      { metric: "3 min", label: "Avg deploy time"    },
      { metric: "1-click", label: "Rollback control" },
    ],
    tech: ["React", "Node.js", "GitHub Actions API", "Prometheus", "Grafana", "AWS CloudWatch", "Docker", "WebSocket"],
    features: [
      "Unified deployment timeline across all services",
      "Live container health and resource utilization",
      "One-click rollback to any previous deployment",
      "Slack alert routing and incident tagging",
      "Environment diff viewer (staging vs production)",
      "On-call schedule integration",
    ],
  },
  {
    id: "lms",
    tag: "EdTech",
    category: "fullstack",
    title: "Learning Management System",
    tagline: "Structured online learning at any scale.",
    color: "#06b6d4",
    year: "2023",
    duration: "4 months",
    status: "Live",
    desc: "A feature-rich LMS enabling institutions to publish courses, manage student cohorts, deliver live classes, and track learning outcomes through detailed analytics.",
    challenge: "Supporting both self-paced and instructor-led formats simultaneously, with video streaming at scale and accurate progress tracking across heterogeneous content types.",
    solution: "Used AWS CloudFront + S3 for adaptive video delivery, React with a custom lesson renderer supporting video, quizzes, and assignments. Spring Boot handles enrollment logic, grading, and certification generation.",
    results: [
      { metric: "8K+",  label: "Active learners"     },
      { metric: "300+", label: "Courses published"   },
      { metric: "94%",  label: "Course completion"   },
      { metric: "4.9★", label: "Learner satisfaction"},
    ],
    tech: ["React", "Spring Boot", "AWS CloudFront", "S3", "PostgreSQL", "Redis", "Stripe", "WebRTC"],
    features: [
      "Video lessons with adaptive streaming (HLS)",
      "Interactive quizzes and auto-graded assignments",
      "Live class sessions via WebRTC",
      "Progress tracking and completion certificates",
      "Cohort management and bulk enrollment",
      "Revenue analytics for course creators",
    ],
  },
];

const categories = [
  { id: "all",       label: "All Projects" },
  { id: "fullstack", label: "Full Stack"   },
  { id: "ml",        label: "ML / AI"      },
  { id: "devops",    label: "DevOps"       },
];

/* ─────────────── NAVBAR ─────────────── */
const NAV_ITEMS = [
  { label: "Home",     to: "/"         },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.6 }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "1rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(5,8,18,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.4s ease",
      }}
    >
      <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
        <img src="/sorazen-logo.svg" alt="SoraZen" style={{ width: 40, height: 40, flexShrink: 0 }} />
        <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.1rem", color: "#fff", letterSpacing: "-0.02em" }}>SoraZen</span>
      </Link>
      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        {NAV_ITEMS.map(item => (
          <Link key={item.label} to={item.to} style={{
            color: item.label === "Projects" ? "#00d4ff" : "rgba(255,255,255,0.55)",
            textDecoration: "none", fontFamily: "'DM Sans',sans-serif",
            fontSize: "0.875rem", fontWeight: item.label === "Projects" ? 600 : 500,
          }}>{item.label}</Link>
        ))}
        <button style={{ padding: "0.5rem 1.25rem", background: "linear-gradient(135deg,#00d4ff,#7c3aed)", border: "none", borderRadius: 8, color: "#fff", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "0.875rem", cursor: "pointer" }}>
          Contact Us
        </button>
      </div>
    </motion.nav>
  );
}

/* ─────────────── PROJECT CARD ─────────────── */
function ProjectCard({ proj, index, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      onClick={() => onClick(proj)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: hovered ? `linear-gradient(135deg, ${proj.color}08, rgba(5,8,18,0.9))` : "rgba(255,255,255,0.025)",
        border: `1px solid ${hovered ? proj.color + "35" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 18, overflow: "hidden", cursor: "pointer",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
      }}
    >
      {/* Top accent bar */}
      <div style={{ height: 3, background: `linear-gradient(90deg, transparent, ${proj.color}, transparent)`, opacity: hovered ? 1 : 0.4, transition: "opacity 0.3s" }} />

      <div style={{ padding: "2rem" }}>
        {/* Header row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.25rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <span style={{ padding: "0.2rem 0.65rem", background: `${proj.color}15`, border: `1px solid ${proj.color}30`, borderRadius: 100, fontFamily: "'DM Mono',monospace", fontSize: "0.65rem", color: proj.color, letterSpacing: "0.08em", textTransform: "uppercase" }}>{proj.tag}</span>
              <span style={{ padding: "0.2rem 0.65rem", background: "rgba(255,255,255,0.04)", borderRadius: 100, fontFamily: "'DM Mono',monospace", fontSize: "0.62rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em" }}>{proj.year}</span>
            </div>
            <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.25rem", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15 }}>{proj.title}</h3>
          </div>
          {/* Status dot */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.7rem", background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 100, flexShrink: 0 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 6px #10b981", animation: "ping 2s ease-in-out infinite" }} />
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.6rem", color: "#10b981", letterSpacing: "0.08em" }}>LIVE</span>
          </div>
        </div>

        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.82rem", lineHeight: 1.7, fontWeight: 300, marginBottom: "1.5rem" }}>{proj.desc}</p>

        {/* Results mini grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "0.6rem", marginBottom: "1.5rem" }}>
          {proj.results.slice(0, 2).map((r, i) => (
            <div key={i} style={{ padding: "0.65rem 0.85rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8 }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "1rem", fontWeight: 800, color: proj.color }}>{r.metric}</div>
              <div style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans',sans-serif", marginTop: 2 }}>{r.label}</div>
            </div>
          ))}
        </div>

        {/* Tech pills */}
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
          {proj.tech.slice(0, 4).map(t => (
            <span key={t} style={{ padding: "0.18rem 0.6rem", background: "rgba(255,255,255,0.04)", borderRadius: 5, fontSize: "0.68rem", color: "rgba(255,255,255,0.4)", fontFamily: "'DM Mono',monospace" }}>{t}</span>
          ))}
          {proj.tech.length > 4 && (
            <span style={{ padding: "0.18rem 0.6rem", background: "rgba(255,255,255,0.04)", borderRadius: 5, fontSize: "0.68rem", color: "rgba(255,255,255,0.25)", fontFamily: "'DM Mono',monospace" }}>+{proj.tech.length - 4} more</span>
          )}
        </div>

        {/* View details */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: proj.color, fontSize: "0.8rem", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, opacity: hovered ? 1 : 0.5, transition: "opacity 0.2s" }}>
          View Case Study
          <motion.span animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.2 }}>→</motion.span>
        </div>
      </div>

      {/* Corner glow */}
      <div style={{ position: "absolute", bottom: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: `radial-gradient(circle,${proj.color}12 0%,transparent 70%)`, pointerEvents: "none", opacity: hovered ? 1 : 0, transition: "opacity 0.3s" }} />
    </motion.div>
  );
}

/* ─────────────── CASE STUDY MODAL ─────────────── */
function CaseStudyModal({ proj, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", handler); };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          transition={{ duration: 0.3 }}
          onClick={e => e.stopPropagation()}
          style={{
            width: "100%", maxWidth: 860,
            maxHeight: "90vh", overflowY: "auto",
            background: "#0b0f1e",
            border: `1px solid ${proj.color}30`,
            borderRadius: 24,
            position: "relative",
          }}
        >
          {/* Modal header */}
          <div style={{ padding: "2.5rem 2.5rem 0", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "2rem", background: `linear-gradient(135deg,${proj.color}08,transparent)`, position: "relative" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,transparent,${proj.color},transparent)` }} />
            <button onClick={onClose} style={{ position: "absolute", top: "1.5rem", right: "1.5rem", width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", fontSize: "1rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>

            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
              <span style={{ padding: "0.2rem 0.75rem", background: `${proj.color}15`, border: `1px solid ${proj.color}30`, borderRadius: 100, fontFamily: "'DM Mono',monospace", fontSize: "0.68rem", color: proj.color, letterSpacing: "0.08em", textTransform: "uppercase" }}>{proj.tag}</span>
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.65rem", color: "rgba(255,255,255,0.3)" }}>{proj.year} · {proj.duration}</span>
            </div>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "2rem", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "0.5rem" }}>{proj.title}</h2>
            <p style={{ color: proj.color, fontStyle: "italic", fontFamily: "'DM Sans',sans-serif", fontSize: "0.95rem", fontWeight: 500 }}>{proj.tagline}</p>
          </div>

          <div style={{ padding: "2.5rem" }}>
            {/* Results row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "0.85rem", marginBottom: "2.5rem" }}>
              {proj.results.map((r, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                  style={{ textAlign: "center", padding: "1rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10 }}>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.4rem", fontWeight: 900, color: proj.color }}>{r.metric}</div>
                  <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", marginTop: 4, fontFamily: "'DM Sans',sans-serif" }}>{r.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Challenge / Solution */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "2.5rem" }}>
              {[
                { label: "// The Challenge", text: proj.challenge, color: "#f43f5e" },
                { label: "// The Solution",  text: proj.solution,  color: proj.color },
              ].map((block, i) => (
                <div key={i} style={{ padding: "1.5rem", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12 }}>
                  <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.68rem", color: block.color, letterSpacing: "0.12em", marginBottom: "0.75rem" }}>{block.label}</div>
                  <p style={{ fontSize: "0.83rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, fontWeight: 300 }}>{block.text}</p>
                </div>
              ))}
            </div>

            {/* Features */}
            <div style={{ marginBottom: "2.5rem" }}>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.68rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", marginBottom: "1rem" }}>// KEY FEATURES</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "0.65rem" }}>
                {proj.features.map((f, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.05 }}
                    style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem", padding: "0.75rem 0.9rem", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 8 }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: proj.color, flexShrink: 0, marginTop: 5, boxShadow: `0 0 5px ${proj.color}80` }} />
                    <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.5, fontFamily: "'DM Sans',sans-serif" }}>{f}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Tech stack */}
            <div>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.68rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", marginBottom: "1rem" }}>// TECH STACK</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                {proj.tech.map((t, i) => (
                  <motion.span key={t} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                    style={{ padding: "0.4rem 1rem", background: `${proj.color}10`, border: `1px solid ${proj.color}25`, borderRadius: 7, fontFamily: "'DM Mono',monospace", fontSize: "0.78rem", color: proj.color, letterSpacing: "0.04em" }}>
                    {t}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─────────────── MAIN PAGE ─────────────── */
export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  const filtered = activeCategory === "all"
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <div style={{ background: "#050812", color: "#fff", fontFamily: "'DM Sans',sans-serif", overflowX: "hidden", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        ::selection { background:rgba(0,212,255,0.25); }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:#050812; }
        ::-webkit-scrollbar-thumb { background:#7c3aed; border-radius:2px; }
        @keyframes ping { 0%,100%{opacity:1} 50%{opacity:0.3} }
      `}</style>

      <Navbar />

      {/* ── HERO ── */}
      <section style={{ position: "relative", paddingTop: 140, paddingBottom: 60, padding: "140px 2rem 60px", textAlign: "center" }}>
        {/* BG grid */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <svg width="100%" height="100%" style={{ position: "absolute", opacity: 0.05 }}>
            <defs><pattern id="grid3" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#fff" strokeWidth="0.5" /></pattern></defs>
            <rect width="100%" height="100%" fill="url(#grid3)" />
          </svg>
          <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle,rgba(124,58,237,0.1) 0%,transparent 70%)", top: -100, left: "20%", }} />
          <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,212,255,0.08) 0%,transparent 70%)", top: 0, right: "10%", }} />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.35rem 1rem", background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.25)", borderRadius: 100, marginBottom: "1.5rem" }}>
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.75rem", color: "#7c3aed", letterSpacing: "0.1em" }}>// OUR WORK</span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "1.25rem" }}>
          Projects that{" "}
          <span style={{ background: "linear-gradient(135deg,#7c3aed,#00d4ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Ship & Scale</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          style={{ color: "rgba(255,255,255,0.45)", fontSize: "1.05rem", maxWidth: 520, margin: "0 auto 3rem", lineHeight: 1.7, fontWeight: 300 }}>
          A selection of products we've designed, engineered, and launched — spanning FinTech, AgriTech, HealthTech, and beyond.
        </motion.p>

        {/* Stats bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          style={{ display: "inline-flex", gap: "3rem", padding: "1.25rem 3rem", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14 }}>
          {[
            { v: "6+", l: "Case Studies" },
            { v: "50+", l: "Total Projects" },
            { v: "8", l: "Industries" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.5rem", fontWeight: 900, background: "linear-gradient(135deg,#7c3aed,#00d4ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{s.v}</div>
              <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans',sans-serif", marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── FILTER TABS ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem 2.5rem" }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          style={{ display: "flex", gap: "0.5rem", padding: "0.35rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, width: "fit-content" }}>
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: "0.5rem 1.25rem",
                background: activeCategory === cat.id ? "rgba(255,255,255,0.08)" : "transparent",
                border: activeCategory === cat.id ? "1px solid rgba(255,255,255,0.12)" : "1px solid transparent",
                borderRadius: 8,
                color: activeCategory === cat.id ? "#fff" : "rgba(255,255,255,0.4)",
                fontFamily: "'DM Sans',sans-serif",
                fontWeight: activeCategory === cat.id ? 600 : 400,
                fontSize: "0.85rem", cursor: "pointer",
                transition: "all 0.2s",
              }}>
              {cat.label}
              <span style={{ marginLeft: "0.4rem", fontFamily: "'DM Mono',monospace", fontSize: "0.65rem", color: activeCategory === cat.id ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)" }}>
                {cat.id === "all" ? projects.length : projects.filter(p => p.category === cat.id).length}
              </span>
            </button>
          ))}
        </motion.div>
      </div>

      {/* ── PROJECT GRID ── */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem 6rem" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.25rem" }}
          >
            {filtered.map((proj, i) => (
              <ProjectCard key={proj.id} proj={proj} index={i} onClick={setSelectedProject} />
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ── PROCESS STRIP ── */}
      <section style={{ background: "rgba(255,255,255,0.015)", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "5rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.72rem", color: "#10b981", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem" }}>// How We Work</div>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(1.8rem,3vw,2.5rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>From idea to production</h2>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "0", position: "relative" }}>
            {[
              { n: "01", title: "Discovery",   desc: "Define scope, goals, and constraints.",       color: "#00d4ff" },
              { n: "02", title: "Architecture", desc: "Design system, data models, and API contracts.", color: "#7c3aed" },
              { n: "03", title: "Build",        desc: "Iterative sprints with continuous delivery.",  color: "#10b981" },
              { n: "04", title: "Test & QA",    desc: "Unit, integration, and load testing.",         color: "#f59e0b" },
              { n: "05", title: "Launch",       desc: "CI/CD pipelines and live monitoring.",         color: "#f43f5e" },
            ].map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{ textAlign: "center", padding: "0 1rem", position: "relative" }}>
                {i < 4 && (
                  <div style={{ position: "absolute", top: 20, left: "60%", width: "80%", height: 1, background: `linear-gradient(90deg,${step.color}50,transparent)` }} />
                )}
                <div style={{ width: 42, height: 42, borderRadius: "50%", background: `${step.color}12`, border: `2px solid ${step.color}40`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", fontFamily: "'DM Mono',monospace", fontSize: "0.72rem", color: step.color, fontWeight: 600, position: "relative", zIndex: 1 }}>{step.n}</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.4rem" }}>{step.title}</div>
                <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.6, fontFamily: "'DM Sans',sans-serif", fontWeight: 300 }}>{step.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "5rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ position: "relative", padding: "4rem", borderRadius: 24, background: "linear-gradient(135deg,rgba(124,58,237,0.08),rgba(0,212,255,0.07))", border: "1px solid rgba(255,255,255,0.07)", textAlign: "center", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 25% 50%,rgba(124,58,237,0.08) 0%,transparent 50%),radial-gradient(circle at 75% 50%,rgba(0,212,255,0.07) 0%,transparent 50%)", pointerEvents: "none" }} />
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.72rem", color: "#7c3aed", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1rem" }}>// Start Your Project</div>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "1rem" }}>Your product could be next.</h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "1rem", maxWidth: 440, margin: "0 auto 2.5rem", fontWeight: 300, lineHeight: 1.7 }}>Let's scope your idea and turn it into something people use every day.</p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button style={{ padding: "0.9rem 2.25rem", background: "linear-gradient(135deg,#7c3aed,#00d4ff)", border: "none", borderRadius: 10, color: "#fff", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer", boxShadow: "0 0 30px rgba(124,58,237,0.3)" }}>
                Start a Project →
              </button>
              <Link to="/services" style={{ textDecoration: "none" }}>
                <button style={{ padding: "0.9rem 2.25rem", background: "transparent", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, color: "rgba(255,255,255,0.8)", fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: "0.95rem", cursor: "pointer" }}>
                  View Services
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "2rem", textAlign: "center", color: "rgba(255,255,255,0.2)", fontSize: "0.78rem", fontFamily: "'DM Mono',monospace" }}>
        © 2025 SoraZen Solutions — Built with precision &amp; purpose
      </footer>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <CaseStudyModal proj={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
