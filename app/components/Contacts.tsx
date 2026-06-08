"use client";
import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

const SOCIAL_LINKS = [
  { label: "GitHub",     handle: "Ankit69Dev",      href: "https://github.com/Ankit69Dev",   color: "var(--neon-green)",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg> },
  { label: "LinkedIn",   handle: "Ankit Pandey",       href: "https://linkedin.com/in/ankit-pandey0304", color: "var(--neon-blue)",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { label: "Instagram", handle: "Ankit Pandey",          href: "https://instagram.com/ankit.pandey03",  color: "var(--neon-pink)",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
</svg> },
  { label: "Email",       handle: "pandeyankit03@gmail.com",  href: "mailto:pandeyankit03@gmail.com", color: "var(--neon-orange)",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg> },
];

type FormState = { name: string; email: string; subject: string; message: string };
type Status = "idle" | "sending" | "sent";

export default function Contact() {
  const isMobile = useIsMobile();
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState<FormState>({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    setTerminalLines([]);
    // const lines = [`$ connecting to mail.server...`, `> auth: OK`, `> from: ${form.email}`, `> to: ankit@example.dev`, `> subject: ${form.subject || "(no subject)"}`, `> sending payload...`];
    // for (const line of lines) { await delay(280); setTerminalLines((p) => [...p, line]); }
    // await delay(400);
    setTerminalLines((p) => [...p, `> ✓ Message delivered!`]);
    setStatus("sent");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const canSubmit = form.name && form.email && form.message && status !== "sending";

  return (
    <section id="contact" ref={ref} style={{ padding: isMobile ? "70px 20px 50px" : "100px 40px 60px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Section label */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: isMobile ? "40px" : "64px" }}>
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.7rem", color: "var(--neon-orange)", letterSpacing: "0.2em" }}>04</span>
        <div style={{ width: "40px", height: "1px", background: "var(--neon-orange)", boxShadow: "0 0 8px var(--neon-orange)" }} />
        <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: isMobile ? "1.1rem" : "1.4rem", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "0.15em" }}>Contact</h2>
        <div style={{ flex: 1, height: "1px", background: "rgba(255,107,53,0.1)" }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "40px" : "60px", alignItems: "start" }}>

        {/* Left: Info */}
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-20px)", transition: "all 0.6s ease" }}>
          <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: isMobile ? "1.3rem" : "1.6rem", fontWeight: 700, color: "var(--neon-green)", marginBottom: "14px", lineHeight: 1.3 }}>
            Let's build<br /><span style={{ color: "var(--neon-blue)" }}>something</span> together.
          </h3>
          <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "1.02rem", color: "rgba(224,240,255,0.6)", lineHeight: 1.8, marginBottom: "28px" }}>
            Open to full-time roles, freelance projects, and interesting collaborations. Drop me a message — I respond within 24 hours.
          </p>

          {/* Availability badge */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--neon-green)", boxShadow: "0 0 10px var(--neon-green)", animation: "blink 2s ease-in-out infinite" }} />
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem", color: "rgba(224,240,255,0.5)", letterSpacing: "0.08em" }}>AVAILABLE FOR OPPORTUNITIES</span>
          </div>

          {/* Social links */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {SOCIAL_LINKS.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: "14px", padding: "12px 16px", background: "var(--card-bg)", border: "1px solid rgba(255,255,255,0.05)", textDecoration: "none", color: "inherit", transition: "all 0.25s" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = link.color; e.currentTarget.style.background = `${link.color}08`; e.currentTarget.style.transform = "translateX(6px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"; e.currentTarget.style.background = "var(--card-bg)"; e.currentTarget.style.transform = "translateX(0)"; }}>
                <span style={{ color: link.color }}>{link.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.58rem", color: "var(--text-muted)", letterSpacing: "0.08em", marginBottom: "2px" }}>{link.label}</div>
                  <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.88rem", fontWeight: 600, color: link.color, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{link.handle}</div>
                </div>
                <span style={{ color: "var(--text-muted)", fontSize: "0.7rem" }}>→</span>
              </a>
            ))}
          </div>
        </div>

        {/* Right: Form */}
        <div className="terminal-window" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease 0.2s" }}>
          <div className="terminal-header">
            <div className="terminal-dot" style={{ background: "#ff5f57" }} />
            <div className="terminal-dot" style={{ background: "#febc2e" }} />
            <div className="terminal-dot" style={{ background: "#28c840" }} />
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem", color: "var(--text-muted)", marginLeft: "8px" }}>send_message.sh</span>
          </div>

          <div style={{ padding: isMobile ? "20px 16px" : "24px 28px" }}>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem", color: "var(--text-muted)", marginBottom: "20px", wordBreak: "break-all" }}>
              <span style={{ color: "var(--neon-green)" }}>ankit@portfolio</span>:<span style={{ color: "var(--neon-blue)" }}>~/contact</span>$ ./compose
            </div>

            {status !== "sent" ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {/* Name + Email — stack on mobile */}
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.58rem", color: "var(--text-muted)", display: "block", marginBottom: "5px", letterSpacing: "0.1em" }}>--name</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" disabled={status === "sending"} />
                  </div>
                  <div>
                    <label style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.58rem", color: "var(--text-muted)", display: "block", marginBottom: "5px", letterSpacing: "0.1em" }}>--email</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" disabled={status === "sending"} />
                  </div>
                </div>
                <div>
                  <label style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.58rem", color: "var(--text-muted)", display: "block", marginBottom: "5px", letterSpacing: "0.1em" }}>--subject</label>
                  <input name="subject" value={form.subject} onChange={handleChange} placeholder="What's this about?" disabled={status === "sending"} />
                </div>
                <div>
                  <label style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.58rem", color: "var(--text-muted)", display: "block", marginBottom: "5px", letterSpacing: "0.1em" }}>--message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell me about your project..." rows={isMobile ? 4 : 5} disabled={status === "sending"} style={{ resize: "vertical" }} />
                </div>

                {terminalLines.length > 0 && (
                  <div style={{ background: "rgba(0,0,0,0.4)", padding: "10px 14px", border: "1px solid rgba(0,255,136,0.1)", borderRadius: "4px" }}>
                    {terminalLines.map((line, i) => (
                      <div key={i} style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.62rem", color: line.includes("✓") ? "var(--neon-green)" : "rgba(0,255,136,0.5)", lineHeight: 1.8 }}>{line}</div>
                    ))}
                    {status === "sending" && <span className="cursor-blink" style={{ display: "inline-block", width: "7px", height: "12px", background: "var(--neon-green)", verticalAlign: "middle" }} />}
                  </div>
                )}

                <button onClick={handleSubmit} disabled={!canSubmit}
                  style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.1em", color: "var(--bg)", background: canSubmit ? "var(--neon-green)" : "rgba(0,255,136,0.3)", border: "none", padding: "13px 24px", cursor: canSubmit ? "pointer" : "not-allowed", transition: "all 0.3s", alignSelf: "flex-start", boxShadow: canSubmit ? "0 0 20px rgba(0,255,136,0.3)" : "none", width: isMobile ? "100%" : "auto" }}>
                  {status === "sending" ? "transmitting..." : "./send-message →"}
                </button>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "32px 16px" }}>
                <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "2.5rem", color: "var(--neon-green)", marginBottom: "12px" }} className="glow-green float-anim">✓</div>
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.75rem", color: "var(--neon-green)", letterSpacing: "0.1em", marginBottom: "8px" }}>MESSAGE DELIVERED</div>
                <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.95rem", color: "rgba(224,240,255,0.5)", marginBottom: "20px" }}>Got it! I'll get back to you soon.</p>
                <button onClick={() => { setStatus("idle"); setTerminalLines([]); }}
                  style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.1em", color: "var(--neon-green)", background: "transparent", border: "1px solid rgba(0,255,136,0.3)", padding: "9px 20px", cursor: "pointer" }}>
                  ./send-another
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ marginTop: "60px", paddingTop: "28px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", opacity: visible ? 1 : 0, transition: "opacity 0.5s 0.8s" }}>
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.62rem", color: "var(--text-muted)" }}>
          <span style={{ color: "var(--neon-green)" }}>Ankit Pandey</span>
          <span style={{ margin: "0 8px", color: "rgba(255,255,255,0.1)" }}>|</span>
          Built with Next.js + Tailwind
        </div>
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.58rem", color: "var(--text-muted)", letterSpacing: "0.08em" }}>
          © {new Date().getFullYear()} — All systems operational
          <span style={{ marginLeft: "8px", color: "var(--neon-green)" }}>●</span>
        </div>
      </div>
    </section>
  );
}