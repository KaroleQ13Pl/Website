/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Umożliwia tryb ciemny
  content: [
    "./index.html", // Skanuje główny plik HTML
    "./src/**/*.{js,ts,jsx,tsx}", // Skanuje wszystkie pliki .js, .ts, .jsx, .tsx w folderze src i jego podfolderach
  ],
  theme: {
    extend: {
      colors: {
        "jasny-biel": "#FFFFFF", // Czysta biel
        "jasny-perla": "#F8F8FF", // Perłowa biel (snow)
        "jasny-zielony": "#006400", // Ciemna zieleń (darkgreen)
        "jasny-zloto": "#FFD700", // Złote akcenty (gold)
        "ciemny-antracyt": "#36454F", // Antracyt (charcoal)
        "ciemny-szary": "#A9A9A9", // Ciemna szarość (darkgray)
        "ciemny-zielony": "#006400", // Ciemna zieleń (darkgreen) - powtórzenie, można rozważyć inny odcień
        "ciemny-zloto": "#FFD700", // Złote akcenty (gold)
      },
    },
  },
  plugins: [],
};
