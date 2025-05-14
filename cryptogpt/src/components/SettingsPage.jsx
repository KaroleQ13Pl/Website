import React from "react";
import { useTheme } from "../contexts/ThemeContext";

function SettingsPage() {
  const { activeTheme, themes } = useTheme();
  const currentTheme = themes[activeTheme];

  return (
    <div className="p-6">
      <h2 className={`text-3xl font-semibold mb-6 ${currentTheme.heading}`}>
        Ustawienia
      </h2>
      <div className={`${currentTheme.surface} p-6 rounded-lg shadow`}>
        <p className={currentTheme.text}>
          Witaj na stronie ustawień! Tutaj w przyszłości będziesz mógł
          skonfigurować różne aspekty aplikacji.
        </p>
        <div>
          <h3 className={`text-xl font-medium mb-2 ${currentTheme.heading}`}>
            Opcje Motywu
          </h3>
          <p className={currentTheme.muted}>
            Przełącznik motywu znajduje się globalnie w aplikacji (na razie w
            prawym górnym rogu).
          </p>
        </div>
        <div className="mt-6">
          <h3 className={`text-xl font-medium mb-2 ${currentTheme.heading}`}>
            Ustawienia Konta
          </h3>
          <p className={currentTheme.muted}>
            Informacje o użytkowniku i opcje konta pojawią się tutaj.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
