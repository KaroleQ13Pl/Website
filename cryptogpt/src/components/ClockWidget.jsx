// src/components/ClockWidget.jsx
import React, { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";

function ClockWidget() {
  const [time, setTime] = useState(new Date());
  const { activeTheme, themes } = useTheme();
  const currentTheme = themes[activeTheme];

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <div className={`text-sm ${currentTheme.text}`}>
      {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
    </div>
  );
}

export default ClockWidget;
