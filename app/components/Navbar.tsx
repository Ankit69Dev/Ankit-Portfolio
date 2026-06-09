"use client";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => { if (!isMobile) setMenuOpen(false); }, [isMobile]);

  const navItems = [
    { label: "about",    href: "#about" },
    { label: "projects", href: "#projects" },
    { label: "skills",   href: "#skills" },
    { label: "contact",  href: "#contact" },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      padding: isMobile ? "14px 20px" : "16px 40px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(5,10,15,0.95)" : "transparent",
      borderBottom: scrolled ? "1px solid rgba(0,255,136,0.1)" : "none",
      backdropFilter: scrolled ? "blur(10px)" : "none",
      transition: "all 0.4s ease",
    }}>
      {/* Logo */}
      <a href="#" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "var(--neon-green)", textDecoration: "none", letterSpacing: "0.1em" }} className="glow-green">
        ANKIT PANDEY<span style={{ color: "var(--neon-blue)" }}>_</span>
      </a>

      {/* Desktop nav */}
      {!isMobile && (
        <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="nav-link">
              <span style={{ color: "var(--neon-green)", marginRight: "4px" }}>./</span>{item.label}
            </a>
          ))}
        </div>
      )}

      {/* Clock — hidden on mobile */}
      {!isMobile && (
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: "var(--text-muted)", letterSpacing: "0.15em", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ color: "var(--neon-green)", fontSize: "0.6rem" }}>●</span>
          {time}
          <span style={{ color: "rgba(0,255,136,0.3)" }}>IST</span>
        </div>
      )}

      {/* Mobile: clock + hamburger */}
      {isMobile && (
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "var(--text-muted)" }}>{time}</span>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "1px solid rgba(0,255,136,0.3)", color: "var(--neon-green)", cursor: "pointer", fontSize: "1rem", padding: "4px 10px", lineHeight: 1 }}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      )}

      {/* Mobile dropdown */}
      {isMobile && menuOpen && (
        <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "rgba(5,10,15,0.98)", borderBottom: "1px solid rgba(0,255,136,0.2)", padding: "20px", display: "flex", flexDirection: "column", gap: "4px" }}>
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="nav-link" onClick={() => setMenuOpen(false)}
              style={{ display: "block", padding: "12px 16px", fontSize: "0.85rem", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <span style={{ color: "var(--neon-green)", marginRight: "6px" }}>./</span>{item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
