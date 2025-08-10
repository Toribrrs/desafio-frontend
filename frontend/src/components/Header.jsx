import React, { useState, useRef, useEffect } from 'react';
import { AccountCircle, Menu as MenuIcon, ExitToApp, Edit } from '@mui/icons-material';
import { useLanguage } from '../context/LanguageContext';

const translations = {
  'pt-br': {
    appName: 'Dash',
    editProfile: 'Editar Perfil',
    logout: 'Sair',
  },
  'en-us': {
    appName: 'Dash',
    editProfile: 'Edit Profile',
    logout: 'Logout',
  },
};

export default function Header({ toggleSidebar }) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { language } = useLanguage();
  const t = translations[language];

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

  const handleProfileClick = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleEditProfile = () => {
    console.log('Editar perfil clicado');
    setIsProfileMenuOpen(false);
  };

  const handleLogout = () => {
    console.log('Logout clicado');
    setIsProfileMenuOpen(false);
  };

  return (
    <header className="bg-slate-800 text-white p-4 shadow-md flex items-center justify-between fixed top-0 left-0 w-full z-50">
      <div className="flex items-center gap-4">
        <button
          className="p-2 text-white hover:bg-slate-700 rounded-full md:hidden"
          onClick={toggleSidebar}
        >
          <MenuIcon />
        </button>
        <h1 className="text-2xl font-bold">
          {t.appName} <span className="text-teal-400">App</span>
        </h1>
      </div>
      
      <div className="relative" ref={menuRef}>
        <button
          className="p-1 text-white hover:text-gray-200 transition-colors focus:outline-none"
          onClick={handleProfileClick}
        >
          <AccountCircle className="text-3xl" />
        </button>

        {isProfileMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-slate-800 rounded-md shadow-lg py-1">
            <button
              onClick={handleEditProfile}
              className="w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-100"
            >
              <Edit fontSize="small" />
              {t.editProfile}
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-100"
            >
              <ExitToApp fontSize="small" />
              {t.logout}
            </button>
          </div>
        )}
      </div>
    </header>
  );
}