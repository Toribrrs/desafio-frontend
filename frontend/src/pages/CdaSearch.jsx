import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import DataTable from '../components/DataTable';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import cdasData from '../cdas.json';
import inscricoesData from '../inscricoes.json';

const situacaoMap = { '-1': 'Cancelada', '0': 'Em cobrança', '1': 'Quitada' };

const columns = [
  { key: 'numCDA', title: 'Número CDA' },
  { key: 'natureza', title: 'Natureza' },
  { key: 'ano_inscricao', title: 'Ano de Inscrição' },
  { key: 'saldo_atual', title: 'Saldo Atual' },
  { key: 'situacao', title: 'Situação' }
];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function CdaSearch() {
  const query = useQuery();
  const initialSearchTerm = query.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [naturezaFilter, setNaturezaFilter] = useState('Todos');
  const [anoInicio, setAnoInicio] = useState('Todos');
  const [anoFim, setAnoFim] = useState('Todos');
  const [sortBy, setSortBy] = useState('saldo_atual');
  const [sortOrder, setSortOrder] = useState('asc');
  const [cdas, setCdas] = useState([]);
  const [naturezaOptions, setNaturezaOptions] = useState(['Todos']);
  const [anosDisponiveis, setAnosDisponiveis] = useState(['Todos']);

  const normalize = (s) =>
    s ? String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() : '';

  const formatCda = (cda) => {
    const saldoNum =
      typeof cda.valor_saldo_atualizado === 'number'
        ? cda.valor_saldo_atualizado
        : Number(cda.valor_saldo_atualizado) || 0;
    return {
      ...cda,
      natureza: cda.natureza || '',
      ano_inscricao: cda.numCDA ? String(cda.numCDA).substring(0, 4) : '',
      saldo_num: saldoNum,
      saldo_atual: saldoNum.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      situacao: situacaoMap[String(cda.agrupamento_situacao)] || ''
    };
  };

  const handleSearch = useCallback(() => {
    let results = cdasData.map(formatCda);

    if (searchTerm.trim() !== '') {
      const t = normalize(searchTerm);
      results = results.filter((c) => normalize(String(c.numCDA)).includes(t));
    }

    if (naturezaFilter !== 'Todos') {
      results = results.filter((c) => c.natureza === naturezaFilter);
    }

    if (anoInicio !== 'Todos') {
      results = results.filter((c) => c.ano_inscricao >= anoInicio);
    }

    if (anoFim !== 'Todos') {
      results = results.filter((c) => c.ano_inscricao <= anoFim);
    }

    results.sort((a, b) =>
      sortOrder === 'asc' ? a.saldo_num - b.saldo_num : b.saldo_num - a.saldo_num
    );

    setCdas(results);
  }, [searchTerm, naturezaFilter, anoInicio, anoFim, sortOrder]);

  useEffect(() => {
    const nats = [...new Set(cdasData.map((c) => c.natureza).filter(Boolean))].sort();
    setNaturezaOptions(['Todos', ...nats]);

    const anos = [
      ...new Set(inscricoesData.map((i) => String(i.ano).trim()).filter(Boolean))
    ].sort((a, b) => a.localeCompare(b));
    setAnosDisponiveis(['Todos', ...anos]);

    handleSearch();
  }, [handleSearch]);

  const handleExportCsv = () => {
    if (!Array.isArray(cdas) || cdas.length === 0) return;
    const headers = columns.map((col) => col.title).join(';');
    const rows = cdas.map((c) =>
      columns.map((col) => `"${c[col.key] || ''}"`).join(';')
    );
    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cdas_export_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 p-8">
      <h2 className="text-3xl font-bold text-slate-800">Busca de CDAs</h2>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col md:flex-row gap-4 items-center"
      >
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Pesquisar por número..."
          className="flex-1 p-3 rounded-lg border border-slate-300 focus:ring-teal-500 focus:border-teal-500"
        />
        <select
          value={naturezaFilter}
          onChange={(e) => setNaturezaFilter(e.target.value)}
          className="p-2 rounded-lg border border-slate-300"
        >
          {naturezaOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <select
          value={anoInicio}
          onChange={(e) => setAnoInicio(e.target.value)}
          className="p-2 rounded-lg border border-slate-300"
        >
          {anosDisponiveis.map((opt) => (
            <option key={opt} value={opt}>
              Ano Inicial: {opt}
            </option>
          ))}
        </select>
        <select
          value={anoFim}
          onChange={(e) => setAnoFim(e.target.value)}
          className="p-2 rounded-lg border border-slate-300"
        >
          {anosDisponiveis.map((opt) => (
            <option key={opt} value={opt}>
              Ano Final: {opt}
            </option>
          ))}
        </select>
        <select
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-2 rounded-lg border border-slate-300"
        >
          <option value="asc">Saldo (Crescente)</option>
          <option value="desc">Saldo (Decrescente)</option>
        </select>
        <button
          type="button"
          onClick={handleSearch}
          className="bg-primary-blue text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Buscar
        </button>
      </form>
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-slate-600 font-medium">
          {cdas.length} resultado(s) encontrado(s).
        </p>
        <button
          onClick={handleExportCsv}
          className="bg-green-600 text-white p-2 rounded-lg text-sm flex items-center gap-1 hover:bg-green-700 transition-colors"
        >
          <FileDownloadIcon fontSize="small" />
          Exportar CSV
        </button>
      </div>
      {cdas.length > 0 ? (
        <DataTable title="Resultados da Busca" columns={columns} data={cdas} />
      ) : (
        <p className="text-center text-slate-500 mt-10">
          Nenhum resultado encontrado.
        </p>
      )}
    </div>
  );
}
