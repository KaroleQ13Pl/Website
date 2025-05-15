// plik: tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        // NOWA PALETA: CIEMNA ZIELEŃ, ZŁOTO, ANTRACYT
        light: {
          // Tryb jasny - utrzymujemy biel i jasne odcienie dla kontrastu
          background: "#ffffff", // Czysta biel tła
          surface: "#f0fdf4", // Bardzo, bardzo jasny odcień zieleni (prawie biały) lub #f9fafb (jasny szary)
          text: "#1f2937", // Ciemnoszary tekst
          heading: "#111827", // Bardzo ciemnoszary dla nagłówków
          primary: "#059669", // Główny: ciemna, nasycona zieleń (Twoja pierwotna propozycja)
          secondary: "#047857", // Drugorzędny: nieco inny odcień zieleni
          accent: "#ca8a04", // Akcent: stonowane złoto (mniej neonowe w trybie jasnym)
          border: "#d1fae5", // Ramki: bardzo jasny zielony lub #e5e7eb (jasnoszary)
          muted: "#6b7280", // Szary dla mniej ważnych tekstów
        },
        dark: {
          // Tryb ciemny - tutaj wprowadzamy główne zmiany
          background: "#1f2937", // Tło: Antracyt / bardzo ciemny niebiesko-szary
          // Alternatywa: "#1A202C" (bardziej grafitowy) lub "#182828" (bardziej zielony grafit)
          surface: "#2c3a4b", // Powierzchnia: Nieco jaśniejszy antracyt/grafit
          // Alternatywa: "#2D3748" lub "#223838"
          text: "#d1d5db", // Tekst: Jasnoszary
          heading: "#f3f4f6", // Nagłówki: Bardzo jasnoszary (prawie biały)
          primary: "#059669", // Główny: Ciemna, nasycona zieleń
          // Można rozważyć jaśniejszą zieleń dla lepszego kontrastu na ciemnym tle, np. #10B981
          secondary: "#047857", // Drugorzędny: Nieco ciemniejsza lub inna zieleń
          accent: "#f59e0b", // Akcent: Jasne, żywe złoto (bardziej neonowe)
          // Dla bardziej "neonowego" efektu na obramowaniach, użyjemy box-shadow z tym kolorem.
          border: "#374151", // Ramki: Ciemnoszary
          muted: "#9ca3af", // Mniej ważny tekst: Jaśniejszy szary
          "gold-neon": "#f59e0b", // Dodatkowy kolor dla złotego neonu, jeśli chcesz go używać bezpośrednio
        },
      },
      boxShadow: {
        soft: "0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.04)",
        "md-soft":
          "0 6px 10px -2px rgba(0, 0, 0, 0.07), 0 3px 6px -3px rgba(0, 0, 0, 0.04)",
        // Neonowy złoty cień dla efektu "glow" przy focusie/hover
        "neon-gold-focus":
          "0 0 8px 2px rgba(245, 158, 11, 0.7), 0 0 4px 1px rgba(245, 158, 11, 0.5)",
        "neon-green-focus":
          "0 0 8px 2px rgba(5, 150, 105, 0.7), 0 0 4px 1px rgba(5, 150, 105, 0.5)",
      },
      // Możemy dodać niestandardowe warianty dla focus-within (przydatne dla inputów)
      // lub hover, które używają tych cieni.
      // Przykład:
      // plugins: [
      //   function({ addVariant }) {
      //     addVariant('focus-within-neon-gold', '&:focus-within');
      //   }
      // ],
      // Wtedy w HTML: focus-within-neon-gold:shadow-neon-gold-focus
      // Ale prościej będzie użyć tego bezpośrednio w klasach focus:shadow-neon-gold-focus
    },
  },
  plugins: [
    // Możesz tu dodać wtyczki Tailwind, jeśli będziesz potrzebować bardziej zaawansowanych wariantów
  ],
};
