import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, X, Sparkles, Film, ExternalLink, Download, MapPin, Clock, Armchair, ChevronRight } from "lucide-react";
import { CINEMA_GIFT_CONFIG } from "../data/memoriesData";
import { sendTelegramNotification } from "../utils/telegramNotifier";

export const ArchivedGiftModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cfg = CINEMA_GIFT_CONFIG;

  const handleOpenModal = () => {
    setIsOpen(true);
    sendTelegramNotification("Cofre de Regalos", "Abrió el detalle archivado del cine");
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleDownloadTicket = () => {
    sendTelegramNotification("Descarga de Ticket", "Tocó guardar QR del ticket (Cofre)");
    window.open(cfg.ticketQrImage, "_blank");
  };

  return (
    <>
      {/* Tarjeta / Cajita en la Cápsula */}
      <section className="w-full max-w-xl mx-auto px-5 py-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#FAF8F5] border border-[#E2D9C8] rounded-3xl p-5 sm:p-6 shadow-sm flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-b from-[#F3ECE1] to-[#EAE0D2] border border-[#D4C3B3] flex items-center justify-center shrink-0 text-[#8C6D53] shadow-sm">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C6D53] font-medium block">
                Cofre de Detalles
              </span>
              <h4 className="font-serif text-lg sm:text-xl font-semibold text-[#2C221E] italic leading-tight">
                Entrada de Cine • Los Juegos del Hambre
              </h4>
              <p className="text-xs text-[#7A6A5E] mt-0.5">
                Revive la entrada del estreno y la nota especial
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleOpenModal}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#8C6D53] hover:bg-[#785B43] text-[#FAF8F5] text-xs font-medium tracking-wide shadow-sm transition-all shrink-0 active:scale-95"
          >
            <span>Ver regalo</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      </section>

      {/* Modal Desplegable al tocar "Ver regalo" */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Fondo oscuro traslúcido */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-[#2C221E]/60 backdrop-blur-sm"
            />

            {/* Contenedor del Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-lg bg-[#FAF8F5] border border-[#E2D9C8] rounded-3xl p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto my-auto"
            >
              {/* Botón cerrar */}
              <button
                type="button"
                onClick={handleCloseModal}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#EFECE6] hover:bg-[#E2D9C8] flex items-center justify-center text-[#7A6A5E] hover:text-[#2C221E] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-6 pt-2">
                <div className="text-center space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8C6D53]/15 text-[#8C6D53] text-[10px] uppercase tracking-[0.2em] font-medium">
                    <Film className="w-3 h-3" />
                    <span>Detalle del 19 de Noviembre</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#2C221E] italic">
                    {cfg.movie}
                  </h3>
                </div>

                {/* Ticket Card */}
                <div className="bg-[#F7F3EB] rounded-2xl border border-[#E2D9C8] p-5 space-y-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-14 h-18 rounded-xl overflow-hidden shrink-0 shadow-sm border border-[#E2D9C8]">
                      <img
                        src={cfg.ticketInfoImage}
                        alt="Póster"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-semibold text-[#2C221E] leading-snug">
                        {cfg.movie}
                      </h4>
                      <span className="text-[11px] text-[#7A6A5E] block mt-0.5">
                        {cfg.cinema}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-[#E2D9C8]/70">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#7A6A5E] block">Fecha</span>
                      <span className="font-medium text-[#2C221E]">{cfg.date}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#7A6A5E] block">Hora</span>
                      <span className="font-medium text-[#2C221E]">{cfg.time}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#7A6A5E] block">Sala</span>
                      <span className="font-medium text-[#2C221E]">{cfg.room}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#7A6A5E] block">Referencia</span>
                      <span className="font-mono text-[11px] text-[#2C221E]">{cfg.reference}</span>
                    </div>
                  </div>

                  {/* QR */}
                  <div className="flex flex-col items-center gap-2 pt-3 border-t border-[#E2D9C8]/70">
                    <div className="w-36 h-36 bg-white rounded-xl border border-[#E2D9C8] p-2">
                      <img
                        src={cfg.ticketQrImage}
                        alt="QR Code"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex items-center gap-3 pt-1">
                      <button
                        type="button"
                        onClick={handleDownloadTicket}
                        className="inline-flex items-center gap-1.5 text-xs text-[#7A6A5E] hover:text-[#2C221E] underline font-medium"
                      >
                        <Download className="w-3 h-3" />
                        <span>Guardar QR</span>
                      </button>
                      {cfg.ticketUrl && (
                        <a
                          href={cfg.ticketUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-[#8C6D53] hover:text-[#2C221E] underline font-medium"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Ver en Multicine</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Nota que le escribiste */}
                <div className="bg-white/60 rounded-2xl border border-[#E2D9C8] p-5 space-y-3">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C6D53] block text-center">
                    La dedicatoria
                  </span>
                  <p className="font-serif italic text-lg text-[#2C221E] text-center">
                    {cfg.note.salutation}
                  </p>
                  {cfg.note.paragraphs.map((p, idx) => (
                    <p key={idx} className="text-xs sm:text-sm text-[#7A6A5E] leading-relaxed text-center">
                      {p}
                    </p>
                  ))}
                  <p className="font-serif italic text-sm text-[#8C6D53] text-center pt-1">
                    {cfg.note.closing}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
