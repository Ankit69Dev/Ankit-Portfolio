"use client";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour12: false }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const navItems = [
    { label: "about", href: "#about" },
    { label: "projects", href: "#projects" },
    { label: "skills", href: "#skills" },
    { label: "contact", href: "#contact" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: "16px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled
          ? "rgba(5,10,15,0.95)"
          : "transparent",
        borderBottom: scrolled
          ? "1px solid rgba(0,255,136,0.1)"
          : "none",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        transition: "all 0.4s ease",
      }}
    >
      {/* Logo */}
      <a
        href="#"
        style={{
          fontFamily: "'Orbitron', sans-serif",
          fontWeight: 700,
          fontSize: "1.1rem",
          color: "var(--neon-green)",
          textDecoration: "none",
          letterSpacing: "0.1em",
        }}
        className="glow-green"
      >
        ANKIT PANDEY<span style={{ color: "var(--neon-blue)" }}>_</span>
      </a>

      {/* Desktop Nav */}
      <div style={{ display: "flex", gap: "32px", alignItems: "center" }} className="hidden-mobile">
        {navItems.map((item) => (
          <a key={item.label} href={item.href} className="nav-link">
            <span style={{ color: "var(--neon-green)", marginRight: "4px" }}>./</span>
            {item.label}
          </a>
        ))}
      </div>

      {/* Clock */}
      <div
        style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "0.7rem",
          color: "var(--text-muted)",
          letterSpacing: "0.15em",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span style={{ color: "var(--neon-green)", fontSize: "0.6rem" }}>●</span>
        {time}
        <span style={{ color: "rgba(0,255,136,0.3)" }}>IST</span>
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          background: "none",
          border: "none",
          color: "var(--neon-green)",
          cursor: "pointer",
          fontSize: "1.2rem",
          display: "none",
        }}
        className="show-mobile"
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "rgba(5,10,15,0.98)",
            borderBottom: "1px solid rgba(0,255,136,0.2)",
            padding: "20px 40px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="nav-link"
              onClick={() => setMenuOpen(false)}
              style={{ fontSize: "0.875rem" }}
            >
              <span style={{ color: "var(--neon-green)", marginRight: "4px" }}>./</span>
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}