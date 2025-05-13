/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Umożliwia tryb ciemny
  content: [
    "./index.html", // Skanuje główny plik HTML
    "./src/**/*.{js,ts,jsx,tsx}", // Skanuje wszystkie pliki .js, .ts, .jsx, .tsx w folderze src i jego podfolderach
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
