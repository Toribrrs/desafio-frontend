import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { SunIcon, MoonIcon, UserCircleIcon, BellIcon, LockClosedIcon } from '@heroicons/react/24/outline';

export default function Settings() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Cores condicionais, garantindo contraste bom em ambos os temas
  const cardBgColor = theme === 'dark' ? 'bg-slate-800' : 'bg-white';
  const cardBorderColor = theme === 'dark' ? 'border-slate-700' : 'border-gray-200';
  const headerTextColor = theme === 'dark' ? 'text-gray-100' : 'text-gray-900';
  const sectionTitleColor = theme === 'dark' ? 'text-gray-100' : 'text-gray-800';
  const textColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
  const inputBgColor = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50';
  const inputBorderColor = theme === 'dark' ? 'border-gray-600' : 'border-gray-300';
  const inputTextColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const labelTextColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-900';
  const paragraphTextColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-700';

  return (
    <div className="p-6 max-w-3xl mx-auto transition-colors duration-300">
      <header className="mb-8">
        <h1 className={`text-3xl font-bold tracking-tight ${headerTextColor}`}>
          Configurações da Conta
        </h1>
        <p className={`mt-2 ${paragraphTextColor}`}>
          Gerencie suas preferências de perfil, aparência e notificações.
        </p>
      </header>

      {/* Detalhes do Perfil */}
      <section className={`${cardBgColor} p-6 rounded-2xl shadow-md border ${cardBorderColor} mb-6`}>
        <div className="flex items-center space-x-4 mb-5">
          <UserCircleIcon className="h-10 w-10 text-teal-500" />
          <div>
            <h2 className={`text-xl font-semibold ${sectionTitleColor}`}>Detalhes do Perfil</h2>
            <p className={`text-sm ${textColor}`}>
              Edite seu nome, e-mail e outras informações pessoais.
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className={`text-sm font-medium ${labelTextColor}`}>
              Nome Completo
            </label>
            <input
              type="text"
              id="name"
              placeholder="Seu nome"
              className={`mt-1 block w-full rounded-lg border ${inputBorderColor} ${inputBgColor} px-4 py-2 ${inputTextColor} focus:ring-teal-500 focus:border-teal-500 transition-colors`}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className={`text-sm font-medium ${labelTextColor}`}>
              Endereço de E-mail
            </label>
            <input
              type="email"
              id="email"
              placeholder="seu.email@exemplo.com"
              className={`mt-1 block w-full rounded-lg border ${inputBorderColor} ${inputBgColor} px-4 py-2 ${inputTextColor} focus:ring-teal-500 focus:border-teal-500 transition-colors`}
            />
          </div>
          <button className="w-full sm:w-auto mt-4 px-6 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition">
            Salvar Alterações
          </button>
        </div>
      </section>

      {/* Aparência */}
      <section className={`${cardBgColor} p-6 rounded-2xl shadow-md border ${cardBorderColor} mb-6`}>
        <div className="flex items-center space-x-4 mb-5">
          {theme === 'dark' ? (
            <MoonIcon className="h-10 w-10 text-purple-400" />
          ) : (
            <SunIcon className="h-10 w-10 text-yellow-500" />
          )}
          <div>
            <h2 className={`text-xl font-semibold ${sectionTitleColor}`}>Aparência</h2>
            <p className={`text-sm ${textColor}`}>
              Personalize a interface do usuário com um tema claro ou escuro.
            </p>
          </div>
        </div>
        <div className="flex space-x-4 p-1 bg-gray-100 rounded-xl dark:bg-gray-700">
          <button
            onClick={() => toggleTheme('light')}
            className={`flex-1 p-3 flex items-center justify-center space-x-2 rounded-lg transition-all duration-200 ${
              theme === 'light'
                ? 'bg-white shadow text-teal-600'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
            }`}
          >
            <SunIcon className="h-5 w-5" />
            <span>Claro</span>
          </button>
          <button
            onClick={() => toggleTheme('dark')}
            className={`flex-1 p-3 flex items-center justify-center space-x-2 rounded-lg transition-all duration-200 ${
              theme === 'dark'
                ? 'bg-gray-200 shadow text-purple-600'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
            }`}
          >
            <MoonIcon className="h-5 w-5" />
            <span>Escuro</span>
          </button>
        </div>
      </section>

      {/* Notificações */}
      <section className={`${cardBgColor} p-6 rounded-2xl shadow-md border ${cardBorderColor} mb-6`}>
        <div className="flex items-center space-x-4 mb-5">
          <BellIcon className="h-10 w-10 text-blue-500" />
          <div>
            <h2 className={`text-xl font-semibold ${sectionTitleColor}`}>Notificações</h2>
            <p className={`text-sm ${textColor}`}>Gerencie como e quando você recebe alertas.</p>
          </div>
        </div>
        <div className="space-y-4">
          <label htmlFor="email-notifications" className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" id="email-notifications" className="mt-1 rounded accent-blue-500" />
            <div>
              <span className={`font-medium ${headerTextColor}`}>Notificações por e-mail</span>
              <p className={`text-sm ${paragraphTextColor}`}>
                Receba atualizações importantes, novidades e alertas de segurança por e-mail.
              </p>
            </div>
          </label>
          <label htmlFor="auto-updates" className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" id="auto-updates" className="mt-1 rounded accent-blue-500" />
            <div>
              <span className={`font-medium ${headerTextColor}`}>Atualizações automáticas</span>
              <p className={`text-sm ${paragraphTextColor}`}>
                Mantenha a aplicação sempre na versão mais recente com atualizações automáticas.
              </p>
            </div>
          </label>
        </div>
      </section>

      {/* Segurança */}
      <section className={`${cardBgColor} p-6 rounded-2xl shadow-md border ${cardBorderColor}`}>
        <div className="flex items-center space-x-4 mb-5">
          <LockClosedIcon className="h-10 w-10 text-orange-500" />
          <div>
            <h2 className={`text-xl font-semibold ${sectionTitleColor}`}>Segurança</h2>
            <p className={`text-sm ${textColor}`}>Proteja sua conta e altere sua senha regularmente.</p>
          </div>
        </div>
        <div className="space-y-3 sm:space-y-0 sm:flex sm:space-x-4">
          <button className="w-full sm:w-auto px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700">
            Alterar Senha
          </button>
          <button className="w-full sm:w-auto px-6 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition dark:hover:bg-red-900">
            Desativar Conta
          </button>
        </div>
      </section>
    </div>
  );
}
