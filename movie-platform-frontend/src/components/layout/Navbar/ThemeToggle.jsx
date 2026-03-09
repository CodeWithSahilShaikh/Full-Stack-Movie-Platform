import { useTheme } from '../../../hooks/useTheme';

const ThemeToggle = ({ isMobile, onClick }) => {
  const { theme, toggleTheme } = useTheme();

  const handleToggle = () => {
    toggleTheme();
    if (onClick) onClick();
  };

  if (isMobile) {
    return (
      <button onClick={handleToggle} className="mobile-theme-btn">
        {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
    );
  }

  return (
    <button onClick={handleToggle} className="theme-toggle-btn" aria-label="Toggle Theme">
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
};

export default ThemeToggle;
