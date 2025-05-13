import React from "react";

function ChatMessage({ message }) {
  // Odbieramy cały obiekt 'message' jako props
  const { text, sender } = message; // Destrukturyzacja obiektu message

  const messageClass =
    sender === "user"
      ? "bg-custom-vibrant-purple text-white self-end ml-auto" // Wiadomość użytkownika
      : "bg-slate-200 dark:bg-slate-600 text-custom-dark-text dark:text-custom-light-text self-start mr-auto"; // Wiadomość AI

  return (
    <div className={`p-3 rounded-lg max-w-[75%] break-words ${messageClass}`}>
      {text}
    </div>
  );
}

export default ChatMessage;
