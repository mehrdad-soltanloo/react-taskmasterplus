import { GoSun, GoMoon } from "react-icons/go";

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <button onClick={toggleTheme} className="theme-toggle-btn">
      {theme === "light" ? <GoMoon /> : <GoSun />}
    </button>
  );
};
export default ThemeToggle;
