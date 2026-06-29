import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { projectsData } from "../data";
import { Project } from "../types";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";

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

        {/* Bento Grid - 11 Projects styled as premium liquid-glass cards with zero images */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {projectsData.map((project, index) => {
            const displayIndex = (index + 1).toString().padStart(2, "0");
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (index % 4) * 0.05, ease: "easeOut" }}
                className={`liquid-glass group relative rounded-3xl cursor-pointer p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:opacity-90 hover:scale-[1.01] ${
                  project.span === 7 ? "md:col-span-7" : "md:col-span-5"
                } ${project.aspect} min-h-[280px] sm:min-h-[300px]`}
                onClick={() => setSelectedProject(project)}
              >
                {/* Accent glass shadow layer for subtle glow */}
                <div className="absolute inset-0 bg-white/[0.01] group-hover:bg-white/[0.03] transition-colors duration-300 z-0" />
                
                {/* Halftone texture overlay for physical feel */}
                <div className="absolute inset-0 halftone-overlay opacity-[0.03] pointer-events-none z-0" />

                {/* Top Section */}
                <div className="relative z-10 flex justify-between items-start w-full">
                  <div>
                    <span className="text-[9px] sm:text-[10px] text-white/90 uppercase tracking-[0.2em] font-mono font-bold block bg-white/5 px-2 py-0.5 rounded border border-white/10">
                      {project.category}
                    </span>
                  </div>
                  <span className="font-display italic text-xl sm:text-2xl text-white/70 font-bold group-hover:text-white transition-colors">
                    {displayIndex}
                  </span>
                </div>

                {/* Bottom Section */}
                <div className="relative z-10 mt-auto pt-6 sm:pt-8 flex flex-col gap-3 sm:gap-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-display italic text-text-primary font-bold tracking-tight leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs md:text-sm text-white/85 mt-1 sm:mt-2 max-w-sm font-body font-normal leading-snug">
                      {project.subtitle}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-1 sm:pt-2">
                    {project.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[9px] sm:text-[10px] text-white bg-white/10 border border-white/20 rounded-full px-2 sm:px-2.5 py-0.5 font-mono font-semibold"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Glassy action indicator */}
                  <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-white mt-1 sm:mt-2 font-body font-bold">
                    <span>View Project Spec</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-90 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
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
