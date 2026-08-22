import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        sm: "2rem",
        lg: "2.5rem",
        xl: "3rem",
      },
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        ivory: "#FAF8F5",
        pearl: "#FFFCFA",
        stone: "#F4EFE8",
        navy: "#17324D",
        forest: "#284435",
        champagne: "#B08D57",
        gold: "#C8A96B",
        walnut: "#5E4633",
        ink: "#2A2927",
        border: "#DDD4C8",
        muted: "#6F6A63",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
        body: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        luxury: "0.28em",
        wideish: "0.14em",
        tightish: "-0.03em",
      },
      boxShadow: {
        lift: "0 22px 50px -28px rgba(23, 50, 77, 0.32)",
        brass: "0 12px 32px -16px rgba(176, 141, 87, 0.55)",
        glow: "0 0 40px -12px rgba(200, 169, 107, 0.45)",
      },
      keyframes: {
        "gold-grow": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        shine: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        sunlight: {
          "0%": { transform: "translate3d(-4%, -2%, 0) scale(1)" },
          "50%": { transform: "translate3d(3%, 2%, 0) scale(1.04)" },
          "100%": { transform: "translate3d(-4%, -2%, 0) scale(1)" },
        },
      },
      animation: {
        "gold-grow": "gold-grow 0.6s ease forwards",
        shine: "shine 1.4s ease",
        shimmer: "shimmer 8s linear infinite",
        sunlight: "sunlight 18s ease-in-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
