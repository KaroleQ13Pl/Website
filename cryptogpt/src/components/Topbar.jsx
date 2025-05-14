// src/components/Topbar.jsx
import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import ClockWidget from "./ClockWidget";
import ThemeToggler from "./ThemeToggler"; // Zaimportujemy go tutaj

// Ikona zębatki (SVG) - możesz użyć dowolnej ikony SVG
const SettingsIcon = () => (
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
      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.646.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.24-.438.613-.43.992a6.759 6.759 0 0 1 0 1.903c-.008.378.137.75.43.99l1.004.827c.427.35.574.98.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.609 6.609 0 0 1-.22.128c-.333.183-.582.495-.646.87l-.212 1.28c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.212-1.281c-.062-.374-.312-.686-.646-.87a6.609 6.609 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.759 6.759 0 0 1 0-1.903c.01-.378-.136-.75-.43-.99l-1.004-.828a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.646-.87l.212-1.281Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    />
  </svg>
);

function Topbar() {
  const { activeTheme, themes } = useTheme();
  const currentTheme = themes[activeTheme];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 h-14 flex items-center justify-between px-4 shadow-md border-b ${currentTheme.background} ${currentTheme.border} transition-colors duration-300 ease-in-out`}
    >
      {/* Lewa strona Topbara */}
      <div className="flex items-center space-x-4">
        <ClockWidget />
        {/* Tutaj w przyszłości można dodać inne widżety po lewej stronie */}
      </div>

      {/* Prawa strona Topbara */}
      <div className="flex items-center space-x-3">
        <ThemeToggler />
        <button
          className={`${currentTheme.text} hover:opacity-75`}
          aria-label="Ustawienia Topbara"
          onClick={() => alert("Konfiguracja topbara - do zaimplementowania!")} // Placeholder
        >
          <SettingsIcon />
        </button>
      </div>
    </header>
  );
}

export default Topbar;
