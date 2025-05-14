import React, { createContext, useState, useEffect, useContext } from "react";

const ThemeContext = createContext({
  activeTheme: "light", // Domyślny motyw
  themes: {
    light: {},
    dark: {},
  },
  setTheme: () => {},
  getColor: () => "",
});

export function ThemeProvider({ children }) {
  // Komponent ThemeProvider
  const [activeTheme, setActiveTheme] = useState(() => {
    const localTheme = localStorage.getItem("activeTheme");
    return localTheme || "light"; // Domyślnie "light"
  });

  const themes = {
    // Definicja motywów
    light: {
      // Motyw jasny
      background: "light-background",
      surface: "light-surface",
      text: "light-text",
      heading: "light-heading",
      primary: "light-primary",
      secondary: "light-secondary",
      accent: "light-accent",
      border: "light-border",
      muted: "light-muted",
    },
    dark: {
      // Motyw ciemny
      background: "dark-background",
      surface: "dark-surface",
      text: "dark-text",
      heading: "dark-heading",
      primary: "dark-primary",
      secondary: "dark-secondary",
      accent: "dark-accent",
      border: "dark-border",
      muted: "dark-muted",
    },
    // Możesz dodać więcej motywów tutaj
  };

  useEffect(() => {
    // Ustawienie domyślnego motywu na podstawie localStorage
    localStorage.setItem("activeTheme", activeTheme);
    // Aktualizacja klasy 'dark' na elemencie <html>
    const root = window.document.documentElement;
    if (activeTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [activeTheme]);

  const setTheme = (themeName) => {
    // Funkcja do ustawiania motywu
    setActiveTheme(themeName);
  };

  const value = { activeTheme, themes, setTheme };

  // Funkcja getColor - teraz niepotrzebna, ale zostawiam na przyszłość
  /*const getColor = (colorName) => {
    return themes[activeTheme][colorName] || "";
  };*/

  return (
    // Użycie ThemeContext.Provider do udostępnienia kontekstu
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  // Hook do używania kontekstu motywu
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
