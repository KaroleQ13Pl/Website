// Plik: src/App.jsx
import React, { useState } from "react";
import ThemeToggler from "./components/ThemeToggler";
import ChatInterface from "./components/ChatInterface";
import Sidebar from "./components/SideBar"; // Importujemy Sidebar
import SettingsPage from "./components/SettingsPage"; // Importujemy SettingsPage
import UserProfilePage from "./components/UserProfilePage"; // Importujemy UserProfilePage

function App() {
  const [activeView, setActiveView] = useState("chat");

  return (
    <div className="min-h-screen bg-custom-off-white dark:bg-custom-deep-blue text-custom-dark-text dark:text-custom-light-text transition-colors duration-300 ease-in-out">
      <div className="flex h-screen">
        {/* >>> UŻYJ KOMPONENTU Sidebar <<< */}
        <Sidebar activeView={activeView} setActiveView={setActiveView} />

        <main className="flex-grow p-6 overflow-y-auto bg-white dark:bg-slate-900">
          {" "}
          {/* Dodałem tło do main dla lepszego rozróżnienia */}
          {activeView === "home" && (
            <div>
              <h2 className="text-3xl font-semibold mb-4 text-custom-dark-text dark:text-custom-light-text">
                Strona Główna
              </h2>
              <p className="text-custom-dark-text dark:text-custom-light-text">
                Witaj na stronie głównej! Wybierz opcję z menu.
              </p>
              {/* Możesz tu dodać więcej treści dla strony Home */}
            </div>
          )}
          {activeView === "chat" && (
            // Aby ChatInterface nie rozciągał się niepotrzebnie, można go opakować w div z ograniczeniem wysokości,
            // jeśli Sidebar i MainContent mają różne wysokości przewijania.
            // Na razie ChatInterface ma własne h-[80vh], co może być OK,
            // ale warto rozważyć, czy wysokość czatu nie powinna być względna do <main>.
            // Na razie zostawmy jak jest, dopasujemy później.
            <ChatInterface />
          )}
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
