import React, { createContext, useState, useEffect, useContext } from "react";

// Funkcja do generowania prostego ID użytkownika
const generateUserId = () => {
  const randomPart = Math.random().toString(36).substring(2, 10); // 8 losowych znaków
  return `@${randomPart}`;
};

const UserContext = createContext({
  user: {
    nick: "Gość",
    avatar: "/avatar.png", // Domyślny awatar
    id: generateUserId(), // Generujemy ID przy pierwszym ładowaniu
  },
  updateUser: () => {},
});

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("chatUser");
    if (savedUser) {
      return JSON.parse(savedUser);
    }
    // Generuj ID tylko jeśli użytkownik nie istnieje w localStorage
    return {
      nick: "Gość",
      avatar: "https://via.placeholder.com/40/CBD5E0/4A5568?Text=G",
      id: generateUserId(), // Generuj ID przy pierwszej inicjalizacji
    };
  });

  useEffect(() => {
    localStorage.setItem("chatUser", JSON.stringify(user));
  }, [user]);

  const updateUser = (newUserData) => {
    setUser((prevUser) => {
      const updated = {
        ...prevUser,
        ...newUserData,
      };

      if (
        newUserData.avatar === undefined &&
        prevUser.avatar !== "/default-avatar.png"
      ) {
        // Jeśli nie podano nowego avatara w updateUser, a stary nie jest domyślny, zachowaj stary.
        // Ale ponieważ chcemy statyczny na razie, to możemy to uprościć.
      }
      // Dla uproszczenia, jeśli w newUserData nie ma avatara, użyje się prevUser.avatar.
      // A `prevUser.avatar` będzie naszym `/default-avatar.png` jeśli nie został zmieniony.
      return updated;
    });
  };

  // Jeśli ID nie zostało wygenerowane przy pierwszym ładowaniu (np. starsza wersja w localStorage bez ID)
  useEffect(() => {
    if (!user.id) {
      if (
        user.avatar &&
        user.avatar.startsWith("https://via.placeholder.com")
      ) {
        updateUser({ avatar: "/default-avatar.png" });
      }
    }
  }, [user.id, user.avatar]); // Dodajemy user.avatar do zależności

  const value = { user, updateUser };
  // Przekazujemy user i updateUser w kontekście
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

/**Opis pliku `UserContext.jsx`:**

  * **`generateUserId()`**: Prosta funkcja pomocnicza do generowania losowego ID w formacie `@########`.
  * **`UserContext = createContext(...)`**: Tworzymy kontekst dla danych użytkownika. Domyślnie ustawiamy nick "Gość", placeholder avatara i pusty `id`. Udostępniamy też funkcję `updateUser` (na razie pustą).
  * **`UserProvider`**:
      * **`useState` dla `user`**: Inicjalizujemy stan `user` danymi z `localStorage` (jeśli istnieją) lub wartościami domyślnymi (w tym generujemy ID, jeśli to pierwszy raz).
      * **`useEffect` do zapisu w `localStorage`**: Zapisuje obiekt `user` do `localStorage` za każdym razem, gdy się zmieni.
      * **`updateUser(newUserData)`**: Funkcja, która pozwoli komponentom aktualizować dane użytkownika. Używa `setUser` do zaktualizowania stanu, łącząc poprzednie dane z nowymi. Ważne, aby nie nadpisywać ID, jeśli jest już ustawione, chyba że celowo.
      * **Drugi `useEffect` dla ID**: Dodatkowy `useEffect` sprawdzający, czy `user.id` istnieje. Jeśli nie (np. użytkownik ma starsze dane w `localStorage` bez ID), generuje i ustawia ID.
  * **`useUser()`**: Niestandardowy hook do łatwego dostępu do `user` i `updateUser` w komponentach. */
