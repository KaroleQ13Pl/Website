import React, { createContext, useState, useEffect, useContext } from "react";

const ThemeContext = createContext({
  activeTheme: "light", // Domyślny motyw
  themes: {
    light: {},
    dark: {},
  },
  setTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [activeTheme, setActiveTheme] = useState(() => {
    const localTheme = localStorage.getItem("activeTheme");
    return localTheme || "light"; // Domyślnie "light"
  });

  const themes = {
    light: {
      "tlo-strony": "bg-jasny-biel",
      "tekst-podstawowy": "text-custom-dark-text",
      "tekst-naglowek": "text-jasny-zielony",
      "akcent-1": "text-jasny-zloto",
      "tlo-elementu": "bg-jasny-perla",
      przycisk: "bg-jasny-zielony text-white",
    },
    dark: {
      "tlo-strony": "bg-ciemny-antracyt",
      "tekst-podstawowy": "text-custom-light-text",
      "tekst-naglowek": "text-ciemny-zielony",
      "akcent-1": "text-ciemny-zloto",
      "tlo-elementu": "bg-ciemny-szary",
      przycisk: "bg-ciemny-zielony text-white",
    },
    // Możesz dodać więcej motywów tutaj
  };

  useEffect(() => {
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
    setActiveTheme(themeName);
  };

  const value = { activeTheme, themes, setTheme };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
