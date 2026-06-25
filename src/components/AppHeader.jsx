import { useTheme } from '../context/ThemeContext';

export function AppHeader() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="app-header">
      <div>
        <p className="eyebrow">CEMZO Assignment</p>
        <h1>Product Catalog</h1>
        <p className="subtitle">
          Browse products from Fake Store API with search, filters, and details.
        </p>
      </div>
      <button className="theme-toggle" onClick={toggleTheme} type="button">
        {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </header>
  );
}
