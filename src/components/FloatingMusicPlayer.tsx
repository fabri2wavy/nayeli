import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Disc3, Pause, Play, Volume2, X } from "lucide-react";
import { MUSIC_CONFIG } from "../data/memoriesData";

interface FloatingMusicPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export const FloatingMusicPlayer: React.FC<FloatingMusicPlayerProps> = ({
  isPlaying,
  onToggle,
}) => {
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 9000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col items-end gap-2 max-w-[260px]">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onToggle}
          aria-label={isPlaying ? "Pausar música de fondo" : "Reanudar música de fondo"}
          className="group flex items-center gap-2.5 pl-3 pr-3.5 py-2 rounded-full bg-[#FAF8F5]/95 backdrop-blur-md border border-[#E2D9C8] shadow-warm hover:border-[#8C6D53] transition-all"
        >
          <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-[#8C6D53]/15 text-[#8C6D53]">
            <Disc3
              className={`w-4 h-4 ${isPlaying ? "animate-spin" : ""}`}
              style={{ animationDuration: "6s" }}
            />
          </div>

          {/* Ondas de sonido minimalistas */}
          <div className="flex items-end gap-0.5 h-3">
            {[0, 1, 2, 3].map((bar) => (
              <span
                key={bar}
                className={`w-0.5 rounded-full bg-[#8C6D53] transition-all duration-300 ${
                  isPlaying ? "animate-pulse" : "h-1 opacity-40"
                }`}
                style={{
                  height: isPlaying ? `${6 + ((bar * 3) % 7)}px` : "3px",
                  animationDelay: `${bar * 150}ms`,
                }}
              />
            ))}
          </div>

          <span className="text-xs font-medium text-[#2C221E]">
            {isPlaying ? "Pausar" : "Música"}
          </span>

          {isPlaying ? (
            <Pause className="w-3.5 h-3.5 text-[#7A6A5E]" />
          ) : (
            <Play className="w-3.5 h-3.5 text-[#8C6D53]" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-[#FAF8F5]/95 backdrop-blur-md border border-[#E2D9C8] shadow-warm text-[11px] text-[#7A6A5E] leading-snug"
          >
            <Volume2 className="w-3.5 h-3.5 text-[#8C6D53] shrink-0" />
            <span>{MUSIC_CONFIG.floatingNotice}</span>
            <button
              type="button"
              onClick={() => setShowHint(false)}
              aria-label="Cerrar aviso de música"
              className="text-[#7A6A5E] hover:text-[#2C221E] p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
