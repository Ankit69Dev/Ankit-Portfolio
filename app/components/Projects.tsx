"use client";
import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

const PROJECTS = [
  {
    id: "01", name: "Smart Trip Planner", tagline: "AI-Powered Travel Planning Platform",
    description: "AI-powered travel planner that creates personalized itineraries, recommends destinations, and helps travelers plan smarter trips effortlessly..",
    stack: ["Next.js", "React", "PostgreSQL", "Tailwind CSS", "OpenStreetMap API"],
    github: "https://github.com/Ankit69Dev", live: "https://ai-smart-trip-planner.vercel.app/", color: "var(--neon-green)", status: "PRODUCTION", lines: "12,400",
  },
  {
    id: "02", name: "SpendWise AI", tagline: "Personal Expense Management Platform",
    description: "AI-powered expense tracker that helps users manage spending, track budgets, and gain smart financial insights for better money decisions.",
    stack: ["React", "Node.js", "TypeScript", "Tailwind CSS", "GroqAI API"],
    github: "https://github.com/Ankit69Dev", live: "https://ai-expense-tracker-spendwise-green.vercel.app/", color: "var(--neon-blue)", status: "PRODUCTION", lines: "9,200",
  },
  {
    id: "03", name: "Anonymous Feedback Box", tagline: "Feedback & Communication Platform",
    description: "Anonymous feedback platform that allows users to share honest opinions, suggestions, and reviews securely without revealing their identity.",
    stack: ["TypeScript", "GraphQL", "Express", "Prisma", "Jest"],
    github: "https://github.com/Ankit69Dev", live: "https://anonymous-feedback-box.vercel.app/", color: "var(--neon-purple)", status: "PRODUCTION", lines: "6,800",
  },
  {
    id: "04", name: "ThreadOS", tagline: "Async task queue & scheduler",
    description: "A distributed task queue built in Node.js with priority queues, retries, dead-letter queues, and a real-time web UI.",
    stack: ["Node.js", "Redis", "BullMQ", "React", "WebSockets"],
    github: "#", live: "#", color: "var(--neon-orange)", status: "BETA", lines: "5,100",
  },
];

export default function Projects() {
  const isMobile = useIsMobile();
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={ref} style={{ padding: isMobile ? "70px 20px" : "100px 40px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Section label */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: isMobile ? "40px" : "64px" }}>
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.7rem", color: "var(--neon-blue)", letterSpacing: "0.2em" }}>02</span>
        <div style={{ width: "40px", height: "1px", background: "var(--neon-blue)", boxShadow: "0 0 8px var(--neon-blue)" }} />
        <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: isMobile ? "1.1rem" : "1.4rem", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "0.15em" }}>Projects</h2>
        <div style={{ flex: 1, height: "1px", background: "rgba(0,212,255,0.1)" }} />
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: "20px" }}>
        {PROJECTS.map((project, i) => (
          <div
            key={project.id}
            className="project-card terminal-window"
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            style={{
              padding: isMobile ? "20px" : "28px",
              cursor: "pointer",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(30px)",
              transition: `all 0.5s ease ${i * 0.1}s`,
              border: active === i ? `1px solid ${project.color}` : "1px solid rgba(255,255,255,0.06)",
              boxShadow: active === i ? `0 0 30px ${project.color}22` : "none",
            }}
          >
            {/* Top */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "1.8rem", fontWeight: 900, color: project.color, opacity: 0.25, lineHeight: 1 }}>{project.id}</span>
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.12em", color: project.color, border: `1px solid ${project.color}`, padding: "3px 8px", opacity: 0.8 }}>{project.status}</span>
            </div>

            <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: isMobile ? "1rem" : "1.1rem", fontWeight: 700, color: project.color, letterSpacing: "0.05em", marginBottom: "4px" }}>{project.name}</h3>
            <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem", color: "var(--text-muted)", marginBottom: "12px", letterSpacing: "0.04em" }}>{project.tagline}</p>
            <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.95rem", color: "rgba(224,240,255,0.55)", lineHeight: 1.7, marginBottom: "20px" }}>{project.description}</p>

            {/* Stack */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
              {project.stack.map((tech) => (
                <span key={tech} style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.06em", color: project.color, background: `${project.color}12`, border: `1px solid ${project.color}30`, padding: "3px 8px" }}>{tech}</span>
              ))}
            </div>

            {/* Footer */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "14px", borderTop: `1px solid ${project.color}15` }}>
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.58rem", color: "var(--text-muted)" }}>~{project.lines} lines</span>
              <div style={{ display: "flex", gap: "14px" }}>
                <a href={project.github} style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.62rem", color: "var(--text-muted)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = project.color)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}>
                  [github]
                </a>
                <a href={project.live} style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.62rem", color: project.color, textDecoration: "none" }}>[live →]</a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View more */}
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <a href="https://github.com/Ankit69Dev" target="_blank" rel="noopener noreferrer"
          style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.1em", color: "var(--text-muted)", textDecoration: "none", padding: "12px 28px", border: "1px solid rgba(255,255,255,0.08)", transition: "all 0.3s", display: "inline-block" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "var(--neon-blue)"; e.currentTarget.style.borderColor = "rgba(0,212,255,0.4)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}>
          ./view-all-on-github
        </a>
      </div>
    </section>
  );
}