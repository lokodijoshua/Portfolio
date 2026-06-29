import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface HeroSectionProps {
  onSeeWorksClick: () => void;
  onContactClick: () => void;
}

const ROLES = ["Software Engineer", "Full-Stack Dev", "AI Workflow Dev", "Backend Architect"];

export default function HeroSection({
  onSeeWorksClick,
  onContactClick,
}: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [roleIndex, setRoleIndex] = useState<number>(0);

  // Role word cycler
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Handle video playback controls on scroll
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.playbackRate = 1.6; // Video plays a bit fast
      videoRef.current.play().catch(() => {});
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (videoRef.current) {
        if (scrollY > 5) {
          // Pause/freeze playback when scrolling away from top
          if (!videoRef.current.paused) {
            videoRef.current.pause();
          }
        } else {
          // Play when back at the top
          if (videoRef.current.paused) {
            videoRef.current.playbackRate = 1.6;
            videoRef.current.play().catch(() => {});
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP Entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Reset styles to avoid sudden flash if rendered with different defaults
      gsap.set(".name-reveal", { opacity: 0, y: 50 });
      gsap.set(".blur-in", { opacity: 0, y: 20, filter: "blur(10px)" });

      tl.to(".name-reveal", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.1,
      });

      tl.to(
        ".blur-in",
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.0,
          stagger: 0.1,
        },
        0.3
      ); // Overlaps timeline slightly
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative w-full h-[100dvh] flex flex-col justify-center items-start overflow-hidden bg-black text-text-primary px-6 md:px-12 lg:px-16"
    >
      {/* 100% Opacity Background Video locked to Hero section */}
      <div className="absolute inset-0 z-0 overflow-hidden w-full h-full pointer-events-none">
        <video
          ref={videoRef}
          src="https://res.cloudinary.com/dyzlx6pnt/video/upload/v1782761771/Character_looks_left_right_202606291152_qcaxxk.mp4"
          className="w-full h-full object-cover opacity-100"
          muted
          playsInline
          autoPlay
          loop
        />
      </div>

      {/* Subtle blend fade to seamless black for next section */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-20 max-w-4xl text-left flex flex-col items-start select-none mt-16 sm:mt-0 pb-6 sm:pb-0">
        
        {/* Eyebrow - enhanced visibility */}
        <span className="blur-in text-[10px] sm:text-xs text-white bg-black/55 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 font-bold uppercase tracking-[0.3em] mb-2 sm:mb-6 block font-body">
          SOFTWARE ENGINEER
        </span>

        {/* Name - enhanced visibility with solid shadow */}
        <h1 className="name-reveal text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display italic leading-[0.95] tracking-tight text-white mb-2 sm:mb-6 select-none font-bold drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
          Joshua M Lokodi
        </h1>

        {/* Role line - styled with liquid-glass to resonate with Navbar and match animation font */}
        <div className="blur-in liquid-glass text-sm sm:text-lg md:text-xl lg:text-2xl font-display italic font-bold text-white mb-3 sm:mb-6 flex items-center justify-start gap-2 h-9 sm:h-12 px-3 sm:px-5 rounded-full border border-white/20 select-none">
          <span>A</span>
          <div className="w-28 xs:w-36 sm:w-40 md:w-48 text-left h-full flex items-center justify-start overflow-hidden">
            <span
              key={roleIndex}
              className="animate-role-fade-in inline-block font-display italic font-bold text-white"
            >
              {ROLES[roleIndex]}
            </span>
          </div>
          <span>lives in Nigeria.</span>
        </div>

        {/* Description - styled with liquid-glass to resonate with Navbar and look super clear */}
        <p className="blur-in liquid-glass text-xs md:text-sm text-white max-w-lg leading-relaxed mb-4 sm:mb-10 font-body p-3.5 sm:p-5 rounded-2xl font-normal shadow-xl border border-white/25">
          Building high-performance applications like e-commerce stores. Specialist in crafting secure back-end and front-end logic, and developing advanced AI workflows.
        </p>

        {/* CTA Buttons - Liquid Glass style with glowing hover state */}
        <div className="blur-in flex flex-row flex-wrap items-center justify-start gap-3 sm:gap-4">
          
          {/* See Works */}
          <button
            onClick={onSeeWorksClick}
            className="liquid-glass-strong group relative rounded-full text-xs md:text-sm font-bold px-6 sm:px-8 py-2.5 sm:py-4 text-white cursor-pointer hover:opacity-100 hover:scale-[1.02] transition-all duration-300 tracking-wide border border-white/30 hover:shadow-[0_0_25px_rgba(255,255,255,0.7)] hover:border-white/80"
          >
            <span className="relative z-10 drop-shadow-md">See Works</span>
          </button>

          {/* Reach out */}
          <button
            onClick={onContactClick}
            className="liquid-glass group relative rounded-full text-xs md:text-sm font-bold px-6 sm:px-8 py-2.5 sm:py-4 text-white cursor-pointer hover:opacity-100 hover:scale-[1.02] transition-all duration-300 tracking-wide border border-white/30 hover:shadow-[0_0_25px_rgba(255,255,255,0.7)] hover:border-white/80"
          >
            <span className="relative z-10 drop-shadow-md">Reach out</span>
          </button>
        </div>
      </div>

      {/* Scroll Indicator (Centered) - hidden on mobile to avoid overlapping */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden sm:flex flex-col items-center gap-2 select-none pointer-events-none">
        <span className="text-[10px] text-white font-black uppercase tracking-[0.2em] font-body drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          SCROLL
        </span>
        <div className="w-px h-10 bg-white/40 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
