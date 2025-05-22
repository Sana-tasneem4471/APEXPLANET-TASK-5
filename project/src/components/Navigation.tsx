import React from 'react';
import { BookOpen, CloudSun } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeSection, onNavigate }) => {
  const navItems = [
    { id: 'quiz', label: 'Interactive Quiz', icon: <BookOpen size={20} /> },
    { id: 'weather', label: 'Weather API', icon: <CloudSun size={20} /> },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm p-4 transition-all duration-300">
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`
              px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300
              ${activeSection === item.id 
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 shadow-sm' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'}
            `}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};