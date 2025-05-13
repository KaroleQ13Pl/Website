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
        "custom-off-white": "#F8F8F8", // Nazwa dla naszego jasnego tła
        "custom-deep-blue": "#1A202C", // Nazwa dla naszego ciemnego tła
        "custom-dark-text": "#2D3748", // Nazwa dla naszego ciemnego tekstu
        "custom-light-text": "#E2E8F0", // Nazwa dla naszego jasnego tekstu
        "custom-vibrant-purple": "#6B46C1", // Nazwa dla naszego koloru akcentu
      },
    },
  },
  plugins: [],
};
