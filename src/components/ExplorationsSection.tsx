import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "motion/react";
import { explorationsData } from "../data";
import { Exploration } from "../types";
import { ArrowUpRight, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ExplorationsSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinnedContentRef = useRef<HTMLDivElement | null>(null);
  const leftColRef = useRef<HTMLDivElement | null>(null);
  const rightColRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [activeItem, setActiveItem] = useState<Exploration | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const pinnedContent = pinnedContentRef.current;
    const leftCol = leftColRef.current;
    const rightCol = rightColRef.current;

    if (!container || !pinnedContent || !leftCol || !rightCol) return;

    // Pin the center content layer
    const pinTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      pin: pinnedContent,
      pinSpacing: false,
    });

    // Parallax left column (moving upwards faster)
    const leftParallax = gsap.fromTo(
      leftCol,
      { y: 150 },
      {
        y: -150,
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      }
    );

    // Parallax right column (moving upwards slower or offset)
    const rightParallax = gsap.fromTo(
      rightCol,
      { y: -100 },
      {
        y: 200,
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      }
    );

    return () => {
      pinTrigger.kill();
      leftParallax.scrollTrigger?.kill();
      leftParallax.kill();
      rightParallax.scrollTrigger?.kill();
      rightParallax.kill();
    };
  }, []);

  // Handle background video play/pause on viewport entry
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.playbackRate = 1.6;
      videoRef.current.play().catch(() => {});
    }

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;

      if (videoRef.current) {
        if (inView) {
          if (videoRef.current.paused) {
            videoRef.current.play().catch(() => {});
          }
        } else {
          if (!videoRef.current.paused) {
            videoRef.current.pause();
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const leftColumnItems = explorationsData.slice(0, 3);
  const rightColumnItems = explorationsData.slice(3, 6);

  return (
    <section
      id="explorations"
      ref={containerRef}
      className="relative min-h-[220vh] md:min-h-[300vh] bg-black w-full overflow-hidden select-none"
    >
      {/* LAYER 1: Pinned Center (z-10) with locked background video and pop-up transition reveal */}
      <div
        ref={pinnedContentRef}
        className="absolute inset-0 w-full h-screen flex flex-col justify-center items-center z-10 px-4 pointer-events-none"
      >
        {/* locked video container with pop-up transition reveal effect */}
        <motion.div
          initial={{ scale: 0.82, opacity: 0, borderRadius: "2.5rem" }}
          whileInView={{ scale: 1, opacity: 1, borderRadius: "0rem" }}
          viewport={{ once: false, margin: "-8% 0px -8% 0px" }}
          transition={{ type: "spring", stiffness: 60, damping: 18 }}
          className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none"
        >
          <video
            ref={videoRef}
            className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover"
            src="https://res.cloudinary.com/dyzlx6pnt/video/upload/v1782747453/b_animate_the_image__l_online-video-cutter.com_kzs1f2.mp4"
            autoPlay
            loop
            muted
            playsInline
            onEnded={(e) => {
              e.currentTarget.play().catch(() => {});
            }}
          />
          {/* Seamless Edge Blenders placed directly inside the locked container for consistent blending */}
          <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
        </motion.div>

        <div className="relative z-10 max-w-xl text-center flex flex-col items-center pointer-events-auto bg-black/45 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-white/20 shadow-2xl">
          {/* Eyebrow */}
          <span className="text-xs text-white font-bold uppercase tracking-[0.3em] mb-4">
            Sandbox Archive
          </span>

          {/* Heading */}
          <h2 className="text-5xl md:text-7xl font-display text-text-primary tracking-tight leading-tight mb-4 drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]">
            Visual <span className="italic font-normal">playground</span>
          </h2>

          {/* Subtext */}
          <p className="text-sm md:text-base text-white/90 max-w-sm mb-8 font-normal leading-relaxed">
            Interactive system architecture mockups, logic flow layouts, and core performance experiment sandboxes.
          </p>

          {/* Dribbble Button - updated to beautiful glassy styling */}
          <a
            href="mailto:lokodijoshua@gmail.com"
            className="liquid-glass group flex items-center gap-2 text-xs text-text-primary/90 rounded-full px-5 py-3 transition-opacity duration-300 hover:opacity-85 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
          >
            Inquire About Tech Stacks
            <ArrowUpRight className="w-3.5 h-3.5 text-muted group-hover:text-text-primary transition-colors" />
          </a>
        </div>
      </div>

      {/* LAYER 2: Parallax Columns (z-20, absolute grid with absolute positioning) */}
      <div className="relative z-20 max-w-[1200px] mx-auto px-6 md:px-12 pt-24 pb-48 pointer-events-none">
        <div className="grid grid-cols-2 gap-8 md:gap-32 w-full justify-items-center">
          
          {/* Left Column (Parallax 1) */}
          <div
            ref={leftColRef}
            className="flex flex-col gap-12 md:gap-24 pt-32 w-full max-w-[320px] pointer-events-auto"
          >
            {leftColumnItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                className="group cursor-pointer flex flex-col"
              >
                {/* Empty liquid-glass container per user request */}
                <div
                  className={`liquid-glass relative aspect-square w-full rounded-2xl overflow-hidden flex flex-col items-center justify-center transition-transform duration-500 ease-out ${item.rotation}`}
                >
                  {/* Design system wireframe background */}
                  <div className="absolute inset-0 bg-white/[0.01] group-hover:bg-white/[0.02] transition-colors" />
                  <div className="absolute inset-0 halftone-overlay opacity-5" />
                  
                  {/* SVG crosshair design decoration - elegant minimalist code placeholder */}
                  <svg className="w-8 h-8 text-white/35 group-hover:text-white/60 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M12 4v16m-8-8h16" />
                    <circle cx={12} cy={12} r={6} strokeWidth={0.5} strokeDasharray="3 3" />
                  </svg>

                  {/* Glassy inspect overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="liquid-glass text-[10px] text-text-primary rounded-full px-4 py-1.5 uppercase tracking-widest scale-90 group-hover:scale-100 transition-transform">
                      Inspect Spec
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between px-1">
                  <span className="text-xs text-white font-bold uppercase tracking-[0.15em] font-body">
                    {item.title}
                  </span>
                  <span className="text-[10px] text-white/80 font-bold font-mono bg-white/5 px-2 py-0.5 rounded border border-white/10">
                    [{item.id}]
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column (Parallax 2) */}
          <div
            ref={rightColRef}
            className="flex flex-col gap-12 md:gap-24 w-full max-w-[320px] pointer-events-auto"
          >
            {rightColumnItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                className="group cursor-pointer flex flex-col"
              >
                {/* Empty liquid-glass container per user request */}
                <div
                  className={`liquid-glass relative aspect-square w-full rounded-2xl overflow-hidden flex flex-col items-center justify-center transition-transform duration-500 ease-out ${item.rotation}`}
                >
                  {/* Design system wireframe background */}
                  <div className="absolute inset-0 bg-white/[0.01] group-hover:bg-white/[0.02] transition-colors" />
                  <div className="absolute inset-0 halftone-overlay opacity-5" />
                  
                  {/* SVG crosshair design decoration - elegant minimalist code placeholder */}
                  <svg className="w-8 h-8 text-white/35 group-hover:text-white/60 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M12 4v16m-8-8h16" />
                    <circle cx={12} cy={12} r={6} strokeWidth={0.5} strokeDasharray="3 3" />
                  </svg>

                  {/* Glassy inspect overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="liquid-glass text-[10px] text-text-primary rounded-full px-4 py-1.5 uppercase tracking-widest scale-90 group-hover:scale-100 transition-transform">
                      Inspect Spec
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between px-1">
                  <span className="text-xs text-white font-bold uppercase tracking-[0.15em] font-body">
                    {item.title}
                  </span>
                  <span className="text-[10px] text-white/80 font-bold font-mono bg-white/5 px-2 py-0.5 rounded border border-white/10">
                    [{item.id}]
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Lightbox Modal (Updated for elegant, minimalist code layout instead of missing image) */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveItem(null)}
            className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 cursor-zoom-out"
          >
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-6 right-6 text-muted hover:text-text-primary transition-colors p-2 rounded-full border border-stroke bg-neutral-950/80"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            <motion.div
              initial={{ scale: 0.96, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 15 }}
              transition={{ type: "spring", damping: 30, stiffness: 250 }}
              onClick={(e) => e.stopPropagation()}
              className="liquid-glass relative max-w-lg w-full rounded-2xl overflow-hidden flex flex-col cursor-default p-8"
            >
              <div className="relative w-full h-[320px] flex flex-col items-center justify-center bg-black/40 rounded-xl border border-stroke mb-6">
                <div className="absolute inset-0 halftone-overlay opacity-[0.03]" />
                
                {/* Visual placeholder wireframe */}
                <div className="w-24 h-24 rounded-full border border-dashed border-stroke flex items-center justify-center mb-4">
                  <span className="text-xs font-mono text-muted/60">{activeItem.id}</span>
                </div>
                <div className="text-center">
                  <span className="text-[10px] text-muted uppercase tracking-widest font-mono">SPECIFICATION ARCHIVE</span>
                  <p className="text-sm text-text-primary/90 mt-1 font-body">Empty Placeholder sandbox system</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center w-full">
                <div>
                  <span className="text-[10px] text-muted tracking-widest uppercase block mb-1">
                    Visual Exploration
                  </span>
                  <h3 className="text-xl font-display italic text-text-primary leading-none">
                    {activeItem.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveItem(null)}
                  className="liquid-glass text-xs font-semibold px-4 py-2 rounded-full text-white"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
