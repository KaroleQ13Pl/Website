import React, { createContext, useState, useEffect, useContext } from "react";

// 1. Tworzenie kontekstu
// Dostarczamy wartości domyślne, które mogą być przydatne przy testowaniu
// lub jeśli komponent użyje kontekstu bez Providera (choć tego unikamy).
const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {}, // Pusta funkcja jako placeholder
});

// 2. Tworzenie Providera Kontekstu
// To jest komponent, który będzie "otaczał" część aplikacji,
// która potrzebuje dostępu do danych z kontekstu.
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Logika inicjalizacji motywu (taka sama jak poprzednio w App.jsx)
    const localTheme = localStorage.getItem("theme");
    if (localTheme) {
      return localTheme;
    }
    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }
    return "light";
  });

  // Efekt do aktualizacji klasy na <html> i zapisywania w localStorage
  // (taki sam jak poprzednio w App.jsx)
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Wartość, którą Provider będzie udostępniał swoim dzieciom
  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// 3. Tworzenie niestandardowego hooka do używania kontekstu
// To ułatwi konsumowanie kontekstu w komponentach.
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
