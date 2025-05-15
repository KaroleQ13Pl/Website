// src/components/ChatInterface.jsx
import React, { useState, useEffect, useRef } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { useTheme } from "../contexts/ThemeContext";
// Załóżmy, że masz ścieżki do awatarów w folderze public
// lub używasz pełnych URL-i
// const USER_AVATAR_URL = "https://via.placeholder.com/40/7F9CF5/FFFFFF?Text=U"; // Placeholder
// const AI_AVATAR_URL = "/ai-avatar.png"; // Upewnij się, że ten plik istnieje w public/

const N8N_WEBHOOK_URL =
  "https://guided-yearly-swan.ngrok-free.app/webhook-test/0fc0a28a-c3d5-4491-ba8e-a7378172c202";

function ChatInterface() {
  const { activeTheme, themes } = useTheme();
  const currentTheme = themes[activeTheme];
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Witaj! Jestem Twoim asystentem AI. Jak mogę Ci dzisiaj pomóc?",
      sender: "ai",
      avatar: "/ai-avatar.png", // Przykładowy avatar AI, upewnij się, że istnieje w /public
    },
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);
  const messagesContainerRef = useRef(null);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (currentMessage.trim() === "" || isAiTyping) return;

    const userMessage = {
      id: Date.now(),
      text: currentMessage.trim(),
      sender: "user",
      avatar: "https://via.placeholder.com/40/3B82F6/FFFFFF?Text=Ty", // Możesz pobrać z UserContext
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
      const aiResponse = {
        id: Date.now() + 1,
        text: data.reply || "Nie udało się uzyskać odpowiedzi.",
        sender: "ai",
        avatar: "/ai-avatar.png",
      };
      setMessages((prevMessages) => [...prevMessages, aiResponse]);
    } catch (error) {
      console.error("Błąd podczas wysyłania wiadomości do n8n:", error);
      const aiErrorResponse = {
        id: Date.now() + 1,
        text: `Przepraszam, wystąpił błąd: ${error.message}.`,
        sender: "ai",
        avatar: "/ai-avatar.png",
      };
      setMessages((prevMessages) => [...prevMessages, aiErrorResponse]);
    } finally {
      setIsAiTyping(false);
    }
  };

  useEffect(() => {
    if (messagesContainerRef.current) {
      const { scrollHeight, clientHeight } = messagesContainerRef.current;
      messagesContainerRef.current.scrollTop = scrollHeight - clientHeight;
    }
  }, [messages, isAiTyping]);

  return (
    <div
      className={`flex flex-col w-full rounded-lg shadow-soft 
                  ${currentTheme.background} h-full overflow-hidden
                  transition-colors duration-300 ease-in-out`}
    >
      {/* Opcjonalny, mały nagłówek wewnątrz ChatInterface */}
      {/* <header className={`p-3 text-sm ${currentTheme.surface} ${currentTheme.border} border-b flex-shrink-0 text-center ${currentTheme.text}`}>
        CryptoGPT
      </header> */}

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
        className="flex-shrink-0" // Ta klasa jest ważna
      />
    </div>
  );
}

export default ChatInterface;
