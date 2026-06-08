"use client";
import { useEffect, useRef, useState } from "react";

const PROJECTS = [
  {
    id: "01",
    name: "Smart Trip Planner",
    tagline: "AI Powered Travel Planning Platform",
    description:
      "AI-powered travel planner that creates personalized itineraries, recommends destinations, and helps travelers plan smarter trips effortlessly.",
    stack: ["Next.js", "Tailwind CSS", "PostgreSQL", "React", "OpenstreertMap API"],
    github: "https://github.com/Ankit69Dev",
    live: "https://ai-smart-trip-planner.vercel.app/",
    color: "var(--neon-green)",
    status: "PRODUCTION",
    lines: "12,400",
  },
  {
    id: "02",
    name: "SpendWise AI",
    tagline: "Personal Expense Management Platform",
    description:
      "AI-powered expense tracker that helps users manage spending, track budgets, and gain smart financial insights for better money decisions.",
    stack: ["React", "Tailwind CSS", "PostgreSQL", "GroqAI API", "TypeScript"],
    github: "https://github.com/Ankit69Dev",
    live: "https://ai-expense-tracker-spendwise-green.vercel.app/",
    color: "var(--neon-blue)",
    status: "PRODUCTION",
    lines: "9,200",
  },
  {
    id: "03",
    name: "ShipFast API",
    tagline: "REST + GraphQL boilerplate generator",
    description:
      "A CLI tool that scaffolds production-ready APIs with auth, RBAC, rate limiting, logging, and Docker config in under 60 seconds.",
    stack: ["TypeScript", "GraphQL", "Express", "Prisma", "Jest"],
    github: "https://github.com/Ankit69Dev",
    live: "#",
    color: "var(--neon-purple)",
    status: "OPEN SOURCE",
    lines: "6,800",
  },
  {
    id: "04",
    name: "ThreadOS",
    tagline: "Async task queue & scheduler",
    description:
      "A distributed task queue inspired by Celery, built in Node.js. Supports priority queues, retries, dead-letter queues, and a web UI.",
    stack: ["Node.js", "Redis", "BullMQ", "React", "WebSockets"],
    github: "https://github.com/Ankit69Dev",
    live: "#",
    color: "var(--neon-orange)",
    status: "BETA",
    lines: "5,100",
  },
];

export default function Projects() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={ref}
      style={{ padding: "100px 40px", maxWidth: "1200px", margin: "0 auto" }}
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
            color: "var(--neon-blue)",
            letterSpacing: "0.2em",
          }}
        >
          02
        </span>
        <div
          style={{
            width: "60px",
            height: "1px",
            background: "var(--neon-blue)",
            boxShadow: "0 0 8px var(--neon-blue)",
          }}
        />
        <h2
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "1.4rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            letterSpacing: "0.15em",
          }}
        >
          Projects
        </h2>
        <div style={{ flex: 1, height: "1px", background: "rgba(0,212,255,0.1)" }} />
      </div>

      {/* Project grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "24px",
        }}
        className="projects-grid"
      >
        {PROJECTS.map((project, i) => (
          <div
            key={project.id}
            className="project-card terminal-window"
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            style={{
              padding: "28px",
              cursor: "pointer",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(30px)",
              transition: `all 0.5s ease ${i * 0.1}s`,
              border: active === i
                ? `1px solid ${project.color}`
                : "1px solid rgba(255,255,255,0.06)",
              boxShadow: active === i
                ? `0 0 30px ${project.color}22, inset 0 0 30px ${project.color}05`
                : "none",
            }}
          >
            {/* Top bar */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <span
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "2rem",
                  fontWeight: 900,
                  color: project.color,
                  opacity: 0.3,
                  lineHeight: 1,
                }}
              >
                {project.id}
              </span>
              <span
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.15em",
                  color: project.color,
                  border: `1px solid ${project.color}`,
                  padding: "3px 10px",
                  opacity: 0.8,
                }}
              >
                {project.status}
              </span>
            </div>

            {/* Name & tagline */}
            <h3
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "1.1rem",
                fontWeight: 700,
                color: project.color,
                letterSpacing: "0.05em",
                marginBottom: "6px",
              }}
            >
              {project.name}
            </h3>
            <p
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.7rem",
                color: "var(--text-muted)",
                marginBottom: "16px",
                letterSpacing: "0.05em",
              }}
            >
              {project.tagline}
            </p>

            {/* Description */}
            <p
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "0.95rem",
                color: "rgba(224,240,255,0.55)",
                lineHeight: 1.7,
                marginBottom: "24px",
              }}
            >
              {project.description}
            </p>

            {/* Stack chips */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginBottom: "24px",
              }}
            >
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: "0.6rem",
                    letterSpacing: "0.08em",
                    color: project.color,
                    background: `${project.color}12`,
                    border: `1px solid ${project.color}30`,
                    padding: "4px 10px",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Footer */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: "16px",
                borderTop: `1px solid ${project.color}15`,
              }}
            >
              <span
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "0.6rem",
                  color: "var(--text-muted)",
                }}
              >
                ~{project.lines} lines
              </span>
              <div style={{ display: "flex", gap: "16px" }}>
                <a
                  href={project.github}
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: "0.65rem",
                    color: "var(--text-muted)",
                    textDecoration: "none",
                    letterSpacing: "0.05em",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.color = project.color)
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color = "var(--text-muted)")
                  }
                >
                  [github]
                </a>
                <a
                  href={project.live}
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: "0.65rem",
                    color: project.color,
                    textDecoration: "none",
                    letterSpacing: "0.05em",
                  }}
                >
                  [live →]
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View more */}
      <div style={{ textAlign: "center", marginTop: "48px" }}>
        <a
          href="https://github.com/Ankit69Dev?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.75rem",
            letterSpacing: "0.1em",
            color: "var(--text-muted)",
            textDecoration: "none",
            padding: "12px 28px",
            border: "1px solid rgba(255,255,255,0.08)",
            transition: "all 0.3s",
            display: "inline-block",
          }}
          onMouseEnter={(e) => {
            const el = e.target as HTMLElement;
            el.style.color = "var(--neon-blue)";
            el.style.borderColor = "rgba(0,212,255,0.4)";
          }}
          onMouseLeave={(e) => {
            const el = e.target as HTMLElement;
            el.style.color = "var(--text-muted)";
            el.style.borderColor = "rgba(255,255,255,0.08)";
          }}
        >
          ./view-all-on-github
        </a>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .projects-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}