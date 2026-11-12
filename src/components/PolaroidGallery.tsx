import React, { useState } from "react";
import { motion } from "framer-motion";
import { RotateCw, Heart } from "lucide-react";
import { GALLERY_PHOTOS } from "../data/memoriesData";

export const PolaroidGallery: React.FC = () => {
  // Mapa de tarjetas volteadas por ID
  const [flippedIds, setFlippedIds] = useState<Record<string, boolean>>({});

  const toggleFlip = (id: string) => {
    setFlippedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section
      id="lo-que-fuimos"
      className="w-full max-w-3xl mx-auto px-5 py-16"
    >
      <div className="text-center mb-12">
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#7A6A5E] block mb-2">
          Lo que fuimos • Álbum Analógico
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-[#2C221E] italic">
          Instantes que se quedan conmigo
        </h2>
        <p className="text-sm text-[#7A6A5E] mt-3 max-w-sm mx-auto leading-relaxed">
          Toca cualquier fotografía Polaroid para girarla y leer la nota escrita en el reverso.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
        {GALLERY_PHOTOS.map((photo, index) => {
          const isFlipped = !!flippedIds[photo.id];

          return (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: index * 0.07 }}
              className="perspective-1000"
            >
              <button
                type="button"
                onClick={() => toggleFlip(photo.id)}
                aria-label={`Girar fotografía ${photo.caption}`}
                style={{
                  transform: `rotate(${photo.rotation}deg)`,
                }}
                className="w-full text-left focus:outline-none group transition-transform duration-300 hover:scale-[1.01]"
              >
                <div
                  className={`relative w-full aspect-[3/4] transition-transform duration-700 transform-style-3d ${
                    isFlipped ? "rotate-y-180" : ""
                  }`}
                >
                  {/* FRENTE DE LA POLAROID */}
                  <div className="absolute inset-0 backface-hidden bg-[#FAF8F5] border border-[#E2D9C8] rounded-2xl p-3.5 pb-14 shadow-polaroid flex flex-col justify-between">
                    <div className="w-full h-full rounded-xl overflow-hidden bg-[#EFECE6] relative">
                      <img
                        src={photo.imageUrl}
                        alt={photo.caption}
                        loading="lazy"
                        className="w-full h-full object-cover sepia-[0.12] contrast-[0.98] group-hover:scale-105 transition-transform duration-700"
                      />
                      <span className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-[#2C221E]/65 backdrop-blur-sm text-[#FAF8F5] text-[10px] flex items-center gap-1">
                        <RotateCw className="w-3 h-3" />
                        <span>Toca para girar</span>
                      </span>
                    </div>

                    <div className="pt-3 px-1 flex items-center justify-between gap-2">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.18em] text-[#7A6A5E]">
                          {photo.date}
                        </p>
                        <p className="font-serif italic text-lg text-[#2C221E] leading-snug mt-0.5">
                          {photo.caption}
                        </p>
                      </div>
                      <Heart className="w-4 h-4 text-[#8C6D53]/70 shrink-0" />
                    </div>
                  </div>

                  {/* REVERSO DE LA POLAROID (NOTA ESCRITA A MANO / SERIF) */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#FAF8F5] border-2 border-[#D4C3B3] rounded-2xl p-6 shadow-polaroid flex flex-col justify-between">
                    <div className="flex items-center justify-between border-b border-[#E2D9C8] pb-3">
                      <span className="text-[11px] uppercase tracking-[0.18em] text-[#8C6D53]">
                        {photo.date}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#7A6A5E]">
                        <RotateCw className="w-3 h-3" />
                        Volver a la foto
                      </span>
                    </div>

                    <div className="my-auto py-4 text-center">
                      <p className="font-serif italic text-xl sm:text-2xl text-[#2C221E] leading-relaxed">
                        “{photo.backNote}”
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#E2D9C8]/70 flex items-center justify-between text-[11px] text-[#7A6A5E]">
                      <span className="font-serif italic">{photo.caption}</span>
                      <span>Recuerdo #{index + 1}</span>
                    </div>
                  </div>
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
