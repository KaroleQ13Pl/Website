import React from "react";

function SettingsPage() {
  return (
    <div className="p-6">
      {" "}
      {/* Dodajemy padding, jeśli nie jest już w <main> */}
      <h2 className="text-3xl font-semibold mb-6 text-custom-dark-text dark:text-custom-light-text">
        Ustawienia
      </h2>
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
        <p className="text-custom-dark-text dark:text-custom-light-text mb-4">
          Witaj na stronie ustawień! Tutaj w przyszłości będziesz mógł
          skonfigurować różne aspekty aplikacji.
        </p>
        {/* Przykładowe miejsce na przyszłe opcje */}
        <div>
          <h3 className="text-xl font-medium mb-2 text-custom-dark-text dark:text-custom-light-text">
            Opcje Motywu
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Przełącznik motywu znajduje się globalnie w aplikacji (na razie w
            prawym górnym rogu).
          </p>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-medium mb-2 text-custom-dark-text dark:text-custom-light-text">
            Ustawienia Konta
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Informacje o użytkowniku i opcje konta pojawią się tutaj.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
