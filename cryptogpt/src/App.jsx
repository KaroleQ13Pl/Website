import React, { useState } from "react";
import ThemeToggler from "./components/ThemeToggler";
import ChatInterface from "./components/ChatInterface";
import Sidebar from "./components/SideBar"; // Importujemy Sidebar
import SettingsPage from "./components/SettingsPage"; // Importujemy SettingsPage
import UserProfilePage from "./components/UserProfilePage"; // Importujemy UserProfilePage
import { useTheme } from "./contexts/ThemeContext"; // Importujemy useTheme

function App() {
  const [activeView, setActiveView] = useState("chat");
  const { activeTheme, themes } = useTheme(); // Pobieramy activeTheme i themes
  const currentTheme = themes[activeTheme]; // Pobieramy aktualny motyw

  return (
    <div
      className={`min-h-screen ${currentTheme.background} transition-colors duration-300 ease-in-out`}
    >
      <div className="flex h-screen">
        <Sidebar activeView={activeView} setActiveView={setActiveView} />

        <main className="flex-grow p-6 overflow-y-auto ${currentTheme.surface} ">
          {activeView === "home" && (
            <div>
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
          {activeView === "chat" && <ChatInterface />}
          {activeView === "settings" && <SettingsPage />}
          {activeView === "userProfile" && <UserProfilePage />}
        </main>
      </div>

      <div className="absolute top-4 right-4 z-10">
        <ThemeToggler />
      </div>
    </div>
  );
}

export default App;
