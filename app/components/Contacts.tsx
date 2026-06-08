"use client";
import { useEffect, useRef, useState } from "react";

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    handle: "@Ankit69Dev",
    href: "https://github.com/Ankit69Dev",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    color: "var(--neon-green)",
  },
  {
    label: "LinkedIn",
    handle: "Ankit Pandey",
    href: "https://www.linkedin.com/in/ankit-pandey0304/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: "var(--neon-blue)",
  },
  {
    label: "Twitter / X",
    handle: "@ankitdev",
    href: "https://twitter.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    color: "var(--neon-purple)",
  },
  {
    label: "Email",
    handle: "pandeyankit0581@gmail.com",
    href: "mailto:pandeyankit0581@gmail.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 7l10 7 10-7" />
      </svg>
    ),
    color: "var(--neon-orange)",
  },
];

type FormState = { name: string; email: string; subject: string; message: string };
type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState<FormState>({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    setTerminalLines([]);

    const lines = [
      `$ connecting to mail.server...`,
      `> auth: OK`,
      `> from: ${form.email}`,
      `> to: pandeyankit0581@gmail.com`,
      `> subject: ${form.subject || "(no subject)"}`,
      `> encoding: utf-8`,
      `> sending payload...`,
    ];

    for (let i = 0; i < lines.length; i++) {
      await delay(300);
      setTerminalLines((prev) => [...prev, lines[i]]);
    }

    await delay(500);
    setTerminalLines((prev) => [...prev, `> ✓ Message delivered successfully!`]);
    setStatus("sent");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section
      id="contact"
      ref={ref}
      style={{ padding: "100px 40px 60px", maxWidth: "1200px", margin: "0 auto" }}
    >
      {/* Section label */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "64px" }}>
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.7rem", color: "var(--neon-orange)", letterSpacing: "0.2em" }}>04</span>
        <div style={{ width: "60px", height: "1px", background: "var(--neon-orange)", boxShadow: "0 0 8px var(--neon-orange)" }} />
        <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "1.4rem", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "0.15em" }}>
          Contact
        </h2>
        <div style={{ flex: 1, height: "1px", background: "rgba(255,107,53,0.1)" }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "start" }} className="contact-grid">

        {/* Left: Info + social links */}
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-30px)", transition: "all 0.6s ease" }}>
          <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "1.6rem", fontWeight: 700, color: "var(--neon-green)", marginBottom: "16px", lineHeight: 1.3 }}>
            Let's build<br />
            <span style={{ color: "var(--neon-blue)" }}>something</span> together.
          </h3>
          <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "1.05rem", color: "rgba(224,240,255,0.6)", lineHeight: 1.8, marginBottom: "40px", maxWidth: "380px" }}>
            Open to full-time roles, freelance projects, and interesting collaborations. If you have something in mind, drop me a message — I respond within 24 hours.
          </p>

          {/* Status badge */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "40px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--neon-green)", boxShadow: "0 0 10px var(--neon-green)", animation: "blink 2s ease-in-out infinite" }} />
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.7rem", color: "rgba(224,240,255,0.5)", letterSpacing: "0.1em" }}>
              AVAILABLE FOR OPPORTUNITIES
            </span>
          </div>

          {/* Social links */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "14px 20px",
                  background: "var(--card-bg)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  textDecoration: "none",
                  transition: "all 0.25s",
                  color: "inherit",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = link.color;
                  el.style.background = `${link.color}08`;
                  el.style.transform = "translateX(6px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "rgba(255,255,255,0.05)";
                  el.style.background = "var(--card-bg)";
                  el.style.transform = "translateX(0)";
                }}
              >
                <span style={{ color: link.color }}>{link.icon}</span>
                <div>
                  <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.6rem", color: "var(--text-muted)", letterSpacing: "0.1em", marginBottom: "2px" }}>{link.label}</div>
                  <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.9rem", fontWeight: 600, color: link.color }}>{link.handle}</div>
                </div>
                <span style={{ marginLeft: "auto", color: "var(--text-muted)", fontSize: "0.7rem" }}>→</span>
              </a>
            ))}
          </div>
        </div>

        {/* Right: Contact form */}
        <div
          className="terminal-window"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "all 0.6s ease 0.2s" }}
        >
          <div className="terminal-header">
            <div className="terminal-dot" style={{ background: "#ff5f57" }} />
            <div className="terminal-dot" style={{ background: "#febc2e" }} />
            <div className="terminal-dot" style={{ background: "#28c840" }} />
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem", color: "var(--text-muted)", marginLeft: "8px" }}>
              send_message.sh
            </span>
          </div>

          <div style={{ padding: "28px" }}>
            {/* Prompt line */}
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.7rem", color: "var(--text-muted)", marginBottom: "24px" }}>
              <span style={{ color: "var(--neon-green)" }}>ankit@portfolio</span>
              <span>:</span>
              <span style={{ color: "var(--neon-blue)" }}>~/contact</span>
              <span>$ ./compose-message</span>
            </div>

            {status !== "sent" ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {/* Name + Email row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.6rem", color: "var(--text-muted)", display: "block", marginBottom: "6px", letterSpacing: "0.1em" }}>
                      --name
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      disabled={status === "sending"}
                    />
                  </div>
                  <div>
                    <label style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.6rem", color: "var(--text-muted)", display: "block", marginBottom: "6px", letterSpacing: "0.1em" }}>
                      --email
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      disabled={status === "sending"}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.6rem", color: "var(--text-muted)", display: "block", marginBottom: "6px", letterSpacing: "0.1em" }}>
                    --subject
                  </label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    disabled={status === "sending"}
                  />
                </div>

                <div>
                  <label style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.6rem", color: "var(--text-muted)", display: "block", marginBottom: "6px", letterSpacing: "0.1em" }}>
                    --message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    rows={5}
                    disabled={status === "sending"}
                    style={{ resize: "vertical" }}
                  />
                </div>

                {/* Terminal output during send */}
                {terminalLines.length > 0 && (
                  <div style={{ background: "rgba(0,0,0,0.4)", padding: "12px", border: "1px solid rgba(0,255,136,0.1)", borderRadius: "4px" }}>
                    {terminalLines.map((line, i) => (
                      <div key={i} style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem", color: line.includes("✓") ? "var(--neon-green)" : "rgba(0,255,136,0.5)", lineHeight: 1.8 }}>
                        {line}
                      </div>
                    ))}
                    {status === "sending" && (
                      <span className="cursor-blink" style={{ display: "inline-block", width: "8px", height: "12px", background: "var(--neon-green)", verticalAlign: "middle" }} />
                    )}
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={status === "sending" || !form.name || !form.email || !form.message}
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: "0.75rem",
                    letterSpacing: "0.1em",
                    color: "var(--bg)",
                    background: status === "sending" ? "rgba(0,255,136,0.5)" : "var(--neon-green)",
                    border: "none",
                    padding: "14px 28px",
                    cursor: status === "sending" || !form.name || !form.email || !form.message ? "not-allowed" : "pointer",
                    transition: "all 0.3s",
                    alignSelf: "flex-start",
                    boxShadow: "0 0 20px rgba(0,255,136,0.3)",
                    opacity: !form.name || !form.email || !form.message ? 0.5 : 1,
                  }}
                >
                  {status === "sending" ? "transmitting..." : "./send-message →"}
                </button>
              </div>
            ) : (
              /* Success state */
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "3rem", color: "var(--neon-green)", marginBottom: "16px" }} className="glow-green float-anim">
                  ✓
                </div>
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.8rem", color: "var(--neon-green)", letterSpacing: "0.1em", marginBottom: "8px" }}>
                  MESSAGE DELIVERED
                </div>
                <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "1rem", color: "rgba(224,240,255,0.5)", marginBottom: "24px" }}>
                  Got your message! I'll get back to you soon.
                </p>
                <button
                  onClick={() => { setStatus("idle"); setTerminalLines([]); }}
                  style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.1em", color: "var(--neon-green)", background: "transparent", border: "1px solid rgba(0,255,136,0.3)", padding: "10px 24px", cursor: "pointer" }}
                >
                  ./send-another
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: "80px",
          paddingTop: "32px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.5s 0.8s",
        }}
      >
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem", color: "var(--text-muted)" }}>
          <span style={{ color: "var(--neon-green)" }}>Ankit Pandey</span>
          <span style={{ margin: "0 8px", color: "rgba(255,255,255,0.1)" }}>|</span>
          Built with Next.js + Tailwind
        </div>
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.6rem", color: "var(--text-muted)", letterSpacing: "0.1em" }}>
          © {new Date().getFullYear()} — All systems operational
          <span style={{ marginLeft: "8px", color: "var(--neon-green)" }}>●</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}