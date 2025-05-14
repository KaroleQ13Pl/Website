import React, { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import { useTheme } from "../contexts/ThemeContext";

function UserProfilePage() {
  const { user, updateUser } = useUser();
  const { activeTheme, themes } = useTheme();
  const currentTheme = themes[activeTheme];

  const [nickInput, setNickInput] = useState(user.nick);

  useEffect(() => {
    setNickInput(user.nick);
  }, [user.nick]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser({
      nick: nickInput.trim(),
    });
    alert("Profil zaktualizowany!");
  };

  return (
    <div className="p-6">
      <h2 className={`text-3xl font-semibold mb-6 ${currentTheme.heading}`}>
        Edytuj Profil Użytkownika
      </h2>
      <div
        className={`${currentTheme.surface} p-6 rounded-lg shadow max-w-lg mx-auto`}
      >
        <div className="mb-6 text-center">
          <img
            src={user.avatar || "/avatar.png"}
            alt="User Avatar"
            className="w-24 h-24 rounded-full mx-auto mb-2 border-2 border-custom-vibrant-purple object-cover"
          />
          <p className={`${currentTheme.muted} text-sm`}>
            ID Użytkownika: <span className="font-mono">{user.id}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="nick"
              className={`block text-sm font-medium ${currentTheme.text} mb-1`}
            >
              Nick:
            </label>
            <input
              type="text"
              id="nick"
              value={nickInput}
              onChange={(e) => setNickInput(e.target.value)}
              className={`w-full p-2 border border-gray-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-vibrant-purple ${currentTheme.background} ${currentTheme.text}`}
            />
          </div>

          <button
            type="submit"
            className={`${currentTheme.primary} w-full mt-4 px-4 py-2 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800 focus:ring-custom-vibrant-purple`}
          >
            Zapisz Nick
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserProfilePage;
