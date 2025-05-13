// Plik: src/App.jsx
// >>> EDYTUJ TEN PLIK - ZNACZNE UPROSZCZENIE <<<

import React from "react"; // useState, useEffect, useRef nie są już tu potrzebne dla logiki czatu
import ThemeToggler from "./components/ThemeToggler"; // Importujemy komponent przełącznika motywu
import ChatInterface from "./components/ChatInterface"; // Importujemy nowy główny komponent czatu

function App() {
  return (
    <div className="min-h-screen bg-custom-off-white dark:bg-custom-deep-blue flex flex-col items-center justify-center p-4 transition-colors duration-300 ease-in-out">
      <div className="absolute top-4 right-4">
        <ThemeToggler />
      </div>

      <ChatInterface />
    </div>
  );
}

export default App;
