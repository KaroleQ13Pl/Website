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
          background: "#181818",
          surface: "#474747",
          text: "#f4f1de",
          heading: "#ebe9e9",
          primary: "#147b49",
          secondary: "#488946",
          accent: "#ffbf00",
          border: "3b3b3b",
          muted: "#9ca3af",
        },
      },
    },
  },
  plugins: [],
};
