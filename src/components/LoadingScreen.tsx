import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const WORDS = ["Develop", "Optimize", "Scale"];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState<number>(0);
  const [wordIndex, setWordIndex] = useState<number>(0);

  useEffect(() => {
    const duration = 2400; // ms
    let startTime: number | null = null;
    let animationFrameId: number;

    const tick = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(1, elapsed / duration);
      
      const currentCount = Math.floor(progress * 100);
      setCount(currentCount);

      // Cycle words every 800ms
      const currentWordIndex = Math.min(
        WORDS.length - 1,
        Math.floor(elapsed / 800)
      );
      setWordIndex(currentWordIndex >= 0 ? currentWordIndex : 0);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(tick);
      } else {
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
      {/* Top Left Label */}
      <div className="flex items-center">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-xs text-muted uppercase tracking-[0.3em] font-body"
        >
          Portfolio • Joshua M Lokodi
        </motion.div>
      </div>

      {/* Center Rotating Words */}
      <div className="flex justify-center items-center my-auto h-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={wordIndex}
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 0.85 }}
            exit={{ y: -24, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary text-center tracking-tight"
          >
            {WORDS[wordIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom section with Counter and Progress */}
      <div className="w-full flex flex-col gap-6">
        <div className="flex justify-between items-end">
          <div className="text-[10px] md:text-xs text-muted uppercase tracking-[0.2em] font-body">
            SYSTEM LOADING
          </div>
          
          {/* Bottom Right Counter Display */}
          <div className="text-6xl md:text-8xl lg:text-9xl font-display text-text-primary leading-none tracking-tighter tabular-nums select-none">
            {String(count).padStart(3, "0")}
          </div>
        </div>

        {/* Bottom Progress Bar */}
        <div className="w-full h-[2px] bg-stroke/30 rounded-full overflow-hidden relative">
          <div
            className="bg-white h-full absolute left-0 top-0 transition-transform duration-75 ease-out origin-left"
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
