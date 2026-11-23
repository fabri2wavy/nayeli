import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play, Sparkles, Clock, Film, X, ExternalLink } from "lucide-react";
import { TWELVE_DAYS_VIDEOS, DayVideo } from "../data/memoriesData";
import { resolveVideoSource, getDriveEmbedUrl } from "../utils/driveHelper";
import { sendTelegramNotification } from "../utils/telegramNotifier";

interface TimelineSectionProps {
  onVideoPlay: () => void;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({ onVideoPlay }) => {
  // Guardamos el ID del video activo y la parte (1 o 2) para NO montar iframes simultáneos
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [activePart, setActivePart] = useState<1 | 2>(1);

  const handleOpenVideo = (day: DayVideo, part: 1 | 2 = 1) => {
    setActiveVideoId(day.id);
    setActivePart(part);
    onVideoPlay(); // Pausa automáticamente la música de fondo (/cancion.mp3)
    sendTelegramNotification("Reproduciendo Video", `Día ${day.dayNumber} - Parte ${part}: ${day.title}`);
  };

  const handleCloseVideo = () => {
    setActiveVideoId(null);
    setActivePart(1);
  };

  return (
    <section
      id="los-11-dias"
      className="w-full max-w-xl mx-auto px-5 py-16 relative"
    >
      {/* Encabezado de sección */}
      <div className="text-center mb-12">
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#7A6A5E] block mb-2">
          Bitácora en video • Contacto Cero
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-[#2C221E] italic">
          Los 11 Días
        </h2>
        <p className="text-sm text-[#7A6A5E] mt-3 max-w-sm mx-auto leading-relaxed">
          Toca cada capítulo para cargar su video vertical. Al reproducir un día, la música de fondo se pausará suavemente para que escuches mi voz.
        </p>
      </div>

      {/* Línea vertical de la línea de tiempo */}
      <div className="relative space-y-8 before:content-[''] before:absolute before:top-4 before:bottom-4 before:left-5 sm:before:left-6 before:w-[1px] before:bg-[#E2D9C8]">
        {TWELVE_DAYS_VIDEOS.map((day, idx) => {
          const isOpen = activeVideoId === day.id;
          const isFinale = day.dayNumber === 11 || day.isFinale;
          const currentUrl = activePart === 2 && day.driveUrl2 ? day.driveUrl2 : day.driveUrl;
          const source = resolveVideoSource(currentUrl);

          return (
            <motion.article
              key={day.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: Math.min(idx * 0.04, 0.25) }}
              className="relative pl-12 sm:pl-16"
            >
              {/* Marcador circular del Día en el eje vertical */}
              <div
                className={`absolute left-0 top-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-serif text-base sm:text-lg font-semibold transition-colors shadow-sm ${
                  isFinale
                    ? "bg-[#8C6D53] text-[#FAF8F5] ring-4 ring-[#D4C3B3]/60"
                    : isOpen
                    ? "bg-[#2C221E] text-[#FAF8F5]"
                    : "bg-[#FAF8F5] text-[#8C6D53] border border-[#E2D9C8]"
                }`}
              >
                {String(day.dayNumber).padStart(2, "0")}
              </div>

              {/* Tarjeta del Capítulo */}
              <div
                className={`rounded-3xl p-6 sm:p-7 transition-all ${
                  isFinale
                    ? "bg-gradient-to-b from-[#FAF8F5] via-[#FAF8F5] to-[#F3ECE1] border-2 border-[#8C6D53] shadow-gold"
                    : "bg-[#FAF8F5] border border-[#E2D9C8] shadow-warm"
                }`}
              >
                {/* Etiqueta especial exclusiva para el Día 11 (Cierre y 11:11) */}
                {isFinale && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8C6D53] text-[#FAF8F5] text-[11px] uppercase tracking-[0.18em] mb-4 shadow-sm">
                    <Sparkles className="w-3 h-3" />
                    <span>11:11 • Pide un deseo • Nuestro cierre</span>
                  </div>
                )}

                <div className="flex items-baseline justify-between gap-2 mb-2">
                  <span className="text-xs uppercase tracking-[0.16em] text-[#7A6A5E]">
                    {day.date}
                  </span>
                  {day.durationHint && (
                    <span className="inline-flex items-center gap-1 text-[11px] text-[#7A6A5E]">
                      <Clock className="w-3 h-3 text-[#8C6D53]" />
                      {day.durationHint}
                    </span>
                  )}
                </div>

                {/* Portada del capítulo con número grande en Serif */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#2C221E] leading-snug">
                      {day.title}
                    </h3>
                    <p className="text-sm text-[#7A6A5E] mt-2.5 leading-relaxed">
                      {day.shortNote}
                    </p>
                  </div>
                  <span className="font-serif text-4xl sm:text-5xl italic text-[#D4C3B3]/60 select-none shrink-0 leading-none">
                    #{day.dayNumber}
                  </span>
                </div>

                {/* Área de Reproductor bajo demanda (Lazy Mount) */}
                {!isOpen ? (
                  <div className="mt-5 pt-4 border-t border-[#E2D9C8]/70 flex items-center justify-between gap-3">
                    {day.driveUrl2 ? (
                      <div className="grid grid-cols-2 gap-2.5 w-full">
                        <button
                          type="button"
                          onClick={() => handleOpenVideo(day, 1)}
                          className={`py-3 px-3 rounded-2xl font-medium text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.99] ${
                            isFinale
                              ? "bg-[#8C6D53] hover:bg-[#785B43] text-[#FAF8F5] shadow-sm"
                              : "bg-[#EFECE6] hover:bg-[#E2D9C8] text-[#2C221E]"
                          }`}
                        >
                          <Play className="w-4 h-4 fill-current shrink-0" />
                          <span>Parte 1</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenVideo(day, 2)}
                          className={`py-3 px-3 rounded-2xl font-medium text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.99] ${
                            isFinale
                              ? "bg-[#8C6D53] hover:bg-[#785B43] text-[#FAF8F5] shadow-sm"
                              : "bg-[#EFECE6] hover:bg-[#E2D9C8] text-[#2C221E]"
                          }`}
                        >
                          <Play className="w-4 h-4 fill-current shrink-0" />
                          <span>Parte 2</span>
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleOpenVideo(day, 1)}
                        className={`w-full py-3 px-5 rounded-2xl font-medium text-sm flex items-center justify-center gap-2.5 transition-all active:scale-[0.99] ${
                          isFinale
                            ? "bg-[#8C6D53] hover:bg-[#785B43] text-[#FAF8F5] shadow-sm"
                            : "bg-[#EFECE6] hover:bg-[#E2D9C8] text-[#2C221E]"
                        }`}
                      >
                        <Play className="w-4 h-4 fill-current" />
                        <span>Reproducir Día {day.dayNumber}</span>
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="mt-6 pt-4 border-t border-[#E2D9C8]">
                    {/* Selector de Parte 1 y Parte 2 si el día tiene 2 videos */}
                    {day.driveUrl2 && (
                      <div className="flex items-center justify-center gap-2 mb-4 bg-[#EFECE6]/70 p-1 rounded-2xl max-w-xs mx-auto">
                        <button
                          type="button"
                          onClick={() => {
                            setActivePart(1);
                            onVideoPlay();
                          }}
                          className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-medium transition-all ${
                            activePart === 1
                              ? "bg-[#8C6D53] text-[#FAF8F5] shadow-sm"
                              : "text-[#7A6A5E] hover:text-[#2C221E]"
                          }`}
                        >
                          Parte 1
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setActivePart(2);
                            onVideoPlay();
                          }}
                          className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-medium transition-all ${
                            activePart === 2
                              ? "bg-[#8C6D53] text-[#FAF8F5] shadow-sm"
                              : "text-[#7A6A5E] hover:text-[#2C221E]"
                          }`}
                        >
                          Parte 2
                        </button>
                      </div>
                    )}

                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#8C6D53]">
                        <Film className="w-3.5 h-3.5" />
                        Reproduciendo Día {day.dayNumber} {day.driveUrl2 ? `(Parte ${activePart})` : ""} (Música en pausa)
                      </span>
                      <button
                        type="button"
                        onClick={handleCloseVideo}
                        className="inline-flex items-center gap-1 text-xs text-[#7A6A5E] hover:text-[#2C221E] px-2.5 py-1 rounded-full bg-[#EFECE6]"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Cerrar video</span>
                      </button>
                    </div>

                    {/* Contenedor vertical 9:16 */}
                    <div className="w-full max-w-[300px] mx-auto aspect-[9/16] rounded-2xl overflow-hidden border border-[#E2D9C8] bg-[#2C221E] shadow-warm relative">
                      {source.type === "mp4" ? (
                        <video
                          src={source.embedUrl}
                          controls
                          autoPlay
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      ) : source.type === "drive" ? (
                        <iframe
                          src={getDriveEmbedUrl(currentUrl)}
                          title={`Video Día ${day.dayNumber} - ${day.title} ${day.driveUrl2 ? `Parte ${activePart}` : ""}`}
                          className="w-full h-full border-0"
                          allow="autoplay; fullscreen"
                          allowFullScreen
                        />
                      ) : (
                        /* Vista previa elegante cuando aún tiene el ID placeholder de ejemplo */
                        <div className="w-full h-full flex flex-col items-center justify-between p-6 text-center bg-gradient-to-b from-[#2C221E] via-[#3A2D28] to-[#2C221E] text-[#FAF8F5]">
                          <span className="text-[10px] uppercase tracking-[0.22em] text-[#D4C3B3]">
                            Cápsula • Día {String(day.dayNumber).padStart(2, "0")} {day.driveUrl2 ? `• Parte ${activePart}` : ""}
                          </span>

                          <div className="my-auto space-y-3">
                            <div className="w-14 h-14 rounded-full bg-[#8C6D53]/30 border border-[#D4C3B3]/40 flex items-center justify-center mx-auto">
                              <Film className="w-6 h-6 text-[#D4C3B3]" />
                            </div>
                            <p className="font-serif italic text-2xl text-[#FAF8F5]">
                              “{day.title}”
                            </p>
                            <p className="text-xs text-[#D4C3B3]/90 leading-relaxed">
                              {day.driveUrl2 ? (
                                <>
                                  Reemplaza <code className="text-[#FAF8F5] underline">{activePart === 1 ? "driveUrl" : "driveUrl2"}</code> en{" "}
                                  <code className="text-[#FAF8F5]">src/data/memoriesData.ts</code> con el enlace de la Parte {activePart}.
                                </>
                              ) : (
                                <>
                                  Reemplaza <code className="text-[#FAF8F5] underline">driveUrl</code> en{" "}
                                  <code className="text-[#FAF8F5]">src/data/memoriesData.ts</code> con tu link de Google Drive.
                                </>
                              )}
                            </p>
                            <p className="text-[11px] text-[#D4C3B3]/70 font-mono break-all bg-black/25 p-2 rounded-lg">
                              {getDriveEmbedUrl(currentUrl)}
                            </p>
                          </div>

                          <a
                            href={getDriveEmbedUrl(currentUrl)}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-[11px] text-[#D4C3B3] hover:text-white"
                          >
                            <span>Abrir enlace Drive</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};
