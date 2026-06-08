"use client";
import { useState, useEffect } from "react";

const ROLES = [
  "Full Stack Developer",
  "React Architect",
  "Node.js Engineer",
  "System Designer",
  "Code Craftsman",
];

function MatrixColumn({ x, delay }: { x: number; delay: number }) {
  const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const col = Array.from({ length: 20 }, (_, i) =>
    chars[Math.floor(Math.random() * chars.length)]
  );
  return (
    <div
      style={{
        position: "absolute",
        left: x + "%",
        top: 0,
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        animation: `matrixRain ${3 + delay}s linear infinite`,
        animationDelay: delay + "s",
        opacity: 0.07,
        fontSize: "0.7rem",
        color: "var(--neon-green)",
        fontFamily: "'Share Tech Mono', monospace",
        userSelect: "none",
        pointerEvents: "none",
      }}
    >
      {col.map((c, i) => (
        <span key={i} style={{ opacity: 1 - i * 0.04 }}>
          {c}
        </span>
      ))}
    </div>
  );
}

export default function Hero() {
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
    const id = setInterval(() => {
      count++;
      setLineCount(count);
      if (count >= 12) clearInterval(id);
    }, 150);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 40px",
        position: "relative",
        overflow: "hidden",
      }}
      className="grid-bg"
    >
      {/* Matrix rain background */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {Array.from({ length: 15 }, (_, i) => (
          <MatrixColumn key={i} x={(i / 15) * 100} delay={i * 0.4} />
        ))}
      </div>

      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "800px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,255,136,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Main content */}
      <div style={{ maxWidth: "900px", position: "relative", zIndex: 1 }}>
        {/* Breadcrumb */}
        <div
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ color: "var(--neon-green)" }}>root@portfolio</span>
          <span>:</span>
          <span style={{ color: "var(--neon-blue)" }}>~/home/ankit</span>
          <span>$</span>
          <span style={{ color: "rgba(255,255,255,0.4)" }}>whoami</span>
        </div>

        {/* Name */}
        <h1
          className="glow-green"
          data-text="ANKIT PANDEY"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "clamp(2.5rem, 8vw, 6rem)",
            fontWeight: 900,
            letterSpacing: "0.05em",
            color: "var(--neon-green)",
            lineHeight: 1,
            marginBottom: "16px",
          }}
        >
          ANKIT PANDEY
        </h1>

        {/* Role typewriter */}
        <div
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
            color: "var(--neon-blue)",
            marginBottom: "32px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ color: "var(--text-muted)" }}>&gt;</span>
          <span>{displayed}</span>
          <span
            className="cursor-blink"
            style={{
              width: "10px",
              height: "1.2em",
              background: "var(--neon-blue)",
              display: "inline-block",
              verticalAlign: "middle",
            }}
          />
        </div>

        {/* Bio */}
        <p
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "1.1rem",
            color: "rgba(224,240,255,0.6)",
            maxWidth: "540px",
            lineHeight: 1.8,
            marginBottom: "48px",
            borderLeft: "2px solid rgba(0,255,136,0.3)",
            paddingLeft: "20px",
          }}
        >
          Architecting scalable web systems from frontend pixels to backend infrastructure.
          I write clean code, ship fast, and obsess over developer experience.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <a
            href="#projects"
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.8rem",
              letterSpacing: "0.1em",
              color: "var(--bg)",
              background: "var(--neon-green)",
              padding: "14px 32px",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.3s",
              boxShadow: "0 0 20px rgba(0,255,136,0.4)",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.boxShadow =
                "0 0 40px rgba(0,255,136,0.7)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.boxShadow =
                "0 0 20px rgba(0,255,136,0.4)";
            }}
          >
            ./view-projects
          </a>
          <a
            href="#contact"
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.8rem",
              letterSpacing: "0.1em",
              color: "var(--neon-green)",
              background: "transparent",
              padding: "13px 32px",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              border: "1px solid rgba(0,255,136,0.4)",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              const el = e.target as HTMLElement;
              el.style.background = "rgba(0,255,136,0.08)";
              el.style.borderColor = "rgba(0,255,136,0.8)";
            }}
            onMouseLeave={(e) => {
              const el = e.target as HTMLElement;
              el.style.background = "transparent";
              el.style.borderColor = "rgba(0,255,136,0.4)";
            }}
          >
            ./get-in-touch
          </a>
        </div>

        {/* Stats row */}
        <div
          style={{
            marginTop: "64px",
            display: "flex",
            gap: "48px",
            flexWrap: "wrap",
          }}
        >
          {[
            { label: "years_exp", value: "2+" },
            { label: "projects_shipped", value: "10+" },
            { label: "technologies", value: "10+" },
            { label: "commits_ytd", value: "200+" },
          ].map((stat) => (
            <div key={stat.label}>
              <div
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "var(--neon-green)",
                  lineHeight: 1,
                }}
                className="glow-green"
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "0.65rem",
                  color: "var(--text-muted)",
                  marginTop: "4px",
                  letterSpacing: "0.08em",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          opacity: 0.4,
        }}
      >
        <div
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            color: "var(--neon-green)",
          }}
        >
          SCROLL
        </div>
        <div
          style={{
            width: "1px",
            height: "40px",
            background:
              "linear-gradient(to bottom, var(--neon-green), transparent)",
            animation: "float 2s ease-in-out infinite",
          }}
        />
      </div>
    </section>
  );
}