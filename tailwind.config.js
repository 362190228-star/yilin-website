/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#f7f8fa",
        paper: "#ffffff",
        ink: "#161719",
        muted: "#62666b",
        line: "rgba(22, 23, 25, 0.10)",
        sky: "#1389d8",
        skySoft: "#cfeeff",
        leaf: "#9fbf71",
        lime: "#d8ff64",
      },
      borderRadius: {
        card: "24px",
        nav: "28px",
      },
      boxShadow: {
        card: "0 12px 28px rgba(20, 32, 44, 0.08)",
        hover: "0 18px 44px rgba(20, 32, 44, 0.14)",
        nav: "0 14px 34px rgba(20, 32, 44, 0.10)",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        sans: [
          "Inter",
          "Noto Sans SC",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        display: ["Inter", "Noto Sans SC", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Instrument Serif", "Georgia", "serif"],
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
