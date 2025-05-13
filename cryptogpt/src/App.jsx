// src/App.jsx
import React, { useState, useEffect } from "react"; // Upewnij się, że useEffect jest zaimportowany

function App() {
  const [count, setCount] = useState(0); // Twój istniejący stan licznika

  // Stan do przechowywania aktualnego motywu ('light' lub 'dark')
  const [theme, setTheme] = useState(() => {
    // 1. Sprawdź, czy motyw jest zapisany w localStorage
    const localTheme = localStorage.getItem("theme");
    if (localTheme) {
      return localTheme;
    }
    // 2. Jeśli nie, sprawdź preferencje systemowe użytkownika
    // (window.matchMedia jest dostępne tylko w przeglądarce)
    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }
    // 3. Domyślnie ustaw motyw jasny
    return "light";
  });

  // Funkcja do przełączania motywu
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Efekt, który aktualizuje klasę na elemencie <html> i zapisuje motyw w localStorage
  useEffect(() => {
    const root = window.document.documentElement; // Odniesienie do elementu <html>
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    // Zapisz wybór motywu w localStorage, aby był pamiętany
    localStorage.setItem("theme", theme);
  }, [theme]); // Ten efekt uruchomi się za każdym razem, gdy zmieni się stan 'theme'

  return (
    // Zastosuj style Tailwind reagujące na tryb ciemny
    // Dodajemy `transition-colors` dla płynniejszej zmiany
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 flex flex-col items-center justify-center p-4 transition-colors duration-300 ease-in-out">
      {/* Przycisk do przełączania motywu */}
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-gray-800 dark:text-gray-100 rounded-lg shadow hover:bg-slate-300 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-150 ease-in-out"
        >
          {/* Prosta ikonka lub tekst */}
          {theme === "light" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
          )}
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-xl max-w-md w-full transition-colors duration-300 ease-in-out">
        <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-6 text-center">
          Witaj w Interfejsie AI!
        </h1>

        <p className="text-gray-700 dark:text-gray-300 mb-4 text-center">
          To jest Twój pierwszy komponent React ostylowany za pomocą Tailwind
          CSS.
        </p>

        <div className="text-center mb-6">
          <button
            onClick={() => setCount((count) => count + 1)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-150 ease-in-out"
          >
            Licznik: {count}
          </button>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          Zacznij budować swój interfejs!
        </p>
      </div>
    </div>
  );
}

export default App;
