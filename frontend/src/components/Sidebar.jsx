import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Dashboard,
  BarChart,
  HelpOutline,
  Search,
} from '@mui/icons-material';
import { useLanguage } from '../context/LanguageContext';

const navItems_pt = [
  { name: 'Busca', to: '/search', icon: <Search /> },
  { name: 'Dashboard', to: '/', icon: <Dashboard /> },
  { name: 'Relatórios', to: '/reports', icon: <BarChart /> },
  { name: 'Ajuda', to: '/help', icon: <HelpOutline /> },
];

const navItems_en = [
  { name: 'Search', to: '/search', icon: <Search /> },
  { name: 'Dashboard', to: '/', icon: <Dashboard /> },
  { name: 'Reports', to: '/reports', icon: <BarChart /> },
  { name: 'Help', to: '/help', icon: <HelpOutline /> },
];

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const { language } = useLanguage();
  const navItems = language === 'en-us' ? navItems_en : navItems_pt;

  return (
    <div
      className={`
        ${isSidebarOpen ? 'w-64' : 'w-20'}
        bg-slate-800 text-white p-4 flex flex-col transition-all duration-300 shadow-md
        fixed top-0 left-0 h-screen z-40
      `}
      onMouseEnter={() => setIsSidebarOpen(true)}
      onMouseLeave={() => setIsSidebarOpen(false)}
    >
      <div className="flex items-center justify-between h-16 mb-4">
        {isSidebarOpen && (
          <h1 className="text-xl font-bold">
            Dash <span className="text-teal-400">App</span>
          </h1>
        )}
      </div>
      <nav className="flex-grow overflow-y-auto">
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="mb-2">
              <NavLink
                to={item.to}
                end
                className={({ isActive }) =>
                  `flex items-center gap-4 p-3 rounded-lg transition-colors duration-200
                  ${isActive ? 'bg-teal-400 text-white shadow-md' : 'text-white hover:bg-slate-700 hover:text-white'}`
                }
              >
                {item.icon}
                <span
                  className={`font-medium whitespace-nowrap overflow-hidden
                  ${isSidebarOpen ? 'block' : 'hidden'}`}
                >
                  {item.name}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}