import React, { useState, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { ThemeContext } from '../context/ThemeContext';

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { theme } = useContext(ThemeContext);

  const toggleSidebar = () => {
    setIsSidebarOpen((v) => !v);
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300
        ${theme === 'dark' ? 'bg-slate-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}
    >
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      <div
        className={`flex-1 transition-all duration-300 pt-[64px] ${
          isSidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        <main className="p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
