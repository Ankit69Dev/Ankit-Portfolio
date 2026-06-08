"use client";
import { useState, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contacts";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  // Skip on keypress
  useEffect(() => {
    const skip = () => {
      setLoading(false);
      setTimeout(() => setVisible(true), 50);
    };
    window.addEventListener("keydown", skip);
    return () => window.removeEventListener("keydown", skip);
  }, []);

  const handleBootComplete = () => {
    setLoading(false);
    setTimeout(() => setVisible(true), 50);
  };

  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
      {loading && <LoadingScreen onComplete={handleBootComplete} />}

      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </div>
    </main>
  );
}