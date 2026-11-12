/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          bg: "#F7F3EB",
          alt: "#EFECE6",
          card: "#FAF8F5",
          border: "#E2D9C8",
          ink: "#2C221E",
          muted: "#7A6A5E",
          accent: "#8C6D53",
          soft: "#D4C3B3",
        },
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        warm: "0 10px 30px -10px rgba(44, 34, 30, 0.08)",
        polaroid: "0 14px 28px -8px rgba(44, 34, 30, 0.12), 0 4px 10px -3px rgba(44, 34, 30, 0.06)",
        gold: "0 16px 40px -10px rgba(140, 109, 83, 0.25)",
      },
    },
  },
  plugins: [],
};
