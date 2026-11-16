import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AUTH_CONFIG, MUSIC_CONFIG, CINEMA_GIFT_CONFIG } from "./data/memoriesData";
import { LockScreen } from "./components/LockScreen";
import { GiftReveal } from "./components/GiftReveal";
import { FloatingMusicPlayer } from "./components/FloatingMusicPlayer";
import { PrologueSection } from "./components/PrologueSection";
import { TimelineSection } from "./components/TimelineSection";
import { PolaroidGallery } from "./components/PolaroidGallery";
import { FinalRingLetter } from "./components/FinalRingLetter";

export function App() {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [showGift, setShowGift] = useState<boolean>(false);
  const [giftDismissed, setGiftDismissed] = useState<boolean>(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Revisar localStorage al cargar
  useEffect(() => {
    try {
      const saved = localStorage.getItem(AUTH_CONFIG.storageKey);
      if (saved === "true") {
        setIsUnlocked(true);
      }

      // Si el regalo de cine está habilitado, mostrarlo
      if (CINEMA_GIFT_CONFIG.enabled && saved === "true") {
        setShowGift(true);
      }
    } catch {
      // Ignorar si localStorage está restringido
    }
  }, []);

  // Configurar elemento <audio> para /cancion.mp3
  useEffect(() => {
    const audio = new Audio(MUSIC_CONFIG.audioSrc);
    audio.loop = true;
    audio.volume = MUSIC_CONFIG.defaultVolume;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const startMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = MUSIC_CONFIG.defaultVolume;
    audio
      .play()
      .then(() => {
        setIsMusicPlaying(true);
      })
      .catch(() => {
        setIsMusicPlaying(false);
      });
  };

  const pauseMusic = () => {
    const audio = audioRef.current;
    if (audio && !audio.paused) {
      audio.pause();
    }
    setIsMusicPlaying(false);
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isMusicPlaying) {
      pauseMusic();
    } else {
      startMusic();
    }
  };

  const handleUnlock = () => {
    try {
      localStorage.setItem(AUTH_CONFIG.storageKey, "true");
    } catch {
      // Ignorar errores de almacenamiento
    }
    setIsUnlocked(true);

    // Si el regalo está activo, mostrarlo en lugar de ir directo a la cápsula
    if (CINEMA_GIFT_CONFIG.enabled) {
      setShowGift(true);
    } else {
      startMusic();
    }
  };

  const handleGiftDismissed = () => {
    setShowGift(false);
    setGiftDismissed(true);
    startMusic();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLockCapsule = () => {
    try {
      localStorage.removeItem(AUTH_CONFIG.storageKey);
    } catch {
      // Ignorar errores de almacenamiento
    }
    pauseMusic();
    setIsUnlocked(false);
    setShowGift(false);
    setGiftDismissed(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToTimeline = () => {
    const el = document.getElementById("los-11-dias");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Determinar qué pantalla mostrar
  const showGiftScreen = isUnlocked && showGift && CINEMA_GIFT_CONFIG.enabled && !giftDismissed;
  const showCapsule = isUnlocked && !showGiftScreen;

  return (
    <div className="min-h-screen w-full paper-grain text-[#2C221E] relative selection:bg-[#D4C3B3]/50">
      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <LockScreen key="lock-screen" onUnlock={handleUnlock} />
        ) : showGiftScreen ? (
          <motion.div
            key="gift-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <GiftReveal onContinueToCapsule={handleGiftDismissed} />
          </motion.div>
        ) : showCapsule ? (
          <motion.main
            key="capsule-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            className="relative"
          >
            {/* Controlador de Música Flotante */}
            <FloatingMusicPlayer
              isPlaying={isMusicPlaying}
              onToggle={toggleMusic}
            />

            {/* Pantalla 2: Intro / Prólogo */}
            <PrologueSection onContinue={scrollToTimeline} />

            {/* Divisor sutil */}
            <div className="max-w-xs mx-auto h-[1px] bg-gradient-to-r from-transparent via-[#E2D9C8] to-transparent" />

            {/* Pantalla 3: Los 11 Días (Línea de Tiempo de Videos 9:16) */}
            <TimelineSection onVideoPlay={pauseMusic} />

            {/* Divisor sutil */}
            <div className="max-w-xs mx-auto h-[1px] bg-gradient-to-r from-transparent via-[#E2D9C8] to-transparent" />

            {/* Pantalla 4: Micro-Galería Interactiva Polaroid */}
            <PolaroidGallery />

            {/* Divisor sutil */}
            <div className="max-w-xs mx-auto h-[1px] bg-gradient-to-r from-transparent via-[#E2D9C8] to-transparent" />

            {/* Pantalla 5: El Cierre y El Anillo (Epílogo + Generador QR) */}
            <FinalRingLetter onLockCapsule={handleLockCapsule} />
          </motion.main>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default App;
