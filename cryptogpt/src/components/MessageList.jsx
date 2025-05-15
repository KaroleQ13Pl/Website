// src/components/MessageList.jsx
import React from "react";
import ChatMessage from "./ChatMessage";
import { useTheme } from "../contexts/ThemeContext";

function MessageList({ messages, messagesContainerRef, isAiTyping }) {
  const { activeTheme, themes } = useTheme();
  const currentTheme = themes[activeTheme];

  return (
    <div
      ref={messagesContainerRef}
      className={`flex-grow min-h-0 overflow-y-auto 
                  p-4 sm:p-6 space-y-4 ${currentTheme.background}
                  transition-colors duration-300 ease-in-out`}
    >
      {messages.length === 0 && !isAiTyping ? (
        <div
          className={`flex flex-col items-center justify-center h-full ${currentTheme.muted}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-16 h-16 mb-4 opacity-50"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-3.862 8.25-8.625 8.25S3.75 16.556 3.75 12 7.612 3.75 12.375 3.75 21 7.444 21 12Z"
            />
          </svg>
          <p className="text-center italic">
            Rozpocznij rozmowę wpisując wiadomość poniżej.
          </p>
        </div>
      ) : (
        messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)
      )}

      {isAiTyping && (
        <div className="flex items-end space-x-2 pl-2 pb-1">
          {" "}
          {/* Dodano padding dla wskaźnika pisania */}
          <img
            src={
              messages.find((m) => m.sender === "ai")?.avatar ||
              "/ai-avatar.png"
            }
            alt="AI Avatar"
            className="w-8 h-8 rounded-full flex-shrink-0"
          />
          <div
            className={`${currentTheme.surface} ${currentTheme.text} px-4 py-3 rounded-lg max-w-[70%] animate-pulse text-sm shadow-soft`}
          >
            AI pisze...
          </div>
        </div>
      )}
    </div>
  );
}

export default MessageList;
