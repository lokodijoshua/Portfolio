import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const WORDS = ["Develop", "Optimize", "Scale", "Secure", "Deploy"];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState<number>(0);
  const [wordIndex, setWordIndex] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Programmatically force background video to start playing immediately on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch((err) => {
        console.warn("Loading video play blocked initially, retrying playing:", err);
        // Play on document/body interaction just in case
        const playOnInteraction = () => {
          videoRef.current?.play().catch(() => {});
          window.removeEventListener("touchstart", playOnInteraction);
          window.removeEventListener("click", playOnInteraction);
        };
        window.addEventListener("touchstart", playOnInteraction, { passive: true });
        window.addEventListener("click", playOnInteraction, { passive: true });
      });
    }
  }, []);

  useEffect(() => {
    const totalDuration = 10000; // Exactly 10 seconds in milliseconds
    let startTime: number | null = null;
    let animationFrameId: number;

    const tick = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      // Count smoothly from 0 to 100 straight up over 10 seconds
      const progress = Math.min(1, elapsed / totalDuration);
      const currentCount = Math.floor(progress * 100);

      // Ensure count is bounded correctly
      const finalCount = Math.min(100, Math.max(0, currentCount));
      setCount(finalCount);

      // Cycle words continuously every 2000ms throughout the 10 seconds
      const currentWordIndex = Math.floor(elapsed / 2000) % WORDS.length;
      setWordIndex(currentWordIndex);

      if (elapsed < totalDuration) {
        animationFrameId = requestAnimationFrame(tick);
      } else {
        setCount(100);
        setTimeout(() => {
          onComplete();
        }, 300);
      }
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [onComplete]);

  return (
    <div id="loading-screen" className="fixed inset-0 z-[9999] bg-black flex flex-col justify-between p-8 md:p-16 select-none overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <video
          ref={videoRef}
          className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover opacity-100"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260417_061226_74f0749c-a22d-42b3-895e-5d6203bc741c.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
      </div>

      {/* Top Left Label */}
      <div className="flex items-center relative z-10">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-xs text-neutral-950 font-bold uppercase tracking-[0.3em] font-body bg-white/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-black/10 shadow-sm"
        >
          Portfolio • Joshua Lokodi
        </motion.div>
      </div>

      {/* Center Rotating Words */}
      <div className="flex justify-center items-center my-auto h-24 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={wordIndex}
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -24, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display italic text-neutral-950 font-black text-center tracking-tight bg-white/40 backdrop-blur-md px-6 py-3 rounded-2xl border border-black/10 shadow-sm"
          >
            {WORDS[wordIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom section with Counter and Progress */}
      <div className="w-full flex flex-col gap-6 relative z-10">
        <div className="flex justify-between items-end">
          <div className="text-[10px] md:text-xs text-neutral-950 font-black uppercase tracking-[0.2em] font-body bg-white/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-black/10 shadow-sm">
            SYSTEM LOADING
          </div>
          
          {/* Bottom Right Counter Display */}
          <div className="text-6xl md:text-8xl lg:text-9xl font-display text-neutral-950 font-black leading-none tracking-tighter tabular-nums select-none bg-white/40 backdrop-blur-md px-4 py-2 rounded-2xl border border-black/10 shadow-sm">
            {String(count).padStart(3, "0")}
          </div>
        </div>

        {/* Bottom Progress Bar */}
        <div className="w-full h-[3px] bg-neutral-950/25 rounded-full overflow-hidden relative border border-black/5">
          <div
            className="bg-neutral-950 h-full absolute left-0 top-0 transition-transform duration-75 ease-out origin-left"
            style={{
              width: "100%",
              transform: `scaleX(${count / 100})`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
