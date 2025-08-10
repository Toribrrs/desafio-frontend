import React from 'react';
import { NavLink } from 'react-router-dom';
import { Dashboard, BarChart, HelpOutline, Search, Settings } from '@mui/icons-material';

const navItems = [
  { name: 'Busca', to: '/search', icon: <Search /> },
  { name: 'Dashboard', to: '/', icon: <Dashboard /> },
  { name: 'Relatórios', to: '/reports', icon: <BarChart /> },
  { name: 'Ajuda', to: '/help', icon: <HelpOutline /> },
  { name: 'Configurações', to: '/settings', icon: <Settings /> },
];

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  return (
    <div
      className={`
        ${isSidebarOpen ? 'w-64' : 'w-20'}
        bg-slate-900 text-white p-4 flex-col transition-all duration-300 shadow-xl
        fixed top-0 left-0 h-screen z-40
        hidden md:flex
      `}
      onMouseEnter={() => setIsSidebarOpen(true)}
      onMouseLeave={() => setIsSidebarOpen(false)}
    >
      <div className="flex items-center justify-center h-16 mb-8">
        {isSidebarOpen ? (
          <h1 className="text-2xl font-bold tracking-wide">
            Dash
          </h1>
        ) : (
          <Dashboard className="text-3xl text-teal-400" />
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
                  ${isActive 
                    ? 'bg-teal-600 text-white shadow-md' 
                    : 'text-gray-300 hover:bg-slate-800 hover:text-white'}`
                }
              >
                {item.icon}
                <span
                  className={`font-medium whitespace-nowrap overflow-hidden transition-opacity duration-300
                    ${isSidebarOpen ? 'opacity-100 block' : 'opacity-0 hidden'}`}
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