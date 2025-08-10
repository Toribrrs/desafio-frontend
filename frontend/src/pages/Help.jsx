import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function Help() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="p-8 transition-colors">
      <h1 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-gray-100' : 'text-black'}`}>
        Central de Ajuda
      </h1>
      <div className={`rounded-xl shadow-sm p-6 space-y-4 border ${theme === 'dark' ? 'bg-slate-800 border-slate-700 shadow-dark' : 'bg-white border-gray-300'}`}>
        <div className={`border-b pb-4 ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'}`}>
          <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
            Como faço para pesquisar uma CDA?
          </h3>
          <p className={`text-gray-600 ${theme === 'dark' ? 'dark:text-gray-300' : ''}`}>
            Para pesquisar uma CDA, utilize a barra de busca na aba lateral. Você pode pesquisar pelo número, natureza (IPTU, ISS, ITBI, etc) ou ano.
          </p>
        </div>
        <div className={`border-b pb-4 ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'}`}>
          <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
            O que significam os gráficos no Dashboard?
          </h3>
          <p className={`text-gray-600 ${theme === 'dark' ? 'dark:text-gray-300' : ''}`}>
            Os gráficos exibem dados estatísticos sobre as CDAs, como a quantidade por natureza, o saldo total, e a evolução de inscrições ao longo do tempo.
          </p>
        </div>
        <div>
          <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
            Posso exportar os dados?
          </h3>
          <p className={`text-gray-600 ${theme === 'dark' ? 'dark:text-gray-300' : ''}`}>
            Sim, a funcionalidade de exportação de dados permite a exportação dos dados em formato CSV.
          </p>
        </div>
      </div>
    </div>
  );
}
