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
      className={`h-screen flex flex-col ${currentTheme.background} transition-colors duration-300 ease-in-out`}
    >
      <Topbar />
      <div className={`flex flex-1 ${topbarHeightClass} overflow-hidden`}>
        <Sidebar activeView={activeView} setActiveView={setActiveView} />
        <main
          className={`flex-grow ${currentTheme.background} 
                      flex flex-col overflow-hidden 
                      p-0 sm:p-4 md:p-6`} // Padding jest opcjonalny, dostosuj wg potrzeb
        >
          {activeView === "chat" && <ChatInterface />}
          {activeView === "home" && (
            <div
              className={`p-6 text-center ${currentTheme.surface} rounded-lg m-4 shadow-soft overflow-y-auto`}
            >
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
          {activeView === "settings" && (
            // SettingsPage powinien sam zarządzać swoim scrollem jeśli jest długi
            <div className="h-full overflow-y-auto">
              <SettingsPage />
            </div>
          )}
          {activeView === "userProfile" && (
            // UserProfilePage powinien sam zarządzać swoim scrollem jeśli jest długi
            <div className="h-full overflow-y-auto">
              <UserProfilePage />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
