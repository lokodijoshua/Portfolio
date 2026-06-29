import { motion } from "motion/react";
import { statsData } from "../data";

export default function StatsSection() {
  return (
    <section className="bg-black py-16 md:py-24 border-t border-stroke/20 select-none">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="liquid-glass flex flex-col p-6 rounded-2xl hover:opacity-90 transition-opacity duration-300 relative group"
            >
              {/* Stat number with display typography */}
              <div className="text-5xl md:text-6xl font-display font-bold italic tracking-tight text-text-primary mb-2 select-none">
                {stat.number}
              </div>

              {/* Label */}
              <div className="text-xs text-white uppercase tracking-[0.2em] font-body font-bold mb-4">
                {stat.label}
              </div>

              {/* Divider */}
              <div className="h-px bg-stroke/60 w-full mb-4" />

              {/* Description */}
              <p className="text-xs md:text-sm text-white/90 leading-relaxed font-body font-normal">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
