import React from "react";
import ChatMessage from "./ChatMessage"; // Importujemy komponent pojedynczej wiadomości
import { useTheme } from "../contexts/ThemeContext"; // Importujemy useTheme

function MessageList({ messages, messagesContainerRef, isAiTyping }) {
  const { activeTheme, themes } = useTheme(); // Pobieramy activeTheme i themes
  const currentTheme = themes[activeTheme]; // Pobieramy aktualny motyw
  return (
    <div
      ref={messagesContainerRef} // Przypisujemy przekazaną referencję
      className={`flex-grow p-4 space-y-2 overflow-y-auto ${currentTheme.background}`}
    >
      {messages.length === 0 && !isAiTyping ? ( // Jeśli nie ma wiadomości i AI nie pisze
        <p className={currentTheme.muted}>Rozpocznij rozmowę!</p>
      ) : (
        messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} /> // Używamy ChatMessage
        ))
      )}

      {/* Wskaźnik "AI pisze..." */}
      {isAiTyping && (
        <div
          className={`${currentTheme.surface} p-3 rounded-lg max-w-[75%] self-start mr-auto animate-pulse ${currentTheme.text}`}
        >
          AI pisze...
        </div>
      )}
    </div>
  );
}

export default MessageList;
