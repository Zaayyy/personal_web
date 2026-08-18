"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Hobbies from "@/components/Hobbies";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import CursorGlow from "@/components/CursorGlow";
import QuickActions from "@/components/QuickActions";
import InteractiveTerminal from "@/components/InteractiveTerminal";
import PageLoader from "@/components/PageLoader";
import SectionReveal from "@/components/SectionReveal";
import SectionTransitionManager from "@/components/SectionTransitionManager";

export default function Home() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [loaderDone, setLoaderDone] = useState(false);

  return (
    <>
      {/* ── Cinematic loading screen ── */}
      {!loaderDone && <PageLoader onComplete={() => setLoaderDone(true)} />}

      {/* ── Main content (rendered but invisible until loader finishes) ── */}
      <main
        className="relative min-h-screen"
        style={{
          opacity: loaderDone ? 1 : 0,
          transition: "opacity 0.6s ease 0.1s",
        }}
      >
        <CursorGlow />
        <ScrollProgress />
        <Navbar />

        {/* ── Per-section transition effects ── */}
        <SectionTransitionManager />

        {/* Hero — no SectionReveal, it has its own entrance animations */}
        <Hero />

        {/* Each section smoothly fades & slides in on scroll */}
        <SectionReveal>
          <About />
        </SectionReveal>

        <SectionReveal>
          <Projects />
        </SectionReveal>

        <SectionReveal>
          <Education />
        </SectionReveal>

        <SectionReveal>
          <Hobbies />
        </SectionReveal>

        <SectionReveal>
          <Gallery />
        </SectionReveal>

        <SectionReveal>
          <Contact />
        </SectionReveal>

        <SectionReveal>
          <Footer />
        </SectionReveal>

        <QuickActions onOpenTerminal={() => setIsTerminalOpen(true)} />
        <InteractiveTerminal
          isOpen={isTerminalOpen}
          onClose={() => setIsTerminalOpen(false)}
        />
      </main>
    </>
  );
}
