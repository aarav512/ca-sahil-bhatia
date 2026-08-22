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
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
      },
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        ivory: "#FAF8F5",
        pearl: "#FFFCFA",
        stone: "#F1ECE4",
        navy: "#12324A",
        forest: "#214032",
        champagne: "#B08D57",
        walnut: "#5E4633",
        ink: "#2A2927",
        border: "#DDD4C8",
        muted: "#6F6A63",
      },
      fontFamily: {
        serif: [
          "var(--font-cormorant)",
          "var(--font-playfair)",
          "Playfair Display",
          "Georgia",
          "serif",
        ],
        sans: ["var(--font-inter)", "Manrope", "system-ui", "sans-serif"],
        body: ["var(--font-manrope)", "Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        luxury: "0.28em",
        wideish: "0.12em",
      },
      boxShadow: {
        lift: "0 18px 40px -24px rgba(18, 50, 74, 0.28)",
        brass: "0 10px 30px -18px rgba(176, 141, 87, 0.55)",
      },
      backgroundImage: {
        marble:
          "radial-gradient(1200px 600px at 10% -10%, rgba(255,255,255,0.9), transparent 55%), radial-gradient(900px 500px at 90% 10%, rgba(176,141,87,0.08), transparent 50%), linear-gradient(180deg, #FFFCFA 0%, #FAF8F5 45%, #F1ECE4 100%)",
      },
      keyframes: {
        "gold-grow": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
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
