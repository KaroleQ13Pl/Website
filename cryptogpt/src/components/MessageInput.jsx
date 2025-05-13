// Komponent MessageInput
// Opis: Komponent MessageInput jest używany do wprowadzania wiadomości przez użytkownika.
import React from "react";

function MessageInput({
  currentMessage,
  setCurrentMessage,
  handleSendMessage,
  isAiTyping,
}) {
  return (
    <form
      onSubmit={handleSendMessage}
      className="p-4 border-t border-gray-200 dark:border-slate-600 bg-gray-100 dark:bg-slate-800"
    >
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Wpisz wiadomość..."
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          disabled={isAiTyping}
          className="flex-grow p-2 border border-gray-300 dark:border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-vibrant-purple dark:bg-slate-700 dark:text-custom-light-text disabled:opacity-70 disabled:cursor-not-allowed"
          // Dodajemy obsługę wysyłania przez Enter
          onKeyPress={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault(); // Zapobiegaj nowej linii w inpucie
              if (currentMessage.trim() !== "") {
                // Tylko jeśli wiadomość nie jest pusta
                handleSendMessage(e); // Przekaż zdarzenie, aby zapobiec domyślnemu zachowaniu formularza
              }
            }
          }}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-custom-vibrant-purple text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-custom-vibrant-purple disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={currentMessage.trim() === "" || isAiTyping}
        >
          Wyślij
        </button>
      </div>
    </form>
  );
}

export default MessageInput;
