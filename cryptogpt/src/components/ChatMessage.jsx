import React from "react";
import { useTheme } from "../contexts/ThemeContext";

function ChatMessage({ message }) {
  const { activeTheme, themes } = useTheme();
  const currentTheme = themes[activeTheme];
  // Odbieramy cały obiekt 'message' jako props
  const { text, sender } = message; // Destrukturyzacja obiektu message

  const messageClass =
    sender === "user"
      ? `${currentTheme.primary} text-white self-end ml-auto`
      : `${currentTheme.surface} ${currentTheme.text} self-start mr-auto`;

  return (
    <div className={`p-3 rounded-lg max-w-[75%] break-words ${messageClass}`}>
      {text}
    </div>
  );
}

export default ChatMessage;
