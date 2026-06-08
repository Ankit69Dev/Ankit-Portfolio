"use client";
import { useEffect, useState } from "react";

const BOOT_LINES = [
  { text: "SYSTEM BOOT v2.4.1 ...", delay: 200 },
  { text: "Loading kernel modules ......... [OK]", delay: 350 },
  { text: "Initializing neural interface ... [OK]", delay: 300 },
  { text: "Mounting portfolio filesystem .... [OK]", delay: 400 },
  { text: "Starting dev server on :3000 .... [OK]", delay: 280 },
  { text: "Connecting to GitHub API ......... [OK]", delay: 350 },
  { text: "Loading project manifests ........ [OK]", delay: 300 },
  { text: "Rendering components ............. [OK]", delay: 250 },
  { text: "Hydrating React tree ............. [OK]", delay: 280 },
  { text: "Compiling TypeScript ............. [OK]", delay: 320 },
  { text: "Running lint checks .............. [OK]", delay: 300 },
  { text: "> System ready. Welcome.", delay: 500 },
];

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [currentTyping, setCurrentTyping] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);

  // Reveal lines one by one
  useEffect(() => {
    if (visibleLines >= BOOT_LINES.length) {
      // All lines shown — start exit
      setTimeout(() => {
        setExiting(true);
        setTimeout(onComplete, 800);
      }, 600);
      return;
    }

    const line = BOOT_LINES[visibleLines];
    // Type out the current line char by char
    let i = 0;
    setCurrentTyping("");
    const typeInterval = setInterval(() => {
      i++;
      setCurrentTyping(line.text.slice(0, i));
      if (i >= line.text.length) {
        clearInterval(typeInterval);
        // After typing is done, wait then show next line
        setTimeout(() => {
          setVisibleLines((v) => v + 1);
          setProgress(Math.round(((visibleLines + 1) / BOOT_LINES.length) * 100));
          setCurrentTyping("");
          setTypingIndex((t) => t + 1);
        }, line.delay);
      }
    }, 18);

    return () => clearInterval(typeInterval);
  }, [visibleLines]); // eslint-disable-line

  const isOkLine = (text: string) => text.includes("[OK]");
  const isReadyLine = (text: string) => text.startsWith(">");

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "var(--bg)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: exiting ? 0 : 1,
        transition: "opacity 0.8s ease",
        overflow: "hidden",
      }}
      className="grid-bg"
    >
      {/* Radial glow */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "600px", height: "600px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,255,136,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Scanlines */}
      <div style={{
        position: "absolute", inset: 0,
        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
        pointerEvents: "none",
      }} />

      {/* Main terminal window */}
      <div
        className="terminal-window"
        style={{
          width: "min(640px, 90vw)",
          boxShadow: "0 0 60px rgba(0,255,136,0.08), 0 0 120px rgba(0,255,136,0.04)",
        }}
      >
        {/* Terminal title bar */}
        <div className="terminal-header" style={{ justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div className="terminal-dot" style={{ background: "#ff5f57" }} />
            <div className="terminal-dot" style={{ background: "#febc2e" }} />
            <div className="terminal-dot" style={{ background: "#28c840" }} />
          </div>
          <span style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.65rem",
            color: "var(--text-muted)",
            letterSpacing: "0.1em",
          }}>
            boot.sh — ankit-portfolio
          </span>
          <span style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.6rem",
            color: "rgba(0,255,136,0.4)",
          }}>
            {progress}%
          </span>
        </div>

        {/* Terminal body */}
        <div style={{
          padding: "24px 28px 20px",
          minHeight: "320px",
          display: "flex",
          flexDirection: "column",
          gap: "2px",
        }}>
          {/* Logo / header */}
          <div style={{ marginBottom: "20px" }}>
            <pre style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "clamp(0.45rem, 1.2vw, 0.6rem)",
              color: "rgba(0,255,136,0.6)",
              lineHeight: 1.2,
              letterSpacing: "0.05em",
            }}>
            </pre>
            <div style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.6rem",
              color: "rgba(0,255,136,0.3)",
              letterSpacing: "0.2em",
              marginTop: "4px",
            }}>
              ANKIT PANDEY // FULL STACK DEVELOPER
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "rgba(0,255,136,0.1)", marginBottom: "16px" }} />

          {/* Boot lines */}
          {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
            <div
              key={i}
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.72rem",
                lineHeight: 1.9,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                animation: "fadeInLine 0.2s ease",
              }}
            >
              {isReadyLine(line.text) ? (
                <span style={{
                  color: "var(--neon-green)",
                  fontWeight: "bold",
                  textShadow: "0 0 10px rgba(0,255,136,0.5)",
                }}>
                  {line.text}
                </span>
              ) : (
                <>
                  <span style={{ color: "rgba(224,240,255,0.5)" }}>
                    {line.text.replace(" [OK]", "")}
                  </span>
                  {isOkLine(line.text) && (
                    <span style={{
                      color: "var(--neon-green)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.05em",
                      textShadow: "0 0 8px rgba(0,255,136,0.6)",
                    }}>
                      [OK]
                    </span>
                  )}
                </>
              )}
            </div>
          ))}

          {/* Currently typing line */}
          {visibleLines < BOOT_LINES.length && (
            <div style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.72rem",
              lineHeight: 1.9,
              color: "rgba(224,240,255,0.7)",
              display: "flex",
              alignItems: "center",
              gap: "2px",
            }}>
              <span>{currentTyping}</span>
              <span
                className="cursor-blink"
                style={{
                  display: "inline-block",
                  width: "8px", height: "13px",
                  background: "var(--neon-green)",
                  verticalAlign: "middle",
                  marginLeft: "1px",
                }}
              />
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div style={{
          margin: "0 28px 24px",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}>
          <div style={{
            height: "2px",
            background: "rgba(255,255,255,0.05)",
            borderRadius: "1px",
            overflow: "hidden",
          }}>
            <div style={{
              height: "100%",
              width: `${progress}%`,
              background: "linear-gradient(90deg, var(--neon-green), rgba(0,255,136,0.5))",
              boxShadow: "0 0 10px rgba(0,255,136,0.6)",
              transition: "width 0.3s ease",
              borderRadius: "1px",
              position: "relative",
            }}>
              {/* shimmer */}
              <div style={{
                position: "absolute", top: 0, right: 0,
                width: "20px", height: "100%",
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
                animation: "shimmer 1s linear infinite",
              }} />
            </div>
          </div>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.55rem",
            color: "var(--text-muted)",
          }}>
            <span>initializing system</span>
            <span style={{ color: progress === 100 ? "var(--neon-green)" : "var(--text-muted)" }}>
              {progress === 100 ? "COMPLETE" : "LOADING..."}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom hint */}
      <div style={{
        marginTop: "32px",
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: "0.6rem",
        color: "rgba(255,255,255,0.1)",
        letterSpacing: "0.2em",
        animation: "blink 2s ease-in-out infinite",
      }}>
        PRESS ANY KEY TO SKIP
      </div>

      <style>{`
        @keyframes fadeInLine {
          from { opacity: 0; transform: translateX(-8px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}