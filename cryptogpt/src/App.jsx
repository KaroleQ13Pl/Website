// src/App.jsx
import React, { useState } from "react";
// Jeśli masz import './App.css' lub podobny, a ten plik jest teraz pusty
// lub zawiera tylko stare style, możesz go usunąć lub zakomentować jego zawartość.
// Ważne jest, aby dyrektywy @tailwind były w `src/index.css`.

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">
          Witaj w Interfejsie AI!
        </h1>

        <p className="text-gray-700 mb-4 text-center">
          To jest Twój pierwszy komponent React ostylowany za pomocą Tailwind
          CSS.
        </p>

        <div className="text-center mb-6">
          <button
            onClick={() => setCount((count) => count + 1)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-150"
          >
            Licznik: {count}
          </button>
        </div>

        <p className="text-sm text-gray-500 text-center">
          Zacznij budować swój interfejs!
        </p>
      </div>
    </div>
  );
}

export default App;
