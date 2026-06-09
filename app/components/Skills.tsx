"use client";
import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

const SKILL_CATEGORIES = [
  { label: "Frontend",     prefix: "FE",  color: "var(--neon-green)",  skills: [{ name: "React / Next.js", level: 95 }, { name: "TypeScript", level: 90 }, { name: "Tailwind CSS", level: 88 }, { name: "Redux / Zustand", level: 82 }, { name: "Framer Motion", level: 75 }] },
  { label: "Backend",      prefix: "BE",  color: "var(--neon-blue)",   skills: [{ name: "Node.js / Express", level: 93 }, { name: "NestJS", level: 85 }, { name: "REST API Design", level: 92 }, { name: "GraphQL", level: 78 }, { name: "WebSockets", level: 80 }] },
  { label: "Database",     prefix: "DB",  color: "var(--neon-purple)", skills: [{ name: "PostgreSQL", level: 88 }, { name: "MongoDB", level: 85 }, { name: "Redis", level: 80 }, { name: "Prisma / TypeORM", level: 84 }, { name: "ClickHouse", level: 65 }] },
  { label: "DevOps",       prefix: "OPS", color: "var(--neon-orange)", skills: [{ name: "Docker / Compose", level: 85 }, { name: "AWS (EC2, S3, RDS)", level: 78 }, { name: "CI/CD (GitHub Actions)", level: 82 }, { name: "Nginx / Caddy", level: 75 }, { name: "Kubernetes (basics)", level: 55 }] },
];

const TOOLS = ["VS Code","Git","Postman","Figma","Linux","Vim","Jest","Playwright","Webpack","Vite","pnpm","Turborepo"];

export default function Skills() {
  const isMobile = useIsMobile();
  const [visible, setVisible] = useState(false);
  const [animated, setAnimated] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); setTimeout(() => setAnimated(true), 300); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const cat = SKILL_CATEGORIES[activeCategory];

  return (
    <section id="skills" ref={ref} style={{ padding: isMobile ? "70px 20px" : "100px 40px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Section label */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: isMobile ? "40px" : "64px" }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: "var(--neon-purple)", letterSpacing: "0.2em" }}>03</span>
        <div style={{ width: "40px", height: "1px", background: "var(--neon-purple)", boxShadow: "0 0 8px var(--neon-purple)" }} />
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: isMobile ? "1.1rem" : "1.4rem", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "0.15em" }}>Skills</h2>
        <div style={{ flex: 1, height: "1px", background: "rgba(180,0,255,0.1)" }} />
      </div>

      {/* Category tabs — horizontal scroll on mobile, sidebar on desktop */}
      <div style={{ display: isMobile ? "flex" : "grid", gridTemplateColumns: isMobile ? undefined : "240px 1fr", flexDirection: isMobile ? "column" : undefined, gap: "24px", alignItems: "start" }}>

        {/* Tabs */}
        <div style={{ display: "flex", flexDirection: isMobile ? "row" : "column", gap: "4px", overflowX: isMobile ? "auto" : "visible", paddingBottom: isMobile ? "4px" : 0 }}>
          {SKILL_CATEGORIES.map((c, i) => (
            <button key={c.label} onClick={() => setActiveCategory(i)}
              style={{
                background: activeCategory === i ? `${c.color}10` : "transparent",
                border: `1px solid ${activeCategory === i ? c.color : "rgba(255,255,255,0.05)"}`,
                borderLeft: !isMobile && activeCategory === i ? `3px solid ${c.color}` : undefined,
                borderBottom: isMobile && activeCategory === i ? `2px solid ${c.color}` : undefined,
                padding: isMobile ? "10px 16px" : "14px 18px",
                textAlign: isMobile ? "center" : "left",
                cursor: "pointer", transition: "all 0.25s",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-16px)",
                transitionDelay: `${i * 0.07}s`,
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem", color: activeCategory === i ? c.color : "var(--text-muted)", letterSpacing: "0.12em", marginBottom: isMobile ? "2px" : "3px" }}>./{c.prefix}</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: isMobile ? "0.85rem" : "0.95rem", fontWeight: 600, color: activeCategory === i ? c.color : "rgba(224,240,255,0.5)" }}>{c.label}</div>
            </button>
          ))}
        </div>

        {/* Skill bars panel */}
        <div className="terminal-window" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.5s ease 0.2s" }}>
          <div className="terminal-header">
            <div className="terminal-dot" style={{ background: "#ff5f57" }} />
            <div className="terminal-dot" style={{ background: "#febc2e" }} />
            <div className="terminal-dot" style={{ background: "#28c840" }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "var(--text-muted)", marginLeft: "8px" }}>skills/{cat.prefix.toLowerCase()}.log</span>
          </div>
          <div style={{ padding: isMobile ? "20px 16px" : "28px 28px 24px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {cat.skills.map((skill, i) => (
                <div key={skill.name}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "7px" }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: isMobile ? "0.68rem" : "0.75rem", color: "rgba(224,240,255,0.8)" }}>{skill.name}</span>
                    <span style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.62rem", color: cat.color, fontWeight: 700 }}>{animated ? skill.level : 0}%</span>
                  </div>
                  <div style={{ height: "4px", background: "rgba(255,255,255,0.05)", borderRadius: "2px", overflow: "hidden" }}>
                    <div className="skill-bar-fill" style={{ width: animated ? `${skill.level}%` : "0%", background: `linear-gradient(90deg, ${cat.color}, ${cat.color}88)`, boxShadow: `0 0 8px ${cat.color}60`, transition: `width 1s ease ${i * 0.12}s` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: `1px solid ${cat.color}15`, display: "flex", flexWrap: "wrap", gap: "16px" }}>
              {[{ label: "Expert", range: "90–100" }, { label: "Proficient", range: "75–89" }, { label: "Competent", range: "60–74" }].map((l) => (
                <div key={l.label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: "16px", height: "2px", background: cat.color, opacity: l.label === "Expert" ? 1 : l.label === "Proficient" ? 0.6 : 0.35 }} />
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.52rem", color: "var(--text-muted)" }}>{l.label} ({l.range})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Radar — desktop only */}
      {!isMobile && (
        <div className="terminal-window" style={{ marginTop: "24px", padding: "20px 28px", opacity: visible ? 1 : 0, transition: "opacity 0.5s 0.4s", display: "flex", alignItems: "center", gap: "32px" }}>
          <svg viewBox="0 0 160 160" width="120" style={{ flexShrink: 0 }}>
            {[0.25, 0.5, 0.75, 1].map((r, ri) => <polygon key={ri} points={hexPoints(80, 80, 60 * r)} fill="none" stroke="rgba(0,255,136,0.1)" strokeWidth="1" />)}
            {Array.from({ length: 6 }, (_, i) => { const a = (i * Math.PI * 2) / 6 - Math.PI / 2; return <line key={i} x1="80" y1="80" x2={80 + Math.cos(a) * 60} y2={80 + Math.sin(a) * 60} stroke="rgba(0,255,136,0.07)" strokeWidth="1" />; })}
            <polygon points={skillPolygon(80, 80, 60, [0.95, 0.9, 0.88, 0.93, 0.85, 0.88])} fill="rgba(0,255,136,0.08)" stroke="var(--neon-green)" strokeWidth="1.5" />
            {[0.95, 0.9, 0.88, 0.93, 0.85, 0.88].map((v, i) => { const a = (i * Math.PI * 2) / 6 - Math.PI / 2; return <circle key={i} cx={80 + Math.cos(a) * 60 * v} cy={80 + Math.sin(a) * 60 * v} r="3" fill="var(--neon-green)" />; })}
          </svg>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "var(--text-muted)", letterSpacing: "0.1em", marginBottom: "10px" }}>SKILL RADAR</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {["React", "Node", "TypeScript", "SQL", "Docker", "API Design"].map((l) => (
                <span key={l} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "rgba(0,255,136,0.5)", background: "rgba(0,255,136,0.05)", border: "1px solid rgba(0,255,136,0.1)", padding: "3px 10px" }}>{l}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tools */}
      <div style={{ marginTop: "20px", padding: isMobile ? "20px 16px" : "24px 28px", background: "var(--card-bg)", border: "1px solid rgba(255,255,255,0.05)", opacity: visible ? 1 : 0, transition: "opacity 0.5s 0.5s" }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.58rem", color: "var(--text-muted)", letterSpacing: "0.15em", marginBottom: "14px" }}>TOOLCHAIN &amp; UTILITIES</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {TOOLS.map((tool) => (
            <span key={tool}
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", color: "rgba(224,240,255,0.5)", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", padding: "6px 12px", transition: "all 0.2s", cursor: "default" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--neon-green)"; e.currentTarget.style.borderColor = "rgba(0,255,136,0.3)"; e.currentTarget.style.background = "rgba(0,255,136,0.05)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(224,240,255,0.5)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}>
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function hexPoints(cx: number, cy: number, r: number) {
  return Array.from({ length: 6 }, (_, i) => { const a = (i * Math.PI * 2) / 6 - Math.PI / 2; return `${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`; }).join(" ");
}
function skillPolygon(cx: number, cy: number, maxR: number, values: number[]) {
  return values.map((v, i) => { const a = (i * Math.PI * 2) / values.length - Math.PI / 2; return `${cx + Math.cos(a) * maxR * v},${cy + Math.sin(a) * maxR * v}`; }).join(" ");
}
