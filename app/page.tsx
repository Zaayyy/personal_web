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

        {/* Hero — no SectionReveal, it has its own entrance animations */}
        <Hero />

        {/* Each section fades + slides in on scroll */}
        <SectionReveal direction="up" delay={0}>
          <About />
        </SectionReveal>

        <SectionReveal direction="up" delay={0} threshold={0.08}>
          <Projects />
        </SectionReveal>

        <SectionReveal direction="left" delay={0} threshold={0.08}>
          <Education />
        </SectionReveal>

        <SectionReveal direction="right" delay={0} threshold={0.08}>
          <Hobbies />
        </SectionReveal>

        <SectionReveal direction="scale" delay={0} threshold={0.06}>
          <Gallery />
        </SectionReveal>

        <SectionReveal direction="up" delay={0} threshold={0.08}>
          <Contact />
        </SectionReveal>

        <SectionReveal direction="fade" delay={0} threshold={0.05}>
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
