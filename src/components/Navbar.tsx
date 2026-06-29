import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "work", label: "Work" },
    { id: "explorations", label: "Sandbox" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
      {/* Navbar wrapper is styled with the beautiful liquid-glass class */}
      <div
        className="liquid-glass inline-flex items-center rounded-full px-3 py-2 transition-all duration-300"
        style={{ background: scrolled ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.01)" }}
      >
        {/* 1. Logo (Simple glassy circle with initials) */}
        <button
          onClick={() => onNavigate("home")}
          className="liquid-glass relative w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105 shrink-0"
          aria-label="Home"
        >
          <span className="font-display italic text-xs text-text-primary font-bold">
            JL
          </span>
        </button>

        {/* 2. Divider */}
        <div className="w-px h-5 bg-stroke/40 mx-2 hidden sm:block" />

        {/* 3. Nav links */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-xs font-semibold rounded-full px-4 py-2 transition-all duration-300 cursor-pointer font-body ${
                  isActive
                    ? "text-text-primary bg-white/10"
                    : "text-muted hover:text-text-primary hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* 4. Divider */}
        <div className="w-px h-5 bg-stroke/40 mx-2" />

        {/* 5. "Say hi" button in liquid-glass */}
        <a
          href="mailto:lokodijoshua@gmail.com"
          className="liquid-glass group relative inline-flex items-center justify-center rounded-full text-xs font-semibold px-4 py-2 cursor-pointer hover:opacity-85 transition-opacity"
        >
          <span className="relative z-10 flex items-center gap-1 text-text-primary">
            Say hi
            <ArrowUpRight className="w-3 h-3 text-muted group-hover:text-text-primary transition-colors" />
          </span>
        </a>
      </div>
    </nav>
  );
}
