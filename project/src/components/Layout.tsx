import React, { ReactNode } from 'react';
import { MoonStar, Sun } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = React.useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-50">
      <header className="bg-white dark:bg-gray-800 shadow-sm px-4 md:px-6 lg:px-8 py-4 transition-all duration-300">
        <div className="flex items-center justify-between mx-auto">
          <h1 className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400">
            Learning Platform
          </h1>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <Sun size={20} /> : <MoonStar size={20} />}
          </button>
        </div>
      </header>
      <div className="flex flex-col flex-1">
        {children}
      </div>
      <footer className="bg-white dark:bg-gray-800 shadow-sm px-4 md:px-6 lg:px-8 py-4 text-center text-sm text-gray-600 dark:text-gray-400 transition-all duration-300">
        <p>© {new Date().getFullYear()} Learning Platform</p>
      </footer>
    </div>
  );
};