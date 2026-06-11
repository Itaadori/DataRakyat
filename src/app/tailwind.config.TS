import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          50:  "#edfaf4",
          100: "#d4f3e3",
          200: "#ace6ca",
          300: "#74d2aa",
          400: "#3db787",
          500: "#1e9e6e",
          600: "#128058",
          700: "#0f6748",
          800: "#0e513a",
          900: "#0c4331",
          950: "#06261c",
        },
        slate: {
          50:  "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
        sand: {
          50:  "#fdf8f0",
          100: "#faefd9",
        },
      },
      fontFamily: {
        display: ["'Plus Jakarta Sans'", "sans-serif"],
        body:    ["'Inter'", "sans-serif"],
      },
      backgroundImage: {
        "batik-dots": "radial-gradient(circle, #1e9e6e18 1px, transparent 1px)",
      },
      backgroundSize: {
        "batik": "28px 28px",
      },
    },
  },
  plugins: [],
};
export default config;