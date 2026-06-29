import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowUpRight } from "lucide-react";

export default function FooterSection() {
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    // Standard smooth GSAP horizontal marquee looping
    const anim = gsap.to(marquee, {
      xPercent: -50,
      duration: 35,
      ease: "none",
      repeat: -1,
    });

    return () => {
      anim.kill();
    };
  }, []);

  const socials = [
    { name: "Twitter", href: "https://twitter.com" },
    { name: "LinkedIn", href: "https://linkedin.com" },
    { name: "Dribbble", href: "https://dribbble.com" },
    { name: "GitHub", href: "https://github.com" },
  ];

  return (
    <footer id="contact" className="relative bg-black pt-24 pb-8 md:pb-12 overflow-hidden border-t border-stroke/20">
      
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 z-0 bg-gradient-to-tr from-neutral-950 via-[#03060c] to-neutral-950" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_120%,_rgba(255,255,255,0.03),_transparent_55%)]" />

      <div className="relative z-10 w-full flex flex-col items-center">
        
        {/* Core CTA */}
        <div className="max-w-2xl text-center px-6 mb-16 flex flex-col items-center select-none">
          <span className="text-xs text-muted uppercase tracking-[0.3em] mb-4 font-body">
            Let's Collaborate
          </span>
          
          <h2 className="text-4xl md:text-6xl font-display text-text-primary italic tracking-tight leading-none mb-8">
            Tell me about your <br />
            <span className="font-normal font-sans not-italic text-text-primary/70">next big venture.</span>
          </h2>

          {/* Email button: mailto:lokodijoshua@gmail.com styled with liquid-glass-strong */}
          <a
            href="mailto:lokodijoshua@gmail.com"
            className="liquid-glass-strong group relative inline-flex items-center justify-center rounded-full text-sm font-semibold px-8 py-4 cursor-pointer hover:opacity-90 transition-opacity"
          >
            {/* Core Label */}
            <span className="relative z-10 flex items-center gap-2 text-white font-body">
              lokodijoshua@gmail.com
              <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
            </span>
          </a>
        </div>

        {/* GSAP Marquee (Horizontal ticker) */}
        <div className="w-full overflow-hidden flex relative border-t border-b border-stroke/40 py-6 mb-16 bg-black/40 backdrop-blur-sm select-none">
          <div
            ref={marqueeRef}
            className="flex whitespace-nowrap gap-8 uppercase font-display italic text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-stroke text-nowrap"
          >
            {/* Original content strip */}
            <div className="flex gap-8 shrink-0">
              {Array(10)
                .fill("BUILDING THE FUTURE • ")
                .map((text, i) => (
                  <span
                    key={`orig-${i}`}
                    className="text-text-primary/5 hover:text-text-primary/25 transition-colors duration-500 cursor-default"
                  >
                    {text}
                  </span>
                ))}
            </div>
            {/* Copy strip for perfect scrolling reset */}
            <div className="flex gap-8 shrink-0">
              {Array(10)
                .fill("BUILDING THE FUTURE • ")
                .map((text, i) => (
                  <span
                    key={`dup-${i}`}
                    className="text-text-primary/5 hover:text-text-primary/25 transition-colors duration-500 cursor-default"
                  >
                    {text}
                  </span>
                ))}
            </div>
          </div>
        </div>

        {/* Footer bottom bar */}
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-stroke/20 pt-8 mt-4 select-none">
          
          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted hover:text-text-primary transition-colors duration-300 font-body uppercase tracking-wider"
              >
                {social.name}
              </a>
            ))}
          </div>

          {/* Availability state (pulsing indicator) styled with liquid-glass */}
          <div className="liquid-glass flex items-center gap-3 rounded-full px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-semibold text-muted uppercase tracking-widest font-body">
              Available for projects • Nigeria
            </span>
          </div>

          {/* Copyright signature */}
          <div className="text-xs font-mono text-muted/60">
            © 2026 Joshua M Lokodi. All rights reserved.
          </div>

        </div>

      </div>

    </footer>
  );
}
