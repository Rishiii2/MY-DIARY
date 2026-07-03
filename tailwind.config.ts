import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0B0E14",       // graphite-blue background
        surface: "#131826",    // panel surface
        surface2: "#1B2233",   // raised surface
        line: "#2A3142",       // hairline borders
        paper: "#E8E6DF",      // warm off-white text
        muted: "#8B93A7",      // secondary text
        amber: "#FFB454",      // phosphor amber accent
        cyan: "#5EEAD4",       // oscilloscope cyan accent
        violet: "#9B8CFF",     // rare third accent, used sparingly
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jbmono)", "monospace"],
      },
      backgroundImage: {
        grain: "url('/grain.png')",
      },
      keyframes: {
        drift: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseGlow: {
          "0%,100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        drift: "drift 6s ease-in-out infinite",
        pulseGlow: "pulseGlow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
