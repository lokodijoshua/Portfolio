import { useState } from "react";
import { motion } from "motion/react";
import { projectsData } from "../data";
import { Project } from "../types";
import { ArrowUpRight } from "lucide-react";

interface DesktopCardDeckProps {
  onProjectClick: (project: Project) => void;
}

const cardStyles = [
  {
    bg: "bg-gradient-to-br from-[#FF5500] to-[#E63900] text-black border-[#ff6611]/30",
    textTitle: "text-neutral-950",
    textSub: "text-neutral-900/90",
    tagBg: "bg-black/10 text-neutral-950 border-black/15 font-semibold",
    categoryBg: "bg-black/10 text-neutral-950 border-black/15 font-semibold",
    indexColor: "text-black/30 group-hover:text-black/50",
    accentGlow: "rgba(255,85,0,0.3)",
    wireframeColor: "stroke-black/15",
  },
  {
    bg: "bg-gradient-to-br from-[#F5F5F7] to-[#E5E5EA] text-black border-white/60",
    textTitle: "text-neutral-950",
    textSub: "text-neutral-800",
    tagBg: "bg-black/5 text-neutral-950 border-black/10 font-semibold",
    categoryBg: "bg-black/5 text-neutral-950 border-black/10 font-semibold",
    indexColor: "text-black/25 group-hover:text-black/45",
    accentGlow: "rgba(255,255,255,0.4)",
    wireframeColor: "stroke-neutral-800/15",
  },
  {
    bg: "bg-gradient-to-br from-[#1C1C1E] to-[#121214] text-white border-white/10",
    textTitle: "text-text-primary",
    textSub: "text-muted",
    tagBg: "bg-white/10 text-white border-white/10 font-semibold",
    categoryBg: "bg-white/10 text-white border-white/10 font-semibold",
    indexColor: "text-white/20 group-hover:text-white/40",
    accentGlow: "rgba(255,255,255,0.06)",
    wireframeColor: "stroke-white/15",
  },
  {
    bg: "bg-gradient-to-br from-[#0B0B0C] to-[#050506] text-white border-white/10",
    textTitle: "text-text-primary",
    textSub: "text-muted",
    tagBg: "bg-white/10 text-white border-white/10 font-semibold",
    categoryBg: "bg-white/10 text-white border-white/10 font-semibold",
    indexColor: "text-white/20 group-hover:text-white/40",
    accentGlow: "rgba(255,255,255,0.08)",
    wireframeColor: "stroke-white/20",
  },
];

const RotatingWireframeRing = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 200 200"
    className={`w-40 h-40 md:w-56 md:h-56 animate-[spin_16s_linear_infinite] ${className}`}
  >
    <ellipse cx="100" cy="100" rx="80" ry="25" fill="none" strokeWidth="1" className="transform rotate-[0deg]" style={{ transformOrigin: "100px 100px" }} />
    <ellipse cx="100" cy="100" rx="80" ry="25" fill="none" strokeWidth="1" className="transform rotate-[20deg]" style={{ transformOrigin: "100px 100px" }} />
    <ellipse cx="100" cy="100" rx="80" ry="25" fill="none" strokeWidth="1" className="transform rotate-[40deg]" style={{ transformOrigin: "100px 100px" }} />
    <ellipse cx="100" cy="100" rx="80" ry="25" fill="none" strokeWidth="1" className="transform rotate-[60deg]" style={{ transformOrigin: "100px 100px" }} />
    <ellipse cx="100" cy="100" rx="80" ry="25" fill="none" strokeWidth="1" className="transform rotate-[80deg]" style={{ transformOrigin: "100px 100px" }} />
    <ellipse cx="100" cy="100" rx="80" ry="25" fill="none" strokeWidth="1" className="transform rotate-[100deg]" style={{ transformOrigin: "100px 100px" }} />
    <ellipse cx="100" cy="100" rx="80" ry="25" fill="none" strokeWidth="1" className="transform rotate-[120deg]" style={{ transformOrigin: "100px 100px" }} />
    <ellipse cx="100" cy="100" rx="80" ry="25" fill="none" strokeWidth="1" className="transform rotate-[140deg]" style={{ transformOrigin: "100px 100px" }} />
    <ellipse cx="100" cy="100" rx="80" ry="25" fill="none" strokeWidth="1" className="transform rotate-[160deg]" style={{ transformOrigin: "100px 100px" }} />
  </svg>
);

export default function DesktopCardDeck({ onProjectClick }: DesktopCardDeckProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div 
      className="hidden md:block relative w-full h-[500px] mb-8 select-none"
      style={{ perspective: "1500px" }}
    >
      <div className="relative w-full h-full overflow-visible">
        {projectsData.map((project, index) => {
          const style = cardStyles[index % cardStyles.length];
          const isHovered = hoveredIndex === index;
          const displayIndex = (index + 1).toString().padStart(2, "0");

          // Percentage positioning offsets
          // Default collapsed gap is 15%. Fully expanded card occupies 55%.
          // When card h is hovered, cards to its right (index > h) shift right by 40%
          const leftPos = hoveredIndex === null
            ? `${index * 15}%`
            : index <= hoveredIndex
              ? `${index * 15}%`
              : `${index * 15 + 40}%`;

          // Check if detail contents should be shown (i.e. if hovered, or if nothing is hovered and it's the default active card)
          const isExpanded = (hoveredIndex === null && index === 3) || isHovered;

          return (
            <motion.div
              key={project.id}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => onProjectClick(project)}
              className={`absolute top-0 h-[480px] rounded-[2.5rem] p-8 md:p-10 border shadow-2xl flex flex-col justify-between cursor-pointer overflow-hidden group ${style.bg}`}
              style={{
                width: "55%",
                originX: 0,
                transformStyle: "preserve-3d",
                zIndex: isHovered ? 20 : index + 1,
              }}
              animate={{
                left: leftPos,
                scale: isHovered ? 1.025 : 1,
                rotateY: isHovered ? -12 : 0,
                rotateX: isHovered ? 1 : 0,
                z: isHovered ? 60 : 0,
                boxShadow: isHovered
                  ? `0 35px 70px -15px rgba(0,0,0,0.95), 0 0 35px ${style.accentGlow}`
                  : "0 10px 30px -10px rgba(0,0,0,0.5)",
              }}
              transition={{
                type: "spring",
                stiffness: 90,
                damping: 17,
                mass: 0.8,
              }}
            >
              <div className="flex flex-row h-full w-full justify-between items-stretch gap-2">
                {/* Left Strip: Always visible (~130px) */}
                <div className="w-[140px] shrink-0 flex flex-col justify-between h-full pr-4 border-r border-black/5 md:border-r-0">
                  {/* Card Index */}
                  <span className={`font-display italic text-2xl font-bold transition-colors ${style.indexColor}`}>
                    {displayIndex}
                  </span>

                  {/* Stacked Caps Title */}
                  <div className="my-auto py-2">
                    <h3 className={`text-xl md:text-2xl font-display uppercase tracking-tighter leading-[0.95] font-black ${style.textTitle}`}>
                      {project.title.split(" ").map((word, wIdx) => (
                        <span key={wIdx} className="block">{word}</span>
                      ))}
                    </h3>
                  </div>

                  {/* Category Pill */}
                  <div className="mt-auto">
                    <span className={`text-[8px] uppercase tracking-wider font-mono font-bold inline-block px-2 py-0.5 rounded border ${style.categoryBg}`}>
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Right Details Strip: Fades and slides in when the card is expanded */}
                <motion.div
                  animate={{
                    opacity: isExpanded ? 1 : 0,
                    x: isExpanded ? 0 : -20,
                  }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="flex-1 flex flex-col justify-between h-full pl-8 border-l border-white/10 relative"
                  style={{ pointerEvents: isExpanded ? "auto" : "none" }}
                >
                  {/* Beautiful rotating wireframe geometric background ring */}
                  <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 opacity-30 pointer-events-none">
                    <RotatingWireframeRing className={style.wireframeColor} />
                  </div>

                  {/* Top: Scope / description */}
                  <div className="relative z-10 pr-12 mt-4">
                    <h4 className={`text-[9px] font-bold uppercase tracking-widest opacity-40 font-mono mb-1 ${index >= 2 ? 'text-white' : 'text-neutral-900'}`}>
                      Project Scope
                    </h4>
                    <p className={`text-sm md:text-base leading-snug font-body font-normal ${style.textSub}`}>
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Bottom: Tags list & view specs trigger */}
                  <div className="relative z-10 mt-auto pb-2">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.map((t) => (
                        <span
                          key={t}
                          className={`text-[9px] rounded-full px-2.5 py-0.5 font-mono font-semibold border ${style.tagBg}`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-body font-bold">
                      <span className={index >= 2 ? 'text-white' : 'text-neutral-900'}>Explore Architecture Spec</span>
                      <ArrowUpRight className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${index >= 2 ? 'text-white' : 'text-neutral-900'}`} />
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
