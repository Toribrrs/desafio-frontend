import React, { useState, useRef, useEffect } from 'react';
import { AccountCircle, Menu as MenuIcon, ExitToApp, Edit, Settings as SettingsIcon } from '@mui/icons-material';

export default function Header({ toggleSidebar }) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => setIsProfileMenuOpen(!isProfileMenuOpen);
  const handleEditProfile = () => {
    console.log('Editar perfil clicado');
    setIsProfileMenuOpen(false);
  };
  const handleLogout = () => {
    console.log('Sair clicado');
    setIsProfileMenuOpen(false);
  };
  const handleSettings = () => {
    console.log('Configurações clicado');
    setIsProfileMenuOpen(false);
  };

  return (
    <header className="bg-slate-900 text-white p-4 shadow-xl flex items-center justify-between fixed top-0 left-0 w-full z-50">
      <div className="flex items-center gap-4">
        <button
          className="p-2 text-gray-300 hover:bg-slate-800 rounded-full md:hidden transition-colors"
          onClick={toggleSidebar}
        >
          <MenuIcon />
        </button>
        <h1 className="text-2xl font-bold tracking-wide">
          Dash <span className="text-teal-400">App</span>
        </h1>
      </div>
      
      <div className="relative" ref={menuRef}>
        <button
          className="flex items-center space-x-2 text-white hover:text-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-full"
          onClick={handleProfileClick}
        >
          <span className="hidden sm:inline text-sm font-medium text-gray-300">Usuário Exemplo</span>
          <AccountCircle className="text-4xl" />
        </button>

        {isProfileMenuOpen && (
          <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-slate-800 text-slate-800 dark:text-white rounded-lg shadow-xl overflow-hidden animate-fade-in-down">
            <div className="py-2 px-4 border-b border-gray-200 dark:border-slate-700">
              <p className="font-semibold">Usuário Exemplo</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">usuario.exemplo@email.com</p>
            </div>
            <nav className="py-1">
              <button
                onClick={handleEditProfile}
                className="w-full text-left px-4 py-2 text-sm flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              >
                <Edit fontSize="small" className="text-gray-500 dark:text-gray-400" />
                Editar Perfil
              </button>
              <button
                onClick={handleSettings}
                className="w-full text-left px-4 py-2 text-sm flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              >
                <SettingsIcon fontSize="small" className="text-gray-500 dark:text-gray-400" />
                Configurações
              </button>
              <div className="border-t border-gray-200 dark:border-slate-700 my-1"></div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm flex items-center gap-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-slate-700 transition-colors"
              >
                <ExitToApp fontSize="small" />
                Sair
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}