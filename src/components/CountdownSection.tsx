import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Calendar, Heart, ChevronDown } from "lucide-react";
import { SPECIAL_DATE_CONFIG } from "../data/memoriesData";
import { sendTelegramNotification } from "../utils/telegramNotifier";

interface CountdownSectionProps {
  onContinue?: () => void;
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({ onContinue }) => {
  const cfg = SPECIAL_DATE_CONFIG;
  if (!cfg.enabled) return null;

  const targetTime = new Date(cfg.targetDate).getTime();

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetTime - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isArrived: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isArrived: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      const updated = calculateTimeLeft();
      setTimeLeft(updated);
      if (updated.isArrived) {
        clearInterval(timer);
      }
    }, 1000);

    // Notificar discretamente si abrió y vio esta sección
    sendTelegramNotification("Viendo sección del 25", timeLeft.isArrived ? "El 25 ya llegó" : "Cuenta regresiva activa");

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="min-h-screen w-full max-w-xl mx-auto px-5 py-12 flex flex-col justify-center relative">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-b from-[#FAF8F5] to-[#F3ECE1] border border-[#E2D9C8] rounded-3xl p-7 sm:p-9 shadow-warm text-center relative overflow-hidden"
      >
        {/* Esquinas decorativas de carta editorial */}
        <div className="pointer-events-none absolute inset-3 border border-[#E2D9C8]/50 rounded-2xl" />

        <div className="relative z-10 space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8C6D53]/15 text-[#8C6D53] text-[11px] uppercase tracking-[0.2em] font-medium">
            <Calendar className="w-3.5 h-3.5" />
            <span>{cfg.tag}</span>
          </div>

          {/* Título */}
          <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-[#2C221E] italic leading-tight">
            {timeLeft.isArrived ? cfg.arrivedTitle : cfg.beforeTitle}
          </h3>

          {/* Cuenta Regresiva (si aún no llega el 25) */}
          {!timeLeft.isArrived && (
            <div className="grid grid-cols-4 gap-2.5 max-w-xs mx-auto py-2">
              <div className="bg-[#FAF8F5] border border-[#E2D9C8] rounded-2xl py-3 px-1 shadow-sm">
                <span className="font-serif text-2xl sm:text-3xl font-semibold text-[#8C6D53] block leading-none">
                  {String(timeLeft.days).padStart(2, "0")}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#7A6A5E] mt-1 block">
                  Días
                </span>
              </div>
              <div className="bg-[#FAF8F5] border border-[#E2D9C8] rounded-2xl py-3 px-1 shadow-sm">
                <span className="font-serif text-2xl sm:text-3xl font-semibold text-[#8C6D53] block leading-none">
                  {String(timeLeft.hours).padStart(2, "0")}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#7A6A5E] mt-1 block">
                  Horas
                </span>
              </div>
              <div className="bg-[#FAF8F5] border border-[#E2D9C8] rounded-2xl py-3 px-1 shadow-sm">
                <span className="font-serif text-2xl sm:text-3xl font-semibold text-[#8C6D53] block leading-none">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#7A6A5E] mt-1 block">
                  Min
                </span>
              </div>
              <div className="bg-[#FAF8F5] border border-[#E2D9C8] rounded-2xl py-3 px-1 shadow-sm">
                <span className="font-serif text-2xl sm:text-3xl font-semibold text-[#8C6D53] block leading-none">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#7A6A5E] mt-1 block">
                  Seg
                </span>
              </div>
            </div>
          )}

          {/* Si ya llegó el 25 */}
          {timeLeft.isArrived && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8C6D53] text-[#FAF8F5] text-xs font-medium shadow-sm">
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Nuestra fecha</span>
            </div>
          )}

          {/* Nota íntima */}
          <p className="text-sm text-[#7A6A5E] leading-relaxed max-w-md mx-auto italic font-serif">
            “{timeLeft.isArrived ? cfg.arrivedNote : cfg.beforeNote}”
          </p>

          {/* Botón para continuar hacia los recuerdos */}
          {onContinue && (
            <div className="pt-2">
              <button
                type="button"
                onClick={onContinue}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#8C6D53] hover:bg-[#785B43] text-[#FAF8F5] text-xs font-medium tracking-wide shadow-sm transition-all active:scale-95"
              >
                <span>Recorrer los recuerdos</span>
                <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
};
