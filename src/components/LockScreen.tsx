import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Sparkles, KeyRound, Eye, EyeOff, Heart } from "lucide-react";
import { AUTH_CONFIG } from "../data/memoriesData";

interface LockScreenProps {
  onUnlock: () => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();

    if (
      cleanUser === AUTH_CONFIG.expectedUsername.toLowerCase() &&
      cleanPass === AUTH_CONFIG.expectedPassword
    ) {
      setError(false);
      onUnlock();
    } else {
      setError(true);
      setShakeKey((prev) => prev + 1);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.1, ease: "easeInOut" } }}
      className="min-h-screen w-full flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden"
    >
      {/* Halo cálido de fondo */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#D4C3B3]/30 blur-3xl" />

      <motion.div
        key={shakeKey}
        animate={
          error
            ? { x: [0, -10, 10, -8, 8, -4, 4, 0] }
            : { x: 0 }
        }
        transition={{ duration: 0.45 }}
        className="w-full max-w-sm bg-[#FAF8F5] border border-[#E2D9C8] rounded-3xl p-8 shadow-warm relative z-10"
      >
        {/* Ícono de anillo / candado antiguo */}
        <div className="flex flex-col items-center text-center mb-7">
          <div className="w-16 h-16 rounded-full bg-[#F7F3EB] border border-[#E2D9C8] flex items-center justify-center mb-4 shadow-sm relative">
            {/* Anillo minimalista SVG */}
            <svg
              viewBox="0 0 36 36"
              className="w-8 h-8 text-[#8C6D53]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="18" cy="21" r="10" />
              <path d="M14 11L18 6L22 11L18 13Z" strokeLinejoin="round" />
              <path d="M11 8L13 9.5M25 8L23 9.5" strokeLinecap="round" />
            </svg>
            <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#8C6D53] text-[#FAF8F5] flex items-center justify-center shadow-sm">
              <Lock className="w-3 h-3" />
            </span>
          </div>

          <span className="text-[11px] uppercase tracking-[0.25em] text-[#7A6A5E] mb-1.5">
            Cápsula de Cierre • 11 Días
          </span>
          <h1 className="font-serif text-4xl font-semibold text-[#2C221E] italic tracking-wide">
            {AUTH_CONFIG.recipientName}
          </h1>
          <p className="text-sm text-[#7A6A5E] mt-2 font-light leading-relaxed">
            “{AUTH_CONFIG.subtitle}”
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="capsule-user"
              className="block text-xs uppercase tracking-[0.15em] text-[#7A6A5E] mb-1.5"
            >
              Usuario
            </label>
            <div className="relative">
              <input
                id="capsule-user"
                type="text"
                autoComplete="off"
                autoCapitalize="none"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (error) setError(false);
                }}
                placeholder={AUTH_CONFIG.usernamePlaceholder}
                className="w-full px-4 py-3 rounded-xl bg-[#F7F3EB] border border-[#E2D9C8] text-[#2C221E] placeholder-[#7A6A5E]/55 text-sm focus:outline-none focus:border-[#8C6D53] transition-colors"
              />
              <Heart className="w-4 h-4 text-[#8C6D53]/60 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <label
              htmlFor="capsule-pass"
              className="block text-xs uppercase tracking-[0.15em] text-[#7A6A5E] mb-1.5"
            >
              Contraseña
            </label>
            <div className="relative">
              <input
                id="capsule-pass"
                type={showPassword ? "text" : "password"}
                inputMode="numeric"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(false);
                }}
                placeholder={AUTH_CONFIG.passwordPlaceholder}
                className="w-full px-4 py-3 pr-10 rounded-xl bg-[#F7F3EB] border border-[#E2D9C8] text-[#2C221E] placeholder-[#7A6A5E]/55 text-sm focus:outline-none focus:border-[#8C6D53] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label="Mostrar u ocultar fecha"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A6A5E] hover:text-[#2C221E] p-1"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            <p className="text-[11px] text-[#7A6A5E] mt-1.5 flex items-center gap-1.5">
              <KeyRound className="w-3 h-3 text-[#8C6D53]" />
              <span>Nuestra fecha (DDMMAAAA)</span>
            </p>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="p-3 rounded-xl bg-[#8C6D53]/10 border border-[#8C6D53]/30 text-center"
              >
                <p className="font-serif italic text-base text-[#2C221E]">
                  “{AUTH_CONFIG.errorMessage}”
                </p>
                <p className="text-[11px] text-[#7A6A5E] mt-0.5">
                  {AUTH_CONFIG.passwordHint}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            className="w-full mt-2 py-3.5 px-6 rounded-xl bg-[#8C6D53] hover:bg-[#785B43] active:scale-[0.99] text-[#FAF8F5] font-medium text-sm tracking-wide shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{AUTH_CONFIG.unlockButtonText}</span>
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-[#E2D9C8]/70 text-center">
          <p className="text-[11px] text-[#7A6A5E] leading-relaxed">
            Sube el volumen de tu celular antes de entrar para escuchar la música de fondo.
          </p>
        </div>
      </motion.div>
    </motion.section>
  );
};
