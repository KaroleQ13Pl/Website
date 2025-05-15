// plik: src/components/ChatMessage.jsx
import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import { UserCircleIcon, CpuChipIcon } from "@heroicons/react/24/solid"; // Ikony dla awatarów

function ChatMessage({ message }) {
  const { activeTheme, themes } = useTheme();
  const currentTheme = themes[activeTheme];
  const { text, sender, avatar } = message;

  const isUser = sender === "user";

  // Style dla dymków wiadomości
  const bubbleBase = `px-4 py-3 rounded-xl max-w-[80%] break-words shadow-soft text-sm sm:text-base leading-relaxed`;
  const userBubble = `${currentTheme.primary} text-white`;
  const aiBubble = `${currentTheme.surface} ${currentTheme.text}`;

  // Style dla kontenera wiadomości (wiersz)
  const messageRowBase = `flex items-end space-x-2`; // items-end dla lepszego wyrównania avatara z dymkiem
  const userRow = `justify-end`;
  const aiRow = `justify-start`;

  const AvatarComponent = isUser ? UserCircleIcon : CpuChipIcon; // Prosty wybór ikony
  const defaultAvatarSrc = isUser
    ? "https://via.placeholder.com/40/blue/white?text=U"
    : "/ai-avatar.png";

  return (
    <div className={`${messageRowBase} ${isUser ? userRow : aiRow}`}>
      {!isUser && ( // Avatar dla AI po lewej
        <img
          src={avatar || defaultAvatarSrc}
          alt="AI Avatar"
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex-shrink-0"
        />
      )}
      <div className={`${bubbleBase} ${isUser ? userBubble : aiBubble}`}>
        {text}
      </div>
      {isUser && ( // Avatar dla użytkownika po prawej
        <img
          src={avatar || defaultAvatarSrc}
          alt="User Avatar"
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex-shrink-0"
        />
      )}
    </div>
  );
}

export default ChatMessage;
