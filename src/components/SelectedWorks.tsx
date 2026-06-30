import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { projectsData } from "../data";
import { Project } from "../types";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";
import DesktopCardDeck from "./DesktopCardDeck";

export default function SelectedWorks() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="work" className="bg-black py-16 md:py-24 border-t border-stroke/20">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-body">
                Selected Work
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-text-primary tracking-tight leading-tight">
              Featured <span className="italic font-normal">projects</span>
            </h2>
            
            <p className="text-sm md:text-base text-muted max-w-md mt-4 font-body leading-relaxed">
              A curated collection of 4 software engineering projects, emphasizing core backend systems and robust frontend experiences.
            </p>
          </div>

          {/* Glassy Header Button */}
          <button
            onClick={() => setSelectedProject(projectsData[0])}
            className="liquid-glass group relative inline-flex items-center gap-2 rounded-full text-xs font-semibold px-5 py-3 text-text-primary cursor-pointer shrink-0"
          >
            <span className="relative z-10 flex items-center gap-1.5 font-body">
              Explore First Project
              <ArrowRight className="w-3.5 h-3.5 text-muted group-hover:text-text-primary group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </motion.div>

        {/* Sliding Stack Horizontal Card Deck for Desktop / tablet, Vertical cards for Mobile */}
        
        {/* Mobile Layout (sm/md screen size): Vertical elegant cards with matching styles */}
        <div className="flex flex-col gap-6 md:hidden">
          {projectsData.map((project, index) => {
            const style = [
              {
                bg: "bg-gradient-to-br from-[#FF5500] to-[#E63900] text-black border-[#ff6611]/30",
                textTitle: "text-neutral-950",
                textSub: "text-neutral-900/95",
                tagBg: "bg-black/10 text-neutral-950 border-black/10 font-bold",
                categoryBg: "bg-black/10 text-neutral-950 border-black/10 font-bold",
                indexColor: "text-black/30",
                wireframeColor: "stroke-black/15",
              },
              {
                bg: "bg-gradient-to-br from-[#F5F5F7] to-[#E5E5EA] text-black border-white/60",
                textTitle: "text-neutral-950",
                textSub: "text-neutral-800",
                tagBg: "bg-black/5 text-neutral-950 border-black/10 font-bold",
                categoryBg: "bg-black/5 text-neutral-950 border-black/10 font-bold",
                indexColor: "text-black/25",
                wireframeColor: "stroke-neutral-800/15",
              },
              {
                bg: "bg-gradient-to-br from-[#1C1C1E] to-[#121214] text-white border-white/10",
                textTitle: "text-text-primary",
                textSub: "text-muted",
                tagBg: "bg-white/10 text-white border-white/10 font-bold",
                categoryBg: "bg-white/10 text-white border-white/10 font-bold",
                indexColor: "text-white/20",
                wireframeColor: "stroke-white/15",
              },
              {
                bg: "bg-gradient-to-br from-[#0B0B0C] to-[#050506] text-white border-white/10",
                textTitle: "text-text-primary",
                textSub: "text-muted",
                tagBg: "bg-white/10 text-white border-white/10 font-bold",
                categoryBg: "bg-white/10 text-white border-white/10 font-bold",
                indexColor: "text-white/20",
                wireframeColor: "stroke-white/20",
              },
            ][index % 4];

            const displayIndex = (index + 1).toString().padStart(2, "0");

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedProject(project)}
                className={`relative rounded-[2rem] p-6 flex flex-col justify-between min-h-[290px] border shadow-lg overflow-hidden cursor-pointer group ${style.bg}`}
              >
                {/* Accent wireframe background element in card */}
                <div className="absolute right-[-20px] bottom-[-20px] opacity-35 pointer-events-none scale-90">
                  <svg viewBox="0 0 200 200" className={`w-36 h-36 animate-[spin_12s_linear_infinite] ${style.wireframeColor}`}>
                    <ellipse cx="100" cy="100" rx="80" ry="25" fill="none" strokeWidth="1" className="transform rotate-[0deg]" style={{ transformOrigin: "100px 100px" }} />
                    <ellipse cx="100" cy="100" rx="80" ry="25" fill="none" strokeWidth="1" className="transform rotate-[30deg]" style={{ transformOrigin: "100px 100px" }} />
                    <ellipse cx="100" cy="100" rx="80" ry="25" fill="none" strokeWidth="1" className="transform rotate-[60deg]" style={{ transformOrigin: "100px 100px" }} />
                    <ellipse cx="100" cy="100" rx="80" ry="25" fill="none" strokeWidth="1" className="transform rotate-[90deg]" style={{ transformOrigin: "100px 100px" }} />
                    <ellipse cx="100" cy="100" rx="80" ry="25" fill="none" strokeWidth="1" className="transform rotate-[120deg]" style={{ transformOrigin: "100px 100px" }} />
                    <ellipse cx="100" cy="100" rx="80" ry="25" fill="none" strokeWidth="1" className="transform rotate-[150deg]" style={{ transformOrigin: "100px 100px" }} />
                  </svg>
                </div>

                {/* Top Row */}
                <div className="flex justify-between items-start w-full relative z-10">
                  <span className={`text-[9px] uppercase tracking-[0.2em] font-mono font-bold block px-2.5 py-1 rounded-full border ${style.categoryBg}`}>
                    {project.category}
                  </span>
                  <span className={`font-display italic text-xl font-bold ${style.indexColor}`}>
                    {displayIndex}
                  </span>
                </div>

                {/* Info Area */}
                <div className="mt-auto relative z-10 pt-8">
                  <h3 className={`text-xl font-display italic font-bold tracking-tight leading-tight ${style.textTitle}`}>
                    {project.title}
                  </h3>
                  <p className={`text-xs mt-1.5 max-w-xs font-body font-normal leading-relaxed ${style.textSub}`}>
                    {project.subtitle}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-4">
                    {project.tags.map((t) => (
                      <span
                        key={t}
                        className={`text-[9px] rounded-full px-2.5 py-0.5 font-mono font-semibold border ${style.tagBg}`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs mt-4 font-body font-bold">
                    <span>View Project Spec</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Desktop Sliding Overlapping Card Deck Layout (md and larger screens) */}
        <DesktopCardDeck onProjectClick={setSelectedProject} />
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-[1000] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.96, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 15 }}
              transition={{ type: "spring", damping: 30, stiffness: 250 }}
              onClick={(e) => e.stopPropagation()}
              className="liquid-glass relative max-w-2xl w-full p-8 md:p-10 rounded-3xl shadow-2xl flex flex-col cursor-default"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-50 text-muted hover:text-text-primary transition-colors p-2 rounded-full border border-stroke bg-neutral-950/80 backdrop-blur-md cursor-pointer"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <span className="text-xs text-white/90 font-bold uppercase tracking-[0.2em] font-mono bg-white/10 px-2 py-1 rounded">
                    {selectedProject.category}
                  </span>
                  
                  <h3 className="text-3xl md:text-4xl font-display text-text-primary italic font-bold mt-4 mb-4">
                    {selectedProject.title}
                  </h3>
                  
                  <div className="h-px bg-stroke/60 w-full mb-6" />

                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2 font-body">
                    Scope of Work
                  </h4>
                  <p className="text-sm md:text-base text-white/90 leading-relaxed font-body mb-6 font-normal">
                    Built specifically to satisfy high performance guidelines. Includes comprehensive back-end and front-end integration logic, optimized database architectures, and secure AI-driven API pipelines.
                  </p>

                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2 font-body">
                    Sub-Systems & Features
                  </h4>
                  <p className="text-sm text-white/90 leading-relaxed font-body mb-6 font-normal">
                    {selectedProject.subtitle}
                  </p>

                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2 font-body">
                    Technologies & Libraries
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-white bg-white/10 border border-white/20 rounded-full px-3 py-1 font-mono font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <a
                    href="mailto:lokodijoshua@gmail.com"
                    className="liquid-glass-strong text-center py-3.5 px-6 rounded-full text-xs font-semibold text-white transition-transform hover:scale-[1.02] flex items-center justify-center gap-1.5"
                  >
                    Discuss Architecture
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="liquid-glass text-center py-3.5 px-6 rounded-full text-xs font-semibold text-text-primary transition-transform hover:scale-[1.02]"
                  >
                    Close Specs
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
