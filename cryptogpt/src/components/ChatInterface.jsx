// src/components/ChatInterface.jsx
import React, { useState, useEffect, useRef } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { useTheme } from "../contexts/ThemeContext";

// ... (URL webhooka i logika handleSendMessage, useState, useEffect bez zmian)
const N8N_WEBHOOK_URL =
  "https://guided-yearly-swan.ngrok-free.app/webhook-test/0fc0a28a-c3d5-4491-ba8e-a7378172c202";

function ChatInterface() {
  const { activeTheme, themes } = useTheme();
  const currentTheme = themes[activeTheme];
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Witaj! Jestem Twoim asystentem AI. W czym mogę pomóc?",
      sender: "ai",
    },
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);
  const messagesContainerRef = useRef(null);

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
          id: Date.now() + 1,
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

  useEffect(() => {
    if (messagesContainerRef.current) {
      const { scrollHeight } = messagesContainerRef.current;
      messagesContainerRef.current.scrollTop = scrollHeight;
    }
  }, [messages, isAiTyping]);

  return (
    // GŁÓWNY KONTENER KOMPONENTU CZATU (ZIELONY PROSTOKĄT)
    // flex flex-col: Układa elementy (header, MessageList, MessageInput) w kolumnie.
    // w-full max-w-2xl: Zajmuje pełną dostępną szerokość, ale nie więcej niż 2xl. Pozwala na centrowanie w 'main' dzięki 'items-center'.
    // h-full: KLUCZOWE! Zajmuje 100% wysokości swojego rodzica ('main'). 'main' musi mieć zdefiniowaną wysokość lub być kontenerem flex, aby to zadziałało.
    // overflow-hidden: KLUCZOWE! Zapobiega "wylewaniu" się zawartości MessageList poza ten kontener.
    //                To zmusza MessageList do użycia własnego paska przewijania.
    <div
      className={`flex flex-col w-full max-w-2xl rounded-lg shadow-xl 
                  ${currentTheme.background} h-full overflow-hidden
                  transition-colors duration-300 ease-in-out`}
    >
      {/* Nagłówek czatu */}
      {/* flex-shrink-0: Zapobiega kurczeniu się nagłówka, gdyby MessageList potrzebował więcej miejsca. */}
      <header
        className={`${currentTheme.primary} p-4 text-center flex-shrink-0`}
      >
        <h1 className={`text-xl font-semibold text-white`}>Mój Czat AI</h1>
      </header>

      {/* Kontener na listę wiadomości (GŁÓWNY OBSZAR PRZEWIJANIA) */}
      {/* Tutaj nie dodajemy klas bezpośrednio, bo MessageList sam je definiuje */}
      <MessageList
        messages={messages}
        messagesContainerRef={messagesContainerRef}
        isAiTyping={isAiTyping}
      />

      {/* Kontener na pole wprowadzania wiadomości (CZERWONY PROSTOKĄT) */}
      {/* flex-shrink-0: Zapobiega kurczeniu się pola wprowadzania. */}
      <MessageInput
        currentMessage={currentMessage}
        setCurrentMessage={setCurrentMessage}
        handleSendMessage={handleSendMessage}
        isAiTyping={isAiTyping}
        className="flex-shrink-0" // Przekazanie klasy do komponentu MessageInput
      />
    </div>
  );
}

export default ChatInterface;
