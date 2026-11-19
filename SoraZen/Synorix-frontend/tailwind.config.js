/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050812",
        surface: "#090d1f",
        card: "rgba(11, 16, 35, 0.75)",
        border: "rgba(255, 255, 255, 0.05)",
        brand: {
          cyan: "#00d4ff",
          purple: "#7c3aed",
          green: "#10b981",
          amber: "#f59e0b",
        },
      },
      borderColor: {
        DEFAULT: "rgba(255, 255, 255, 0.05)",
      },
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-dm-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "0 0 30px -5px rgba(0, 212, 255, 0.3)",
        "glow-purple": "0 0 30px -5px rgba(124, 58, 237, 0.3)",
      },
    },
  },
  plugins: [],
};
