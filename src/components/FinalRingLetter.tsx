import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode, Lock, Download, Check, Copy, Sparkles, X } from "lucide-react";
import QRCode from "qrcode";
import { FINAL_LETTER_CONFIG } from "../data/memoriesData";

interface FinalRingLetterProps {
  onLockCapsule: () => void;
}

export const FinalRingLetter: React.FC<FinalRingLetterProps> = ({ onLockCapsule }) => {
  const [showQrModal, setShowQrModal] = useState(false);
  const [customUrl, setCustomUrl] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCustomUrl(window.location.href);
    }
  }, []);

  useEffect(() => {
    const target = customUrl.trim() || "https://capsula-11-dias.vercel.app";
    QRCode.toDataURL(target, {
      width: 512,
      margin: 2,
      color: {
        dark: "#2C221E",
        light: "#FAF8F5",
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch(() => setQrDataUrl(""));
  }, [customUrl]);

  const handleDownloadQr = () => {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.href = qrDataUrl;
    link.download = "qr-capsula-nayeli-11-dias.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyUrl = () => {
    try {
      navigator.clipboard.writeText(customUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement("input");
      input.value = customUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section
      id="el-anillo"
      className="w-full max-w-xl mx-auto px-5 pt-12 pb-24"
    >
      {/* Carta de papel antiguo */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-[#FAF8F5] border-2 border-[#E2D9C8] rounded-3xl p-7 sm:p-10 shadow-warm relative overflow-hidden"
      >
        {/* Esquinas decorativas de carta editorial */}
        <div className="pointer-events-none absolute inset-3 border border-[#E2D9C8]/60 rounded-2xl" />

        <div className="relative z-10">
          {/* Ícono de Anillo Minimalista arriba */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-[#F7F3EB] border border-[#D4C3B3] flex items-center justify-center mb-4 shadow-sm">
              <svg
                viewBox="0 0 40 40"
                className="w-9 h-9 text-[#8C6D53]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="20" cy="23" r="11" />
                <path d="M15.5 12L20 6.5L24.5 12L20 14.5Z" strokeLinejoin="round" />
                <path d="M12 8.5L14.5 10M28 8.5L25.5 10" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-[11px] uppercase tracking-[0.24em] text-[#8C6D53]">
              {FINAL_LETTER_CONFIG.sectionTag}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#2C221E] italic mt-1.5 leading-snug">
              {FINAL_LETTER_CONFIG.title}
            </h2>
          </div>

          {/* Cuerpo de la carta */}
          <div className="space-y-5 font-serif text-lg sm:text-xl text-[#2C221E] leading-relaxed">
            <p className="italic font-semibold text-2xl text-[#8C6D53]">
              {FINAL_LETTER_CONFIG.salutation}
            </p>

            {FINAL_LETTER_CONFIG.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-[#2C221E]/95">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Firma */}
          <div className="mt-9 pt-6 border-t border-[#E2D9C8] text-right">
            <p className="font-serif italic text-lg text-[#7A6A5E]">
              {FINAL_LETTER_CONFIG.closingQuote}
            </p>
            <p className="font-serif text-2xl font-semibold text-[#2C221E] mt-1">
              {FINAL_LETTER_CONFIG.signature}
            </p>
          </div>

          {/* Postdata */}
          <div className="mt-6 p-4 rounded-2xl bg-[#F7F3EB] border border-[#E2D9C8] text-xs text-[#7A6A5E] leading-relaxed italic">
            {FINAL_LETTER_CONFIG.postScript}
          </div>
        </div>
      </motion.div>

      {/* Pie de página: Cerrar cápsula y Generador QR */}
      <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-[#7A6A5E]">
        <button
          type="button"
          onClick={onLockCapsule}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#FAF8F5] hover:bg-[#EFECE6] border border-[#E2D9C8] text-[#7A6A5E] hover:text-[#2C221E] transition-colors"
        >
          <Lock className="w-3.5 h-3.5 text-[#8C6D53]" />
          <span>Cerrar cápsula (volver al candado)</span>
        </button>

        <button
          type="button"
          onClick={() => setShowQrModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#FAF8F5] hover:bg-[#EFECE6] border border-[#E2D9C8] text-[#7A6A5E] hover:text-[#2C221E] transition-colors"
        >
          <QrCode className="w-3.5 h-3.5 text-[#8C6D53]" />
          <span>Tarjeta QR para el anillo</span>
        </button>
      </div>

      {/* Modal Generador de QR para imprimir junto al anillo */}
      <AnimatePresence>
        {showQrModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#2C221E]/60 backdrop-blur-sm flex items-center justify-center p-5"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              className="w-full max-w-md bg-[#FAF8F5] border border-[#E2D9C8] rounded-3xl p-6 shadow-warm relative"
            >
              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                aria-label="Cerrar modal de QR"
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#EFECE6] text-[#7A6A5E] hover:text-[#2C221E] flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center mb-5">
                <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-[#8C6D53]">
                  <Sparkles className="w-3 h-3" />
                  Herramienta de Desarrollador
                </span>
                <h3 className="font-serif text-2xl font-semibold text-[#2C221E] mt-1">
                  Código QR para la cajita del anillo
                </h3>
                <p className="text-xs text-[#7A6A5E] mt-1">
                  Genera y descarga el QR en alta resolución (PNG) apuntando al dominio donde despliegues la app en Vercel.
                </p>
              </div>

              <div className="bg-[#F7F3EB] border border-[#E2D9C8] rounded-2xl p-5 flex flex-col items-center">
                {qrDataUrl && (
                  <img
                    src={qrDataUrl}
                    alt="Código QR Cápsula de Cierre"
                    className="w-48 h-48 rounded-xl border border-[#E2D9C8] shadow-sm bg-[#FAF8F5] p-2"
                  />
                )}
                <p className="font-serif italic text-base text-[#2C221E] mt-3">
                  “Para Nayeli • Algunos recuerdos tienen su propia llave”
                </p>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="qr-url-input"
                  className="block text-[11px] uppercase tracking-[0.14em] text-[#7A6A5E] mb-1"
                >
                  URL de destino (Vercel)
                </label>
                <div className="flex gap-2">
                  <input
                    id="qr-url-input"
                    type="text"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-[#F7F3EB] border border-[#E2D9C8] text-xs text-[#2C221E] focus:outline-none focus:border-[#8C6D53]"
                  />
                  <button
                    type="button"
                    onClick={handleCopyUrl}
                    className="px-3 py-2 rounded-xl bg-[#EFECE6] hover:bg-[#E2D9C8] text-xs text-[#2C221E] flex items-center gap-1"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-[#8C6D53]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copiado" : "Copiar"}</span>
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleDownloadQr}
                className="w-full mt-5 py-3 px-5 rounded-xl bg-[#8C6D53] hover:bg-[#785B43] text-[#FAF8F5] text-sm font-medium flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Descargar QR en PNG</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
