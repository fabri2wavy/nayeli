import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Sparkles, MapPin, Clock, Armchair, Film, ChevronDown, Download, ExternalLink } from "lucide-react";
import { CINEMA_GIFT_CONFIG } from "../data/memoriesData";
import { sendTelegramNotification } from "../utils/telegramNotifier";

interface GiftRevealProps {
  onContinueToCapsule: () => void;
}

export const GiftReveal: React.FC<GiftRevealProps> = ({ onContinueToCapsule }) => {
  const [isOpened, setIsOpened] = useState(false);
  const cfg = CINEMA_GIFT_CONFIG;

  const handleOpen = () => {
    setIsOpened(true);
    sendTelegramNotification("Regalo Abierto", "Abrió el sobre del ticket de cine");
    try {
      localStorage.setItem(cfg.storageKey, "true");
    } catch {
      // Ignorar
    }
  };

  const handleDownloadTicket = () => {
    sendTelegramNotification("Descarga de Ticket", "Tocó guardar QR del ticket");
    // Abre la imagen del QR en nueva pestaña para que pueda guardarla
    window.open(cfg.ticketQrImage, "_blank");
  };

  return (
    <div className="min-h-screen w-full paper-grain text-[#2C221E] relative selection:bg-[#D4C3B3]/50">
      <AnimatePresence mode="wait">
        {!isOpened ? (
          /* ═══════════════════════════════════════════
             PANTALLA 1: SOBRE CERRADO / CAJA DE REGALO
             ═══════════════════════════════════════════ */
          <motion.section
            key="gift-closed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen w-full flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden"
          >
            {/* Halo dorado de fondo */}
            <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#D4C3B3]/25 blur-3xl" />
            <div className="pointer-events-none absolute bottom-1/4 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-[#8C6D53]/10 blur-2xl" />

            {/* Partículas de brillo flotantes */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-[#D4C3B3]"
                style={{
                  left: `${15 + Math.random() * 70}%`,
                  top: `${10 + Math.random() * 80}%`,
                }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scale: [0.5, 1.2, 0.5],
                  y: [0, -30, 0],
                }}
                transition={{
                  duration: 2.5 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "easeInOut",
                }}
              />
            ))}

            <div className="relative z-10 flex flex-col items-center text-center max-w-sm mx-auto space-y-8">
              {/* Icono de regalo animado */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, -2, 2, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="w-28 h-28 rounded-full bg-gradient-to-b from-[#FAF8F5] to-[#F3ECE1] border-2 border-[#D4C3B3] flex items-center justify-center shadow-lg relative">
                  <Gift className="w-12 h-12 text-[#8C6D53]" />
                  {/* Lazo dorado */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-4 bg-[#8C6D53] rounded-t-full opacity-80" />
                  {/* Brillo sutil */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-[#D4C3B3]/50"
                    animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </motion.div>

              {/* Texto de anticipación */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="space-y-3"
              >
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C6D53] block">
                  Actualización de tu cápsula
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#2C221E] italic leading-snug">
                  {cfg.giftTeaser}
                </h1>
              </motion.div>

              {/* Botón de apertura */}
              <motion.button
                type="button"
                onClick={handleOpen}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.7 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#8C6D53] hover:bg-[#785B43] text-[#FAF8F5] text-sm font-medium tracking-wide shadow-lg transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>{cfg.openButtonText}</span>
              </motion.button>
            </div>
          </motion.section>
        ) : (
          /* ═══════════════════════════════════════
             PANTALLA 2: REGALO ABIERTO (TICKET)
             ═══════════════════════════════════════ */
          <motion.section
            key="gift-opened"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="min-h-screen w-full flex flex-col items-center px-5 py-12 relative overflow-hidden"
          >
            {/* Confetti burst sutil al abrir */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`confetti-${i}`}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  backgroundColor: ["#8C6D53", "#D4C3B3", "#E2D9C8", "#785B43", "#FAF8F5"][i % 5],
                  left: `${20 + Math.random() * 60}%`,
                  top: "40%",
                }}
                initial={{ opacity: 1, scale: 1 }}
                animate={{
                  opacity: [1, 1, 0],
                  scale: [0, 1, 0.5],
                  x: (Math.random() - 0.5) * 250,
                  y: (Math.random() - 0.5) * 350,
                  rotate: Math.random() * 720,
                }}
                transition={{
                  duration: 1.8,
                  delay: i * 0.05,
                  ease: "easeOut",
                }}
              />
            ))}

            <div className="max-w-md w-full mx-auto space-y-8 relative z-10">
              {/* Encabezado */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-center space-y-3 pt-4"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8C6D53] text-[#FAF8F5] text-[11px] uppercase tracking-[0.2em] shadow-sm">
                  <Film className="w-3 h-3" />
                  <span>Entrada de cine para ti</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#2C221E] italic leading-snug">
                  {cfg.movie}
                </h2>
              </motion.div>

              {/* Tarjeta del ticket */}
              <motion.div
                initial={{ opacity: 0, y: 30, rotateX: 10 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.6, duration: 0.9, ease: "easeOut" }}
                className="bg-[#FAF8F5] rounded-3xl border-2 border-[#E2D9C8] shadow-lg overflow-hidden relative"
              >
                {/* Bordes perforados del ticket */}
                <div className="absolute left-0 top-0 bottom-0 w-3 flex flex-col justify-around items-center py-6">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="w-2.5 h-2.5 rounded-full bg-[#F7F3EB] border border-[#E2D9C8]" />
                  ))}
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-3 flex flex-col justify-around items-center py-6">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="w-2.5 h-2.5 rounded-full bg-[#F7F3EB] border border-[#E2D9C8]" />
                  ))}
                </div>

                <div className="px-7 py-8 space-y-6">
                  {/* Nombre de la película y póster */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-20 rounded-xl bg-gradient-to-b from-[#2C221E] to-[#3A2D28] flex items-center justify-center shrink-0 shadow-md overflow-hidden">
                      <img
                        src={cfg.ticketInfoImage}
                        alt="Póster"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-[#2C221E] leading-tight">
                        {cfg.movie}
                      </h3>
                      <span className="text-[11px] text-[#7A6A5E] uppercase tracking-wider mt-1 block">
                        Estreno
                      </span>
                    </div>
                  </div>

                  {/* Detalles del ticket */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#8C6D53] mt-0.5 shrink-0" />
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#7A6A5E] block">Cine</span>
                        <span className="text-sm font-medium text-[#2C221E]">{cfg.cinema}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Clock className="w-4 h-4 text-[#8C6D53] mt-0.5 shrink-0" />
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#7A6A5E] block">Hora</span>
                        <span className="text-sm font-medium text-[#2C221E]">{cfg.time}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Film className="w-4 h-4 text-[#8C6D53] mt-0.5 shrink-0" />
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#7A6A5E] block">Sala</span>
                        <span className="text-sm font-medium text-[#2C221E]">{cfg.room}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Armchair className="w-4 h-4 text-[#8C6D53] mt-0.5 shrink-0" />
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#7A6A5E] block">Referencia</span>
                        <span className="text-sm font-medium text-[#2C221E] font-mono">{cfg.reference}</span>
                      </div>
                    </div>
                  </div>

                  {/* Fecha destacada */}
                  <div className="bg-[#8C6D53] rounded-2xl py-3.5 px-5 text-center shadow-sm">
                    <span className="text-[10px] uppercase tracking-widest text-[#FAF8F5]/70 block">Fecha</span>
                    <span className="text-lg font-serif font-semibold text-[#FAF8F5] italic">
                      {cfg.date}
                    </span>
                  </div>

                  {/* Línea cortada del ticket */}
                  <div className="border-t-2 border-dashed border-[#E2D9C8] relative">
                    <div className="absolute -left-10 -top-3 w-6 h-6 rounded-full bg-[#F7F3EB]" />
                    <div className="absolute -right-10 -top-3 w-6 h-6 rounded-full bg-[#F7F3EB]" />
                  </div>

                  {/* QR Code real del ticket */}
                  <div className="flex flex-col items-center gap-3 pt-2">
                    <span className="text-[10px] uppercase tracking-widest text-[#7A6A5E]">
                      Código QR
                    </span>
                    <div className="w-48 h-48 bg-white rounded-2xl border border-[#E2D9C8] p-3 shadow-sm">
                      <img
                        src={cfg.ticketQrImage}
                        alt="QR Code del ticket"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleDownloadTicket}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#EFECE6] hover:bg-[#E2D9C8] text-[#2C221E] text-xs font-medium transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Guardar QR del ticket</span>
                    </button>

                    {cfg.ticketUrl && (
                      <a
                        href={cfg.ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-[#8C6D53] hover:text-[#2C221E] underline underline-offset-4 font-medium transition-colors pt-1"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Abrir enlace directo de la entrada</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* La nota personal */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="bg-[#FAF8F5] rounded-3xl border border-[#E2D9C8] p-7 sm:p-8 shadow-warm relative overflow-hidden"
              >
                {/* Bordes decorativos sutiles */}
                <div className="pointer-events-none absolute inset-3 border border-[#E2D9C8]/50 rounded-2xl" />

                <div className="relative z-10 space-y-5">
                  <div className="text-center">
                    <span className="text-[11px] uppercase tracking-[0.22em] text-[#8C6D53]">
                      Una nota para ti
                    </span>
                  </div>

                  <p className="font-serif text-xl italic text-[#2C221E] text-center">
                    {cfg.note.salutation}
                  </p>

                  {cfg.note.paragraphs.map((paragraph, idx) => (
                    <p
                      key={idx}
                      className="text-sm text-[#7A6A5E] leading-relaxed text-center"
                    >
                      {paragraph}
                    </p>
                  ))}

                  <p className="font-serif italic text-base text-[#8C6D53] text-center pt-2">
                    {cfg.note.closing}
                  </p>
                </div>
              </motion.div>

              {/* Botón para ir a la cápsula de recuerdos */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.7 }}
                className="text-center pb-12"
              >
                <button
                  type="button"
                  onClick={onContinueToCapsule}
                  className="inline-flex items-center gap-2 text-sm text-[#7A6A5E] hover:text-[#2C221E] transition-colors"
                >
                  <span>{cfg.continueButtonText}</span>
                  <ChevronDown className="w-4 h-4 animate-bounce" />
                </button>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

