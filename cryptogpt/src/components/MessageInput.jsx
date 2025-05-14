// Komponent MessageInput
// Opis: Komponent MessageInput jest używany do wprowadzania wiadomości przez użytkownika.
import React from "react";
import { useTheme } from "../contexts/ThemeContext";

function MessageInput({
  currentMessage,
  setCurrentMessage,
  handleSendMessage,
  isAiTyping,
}) {
  const { activeTheme, themes } = useTheme();
  const currentTheme = themes[activeTheme];
  return (
    <form
      onSubmit={handleSendMessage}
      className={`p-4 border-t border-gray-200 dark:border-slate-600 ${currentTheme.background}`}
    >
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Wpisz wiadomość..."
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          disabled={isAiTyping}
          className={`flex-grow p-2 border border-gray-300 dark:border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-vibrant-purple ${currentTheme.background} ${currentTheme.text} disabled:opacity-70 disabled:cursor-not-allowed`}
          onKeyPress={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (currentMessage.trim() !== "") {
                handleSendMessage(e);
              }
            }
          }}
        />
        <button
          type="submit"
          className={`${currentTheme.primary} rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-custom-vibrant-purple disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2`}
          disabled={currentMessage.trim() === "" || isAiTyping}
        >
          Wyślij
        </button>
      </div>
    </form>
  );
}

export default MessageInput;
