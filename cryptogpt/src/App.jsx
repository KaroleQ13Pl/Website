// src/App.jsx
import React, { useState } from "react";
import Topbar from "./components/Topbar";
import Sidebar from "./components/SideBar";
import ChatInterface from "./components/ChatInterface";
import SettingsPage from "./components/SettingsPage";
import UserProfilePage from "./components/UserProfilePage";
import { useTheme } from "./contexts/ThemeContext";

function App() {
  const [activeView, setActiveView] = useState("chat");
  const { activeTheme, themes } = useTheme();
  const currentTheme = themes[activeTheme];
  const topbarHeightClass = "pt-14"; // Wysokość Topbara (h-14 -> 3.5rem -> 56px)

  return (
    <div
      // Główny kontener aplikacji, zajmuje cały ekran i jest flexem kolumnowym
      className={`min-h-screen flex flex-col ${currentTheme.background} transition-colors duration-300 ease-in-out`}
    >
      {/* Topbar jest stały i zajmuje swoją wysokość */}
      <Topbar />

      {/* Kontener dla Sidebara i głównej treści (main) */}
      {/* flex-1 sprawia, że ten div zajmuje resztę wysokości po Topbarze */}
      {/* topbarHeightClass zapewnia, że zawartość zaczyna się pod Topbarem */}
      <div className={`flex flex-1 ${topbarHeightClass} overflow-hidden`}>
        {/* Dodano overflow-hidden tutaj, aby uniknąć podwójnych scrollbarów, jeśli Sidebar lub main miałyby tendencję do przepełniania */}
        <Sidebar activeView={activeView} setActiveView={setActiveView} />

        {/* Główna treść */}
        {/* flex-grow: rośnie, aby zająć dostępną szerokość */}
        {/* p-X: wewnętrzne odstępy */}
        {/* flex flex-col: dzieci (np. ChatInterface) będą układane w kolumnie */}
        {/* items-center: centruje ChatInterface w poziomie (jeśli ma max-width) */}
        {/* overflow-y-auto: Jeśli główna treść (np. SettingsPage) jest dłuższa niż okno, to TEN kontener będzie miał scroll.
            ChatInterface będzie zarządzał swoim scrollem wewnętrznie. */}
        <main
          className={`flex-grow p-4 sm:p-6 md:p-8 ${currentTheme.surface} 
                      flex flex-col items-center overflow-y-auto`}
        >
          {activeView === "home" && (
            /* Prosty kontener dla strony głównej */
            <div className="text-center">
              <h2
                className={`text-3xl font-semibold mb-4 ${currentTheme.heading}`}
              >
                Strona Główna
              </h2>
              <p className={currentTheme.text}>
                Witaj na stronie głównej! Wybierz opcję z menu.
              </p>
            </div>
          )}
          {/* ChatInterface powinien dynamicznie zająć całą dostępną wysokość w tym kontenerze main */}
          {activeView === "chat" && <ChatInterface />}
          {activeView === "settings" && <SettingsPage />}
          {activeView === "userProfile" && <UserProfilePage />}
        </main>
      </div>
    </div>
  );
}

export default App;
