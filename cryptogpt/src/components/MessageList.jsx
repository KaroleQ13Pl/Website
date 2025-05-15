// src/components/MessageList.jsx
import React from "react";
import ChatMessage from "./ChatMessage";
import { useTheme } from "../contexts/ThemeContext";

function MessageList({ messages, messagesContainerRef, isAiTyping }) {
  const { activeTheme, themes } = useTheme();
  const currentTheme = themes[activeTheme];

  return (
    // KONTENER LISTY WIADOMOŚCI
    // flex-grow: NAJWAŻNIEJSZE! Ten element rozciągnie się, aby wypełnić całą dostępną pionową przestrzeň
    //            PO header i MessageInput wewnątrz ChatInterface.
    // min-h-0:   KLUCZOWE! Często wymagane w połączeniu z flex-grow i overflow-y-auto.
    //            Mówi przeglądarce, że minimalna wysokość tego elementu może być 0, co pozwala
    //            flex-grow działać poprawnie i nie bazować minimalnej wysokości na treści.
    // overflow-y-auto: Jeśli zawartość (wiadomości) jest wyższa niż obliczona wysokość tego diva,
    //                  pojawi się PIONOWY pasek przewijania TYLKO dla tej listy.
    <div
      ref={messagesContainerRef}
      className={`flex-grow min-h-0 overflow-y-auto 
                  p-4 space-y-3 ${currentTheme.background} 
                  transition-colors duration-300 ease-in-out`}
    >
      {messages.length === 0 && !isAiTyping ? (
        <p className={`${currentTheme.muted} text-center italic pt-4`}>
          Rozpocznij rozmowę wpisując wiadomość poniżej.
        </p>
      ) : (
        messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)
      )}

      {/* Wskaźnik pisania przez AI */}
      {isAiTyping && (
        <div className="flex justify-start">
          {" "}
          {/* Dodatkowy div dla lepszego pozycjonowania w flex container */}
          <div
            className={`${currentTheme.surface} ${currentTheme.text} p-3 rounded-lg max-w-[75%] self-start animate-pulse text-sm`}
          >
            AI pisze...
          </div>
        </div>
      )}
    </div>
  );
}

export default MessageList;
