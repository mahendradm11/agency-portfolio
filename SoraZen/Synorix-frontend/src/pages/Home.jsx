import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const services = [
  {
    icon: "◈",
    title: "Web Development",
    desc: "Crafting fast, responsive web applications with modern frameworks and pixel-perfect UI.",
    accent: "#00d4ff",
  },
  {
    icon: "⬡",
    title: "REST API Development",
    desc: "Robust, scalable APIs built with best practices — documented, versioned, and production-ready.",
    accent: "#7c3aed",
  },
  {
    icon: "◎",
    title: "Microservices Architecture",
    desc: "Decompose monoliths into resilient, independently deployable services that scale on demand.",
    accent: "#10b981",
  },
  {
    icon: "◉",
    title: "Database Design",
    desc: "Schema design, query optimization, and data modeling for relational and NoSQL systems.",
    accent: "#f59e0b",
  },
];

const projects = [
  {
    tag: "FinTech",
    title: "Trading Platform",
    desc: "Real-time stock trading system with WebSocket-driven live updates, portfolio analytics, and secure transaction handling.",
    tech: ["Spring Boot", "React", "WebSocket", "PostgreSQL"],
    color: "#00d4ff",
  },
  {
    tag: "AgriTech · ML",
    title: "Crop Recommendation",
    desc: "Machine learning model that analyzes soil data, weather patterns, and historical yields to recommend optimal crops.",
    tech: ["Python", "scikit-learn", "FastAPI", "React"],
    color: "#10b981",
  },
];

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "30+", label: "Happy Clients" },
  { value: "5+", label: "Years Experience" },
  { value: "99%", label: "Client Satisfaction" },
];

// ── NAV ITEMS: "/" prefix = React Router, "#" prefix = anchor
const NAV_ITEMS = [
  { label: "Services", to: "/services" },
  { label: "Projects", to: "#projects" },
];

const linkStyle = {
  color: "rgba(255,255,255,0.65)",
  textDecoration: "none",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "0.875rem",
  fontWeight: 500,
  letterSpacing: "0.02em",
  transition: "color 0.2s",
};

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 100,
        padding: "1rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "rgba(5,8,18,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.4s ease",
      }}
    >
      {/* Logo — click goes home */}
      <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
        <img src="/sorazen-logo.svg" alt="SoraZen" style={{ width: 40, height: 40, flexShrink: 0 }} />
        <span style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800, fontSize: "1.1rem",
          color: "#fff", letterSpacing: "-0.02em",
        }}>SoraZen</span>
      </Link>

      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        {NAV_ITEMS.map(item =>
          item.to.startsWith("/") ? (
            // ← React Router navigation
            <Link
              key={item.label}
              to={item.to}
              style={linkStyle}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
            >
              {item.label}
            </Link>
          ) : (
            // ← In-page anchor scroll
            <a
              key={item.label}
              href={item.to}
              style={linkStyle}
              onMouseEnter={e => (e.target.style.color = "#fff")}
              onMouseLeave={e => (e.target.style.color = "rgba(255,255,255,0.65)")}
            >
              {item.label}
            </a>
          )
        )}

        <Link to="/contact">  <button style={{
    padding: "0.5rem 1.25rem",
    background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
    border: "none",
    borderRadius: 8,
    color: "#fff",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 600,
    fontSize: "0.875rem",
    cursor: "pointer",
    letterSpacing: "0.02em",
  }}>
    Contact Us
  </button>
</Link>
      </div>
    </motion.nav>
  );
}

function GridBackground() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      <svg width="100%" height="100%" style={{ position: "absolute", opacity: 0.06 }}>
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#fff" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      <div style={{
        position: "absolute", width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 70%)",
        top: -100, left: -100,
        animation: "pulse1 8s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute", width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
        top: 100, right: -50,
        animation: "pulse2 10s ease-in-out infinite",
      }} />
      <style>{`
        @keyframes pulse1 { 0%,100%{transform:scale(1) translate(0,0)} 50%{transform:scale(1.1) translate(20px,20px)} }
        @keyframes pulse2 { 0%,100%{transform:scale(1) translate(0,0)} 50%{transform:scale(1.15) translate(-20px,10px)} }
      `}</style>
    </div>
  );
}

export default function Home() {
  const [activeService, setActiveService] = useState(null);
  const navigate = useNavigate();

  return (
    <div style={{
      background: "#050812", color: "#fff",
      fontFamily: "'DM Sans', sans-serif",
      overflowX: "hidden", minHeight: "100vh",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(0,212,255,0.3); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #050812; }
        ::-webkit-scrollbar-thumb { background: #7c3aed; border-radius: 2px; }
        @keyframes ping  { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0}   }
      `}</style>

      <Navbar />

      {/* ── HERO ── */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", padding: "0 2rem" }}>
        <GridBackground />
        <div style={{
          maxWidth: 1100, margin: "0 auto", width: "100%",
          paddingTop: 80,
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "4rem", alignItems: "center",
        }}>
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                padding: "0.35rem 1rem",
                background: "rgba(0,212,255,0.08)",
                border: "1px solid rgba(0,212,255,0.2)",
                borderRadius: 100, marginBottom: "1.5rem",
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00d4ff", display: "inline-block", animation: "ping 1.5s ease-in-out infinite" }} />
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: "#00d4ff", letterSpacing: "0.08em" }}>AVAILABLE FOR PROJECTS</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2.5rem, 5vw, 3.8rem)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: "1.5rem" }}
            >
              We Build{" "}
              <span style={{ background: "linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Intelligent</span>
              {" "}IT Solutions
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: 480, fontWeight: 300 }}
            >
              SoraZen crafts scalable, modern software — from reactive frontends to distributed backend architectures — tailored for the products of tomorrow.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
            >
              {/* "Get Started" → navigates to /services */}
              <button
                onClick={() => navigate("/services")}
                style={{
                  padding: "0.85rem 2rem",
                  background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
                  border: "none", borderRadius: 10,
                  color: "#fff", fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600, fontSize: "0.95rem", cursor: "pointer",
                  boxShadow: "0 0 30px rgba(0,212,255,0.25)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 0 40px rgba(0,212,255,0.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)";   e.currentTarget.style.boxShadow = "0 0 30px rgba(0,212,255,0.25)"; }}
              >Get Started →</button>

              {/* "View Projects" → scrolls to #projects */}
              <a href="#projects" style={{ textDecoration: "none" }}>
                <button style={{
                  padding: "0.85rem 2rem",
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 10,
                  color: "rgba(255,255,255,0.8)", fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 500, fontSize: "0.95rem", cursor: "pointer",
                  transition: "border-color 0.2s, color 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.8)"; }}
                >View Projects</button>
              </a>
            </motion.div>
          </div>

          {/* Hero visual — code window */}
          <motion.div
            initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            style={{ position: "relative" }}
          >
            <div style={{
              position: "relative",
              background: "linear-gradient(135deg, rgba(0,212,255,0.06), rgba(124,58,237,0.06))",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 20, padding: "2rem",
              backdropFilter: "blur(10px)",
            }}>
              <div style={{ display: "flex", gap: 6, marginBottom: "1.5rem" }}>
                {["#ff5f57", "#febc2e", "#28c840"].map(c => (
                  <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
                ))}
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", marginLeft: "auto" }}>sorazen.dev</span>
              </div>
              {[
                { color: "#7c3aed",              text: "class SoraZenSolutions {" },
                { color: "#00d4ff",              text: "  stack = ["              },
                { color: "rgba(255,255,255,0.5)", text: '    "Spring Boot", "React",' },
                { color: "rgba(255,255,255,0.5)", text: '    "Microservices", "ML",'  },
                { color: "#00d4ff",              text: "  ];"                    },
                { color: "rgba(255,255,255,0.35)", text: ""                       },
                { color: "#10b981",              text: "  async build(idea) {"   },
                { color: "rgba(255,255,255,0.5)", text: "    const product = await" },
                { color: "rgba(255,255,255,0.5)", text: "      this.transform(idea);" },
                { color: "#f59e0b",              text: "    return product.launch();" },
                { color: "#10b981",              text: "  }"                     },
                { color: "#7c3aed",              text: "}"                       },
              ].map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.05 }}
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.8rem", lineHeight: 1.8, color: line.color, whiteSpace: "pre" }}
                >{line.text}</motion.div>
              ))}
              <div style={{ display: "inline-block", width: 8, height: 16, background: "#00d4ff", animation: "blink 1s step-end infinite", marginTop: 4, borderRadius: 1 }} />
              <div style={{ position: "absolute", bottom: -20, right: -20, width: 120, height: 120, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)", pointerEvents: "none" }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ padding: "2rem", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2rem" }}>
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "2.2rem", fontWeight: 900, background: "linear-gradient(135deg, #00d4ff, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{s.value}</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", fontWeight: 500, marginTop: "0.25rem" }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: "3.5rem" }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: "#00d4ff", letterSpacing: "0.15em", marginBottom: "0.75rem", textTransform: "uppercase" }}>// What We Do</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1 }}>Our Core Services</h2>
              {/* "See all services" link */}
              <Link to="/services" style={{
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                padding: "0.5rem 1.1rem",
                background: "rgba(0,212,255,0.07)",
                border: "1px solid rgba(0,212,255,0.2)",
                borderRadius: 8,
                color: "#00d4ff",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.82rem", fontWeight: 600,
                textDecoration: "none",
                transition: "background 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,212,255,0.14)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(0,212,255,0.07)")}
              >View All Services →</Link>
            </div>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem" }}>
            {services.map((svc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                onMouseEnter={() => setActiveService(i)}
                onMouseLeave={() => setActiveService(null)}
                style={{
                  position: "relative", padding: "2rem",
                  background: activeService === i
                    ? `linear-gradient(135deg, rgba(${svc.accent === "#00d4ff" ? "0,212,255" : svc.accent === "#7c3aed" ? "124,58,237" : svc.accent === "#10b981" ? "16,185,129" : "245,158,11"},0.08), rgba(5,8,18,0.8))`
                    : "rgba(255,255,255,0.025)",
                  border: `1px solid ${activeService === i ? svc.accent + "40" : "rgba(255,255,255,0.07)"}`,
                  borderRadius: 16, cursor: "default",
                  transition: "all 0.3s ease", overflow: "hidden",
                }}
              >
                <div style={{ fontSize: "1.8rem", marginBottom: "1rem", color: svc.accent, lineHeight: 1 }}>{svc.icon}</div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>{svc.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem", lineHeight: 1.7, fontWeight: 300 }}>{svc.desc}</p>
                {activeService === i && (
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${svc.accent}, transparent)` }} />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ padding: "6rem 2rem", background: "rgba(255,255,255,0.015)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: "3.5rem" }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: "#7c3aed", letterSpacing: "0.15em", marginBottom: "0.75rem", textTransform: "uppercase" }}>// Our Work</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>Featured Projects</h2>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem" }}>
            {projects.map((proj, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                whileHover={{ y: -4 }}
                style={{ padding: "2.5rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, position: "relative", overflow: "hidden", cursor: "pointer" }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${proj.color}, transparent)` }} />
                <div style={{ display: "inline-block", padding: "0.25rem 0.75rem", background: `${proj.color}18`, border: `1px solid ${proj.color}30`, borderRadius: 100, fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: proj.color, letterSpacing: "0.08em", marginBottom: "1.25rem", textTransform: "uppercase" }}>{proj.tag}</div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "0.75rem" }}>{proj.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem", lineHeight: 1.7, fontWeight: 300, marginBottom: "1.5rem" }}>{proj.desc}</p>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {proj.tech.map(t => (
                    <span key={t} style={{ padding: "0.2rem 0.65rem", background: "rgba(255,255,255,0.05)", borderRadius: 6, fontSize: "0.72rem", color: "rgba(255,255,255,0.45)", fontFamily: "'DM Mono', monospace" }}>{t}</span>
                  ))}
                </div>
                <div style={{ position: "absolute", bottom: -30, right: -30, width: 100, height: 100, borderRadius: "50%", background: `radial-gradient(circle, ${proj.color}15 0%, transparent 70%)`, pointerEvents: "none" }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={{ position: "relative" }}>
            <div style={{ position: "relative", padding: "2.5rem", background: "linear-gradient(135deg, rgba(0,212,255,0.04), rgba(124,58,237,0.04))", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20 }}>
              {[
                { label: "Frontend", color: "#00d4ff", icons: ["React", "Next.js", "TypeScript"] },
                { label: "Backend",  color: "#7c3aed", icons: ["Spring Boot", "Node.js", "FastAPI"] },
                { label: "DevOps",   color: "#10b981", icons: ["Docker", "K8s", "AWS"] },
              ].map((row, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.15 }}
                  style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.85rem 1rem", marginBottom: "0.75rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: row.color, flexShrink: 0, boxShadow: `0 0 8px ${row.color}80` }} />
                  <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.85rem", width: 80, flexShrink: 0 }}>{row.label}</span>
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {row.icons.map(ic => (
                      <span key={ic} style={{ padding: "0.15rem 0.55rem", background: `${row.color}15`, borderRadius: 5, fontSize: "0.7rem", color: row.color, fontFamily: "'DM Mono', monospace" }}>{ic}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: "#10b981", letterSpacing: "0.15em", marginBottom: "0.75rem", textTransform: "uppercase" }}>// About Us</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: "1.5rem" }}>Built on expertise,<br />driven by innovation</h2>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.95rem", lineHeight: 1.8, fontWeight: 300, marginBottom: "1rem" }}>
              SoraZen Solutions is a software engineering studio focused on delivering robust, high-performance applications using modern technologies like Spring Boot, React, and distributed Microservices.
            </p>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.875rem", lineHeight: 1.8, fontWeight: 300, marginBottom: "2rem" }}>
              From early-stage startups to established enterprises, we bring deep technical expertise and a product-first mindset to every engagement.
            </p>
            <button style={{ padding: "0.85rem 2rem", background: "transparent", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.9rem", cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
            >Our Story →</button>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "5rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ position: "relative", padding: "4rem", borderRadius: 24, background: "linear-gradient(135deg, rgba(0,212,255,0.08) 0%, rgba(124,58,237,0.12) 100%)", border: "1px solid rgba(255,255,255,0.08)", textAlign: "center", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 30% 50%, rgba(0,212,255,0.08) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(124,58,237,0.1) 0%, transparent 50%)", pointerEvents: "none" }} />
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: "#00d4ff", letterSpacing: "0.15em", marginBottom: "1rem", textTransform: "uppercase" }}>// Let's Work Together</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "1rem", lineHeight: 1.1 }}>Have an idea?<br />Let's build it. 🚀</h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1rem", maxWidth: 480, margin: "0 auto 2.5rem", fontWeight: 300, lineHeight: 1.7 }}>Tell us about your project and we'll get back to you within 24 hours.</p>
            <button onClick={() => window.location.href = 'tel:+919353227875'} style={{ padding: "1rem 2.5rem", background: "linear-gradient(135deg, #00d4ff, #7c3aed)", border: "none", borderRadius: 12, color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "1rem", cursor: "pointer", boxShadow: "0 0 40px rgba(0,212,255,0.3)", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 50px rgba(0,212,255,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)";   e.currentTarget.style.boxShadow = "0 0 40px rgba(0,212,255,0.3)"; }}
            >Start a Conversation →</button>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "2rem", textAlign: "center", color: "rgba(255,255,255,0.25)", fontSize: "0.8rem", fontFamily: "'DM Mono', monospace" }}>
        © 2026 SoraZen Solutions — Built with precision &amp; purpose
      </footer>
    </div>
  );
}
