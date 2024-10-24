import { useState, useEffect } from "react";
import TodoApp from "./components/TodoApp";
import ThemeToggle from "./components/ThemeToggle";
import "./index.css";

function App() {
  const [theme, setTheme] = useState("light");

  // Load theme from localStorage on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
      document.body.className = storedTheme; // Apply theme to the body on load
    }
  }, []);

  // Save theme to localStorage when theme changes
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme; // Apply the theme to the entire page
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="main-container">
      <div className="toggle-btn">
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>
      <TodoApp theme={theme} />
    </div>
  );
}

export default App;
