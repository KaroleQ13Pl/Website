import React from "react";
// Możesz tu dodać importy ikon, jeśli będziesz ich używać

// Komponent Sidebar przyjmuje activeView i setActiveView jako propsy
// aby mógł podświetlać aktywny link i zmieniać widok w App.jsx
function Sidebar({ activeView, setActiveView }) {
  // Możesz dodać tu tablicę z elementami nawigacji, aby łatwiej nimi zarządzać
  const navItems = [
    { id: "home", label: "Home" /* , icon: <HomeIcon /> */ },
    { id: "chat", label: "Chat" /* , icon: <ChatIcon /> */ },
    // { id: 'another', label: 'Inna Strona' },
  ];

  return (
    <aside className="w-60 md:w-64 bg-gray-100 dark:bg-slate-800 p-4 flex flex-col shadow-lg h-full">
      {" "}
      {/* Użyłem h-full, aby sidebar zajmował całą dostępną wysokość kontenera flex */}
      <div className="mb-8 px-2">
        {" "}
        {/* Dodatkowy padding dla tytułu */}
        <h1 className="text-2xl font-bold text-custom-vibrant-purple dark:text-purple-400">
          AI Panel
        </h1>
      </div>
      <nav className="flex-grow">
        <ul>
          {navItems.map((item) => (
            <li key={item.id} className="mb-2">
              <button
                onClick={() => setActiveView(item.id)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150
                            ${
                              activeView === item.id
                                ? "bg-custom-vibrant-purple text-white shadow-sm"
                                : "text-custom-dark-text dark:text-custom-light-text hover:bg-gray-200 dark:hover:bg-slate-700"
                            }`}
              >
                {/* Tutaj można dodać ikonę item.icon */}
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto">
        {" "}
        {/* User Info and Settings at the bottom */}
        <div className="p-2 mb-2 border-t border-gray-300 dark:border-slate-700">
          <div className="flex items-center">
            <img
              src="https://via.placeholder.com/40/CBD5E0/4A5568?Text=U" // Placeholder z inicjałem U
              alt="User Avatar"
              className="w-10 h-10 rounded-full mr-3 border-2 border-custom-vibrant-purple"
            />
            <div>
              <p className="font-semibold text-sm text-custom-dark-text dark:text-custom-light-text">
                Nazwa Użytkownika
              </p>
              {/* <p className="text-xs text-gray-500 dark:text-gray-400">Online</p> */}
            </div>
          </div>
        </div>
        <button
          onClick={() => setActiveView("settings")} // Zmieniamy activeView na 'settings'
          className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors duration-150
                      ${
                        activeView === "settings"
                          ? "bg-custom-vibrant-purple text-white shadow-sm" // Styl dla aktywnego przycisku ustawień
                          : "text-custom-dark-text dark:text-custom-light-text hover:bg-gray-200 dark:hover:bg-slate-700"
                      }`}
        >
          <span>Ustawienia</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.646.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.24-.438.613-.43.992a6.759 6.759 0 0 1 0 1.903c-.008.378.137.75.43.99l1.004.827c.427.35.574.98.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.609 6.609 0 0 1-.22.128c-.333.183-.582.495-.646.87l-.212 1.28c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.212-1.281c-.062-.374-.312-.686-.646-.87a6.609 6.609 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.759 6.759 0 0 1 0-1.903c.01-.378-.136-.75-.43-.99l-1.004-.828a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.646-.87l.212-1.281Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
