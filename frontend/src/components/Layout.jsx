import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { LanguageProvider } from '../context/LanguageContext';

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen bg-gray-100">
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
    </LanguageProvider>
  );
}