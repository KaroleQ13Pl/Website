/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        light: {
          background: "#f9fafb",
          surface: "#f3f4f6",
          text: "#111827",
          heading: "#0f172a",
          primary: "#4ade80",
          secondary: "#facc15",
          accent: "#06b6d4",
          border: "#e5e7eb",
          muted: "#9ca3af",
        },
        dark: {
          background: "#1f2937",
          surface: "#374151",
          text: "#f9fafb",
          heading: "#a7f3d0",
          primary: "#22c55e",
          secondary: "#eab308",
          accent: "#0ea5e9",
          border: "#4b5563",
          muted: "#6b7280",
        },
      },
    },
  },
  plugins: [],
};
