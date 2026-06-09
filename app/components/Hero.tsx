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
  const chars = "アイウエオカキABCDEFGHIJKLMN0123456789";
  const col = Array.from({ length: 20 }, () => chars[Math.floor(Math.random() * chars.length)]);
  return (
    <div style={{ position: "absolute", left: x + "%", top: 0, display: "flex", flexDirection: "column", gap: "4px", animation: `matrixRain ${3 + delay}s linear infinite`, animationDelay: delay + "s", opacity: 0.05, fontSize: "0.65rem", color: "var(--neon-green)", fontFamily: "'JetBrains Mono', monospace", userSelect: "none", pointerEvents: "none" }}>
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
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: isMobile ? "100px 20px 60px" : "0 40px",
        position: "relative",
        overflow: "hidden",
      }}
      className="grid-bg"
    >
      {/* Matrix rain */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {Array.from({ length: isMobile ? 5 : 14 }, (_, i) => (
          <MatrixColumn key={i} x={(i / (isMobile ? 5 : 14)) * 100} delay={i * 0.4} />
        ))}
      </div>

      {/* Radial glow */}
      <div style={{ position: "absolute", top: "50%", left: isMobile ? "50%" : "30%", transform: "translate(-50%,-50%)", width: isMobile ? "320px" : "700px", height: isMobile ? "320px" : "700px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,255,136,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* ── MAIN TWO-COLUMN LAYOUT ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr auto",
        gap: isMobile ? "48px" : "60px",
        alignItems: "center",
        width: "100%",
        maxWidth: "1160px",
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
      }}>

        {/* LEFT — text content */}
        <div>
          {/* Breadcrumb */}
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: isMobile ? "0.6rem" : "0.7rem", color: "var(--text-muted)", marginBottom: "20px", display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
            <span style={{ color: "var(--neon-green)" }}>root@portfolio</span>
            <span>:</span>
            <span style={{ color: "var(--neon-blue)" }}>~/home/ankit</span>
            <span>$ whoami</span>
          </div>

          {/* Name */}
          <h1
            className="glow-green"
            data-text="ANKIT PANDEY"
            style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2.2rem, 9vw, 5.5rem)", fontWeight: 800, letterSpacing: "-0.01em", color: "var(--neon-green)", lineHeight: 1, marginBottom: "16px" }}
          >
            ANKIT PANDEY
          </h1>

          {/* Typewriter */}
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(0.82rem, 2.5vw, 1.2rem)", color: "var(--neon-blue)", marginBottom: "24px", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ color: "var(--text-muted)" }}>&gt;</span>
            <span>{displayed}</span>
            <span className="cursor-blink" style={{ width: "9px", height: "1.1em", background: "var(--neon-blue)", display: "inline-block", verticalAlign: "middle" }} />
          </div>

          {/* Bio */}
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: isMobile ? "0.97rem" : "1.08rem", color: "rgba(224,240,255,0.6)", maxWidth: "480px", lineHeight: 1.8, marginBottom: "36px", borderLeft: "2px solid rgba(0,255,136,0.3)", paddingLeft: "16px" }}>
            Architecting scalable web systems from frontend pixels to backend infrastructure. I write clean code, ship fast, and obsess over developer experience.
          </p>

          {/* CTA */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a href="#projects"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.08em", color: "var(--bg)", background: "var(--neon-green)", padding: isMobile ? "12px 22px" : "13px 28px", textDecoration: "none", display: "inline-flex", alignItems: "center", transition: "all 0.3s", boxShadow: "0 0 20px rgba(0,255,136,0.35)" }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 0 40px rgba(0,255,136,0.65)")}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 0 20px rgba(0,255,136,0.35)")}>
              ./view-projects
            </a>
            <a href="#contact"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.08em", color: "var(--neon-green)", background: "transparent", padding: isMobile ? "11px 22px" : "12px 28px", textDecoration: "none", display: "inline-flex", alignItems: "center", border: "1px solid rgba(0,255,136,0.4)", transition: "all 0.3s" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,255,136,0.07)"; e.currentTarget.style.borderColor = "rgba(0,255,136,0.8)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(0,255,136,0.4)"; }}>
              ./get-in-touch
            </a>
          </div>

          {/* Stats */}
          <div style={{ marginTop: isMobile ? "36px" : "56px", display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, auto)", columnGap: "36px", rowGap: "20px" }}>
            {[
              { label: "years_exp",        value: "2+"   },
              { label: "projects_shipped", value: "10+"  },
              { label: "technologies",     value: "10+"  },
              { label: "commits_ytd",      value: "200+" },
            ].map((stat) => (
              <div key={stat.label}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: isMobile ? "1.6rem" : "2rem", fontWeight: 800, color: "var(--neon-green)", lineHeight: 1 }} className="glow-green">{stat.value}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.58rem", color: "var(--text-muted)", marginTop: "4px", letterSpacing: "0.08em" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — developer photo */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          order: isMobile ? -1 : 0,
        }}>
          {/* Outer ring */}
          <div style={{
            position: "relative",
            width: isMobile ? "200px" : "300px",
            height: isMobile ? "200px" : "300px",
          }}>
            {/* Rotating dashed ring */}
            <div style={{
              position: "absolute",
              inset: "-12px",
              borderRadius: "50%",
              border: "1px dashed rgba(0,255,136,0.25)",
              animation: "spin 20s linear infinite",
            }} />
            {/* Static glow ring */}
            <div style={{
              position: "absolute",
              inset: "-6px",
              borderRadius: "50%",
              border: "1px solid rgba(0,255,136,0.15)",
              boxShadow: "0 0 30px rgba(0,255,136,0.1), inset 0 0 30px rgba(0,255,136,0.05)",
            }} />

            {/* HUD corner ticks */}
            {[0, 90, 180, 270].map((deg) => (
              <div key={deg} style={{
                position: "absolute",
                top: "50%", left: "50%",
                width: "8px", height: "2px",
                background: "var(--neon-green)",
                transformOrigin: `${isMobile ? -88 : -138}px 50%`,
                transform: `rotate(${deg}deg) translateX(-50%)`,
                opacity: 0.6,
              }} />
            ))}

            {/* Photo circle — replace src with your image path e.g. /photo.jpg */}
            <div style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              overflow: "hidden",
              background: "var(--card-bg)",
              border: "2px solid rgba(0,255,136,0.3)",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}>
              {/* ── PHOTO PLACEHOLDER ────────────────────────────── */}

                     <img src="/photo.jpg" alt="Ankit Pandey"
                          style={{ width:"100%", height:"100%", objectFit:"cover" }} />
          
              {/* Scanline overlay */}
              <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,255,136,0.015) 3px, rgba(0,255,136,0.015) 4px)", pointerEvents: "none", borderRadius: "50%" }} />
            </div>

            {/* Status badge — bottom of photo */}
            <div style={{
              position: "absolute",
              bottom: isMobile ? "-18px" : "-22px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "var(--card-bg)",
              border: "1px solid rgba(0,255,136,0.3)",
              padding: "4px 14px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              whiteSpace: "nowrap",
            }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--neon-green)", boxShadow: "0 0 8px var(--neon-green)", animation: "blink 2s ease-in-out infinite" }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.58rem", color: "var(--neon-green)", letterSpacing: "0.1em" }}>AVAILABLE</span>
            </div>
          </div>

          {/* Tech tags below photo — desktop only */}
          {!isMobile && (
            <div style={{ marginTop: "48px", display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center", maxWidth: "280px" }}>
              {["React", "Next.js", "Node.js", "TypeScript", "Docker"].map((tag) => (
                <span key={tag} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "rgba(0,212,255,0.6)", background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.15)", padding: "4px 10px" }}>{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: "28px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", opacity: 0.3 }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.2em", color: "var(--neon-green)" }}>SCROLL</div>
        <div style={{ width: "1px", height: "28px", background: "linear-gradient(to bottom, var(--neon-green), transparent)", animation: "float 2s ease-in-out infinite" }} />
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}