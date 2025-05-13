import React from "react";
import ChatMessage from "./ChatMessage"; // Importujemy komponent pojedynczej wiadomości

function MessageList({ messages, messagesContainerRef, isAiTyping }) {
  return (
    <div
      ref={messagesContainerRef} // Przypisujemy przekazaną referencję
      className="flex-grow p-4 space-y-2 overflow-y-auto bg-gray-50 dark:bg-slate-700"
    >
      {messages.length === 0 && !isAiTyping ? ( // Jeśli nie ma wiadomości i AI nie pisze
        <p className="text-center text-gray-500 dark:text-gray-400">
          Rozpocznij rozmowę!
        </p>
      ) : (
        messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} /> // Używamy ChatMessage
        ))
      )}

      {/* Wskaźnik "AI pisze..." */}
      {isAiTyping && (
        <div className="p-3 rounded-lg max-w-[75%] bg-slate-200 dark:bg-slate-600 text-custom-dark-text dark:text-custom-light-text self-start mr-auto animate-pulse">
          AI pisze...
        </div>
      )}
    </div>
  );
}

export default MessageList;
