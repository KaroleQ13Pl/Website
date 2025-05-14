import React, { useState, useEffect, useRef } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { useTheme } from "../contexts/ThemeContext"; // Importujemy useTheme

// URL do webhooka n8n - przenieśliśmy go tutaj, bo logika jest tutaj
const N8N_WEBHOOK_URL =
  "https://guided-yearly-swan.ngrok-free.app/webhook-test/0fc0a28a-c3d5-4491-ba8e-a7378172c202";

function ChatInterface() {
  const { activeTheme, themes } = useTheme(); // Pobieramy activeTheme i themes
  const currentTheme = themes[activeTheme]; // Pobieramy aktualny motyw
  // Cała logika stanu czatu jest teraz tutaj
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Witaj! Jestem Twoim asystentem AI. W czym mogę pomóc?",
      sender: "ai",
    },
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);
  const messagesContainerRef = useRef(null); // Ref do przewijania

  // Funkcja do wysyłania wiadomości i komunikacji z n8n
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (currentMessage.trim() === "") return;

    const userMessage = {
      id: Date.now(),
      text: currentMessage.trim(),
      sender: "user",
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    const messageToSendToN8n = currentMessage.trim();
    setCurrentMessage("");
    setIsAiTyping(true);

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageToSendToN8n }),
      });

      if (!response.ok) {
        throw new Error(
          `Błąd HTTP: ${response.status} - ${response.statusText}`
        );
      }

      const data = await response.json();

      if (data.reply) {
        const aiResponse = {
          id: Date.now() + 1, // Proste unikalne ID
          text: data.reply,
          sender: "ai",
        };
        setMessages((prevMessages) => [...prevMessages, aiResponse]);
      } else {
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
      const aiErrorResponse = {
        id: Date.now() + 1,
        text: `Przepraszam, wystąpił błąd podczas komunikacji: ${error.message}. Spróbuj ponownie później.`,
        sender: "ai",
      };
      setMessages((prevMessages) => [...prevMessages, aiErrorResponse]);
    } finally {
      setIsAiTyping(false);
    }
  };

  // Efekt do automatycznego przewijania
  useEffect(() => {
    if (messagesContainerRef.current) {
      const { scrollHeight, clientHeight } = messagesContainerRef.current;
      messagesContainerRef.current.scrollTop = scrollHeight - clientHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col w-full max-w-2xl h-[80vh] bg-white dark:bg-slate-800 rounded-lg shadow-xl overflow-hidden transition-colors duration-300 ease-in-out">
      <header className={`${currentTheme["przycisk"]} p-4 text-center`}>
        <h1
          className={`text-xl font-semibold ${currentTheme["tekst-naglowek"]}`}
        >
          Mój Czat AI
        </h1>
      </header>

      <MessageList
        messages={messages}
        messagesContainerRef={messagesContainerRef}
        isAiTyping={isAiTyping}
      />

      <MessageInput
        currentMessage={currentMessage}
        setCurrentMessage={setCurrentMessage}
        handleSendMessage={handleSendMessage}
        isAiTyping={isAiTyping}
      />
    </div>
  );
}

export default ChatInterface;
