import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const handleSubmit = () => {
  const name = document.getElementById("name")?.value || "there";
  const msg = document.getElementById("message")?.value || "I'd like to book a discovery call.";

  const text = `Hi, I'm ${name}. ${msg}`;
  const url = `https://wa.me/919353227875?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
};

/* ─────────────── DATA ─────────────── */

const services = [
  {
    id: "web-dev",
    icon: "◈",
    tag: "01",
    title: "Web Development",
    tagline: "Pixel-perfect interfaces that convert.",
    color: "#00d4ff",
    desc: "We design and engineer full-stack web applications that are fast, accessible, and built to scale — from SPAs to complex enterprise portals.",
    features: [
      "Responsive UI with React / Next.js",
      "Server-Side Rendering & Static Generation",
      "Component design systems & Storybook",
      "Performance audits & Core Web Vitals",
      "PWA & offline-first capabilities",
      "SEO optimization & structured data",
    ],
    tech: ["React", "Next.js", "TypeScript", "Tailwind", "Vite", "GraphQL"],
    process: [
      { step: "Discover", desc: "Deep-dive into your goals, users, and constraints." },
      { step: "Design", desc: "Wireframes, prototypes, and design system foundations." },
      { step: "Build", desc: "Iterative sprints with continuous delivery." },
      { step: "Launch", desc: "CI/CD pipelines, monitoring, and go-live support." },
    ],
    stat: { value: "40+", label: "Web apps shipped" },
  },
  {
    id: "rest-api",
    icon: "⬡",
    tag: "02",
    title: "REST API Development",
    tagline: "Robust APIs that power your product.",
    color: "#7c3aed",
    desc: "We architect and build RESTful APIs that are secure, well-documented, versioned, and ready for production — with developer experience at the core.",
    features: [
      "OpenAPI / Swagger documentation",
      "JWT & OAuth2 authentication flows",
      "Rate limiting, throttling & quotas",
      "API versioning strategies",
      "Pagination, filtering & sorting",
      "Comprehensive error handling",
    ],
    tech: ["Spring Boot", "Node.js", "FastAPI", "Postman", "Swagger", "Redis"],
    process: [
      { step: "Contract", desc: "Define endpoints, schemas, and auth strategy first." },
      { step: "Mock", desc: "Deliver mock servers so frontend can start in parallel." },
      { step: "Implement", desc: "Production code with full test coverage." },
      { step: "Document", desc: "Auto-generated, interactive API docs." },
    ],
    stat: { value: "99.9%", label: "Avg API uptime" },
  },
  {
    id: "microservices",
    icon: "◎",
    tag: "03",
    title: "Microservices Architecture",
    tagline: "Scale what matters, independently.",
    color: "#10b981",
    desc: "We decompose monoliths and design distributed service meshes that let your teams deploy independently, scale on demand, and recover gracefully.",
    features: [
      "Domain-driven service decomposition",
      "API Gateway & service mesh setup",
      "Event-driven communication (Kafka)",
      "Circuit breakers & fault tolerance",
      "Distributed tracing (Jaeger / Zipkin)",
      "Container orchestration with Kubernetes",
    ],
    tech: ["Spring Boot", "Docker", "Kubernetes", "Kafka", "Istio", "Prometheus"],
    process: [
      { step: "Audit", desc: "Assess your current architecture and pain points." },
      { step: "Decompose", desc: "Define bounded contexts and service boundaries." },
      { step: "Migrate", desc: "Strangler-fig pattern for zero-downtime migration." },
      { step: "Observe", desc: "Dashboards, alerts, and distributed tracing live." },
    ],
    stat: { value: "10×", label: "Deploy frequency increase" },
  },
  {
    id: "database",
    icon: "◉",
    tag: "04",
    title: "Database Design",
    tagline: "Data architectures built to last.",
    color: "#f59e0b",
    desc: "From schema design to query tuning, we build data layers that are normalized, performant, and reliable — whether relational, document, or graph.",
    features: [
      "Relational schema & normalization",
      "NoSQL data modeling (MongoDB, Redis)",
      "Query optimization & index strategy",
      "Database migrations & versioning",
      "Replication, sharding & HA setup",
      "Backup strategies & disaster recovery",
    ],
    tech: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Elasticsearch", "Flyway"],
    process: [
      { step: "Model", desc: "Entity-relationship design tailored to your domain." },
      { step: "Optimize", desc: "Indexing strategy and query performance tuning." },
      { step: "Migrate", desc: "Version-controlled, reversible migration scripts." },
      { step: "Monitor", desc: "Slow-query logs, alerts, and capacity planning." },
    ],
    stat: { value: "5×", label: "Query speed improvements" },
  },
  {
    id: "ml-solutions",
    icon: "⬢",
    tag: "05",
    title: "ML & AI Integration",
    tagline: "Intelligence wired into your product.",
    color: "#f43f5e",
    desc: "We integrate machine learning models and AI services into your existing stack — from recommendation engines to NLP pipelines and predictive analytics.",
    features: [
      "Custom ML model training & evaluation",
      "LLM integration (OpenAI, Anthropic, local)",
      "Data pipelines & feature engineering",
      "Model serving & inference APIs",
      "A/B testing for model performance",
      "Explainability & bias auditing",
    ],
    tech: ["Python", "scikit-learn", "PyTorch", "FastAPI", "MLflow", "Hugging Face"],
    process: [
      { step: "Frame", desc: "Define the ML problem and success metrics." },
      { step: "Experiment", desc: "Rapid prototyping with iterative model evaluation." },
      { step: "Deploy", desc: "Containerized model serving with monitoring." },
      { step: "Improve", desc: "Continuous retraining and performance tracking." },
    ],
    stat: { value: "85%+", label: "Model accuracy avg" },
  },
  {
    id: "devops",
    icon: "◇",
    tag: "06",
    title: "DevOps & Cloud",
    tagline: "Ship faster. Break nothing.",
    color: "#06b6d4",
    desc: "We set up the CI/CD pipelines, infrastructure-as-code, and monitoring stacks that let your team move fast without fear — on AWS, GCP, or Azure.",
    features: [
      "CI/CD pipelines (GitHub Actions, Jenkins)",
      "Infrastructure as Code (Terraform)",
      "Container registry & Docker builds",
      "Auto-scaling & load balancing",
      "Centralized logging (ELK stack)",
      "Security scanning & secret management",
    ],
    tech: ["AWS", "Docker", "Terraform", "GitHub Actions", "Grafana", "Vault"],
    process: [
      { step: "Audit", desc: "Review current deployment and infra bottlenecks." },
      { step: "Automate", desc: "Pipeline setup from commit to production." },
      { step: "Harden", desc: "Security scanning, secrets, and least-privilege IAM." },
      { step: "Observe", desc: "Metrics, logs, and alerts from day one." },
    ],
    stat: { value: "3 min", label: "Avg deploy time" },
  },
];

const faqs = [
  { q: "How long does a typical project take?", a: "Most web apps take 6–12 weeks depending on scope. API-only projects can be completed in 3–5 weeks. We always share a timeline after our discovery call." },
  { q: "Do you work with early-stage startups?", a: "Absolutely. We love helping founders move fast. We offer lean MVP packages tailored for startups who need to validate quickly." },
  { q: "Can you take over an existing codebase?", a: "Yes. We regularly onboard onto legacy projects. We start with a code audit and clear technical debt roadmap before adding features." },
  { q: "What's your engagement model?", a: "We offer fixed-scope projects, dedicated team augmentation, and monthly retainers. We'll recommend the right fit during our discovery call." },
];

/* ─────────────── NAVBAR ─────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <motion.nav initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.6 }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "1rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(5,8,18,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.4s ease",
      }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <img src="/sorazen-logo.svg" alt="SoraZen" style={{ width: 40, height: 40, flexShrink: 0 }} />
        <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.1rem", color: "#fff", letterSpacing: "-0.02em" }}>SoraZen</span>
      </div>
      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        {["Home", "Services", "Projects"].map(item => {
          const to = item === "Home"
            ? "/"
            : item === "Services"
              ? "/services"
              : item === "Projects"
                ? "/projects"
                : "#about";
          return (
            <Link
              key={item}
              to={to}
              style={{ color: item === "Services" ? "#00d4ff" : "rgba(255,255,255,0.55)", textDecoration: "none", fontFamily: "'DM Sans',sans-serif", fontSize: "0.875rem", fontWeight: 500 }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = item === "Services" ? "#00d4ff" : "rgba(255,255,255,0.55)")}
            >
              {item}
            </Link>
          );
        })}
        <Link to="/contact" style={{ padding: "0.5rem 1.25rem", background: "linear-gradient(135deg,#00d4ff,#7c3aed)", border: "none", borderRadius: 8, color: "#fff", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "0.875rem", cursor: "pointer", textDecoration: "none", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>Contact Us</Link>
      </div>
    </motion.nav>
  );
}

/* ─────────────── GRID BG ─────────────── */
function GridBg() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      <svg width="100%" height="100%" style={{ position: "absolute", opacity: 0.05 }}>
        <defs><pattern id="grid2" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#fff" strokeWidth="0.5" /></pattern></defs>
        <rect width="100%" height="100%" fill="url(#grid2)" />
      </svg>
      <div style={{ position: "absolute", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,212,255,0.08) 0%,transparent 70%)", top: -200, left: -100 }} />
      <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(124,58,237,0.1) 0%,transparent 70%)", top: 0, right: 0 }} />
    </div>
  );
}

/* ─────────────── SERVICE DETAIL PANEL ─────────────── */
function ServicePanel({ svc }) {
  const [activeTab, setActiveTab] = useState("features");
  return (
    <motion.div
      key={svc.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      style={{
        background: "rgba(255,255,255,0.025)",
        border: `1px solid ${svc.color}25`,
        borderRadius: 20,
        overflow: "hidden",
      }}
    >
      {/* Panel header */}
      <div style={{
        padding: "2.5rem",
        background: `linear-gradient(135deg, ${svc.color}10 0%, rgba(5,8,18,0.4) 100%)`,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        position: "relative",
      }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,transparent,${svc.color},transparent)` }} />
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.7rem", color: svc.color, letterSpacing: "0.1em" }}>{svc.tag}</span>
              <span style={{ fontSize: "1.5rem", color: svc.color }}>{svc.icon}</span>
            </div>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "2rem", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "0.5rem" }}>{svc.title}</h2>
            <p style={{ color: svc.color, fontFamily: "'DM Sans',sans-serif", fontSize: "0.95rem", fontWeight: 500, fontStyle: "italic" }}>{svc.tagline}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "2.5rem", fontWeight: 900, background: `linear-gradient(135deg,${svc.color},#fff)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{svc.stat.value}</div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", fontFamily: "'DM Sans',sans-serif" }}>{svc.stat.label}</div>
          </div>
        </div>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.95rem", lineHeight: 1.75, fontWeight: 300, marginTop: "1.25rem", maxWidth: 640 }}>{svc.desc}</p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0 2.5rem" }}>
        {[
          { id: "features", label: "Features" },
          { id: "process", label: "Process" },
          { id: "tech", label: "Tech Stack" },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "1rem 1.5rem",
              background: "transparent",
              border: "none",
              borderBottom: `2px solid ${activeTab === tab.id ? svc.color : "transparent"}`,
              color: activeTab === tab.id ? "#fff" : "rgba(255,255,255,0.4)",
              fontFamily: "'DM Sans',sans-serif",
              fontWeight: 600, fontSize: "0.85rem",
              cursor: "pointer", transition: "all 0.2s",
              letterSpacing: "0.02em",
            }}
          >{tab.label}</button>
        ))}
      </div>

      {/* Tab content */}
      <div style={{ padding: "2.5rem" }}>
        <AnimatePresence mode="wait">
          {activeTab === "features" && (
            <motion.div key="features" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "0.85rem" }}>
              {svc.features.map((f, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                  style={{
                    display: "flex", alignItems: "flex-start", gap: "0.75rem",
                    padding: "0.85rem 1rem",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 10,
                  }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: svc.color, flexShrink: 0, marginTop: 5, boxShadow: `0 0 6px ${svc.color}80` }} />
                  <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.5, fontFamily: "'DM Sans',sans-serif" }}>{f}</span>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "process" && (
            <motion.div key="process" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem" }}>
              {svc.process.map((p, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                  style={{ position: "relative" }}>
                  {i < svc.process.length - 1 && (
                    <div style={{ position: "absolute", top: 20, left: "calc(100% - 8px)", width: "calc(100% - 24px)", height: 1, background: `linear-gradient(90deg,${svc.color}50,transparent)`, zIndex: 0 }} />
                  )}
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%",
                    background: `${svc.color}15`,
                    border: `2px solid ${svc.color}50`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'DM Mono',monospace", fontSize: "0.75rem", color: svc.color,
                    fontWeight: 600, marginBottom: "0.85rem", position: "relative", zIndex: 1,
                  }}>{String(i + 1).padStart(2, "0")}</div>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "1rem", fontWeight: 700, marginBottom: "0.4rem" }}>{p.step}</div>
                  <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.6, fontFamily: "'DM Sans',sans-serif", fontWeight: 300 }}>{p.desc}</div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "tech" && (
            <motion.div key="tech" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              {svc.tech.map((t, i) => (
                <motion.div key={t} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.07 }}
                  style={{
                    padding: "0.6rem 1.25rem",
                    background: `${svc.color}10`,
                    border: `1px solid ${svc.color}30`,
                    borderRadius: 8,
                    fontFamily: "'DM Mono',monospace",
                    fontSize: "0.85rem", color: svc.color,
                    letterSpacing: "0.04em",
                    transition: "all 0.2s",
                    cursor: "default",
                  }}
                  whileHover={{ background: `${svc.color}20`, scale: 1.05 }}
                >{t}</motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ─────────────── MAIN ─────────────── */
export default function ServicesPage() {
  const [selected, setSelected] = useState(services[0]);
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div style={{ background: "#050812", color: "#fff", fontFamily: "'DM Sans',sans-serif", overflowX: "hidden", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        ::selection { background:rgba(0,212,255,0.25); }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:#050812; }
        ::-webkit-scrollbar-thumb { background:#7c3aed; border-radius:2px; }
      `}</style>

      <Navbar />

      {/* ── HERO ── */}
      <section style={{ position: "relative", paddingTop: 140, paddingBottom: 80, padding: "140px 2rem 80px", textAlign: "center" }}>
        <GridBg />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.35rem 1rem", background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)", borderRadius: 100, marginBottom: "1.5rem" }}>
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.75rem", color: "#00d4ff", letterSpacing: "0.1em" }}>// WHAT WE OFFER</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "1.25rem" }}>
          Services Built for{" "}
          <span style={{ background: "linear-gradient(135deg,#00d4ff,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Scale</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          style={{ color: "rgba(255,255,255,0.45)", fontSize: "1.1rem", maxWidth: 540, margin: "0 auto", lineHeight: 1.7, fontWeight: 300 }}>
          End-to-end engineering capabilities — from frontend pixels to distributed infrastructure — delivered by a team that sweats the details.
        </motion.p>
      </section>

      {/* ── SERVICE SELECTOR + DETAIL ── */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem 6rem", display: "grid", gridTemplateColumns: "280px 1fr", gap: "2rem", alignItems: "start" }}>

        {/* Left sidebar */}
        <div style={{ position: "sticky", top: 100 }}>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.68rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem" }}>Select Service</div>
          {services.map((svc, i) => (
            <motion.button
              key={svc.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              onClick={() => setSelected(svc)}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: "0.85rem",
                padding: "0.85rem 1rem", marginBottom: "0.4rem",
                background: selected.id === svc.id ? `${svc.color}12` : "transparent",
                border: `1px solid ${selected.id === svc.id ? svc.color + "40" : "transparent"}`,
                borderRadius: 10, cursor: "pointer",
                transition: "all 0.2s", textAlign: "left",
              }}
              whileHover={{ x: 4 }}
            >
              <span style={{ fontSize: "1rem", color: selected.id === svc.id ? svc.color : "rgba(255,255,255,0.3)" }}>{svc.icon}</span>
              <div>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.6rem", color: selected.id === svc.id ? svc.color : "rgba(255,255,255,0.2)", letterSpacing: "0.1em", marginBottom: "0.1rem" }}>{svc.tag}</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "0.875rem", fontWeight: 700, color: selected.id === svc.id ? "#fff" : "rgba(255,255,255,0.55)" }}>{svc.title}</div>
              </div>
              {selected.id === svc.id && (
                <div style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", background: svc.color, boxShadow: `0 0 8px ${svc.color}` }} />
              )}
            </motion.button>
          ))}
        </div>

        {/* Right detail panel */}
        <div>
          <AnimatePresence mode="wait">
            <ServicePanel key={selected.id} svc={selected} />
          </AnimatePresence>
        </div>
      </section>

      {/* ── ALL SERVICES GRID (overview) ── */}
      <section style={{ background: "rgba(255,255,255,0.015)", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: "3rem", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.72rem", color: "#7c3aed", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem" }}>// Overview</div>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>Everything You Need</h2>
            </div>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.875rem", maxWidth: 320, lineHeight: 1.7, fontWeight: 300 }}>Six core service areas covering the full software delivery lifecycle.</p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem" }}>
            {services.map((svc, i) => (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                onClick={() => { setSelected(svc); window.scrollTo({ top: 400, behavior: "smooth" }); }}
                whileHover={{ y: -4, borderColor: svc.color + "50" }}
                style={{
                  padding: "1.75rem",
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 14, cursor: "pointer",
                  transition: "border-color 0.3s",
                  position: "relative", overflow: "hidden",
                }}
              >
                <div style={{ fontSize: "1.5rem", color: svc.color, marginBottom: "0.75rem" }}>{svc.icon}</div>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.62rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", marginBottom: "0.4rem" }}>{svc.tag}</div>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: "1rem", fontWeight: 700, marginBottom: "0.5rem", letterSpacing: "-0.02em" }}>{svc.title}</h3>
                <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.6, fontWeight: 300 }}>{svc.tagline}</p>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${svc.color}60,transparent)`, opacity: 0, transition: "opacity 0.3s" }}
                  onMouseEnter={e => e.currentTarget.style.opacity = 1}
                  onMouseLeave={e => e.currentTarget.style.opacity = 0}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.72rem", color: "#10b981", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem" }}>// Why SoraZen</div>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>The SoraZen Difference</h2>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}>
            {[
              { icon: "⚡", title: "Speed Without Compromise", desc: "We move fast — but never cut corners on quality, security, or maintainability.", color: "#f59e0b" },
              { icon: "🔍", title: "Deep Technical Ownership", desc: "We treat your codebase like our own — full ownership, clean commits, proper documentation.", color: "#00d4ff" },
              { icon: "🤝", title: "Transparent Communication", desc: "No surprises. Weekly standups, shared Notion boards, and honest status updates.", color: "#7c3aed" },
              { icon: "📐", title: "Architecture-First Thinking", desc: "Every project starts with design decisions, not just feature lists. We build to last.", color: "#10b981" },
              { icon: "🔄", title: "Iterative & Agile", desc: "Shippable increments every sprint. You see real progress, not just promises.", color: "#f43f5e" },
              { icon: "🛡️", title: "Security by Default", desc: "OWASP best practices, secret management, and security reviews baked in from day one.", color: "#06b6d4" },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{ padding: "1.75rem", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14 }}>
                <div style={{ fontSize: "1.5rem", marginBottom: "0.85rem" }}>{item.icon}</div>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: "1rem", fontWeight: 700, marginBottom: "0.5rem", letterSpacing: "-0.02em" }}>{item.title}</h3>
                <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.7, fontWeight: 300 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: "rgba(255,255,255,0.015)", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.72rem", color: "#f59e0b", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem" }}>// FAQ</div>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(1.8rem,3vw,2.4rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>Common Questions</h2>
          </motion.div>
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              style={{ marginBottom: "0.75rem", background: "rgba(255,255,255,0.025)", border: `1px solid ${openFaq === i ? "rgba(0,212,255,0.2)" : "rgba(255,255,255,0.07)"}`, borderRadius: 12, overflow: "hidden", transition: "border-color 0.3s" }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.25rem 1.5rem", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
                <span style={{ fontFamily: "'Syne',sans-serif", fontSize: "0.95rem", fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>{faq.q}</span>
                <motion.span animate={{ rotate: openFaq === i ? 45 : 0 }} style={{ fontSize: "1.2rem", color: openFaq === i ? "#00d4ff" : "rgba(255,255,255,0.35)", flexShrink: 0, marginLeft: "1rem" }}>+</motion.span>
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    style={{ padding: "0 1.5rem 1.25rem", color: "rgba(255,255,255,0.5)", fontSize: "0.875rem", lineHeight: 1.75, fontWeight: 300 }}>
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "5rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ position: "relative", padding: "4rem", borderRadius: 24, background: "linear-gradient(135deg,rgba(0,212,255,0.07) 0%,rgba(124,58,237,0.1) 100%)", border: "1px solid rgba(255,255,255,0.07)", textAlign: "center", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 30% 50%,rgba(0,212,255,0.07) 0%,transparent 50%),radial-gradient(circle at 70% 50%,rgba(124,58,237,0.09) 0%,transparent 50%)", pointerEvents: "none" }} />
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.72rem", color: "#00d4ff", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1rem" }}>// Ready to Start?</div>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "1rem" }}>Let's scope your project</h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "1rem", marginBottom: "2.5rem", maxWidth: 440, margin: "0 auto 2.5rem", fontWeight: 300, lineHeight: 1.7 }}>Book a free 30-minute discovery call. No commitments — just a clear plan of action.</p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={handleSubmit} style={{ padding: "0.9rem 2.25rem", background: "linear-gradient(135deg,#00d4ff,#7c3aed)", border: "none", borderRadius: 10, color: "#fff", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer", boxShadow: "0 0 30px rgba(0,212,255,0.25)" }}>
                Book a Discovery Call →
              </button>
              <button style={{ padding: "0.9rem 2.25rem", background: "transparent", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, color: "rgba(255,255,255,0.8)", fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: "0.95rem", cursor: "pointer" }}>
                View Our Projects
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "2rem", textAlign: "center", color: "rgba(255,255,255,0.2)", fontSize: "0.78rem", fontFamily: "'DM Mono',monospace" }}>
        © 2025 SoraZen Solutions — Built with precision &amp; purpose
      </footer>
    </div>
  );
}
