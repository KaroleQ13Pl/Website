// src/components/MessageInput.jsx
import React from "react";
import { useTheme } from "../contexts/ThemeContext";

function MessageInput({
  currentMessage,
  setCurrentMessage,
  handleSendMessage,
  isAiTyping,
  className, // <-- Akceptujemy className jako prop
}) {
  const { activeTheme, themes } = useTheme();
  const currentTheme = themes[activeTheme];

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (currentMessage.trim() !== "" && !isAiTyping) {
      handleSendMessage(e); // Wywołujemy przekazaną funkcję
    }
  };

  // Pole do wpisywania wiadomości
  // className (przekazany z ChatInterface) zawiera 'flex-shrink-0', aby ten element się nie kurczył.
  return (
    <form
      onSubmit={onFormSubmit}
      className={`p-3 sm:p-4 border-t ${currentTheme.border} ${
        currentTheme.background
      } 
                  transition-colors duration-300 ease-in-out ${
                    className || ""
                  }`} // Stosujemy przekazany className
    >
      <div className="flex items-center space-x-2 sm:space-x-3">
        <input
          type="text"
          placeholder="Wpisz wiadomość..."
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          disabled={isAiTyping}
          className={`flex-grow p-2.5 sm:p-3 border ${
            currentTheme.border
          } rounded-lg 
                      focus:outline-none focus:ring-2 
                      focus:ring-${
                        activeTheme === "dark"
                          ? themes.dark.accent.replace("dark-", "")
                          : themes.light.accent.replace("light-", "")
                      } 
                      focus:border-transparent
                      ${currentTheme.background} ${currentTheme.text} 
                      disabled:opacity-60 disabled:cursor-not-allowed
                      transition-colors duration-300 ease-in-out`}
          onKeyPress={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !isAiTyping) {
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
                      px-4 py-2.5 sm:px-5 sm:py-3 font-medium
                      transition-all duration-150 ease-in-out`}
          disabled={currentMessage.trim() === "" || isAiTyping}
        >
          Wyślij
        </button>
      </div>
    </form>
  );
}

export default MessageInput;
