import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["var(--font-jetbrains)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
        ink: "#000000",
        paper: "#ffffff",
      },
      animation: {
        blink: "blink 1.2s steps(1) infinite",
        "blink-slow": "blink 2.4s ease-in-out infinite",
        "blink-fast": "blink 0.6s steps(1) infinite",
        caret: "caret 1s steps(1) infinite",
        "fade-in": "fadeIn 0.4s ease-out both",
        "slide-up": "slideUp 0.35s ease-out both",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.15" },
        },
        caret: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
