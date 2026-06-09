"use client";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

const BOOT_LINES = [
  { text: "SYSTEM BOOT v2.4.1 ...",               delay: 200 },
  { text: "Loading kernel modules ......... [OK]", delay: 350 },
  { text: "Initializing neural interface ... [OK]",delay: 300 },
  { text: "Mounting portfolio filesystem .... [OK]",delay: 400 },
  { text: "Starting dev server on :3000 .... [OK]", delay: 280 },
  { text: "Connecting to GitHub API ......... [OK]", delay: 350 },
  { text: "Loading project manifests ........ [OK]", delay: 300 },
  { text: "Rendering components ............. [OK]", delay: 250 },
  { text: "Hydrating React tree ............. [OK]", delay: 280 },
  { text: "Compiling TypeScript ............. [OK]", delay: 320 },
  { text: "Running lint checks .............. [OK]", delay: 300 },
  { text: "> System ready. Welcome.",               delay: 500 },
];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const isMobile = useIsMobile();
  const [visibleLines, setVisibleLines] = useState(0);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [currentTyping, setCurrentTyping] = useState("");

  useEffect(() => {
    if (visibleLines >= BOOT_LINES.length) {
      setTimeout(() => { setExiting(true); setTimeout(onComplete, 800); }, 600);
      return;
    }
    const line = BOOT_LINES[visibleLines];
    let i = 0;
    setCurrentTyping("");
    const typeInterval = setInterval(() => {
      i++;
      setCurrentTyping(line.text.slice(0, i));
      if (i >= line.text.length) {
        clearInterval(typeInterval);
        setTimeout(() => {
          setVisibleLines((v) => v + 1);
          setProgress(Math.round(((visibleLines + 1) / BOOT_LINES.length) * 100));
          setCurrentTyping("");
        }, line.delay);
      }
    }, 18);
    return () => clearInterval(typeInterval);
  }, [visibleLines]); // eslint-disable-line

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 99999, background: "var(--bg)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: exiting ? 0 : 1, transition: "opacity 0.8s ease", overflow: "hidden", padding: isMobile ? "20px" : "0" }} className="grid-bg">

      {/* Glow */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: isMobile ? "300px" : "600px", height: isMobile ? "300px" : "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,255,136,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)", pointerEvents: "none" }} />

      <div className="terminal-window" style={{ width: "min(600px, 100%)", boxShadow: "0 0 60px rgba(0,255,136,0.08)" }}>
        {/* Title bar */}
        <div className="terminal-header" style={{ justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div className="terminal-dot" style={{ background: "#ff5f57" }} />
            <div className="terminal-dot" style={{ background: "#febc2e" }} />
            <div className="terminal-dot" style={{ background: "#28c840" }} />
          </div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", color: "var(--text-muted)", letterSpacing: "0.08em" }}>boot.sh — ankit-portfolio</span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "rgba(0,255,136,0.4)" }}>{progress}%</span>
        </div>

        {/* Body */}
        <div style={{ padding: isMobile ? "16px" : "20px 24px 16px", minHeight: isMobile ? "240px" : "300px" }}>
          {/* ASCII logo — smaller on mobile */}
          {!isMobile && (
            <div style={{ marginBottom: "16px" }}>
              <pre style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem", color: "rgba(0,255,136,0.6)", lineHeight: 1.2, letterSpacing: "0.04em" }}>
              </pre>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem", color: "rgba(0,255,136,0.3)", letterSpacing: "0.18em", marginTop: "4px" }}>ANKIT PANDEY // FULL STACK DEVELOPER</div>
            </div>
          )}
          {isMobile && (
            <div style={{ marginBottom: "16px" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.1rem", fontWeight: 900, color: "var(--neon-green)" }} className="glow-green">ANKIT PANDEY_</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem", color: "rgba(0,255,136,0.3)", letterSpacing: "0.15em", marginTop: "4px" }}>FULL STACK DEVELOPER</div>
            </div>
          )}

          <div style={{ height: "1px", background: "rgba(0,255,136,0.1)", marginBottom: "14px" }} />

          {/* Boot lines */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
            {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
              <div key={i} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: isMobile ? "0.62rem" : "0.68rem", lineHeight: 1.85, display: "flex", justifyContent: "space-between", animation: "fadeInLine 0.2s ease" }}>
                {line.text.startsWith(">") ? (
                  <span style={{ color: "var(--neon-green)", fontWeight: "bold", textShadow: "0 0 10px rgba(0,255,136,0.5)" }}>{line.text}</span>
                ) : (
                  <>
                    <span style={{ color: "rgba(224,240,255,0.45)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: isMobile ? "nowrap" : "normal" }}>{line.text.replace(" [OK]", "")}</span>
                    {line.text.includes("[OK]") && <span style={{ color: "var(--neon-green)", fontSize: "0.62rem", marginLeft: "8px", flexShrink: 0, textShadow: "0 0 8px rgba(0,255,136,0.6)" }}>[OK]</span>}
                  </>
                )}
              </div>
            ))}

            {/* Typing line */}
            {visibleLines < BOOT_LINES.length && (
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: isMobile ? "0.62rem" : "0.68rem", lineHeight: 1.85, color: "rgba(224,240,255,0.7)", display: "flex", alignItems: "center" }}>
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{currentTyping}</span>
                <span className="cursor-blink" style={{ display: "inline-block", width: "7px", height: "12px", background: "var(--neon-green)", verticalAlign: "middle", marginLeft: "1px", flexShrink: 0 }} />
              </div>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ margin: "0 16px 20px" }}>
          <div style={{ height: "2px", background: "rgba(255,255,255,0.05)", borderRadius: "1px", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, var(--neon-green), rgba(0,255,136,0.5))", boxShadow: "0 0 10px rgba(0,255,136,0.6)", transition: "width 0.3s ease", borderRadius: "1px", position: "relative" }}>
              <div style={{ position: "absolute", top: 0, right: 0, width: "20px", height: "100%", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)", animation: "shimmer 1s linear infinite" }} />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.52rem", color: "var(--text-muted)" }}>
            <span>initializing system</span>
            <span style={{ color: progress === 100 ? "var(--neon-green)" : "var(--text-muted)" }}>{progress === 100 ? "COMPLETE" : "LOADING..."}</span>
          </div>
        </div>
      </div>

      {/* Skip hint */}
      <div style={{ marginTop: "24px", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem", color: "rgba(255,255,255,0.1)", letterSpacing: "0.18em", animation: "blink 2s ease-in-out infinite" }}>
        {isMobile ? "TAP TO SKIP" : "PRESS ANY KEY TO SKIP"}
      </div>

      <style>{`
        @keyframes fadeInLine { from { opacity: 0; transform: translateX(-6px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>
    </div>
  );
}
