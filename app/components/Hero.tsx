"use client";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

const ROLES = [
  "Full Stack Developer",
  "React Architect",
  "Node.js Engineer",
  "System Designer",
  "Code Craftsman",
];

function MatrixColumn({ x, delay }: { x: number; delay: number }) {
  const chars = "アイウエオカキクケコABCDEFGHIJKLMNOP0123456789";
  const col = Array.from({ length: 20 }, () => chars[Math.floor(Math.random() * chars.length)]);
  return (
    <div style={{ position: "absolute", left: x + "%", top: 0, display: "flex", flexDirection: "column", gap: "4px", animation: `matrixRain ${3 + delay}s linear infinite`, animationDelay: delay + "s", opacity: 0.06, fontSize: "0.7rem", color: "var(--neon-green)", fontFamily: "'Share Tech Mono', monospace", userSelect: "none", pointerEvents: "none" }}>
      {col.map((c, i) => <span key={i} style={{ opacity: 1 - i * 0.04 }}>{c}</span>)}
    </div>
  );
}

export default function Hero() {
  const isMobile = useIsMobile();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const [lineCount, setLineCount] = useState(0);

  useEffect(() => {
    const role = ROLES[roleIndex];
    if (typing) {
      if (displayed.length < role.length) {
        const t = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 80);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 2000);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
        return () => clearTimeout(t);
      } else {
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, roleIndex]);

  useEffect(() => {
    let count = 0;
    const id = setInterval(() => { count++; setLineCount(count); if (count >= 12) clearInterval(id); }, 150);
    return () => clearInterval(id);
  }, []);


  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: isMobile ? "80px 20px 60px" : "0 40px", position: "relative", overflow: "hidden" }} className="grid-bg">

      {/* Matrix rain */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {Array.from({ length: isMobile ? 6 : 15 }, (_, i) => (
          <MatrixColumn key={i} x={(i / (isMobile ? 6 : 15)) * 100} delay={i * 0.4} />
        ))}
      </div>

      {/* Glow */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: isMobile ? "300px" : "800px", height: isMobile ? "300px" : "800px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,255,136,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />


      {/* Main content */}
      <div style={{ maxWidth: "900px", position: "relative", zIndex: 1 }}>
        {/* Breadcrumb */}
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: isMobile ? "0.6rem" : "0.75rem", color: "var(--text-muted)", marginBottom: "20px", display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
          <span style={{ color: "var(--neon-green)" }}>root@portfolio</span>
          <span>:</span>
          <span style={{ color: "var(--neon-blue)" }}>~/home/ankit</span>
          <span>$ whoami</span>
        </div>

        {/* Name */}
        <h1 className="glow-green" data-text="ANKIT PANDEY" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(2rem, 10vw, 6rem)", fontWeight: 900, letterSpacing: "0.04em", color: "var(--neon-green)", lineHeight: 1, marginBottom: "14px" }}>
          ANKIT PANDEY
        </h1>

        {/* Typewriter role */}
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "clamp(0.85rem, 3vw, 1.4rem)", color: "var(--neon-blue)", marginBottom: "24px", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ color: "var(--text-muted)" }}>&gt;</span>
          <span>{displayed}</span>
          <span className="cursor-blink" style={{ width: "9px", height: "1.1em", background: "var(--neon-blue)", display: "inline-block", verticalAlign: "middle" }} />
        </div>

        {/* Bio */}
        <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: isMobile ? "1rem" : "1.1rem", color: "rgba(224,240,255,0.6)", maxWidth: "520px", lineHeight: 1.8, marginBottom: "36px", borderLeft: "2px solid rgba(0,255,136,0.3)", paddingLeft: "16px" }}>
          Architecting scalable web systems from frontend pixels to backend infrastructure. I write clean code, ship fast, and obsess over developer experience.
        </p>

        {/* CTA */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <a href="#projects" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.1em", color: "var(--bg)", background: "var(--neon-green)", padding: isMobile ? "12px 22px" : "14px 32px", textDecoration: "none", display: "inline-flex", alignItems: "center", transition: "all 0.3s", boxShadow: "0 0 20px rgba(0,255,136,0.4)" }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 0 40px rgba(0,255,136,0.7)")}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 0 20px rgba(0,255,136,0.4)")}>
            ./view-projects
          </a>
          <a href="#contact" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.1em", color: "var(--neon-green)", background: "transparent", padding: isMobile ? "11px 22px" : "13px 32px", textDecoration: "none", display: "inline-flex", alignItems: "center", border: "1px solid rgba(0,255,136,0.4)", transition: "all 0.3s" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,255,136,0.08)"; e.currentTarget.style.borderColor = "rgba(0,255,136,0.8)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(0,255,136,0.4)"; }}>
            ./get-in-touch
          </a>
        </div>

        {/* Stats */}
        <div style={{ marginTop: isMobile ? "40px" : "64px", display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, auto)", gap: isMobile ? "20px" : "0", columnGap: "40px", rowGap: "20px" }}>
          {[
            { label: "years_exp",        value: "2+"   },
            { label: "projects_shipped", value: "10+"  },
            { label: "technologies",     value: "10+"  },
            { label: "commits_ytd",      value: "200+" },
          ].map((stat) => (
            <div key={stat.label}>
              <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: isMobile ? "1.6rem" : "2rem", fontWeight: 700, color: "var(--neon-green)", lineHeight: 1 }} className="glow-green">{stat.value}</div>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.6rem", color: "var(--text-muted)", marginTop: "4px", letterSpacing: "0.08em" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", opacity: 0.35 }}>
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.2em", color: "var(--neon-green)" }}>SCROLL</div>
        <div style={{ width: "1px", height: "32px", background: "linear-gradient(to bottom, var(--neon-green), transparent)", animation: "float 2s ease-in-out infinite" }} />
      </div>
    </section>
  );
}