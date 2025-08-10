import React from 'react';

export default function Help() {
  return (

    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Central de Ajuda</h1>
      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <div className="border-b pb-4">
          <h3 className="text-xl font-semibold text-slate-700 mb-2">Como faço para pesquisar uma CDA?</h3>
          <p className="text-slate-600">
            Para pesquisar uma CDA, utilize a barra de busca na aba lateral. Você pode pesquisar pelo número, natureza (IPTU, ISS, ITBI, etc ) ou ano.
          </p>
        </div>
        <div className="border-b pb-4">
          <h3 className="text-xl font-semibold text-slate-700 mb-2">O que significam os gráficos no Dashboard?</h3>
          <p className="text-slate-600">
            Os gráficos exibem dados estatísticos sobre as CDAs, como a quantidade por natureza, o saldo total, e a evolução de inscrições ao longo do tempo.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-700 mb-2">Posso exportar os dados?</h3>
          <p className="text-slate-600">
            Sim, a funcionalidade de exportação de dados permite a exportação dos dados em formato CSV.
          </p>
        </div>
      </div>
    </div>
  );
}