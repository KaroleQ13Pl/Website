/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Ustawia Inter jako domyślny font bezszeryfowy
      },
      colors: {
        light: {
          // Na razie zostawiamy, później dostosujemy
          background: "#f9fafb", // Jasny szary
          surface: "#ffffff", // Biały
          text: "#1f2937", // Ciemnoszary (prawie czarny)
          heading: "#111827", // Bardzo ciemnoszary
          primary: "#059669", // Ciemniejsza, nasycona zieleń
          secondary: "#f59e0b", // Bursztynowy/Złoty
          accent: "#ca8a04", // Ciemniejsze złoto
          border: "#e5e7eb", // Jasnoszary
          muted: "#6b7280", // Szary
        },
        dark: {
          background: "#111827", // Bardzo ciemny niebiesko-szary (można zmienić na bardziej zielony grafit np. #1A202C lub #182828)
          surface: "#1f2937", // Ciemny niebiesko-szary (lub np. #2D3748, #223838)
          text: "#d1d5db", // Jasnoszary
          heading: "#f3f4f6", // Bardzo jasnoszary (prawie biały)
          primary: "#047857", // Głęboka, ciemna zieleń (Twoja preferencja)
          secondary: "#065f46", // Jeszcze ciemniejsza zieleń lub stonowane złoto np. #b45309
          accent: "#f59e0b", // Bursztynowy/Złoty (dla głównych akcentów)
          // Można też rozważyć bardziej metaliczne złoto np. #D4AF37 lub #BF8B2E
          border: "#374151", // Ciemnoszary
          muted: "#6b7280", // Szary (ten sam co w light, dla spójności, lub nieco jaśniejszy)
        },
      },
    },
  },
  plugins: [],
};
