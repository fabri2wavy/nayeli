import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { PROLOGUE_CONFIG } from "../data/memoriesData";

interface PrologueSectionProps {
  onContinue: () => void;
}

export const PrologueSection: React.FC<PrologueSectionProps> = ({ onContinue }) => {
  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center px-6 py-16 relative">
      <div className="max-w-md w-full mx-auto text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F5] border border-[#E2D9C8] text-[11px] uppercase tracking-[0.22em] text-[#7A6A5E]"
        >
          <Sparkles className="w-3 h-3 text-[#8C6D53]" />
          <span>{PROLOGUE_CONFIG.badge}</span>
        </motion.div>

        <div className="space-y-6 py-4">
          {PROLOGUE_CONFIG.lines.map((line, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.0,
                delay: 0.7 + index * 1.15,
                ease: "easeOut",
              }}
              className={`font-serif leading-relaxed ${
                index === 0
                  ? "text-3xl sm:text-4xl font-semibold text-[#2C221E] italic"
                  : index === 1
                  ? "text-2xl sm:text-3xl text-[#2C221E]/90"
                  : "text-xl sm:text-2xl text-[#7A6A5E] italic"
              }`}
            >
              “{line}”
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 4.1 }}
          className="pt-4"
        >
          <button
            type="button"
            onClick={onContinue}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#8C6D53] hover:bg-[#785B43] text-[#FAF8F5] text-sm font-medium tracking-wide shadow-warm transition-all active:scale-95"
          >
            <span>{PROLOGUE_CONFIG.continueButtonText}</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
