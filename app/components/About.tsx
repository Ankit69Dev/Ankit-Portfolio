"use client";
import { useEffect, useRef, useState } from "react";

const CODE_SNIPPET = `// ankit.config.ts
export const developer = {
  name: "Ankit Pandey",
  location: "India 🇮🇳",
  currentFocus: "Building scalable web apps",
  education: "B.Tech Computer Science",
  
  stack: {
    frontend: ["React", "Next.js", "TypeScript"],
    backend: ["Node.js", "Express", "NestJS"],
    database: ["PostgreSQL", "MongoDB", "Redis"],
    cloud: ["AWS", "Docker", "Vercel"],
  },

  philosophy: \`
    Write code that humans can read.
    Ship fast, iterate faster.
    Performance is a feature.
  \`,

  currentlyLearning: ["Rust", "WebAssembly", "AI/ML"],
  openToWork: true,
};`;

export default function About() {
  const [visible, setVisible] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let i = 0;
    const id = setInterval(() => {
      i += 3;
      setCharCount(i);
      if (i >= CODE_SNIPPET.length) clearInterval(id);
    }, 15);
    return () => clearInterval(id);
  }, [visible]);

  const highlights = [
    { icon: "🎯", label: "Focus", value: "Full Stack Dev" },
    { icon: "📍", label: "Based in", value: "India" },
    { icon: "⚡", label: "Specialty", value: "Performance" },
    { icon: "🔭", label: "Exploring", value: "Rust + WASM" },
  ];

  return (
    <section
      id="about"
      ref={ref}
      style={{
        padding: "100px 40px",
        maxWidth: "1200px",
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* Section label */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "64px",
        }}
      >
        <span
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.7rem",
            color: "var(--neon-green)",
            letterSpacing: "0.2em",
          }}
        >
          01
        </span>
        <div
          style={{
            width: "60px",
            height: "1px",
            background: "var(--neon-green)",
            boxShadow: "0 0 8px var(--neon-green)",
          }}
        />
        <h2
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "1.4rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          About
        </h2>
        <div
          style={{
            flex: 1,
            height: "1px",
            background: "rgba(0,255,136,0.1)",
          }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "60px",
          alignItems: "start",
        }}
        className="about-grid"
      >
        {/* Left: Text content */}
        <div>
          <p
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "1.1rem",
              color: "rgba(224,240,255,0.7)",
              lineHeight: 1.9,
              marginBottom: "24px",
            }}
          >
            Hey — I'm{" "}
            <span className="neon-green" style={{ fontWeight: 600 }}>
              Ankit Pandey
            </span>
            , a full stack developer who enjoys turning complex problems into
            elegant, performant solutions. I've been crafting web experiences
            for{" "}
            <span className="neon-blue">3+ years</span>, working across the
            entire stack.
          </p>
          <p
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "1.1rem",
              color: "rgba(224,240,255,0.7)",
              lineHeight: 1.9,
              marginBottom: "40px",
            }}
          >
            My stack centers on{" "}
            <span className="neon-green">React / Next.js</span> on the frontend
            and <span className="neon-blue">Node.js / NestJS</span> on the
            backend, with a strong emphasis on TypeScript, testing, and clean
            architecture. I care deeply about developer experience and
            production reliability.
          </p>

          {/* Highlight cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}
          >
            {highlights.map((h) => (
              <div
                key={h.label}
                className="terminal-window border-neon"
                style={{
                  padding: "16px",
                  transition: "all 0.3s",
                  cursor: "default",
                }}
              >
                <div style={{ fontSize: "1.2rem", marginBottom: "6px" }}>
                  {h.icon}
                </div>
                <div
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: "0.6rem",
                    color: "var(--text-muted)",
                    letterSpacing: "0.1em",
                    marginBottom: "4px",
                  }}
                >
                  {h.label}
                </div>
                <div
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: "var(--neon-green)",
                  }}
                >
                  {h.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Terminal code block */}
        <div className="terminal-window" style={{ opacity: visible ? 1 : 0, transition: "opacity 0.5s" }}>
          <div className="terminal-header">
            <div className="terminal-dot" style={{ background: "#ff5f57" }} />
            <div className="terminal-dot" style={{ background: "#febc2e" }} />
            <div className="terminal-dot" style={{ background: "#28c840" }} />
            <span
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.65rem",
                color: "var(--text-muted)",
                marginLeft: "8px",
              }}
            >
              ankit.config.ts
            </span>
          </div>
          <div
            style={{
              padding: "20px",
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.72rem",
              lineHeight: 1.7,
              color: "rgba(224,240,255,0.7)",
              whiteSpace: "pre-wrap",
              minHeight: "340px",
            }}
          >
            {syntaxHighlight(CODE_SNIPPET.slice(0, charCount))}
            {charCount < CODE_SNIPPET.length && (
              <span
                className="cursor-blink"
                style={{
                  display: "inline-block",
                  width: "8px",
                  height: "14px",
                  background: "var(--neon-green)",
                  verticalAlign: "middle",
                }}
              />
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function syntaxHighlight(code: string) {
  const lines = code.split("\n");
  return lines.map((line, i) => {
    let colored = line;
    const isComment = line.trim().startsWith("//");
    const isKey = /^\s+\w+:/.test(line);

    return (
      <span key={i}>
        {isComment ? (
          <span style={{ color: "rgba(0,255,136,0.35)" }}>{line}</span>
        ) : (
          line.split("").map((char, j) => {
            if (char === '"' || char === "`" || char === "'") {
              return (
                <span key={j} style={{ color: "#ffcc66" }}>
                  {char}
                </span>
              );
            }
            return char;
          })
        )}
        {i < lines.length - 1 && "\n"}
      </span>
    );
  });
}