// src/App.jsx
import React, { useState, useEffect, useRef } from "react"; // Upewnij się, że useEffect jest zaimportowany

function App() {
  // Stan do przechowywania aktualnego motywu ('light' lub 'dark')
  const [theme, setTheme] = useState(() => {
    // 1. Sprawdź, czy motyw jest zapisany w localStorage
    const localTheme = localStorage.getItem("theme");
    if (localTheme) {
      return localTheme;
    }
    // 2. Jeśli nie, sprawdź preferencje systemowe użytkownika
    // (window.matchMedia jest dostępne tylko w przeglądarce)
    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }
    // 3. Domyślnie ustaw motyw jasny
    return "light";
  });

  const [messages, setMessages] = useState([
    // Przykładowe wiadomości początkowe (możesz je usunąć lub zostawić do testów)
    { id: 1, text: "Witaj! Jak mogę pomóc?", sender: "ai" },
    { id: 2, text: "Chciałbym zapytać o pogodę.", sender: "user" },
  ]);
  const [currentMessage, setCurrentMessage] = useState("");

  // Funkcja do przełączania motywu
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Efekt, który aktualizuje klasę na elemencie <html> i zapisuje motyw w localStorage
  useEffect(() => {
    const root = window.document.documentElement; // Odniesienie do elementu <html>
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    // Zapisz wybór motywu w localStorage, aby był pamiętany
    localStorage.setItem("theme", theme);
  }, [theme]); // Ten efekt uruchomi się za każdym razem, gdy zmieni się stan 'theme'

  const handleSendMessage = async (e) => {
    // Dodajemy async
    e.preventDefault();
    if (currentMessage.trim() === "") return;

    const userMessage = {
      id: Date.now(),
      text: currentMessage.trim(),
      sender: "user",
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    const messageToSendToN8n = currentMessage.trim(); // Zapisz wiadomość przed wyczyszczeniem inputu
    setCurrentMessage("");
    setIsAiTyping(true); // Ustaw wskaźnik, że AI "pisze"

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Tutaj możesz dodać nagłówki autoryzacyjne, jeśli Twój webhook n8n ich wymaga
          // 'Authorization': 'Bearer TWOJ_TOKEN_N8N',
        },
        body: JSON.stringify({ message: messageToSendToN8n }), // Wysyłamy wiadomość w ciele JSON
      });

      if (!response.ok) {
        // Jeśli odpowiedź serwera nie jest OK (np. błąd 4xx, 5xx)
        throw new Error(`Błąd HTTP: ${response.status}`);
      }

      const data = await response.json(); // Oczekujemy odpowiedzi JSON z n8n

      // Załóżmy, że n8n zwraca JSON w formacie: { "reply": "Odpowiedź od AI" }
      if (data.reply) {
        const aiResponse = {
          id: Date.now() + 1, // Upewnij się, że ID jest unikalne
          text: data.reply,
          sender: "ai",
        };
        setMessages((prevMessages) => [...prevMessages, aiResponse]);
      } else {
        // Jeśli odpowiedź z n8n nie ma oczekiwanego pola "reply"
        console.error(
          "Otrzymano nieoczekiwany format odpowiedzi od n8n:",
          data
        );
        const aiErrorResponse = {
          id: Date.now() + 1,
          text: "Przepraszam, wystąpił błąd w komunikacji z serwerem AI (nieprawidłowy format odpowiedzi).",
          sender: "ai",
        };
        setMessages((prevMessages) => [...prevMessages, aiErrorResponse]);
      }
    } catch (error) {
      console.error("Błąd podczas wysyłania wiadomości do n8n:", error);
      // Wyświetl wiadomość o błędzie użytkownikowi
      const aiErrorResponse = {
        id: Date.now() + 1,
        text: `Przepraszam, wystąpił błąd: ${error.message}. Spróbuj ponownie później.`,
        sender: "ai",
      };
      setMessages((prevMessages) => [...prevMessages, aiErrorResponse]);
    } finally {
      setIsAiTyping(false); // Niezależnie od wyniku, AI "kończy pisać"
    }
  };

  // Ref do scrollowania do ostatniej wiadomości
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null); // Ref dla kontenera wiadomości

  // Funkcja do przewijania do ostatniej wiadomości
  useEffect(() => {
    if (messagesContainerRef.current) {
      const { scrollHeight, clientHeight } = messagesContainerRef.current;
      messagesContainerRef.current.scrollTop = scrollHeight - clientHeight;
    }
  }, [messages]); // Uruchom ten efekt za każdym razem, gdy zmieni się tablica 'messages'

  const N8N_WEBHOOK_URL =
    "https://guided-yearly-swan.ngrok-free.app/webhook-test/0fc0a28a-c3d5-4491-ba8e-a7378172c202";

  const [isAiTyping, setIsAiTyping] = useState(false);

  return (
    <div className="min-h-screen bg-custom-off-white dark:bg-custom-deep-blue flex flex-col items-center justify-center p-4 transition-colors duration-300 ease-in-out">
      {/* Przycisk przełącznika motywu - zostawiamy */}
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-custom-dark-text dark:text-custom-light-text rounded-lg shadow hover:bg-slate-300 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 ring-custom-vibrant-purple transition-all duration-150 ease-in-out"
        >
          {theme === "light" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
          )}
        </button>
      </div>
      {/* Kontener czatu */}
      <div className="flex flex-col w-full max-w-2xl h-[80vh] bg-white dark:bg-slate-800 rounded-lg shadow-xl overflow-hidden transition-colors duration-300 ease-in-out">
        {/* 1. Nagłówek czatu (opcjonalnie) */}
        <header className="bg-custom-vibrant-purple text-white p-4 text-center">
          <h1 className="text-xl font-semibold">Mój Czat AI</h1>
        </header>

        {/* 2. Obszar wyświetlania wiadomości */}
        <div
          ref={messagesContainerRef} // Użyj ref do przewijania
          className="flex-grow p-4 space-y-2 overflow-y-auto bg-gray-50 dark:bg-slate-700"
        >
          {messages.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              Rozpocznij rozmowę!
            </p>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-3 rounded-lg max-w-[75%] break-words
                  ${
                    msg.sender === "user"
                      ? "bg-custom-vibrant-purple text-white self-end ml-auto" // Wiadomość użytkownika po prawej
                      : "bg-slate-200 dark:bg-slate-600 text-custom-dark-text dark:text-custom-light-text self-start mr-auto" // Wiadomość AI po lewej
                  }`}
              >
                {msg.text}
              </div>
            ))
          )}
          {isAiTyping && (
            <div className="p-3 rounded-lg max-w-[75%] bg-slate-200 dark:bg-slate-600 text-custom-dark-text dark:text-custom-light-text self-start mr-auto animate-pulse">
              AI pisze...
            </div>
          )}
        </div>

        {/* 3. Formularz do wpisywania i wysyłania wiadomości */}
        <form
          onSubmit={handleSendMessage} // Dodaj obsługę onSubmit
          className="p-4 border-t border-gray-200 dark:border-slate-600 bg-gray-100 dark:bg-slate-800"
        >
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Wpisz wiadomość..."
              value={currentMessage} // Połącz wartość inputa ze stanem currentMessage
              onChange={(e) => setCurrentMessage(e.target.value)} // Aktualizuj stan przy każdej zmianie
              disabled={isAiTyping} // Wyłącz input, gdy AI pisze
              className="flex-grow p-2 border border-gray-300 dark:border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-vibrant-purple dark:bg-slate-700 dark:text-custom-light-text"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-custom-vibrant-purple text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-custom-vibrant-purple disabled:opacity-50"
              disabled={currentMessage.trim() === "" || isAiTyping} // Wyłącz przycisk, jeśli input jest pusty
            >
              Wyślij
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
