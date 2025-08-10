import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function Help() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="p-8 transition-colors">
      <h1 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-gray-100' : 'text-black'}`}>
        Central de Ajuda
      </h1>
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6 space-y-4 border border-gray-200 dark:border-slate-700">
        <div className="border-b pb-4 border-gray-200 dark:border-slate-700">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Como faço para pesquisar uma CDA?
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Para pesquisar uma CDA, utilize a barra de busca na aba lateral. Você pode pesquisar pelo número, natureza (IPTU, ISS, ITBI, etc) ou ano.
          </p>
        </div>
        <div className="border-b pb-4 border-gray-200 dark:border-slate-700">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            O que significam os gráficos no Dashboard?
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Os gráficos exibem dados estatísticos sobre as CDAs, como a quantidade por natureza, o saldo total, e a evolução de inscrições ao longo do tempo.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Posso exportar os dados?
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Sim, a funcionalidade de exportação de dados permite a exportação dos dados em formato CSV.
          </p>
        </div>
      </div>
    </div>
  );
}