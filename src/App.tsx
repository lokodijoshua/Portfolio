import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import SelectedWorks from "./components/SelectedWorks";
import ExplorationsSection from "./components/ExplorationsSection";
import StatsSection from "./components/StatsSection";
import FooterSection from "./components/FooterSection";

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState<string>("home");

  // Track scroll section entries using IntersectionObserver for active Navbar highlight
  useEffect(() => {
    if (isLoading) return;

    const sections = ["home", "work", "explorations", "contact"];
    
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px", // Optimizes middle-of-viewport triggers
      threshold: 0.05,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // If intersections occur, match the ID to the navbar highlights
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isLoading]);

  // Smooth scroll handler
  const handleNavigate = (sectionId: string) => {
    const targetId = sectionId === "work" ? "work" : sectionId === "explorations" ? "explorations" : sectionId === "contact" ? "contact" : "home";
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(targetId);
    }
  };

  return (
    <div className="bg-bg text-text-primary min-h-screen selection:bg-accent selection:text-bg font-sans overflow-x-hidden relative">
      
      {/* 1. Loading Screen Overlay */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* 2. Main Site content */}
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full"
        >
          {/* Floated Navigation Bar */}
          <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

          {/* Section 2: Hero */}
          <HeroSection
            onSeeWorksClick={() => handleNavigate("work")}
            onContactClick={() => handleNavigate("contact")}
          />

          {/* Section 3: Selected Works (Bento Grid) */}
          <SelectedWorks />

          {/* Section 5: Explorations (GSAP Parallax Sandbox) */}
          <ExplorationsSection />

          {/* Section 6: Stats overview metrics */}
          <StatsSection />

          {/* Section 7: Contact Form/Footer */}
          <FooterSection />
        </motion.div>
      )}
    </div>
  );
}
