// plik: src/components/MessageInput.jsx
import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid"; // Użyjemy ikony solid

function MessageInput({
  currentMessage,
  setCurrentMessage,
  handleSendMessage,
  isAiTyping,
  className,
}) {
  const { activeTheme, themes } = useTheme();
  const currentTheme = themes[activeTheme];

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (currentMessage.trim() !== "" && !isAiTyping) {
      handleSendMessage(e);
    }
  };

  return (
    // Zmieniamy tło na background całego interfejsu dla spójności,
    // dodajemy górną ramkę dla oddzielenia
    <form
      onSubmit={onFormSubmit}
      className={`p-3 sm:p-4 border-t ${currentTheme.border} ${
        currentTheme.background
      } 
                  transition-colors duration-300 ease-in-out 
                  ${className || ""}`}
    >
      <div className="flex items-center space-x-2 sm:space-x-3 max-w-3xl mx-auto">
        {" "}
        {/* Ograniczamy szerokość dla estetyki */}
        <textarea
          rows="1" // Zaczynamy od jednej linii, auto-resize doda więcej w CSS
          placeholder="Wyślij wiadomość..."
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          disabled={isAiTyping}
          className={`flex-grow p-3 border ${currentTheme.border} rounded-lg 
                      resize-none overflow-y-auto max-h-32  // Umożliwia auto-resize i scroll gdy za dużo tekstu
                      focus:outline-none focus:ring-2 
                      focus:ring-${
                        activeTheme === "dark"
                          ? themes.dark.accent.replace("dark-", "")
                          : themes.light.accent.replace("light-", "")
                      }
                      focus:border-transparent
                      ${
                        currentTheme.surface
                      } // Użyj surface dla inputu dla lekkiego kontrastu z tłem
                      ${currentTheme.text} 
                      disabled:opacity-60 disabled:cursor-not-allowed
                      transition-colors duration-300 ease-in-out text-sm sm:text-base`}
          onKeyDown={(e) => {
            // Zmienione na onKeyDown dla lepszej obsługi Enter
            if (e.key === "Enter" && !e.shiftKey && !isAiTyping) {
              e.preventDefault(); // Zapobiegaj nowej linii w textarea
              onFormSubmit(e);
            }
          }}
        />
        <button
          type="submit"
          className={`${currentTheme.primary} text-white rounded-lg
                      hover:opacity-90 focus:outline-none 
                      focus:ring-2 focus:ring-offset-2 
                      focus:ring-offset-${currentTheme.background.replace(
                        activeTheme + "-",
                        ""
                      )}
                      focus:ring-${
                        activeTheme === "dark"
                          ? themes.dark.primary.replace("dark-", "")
                          : themes.light.primary.replace("light-", "")
                      }
                      disabled:opacity-50 disabled:cursor-not-allowed 
                      p-3 // Jednolity padding dla przycisku
                      font-medium transition-all duration-150 ease-in-out flex-shrink-0`}
          disabled={currentMessage.trim() === "" || isAiTyping}
          aria-label="Wyślij wiadomość"
        >
          <PaperAirplaneIcon className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </form>
  );
}

export default MessageInput;
