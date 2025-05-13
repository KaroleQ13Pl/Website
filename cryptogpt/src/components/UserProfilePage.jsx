import React, { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";

function UserProfilePage() {
  const { user, updateUser } = useUser();

  const [nickInput, setNickInput] = useState(user.nick);
  // const [avatarInput, setAvatarInput] = useState(user.avatar); // Już nie potrzebujemy lokalnego stanu dla URL avatara

  useEffect(() => {
    setNickInput(user.nick);
    // setAvatarInput(user.avatar); // Już nie aktualizujemy
  }, [user.nick]); // Usunęliśmy user.avatar z zależności

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser({
      nick: nickInput.trim(),
      // Nie wysyłamy już avatara, bo jest statyczny na razie
      // avatar: avatarInput.trim(),
    });
    alert("Profil zaktualizowany!");
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-6 text-custom-dark-text dark:text-custom-light-text">
        Edytuj Profil Użytkownika
      </h2>
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow max-w-lg mx-auto">
        <div className="mb-6 text-center">
          <img
            // >>> ZAWSZE WYŚWIETLAMY AVATAR Z KONTEKSTU <<<
            src={user.avatar || "/avatar.png"} // Używamy user.avatar z kontekstu, który ma już domyślną ścieżkę
            alt="User Avatar"
            className="w-24 h-24 rounded-full mx-auto mb-2 border-2 border-custom-vibrant-purple object-cover"
          />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            ID Użytkownika: <span className="font-mono">{user.id}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="nick"
              className="block text-sm font-medium text-custom-dark-text dark:text-custom-light-text mb-1"
            >
              Nick:
            </label>
            <input
              type="text"
              id="nick"
              value={nickInput}
              onChange={(e) => setNickInput(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-vibrant-purple dark:bg-slate-700 dark:text-custom-light-text"
            />
          </div>

          {/* >>> USUWAMY LUB KOMENTUJEMY POLE AVATARA <<< */}
          {/* <div className="mb-6">
            <label htmlFor="avatar" className="block text-sm font-medium text-custom-dark-text dark:text-custom-light-text mb-1">
              URL Avatara (tymczasowo nieaktywne):
            </label>
            <input
              type="url"
              id="avatar"
              value={avatarInput} // Możemy tu wyświetlać user.avatar dla informacji 
              onChange={(e) => setAvatarInput(e.target.value)}
              placeholder="https://example.com/avatar.png"
              className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-vibrant-purple dark:bg-slate-700 dark:text-custom-light-text"
              disabled // Możemy wyłączyć to pole
            />
          </div>
          */}

          <button
            type="submit"
            className="w-full mt-4 px-4 py-2 bg-custom-vibrant-purple text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800 focus:ring-custom-vibrant-purple"
          >
            Zapisz Nick
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserProfilePage;
