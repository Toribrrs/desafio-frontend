import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import DataTable from '../components/DataTable';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import cdasData from '../cdas.json';
import inscricoesData from '../inscricoes.json';
import { ThemeContext } from '../context/ThemeContext';

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

export default function CdaSearch() {
  const query = useQuery();
  const initialSearchTerm = query.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [naturezaFilter, setNaturezaFilter] = useState('Todos');
  const [anoInicio, setAnoInicio] = useState('Todos');
  const [anoFim, setAnoFim] = useState('Todos');
  const [sortOrder, setSortOrder] = useState('asc');
  const [cdas, setCdas] = useState([]);
  const [naturezaOptions, setNaturezaOptions] = useState(['Todos']);
  const [anosDisponiveis, setAnosDisponiveis] = useState(['Todos']);

  const { theme } = useContext(ThemeContext);

  const normalize = (s) =>
    s ? String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() : '';

  const handleSearch = () => {
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
  };

  useEffect(() => {
    const nats = [...new Set(cdasData.map((c) => c.natureza).filter(Boolean))].sort();
    setNaturezaOptions(['Todos', ...nats]);

    const anos = [
      ...new Set(inscricoesData.map((i) => String(i.ano).trim()).filter(Boolean))
    ].sort((a, b) => a.localeCompare(b));
    setAnosDisponiveis(['Todos', ...anos]);

    setCdas(cdasData.map(formatCda));
  }, []);

  const handleExportCsv = () => {
    if (!Array.isArray(cdas) || cdas.length === 0) return;

    const sanitizeCsvValue = (value) => {
      let sanitized = String(value || '').replace(/"/g, '""');
      return `"${sanitized}"`;
    };

    const dataToExport = cdas.map(c => ({
      'Número CDA': c.numCDA,
      'Natureza': c.natureza,
      'Ano de Inscrição': c.ano_inscricao,
      'Saldo Atual': c.saldo_num.toFixed(2).replace('.', ','),
      'Situação': c.situacao
    }));
    
    // Converte os dados para o formato CSV
    const headers = Object.keys(dataToExport[0]).map(sanitizeCsvValue).join(';');
    const rows = dataToExport.map((row) =>
      Object.values(row).map(sanitizeCsvValue).join(';')
    );
    const csvContent = [headers, ...rows].join('\n');

    // Cria o blob e faz o download
    const blob = new Blob([`\ufeff${csvContent}`], { type: 'text/csv;charset=utf-8-sig;' });
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
      <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-black'}`}>
        Busca de CDAs
      </h2>
      <form
        onSubmit={(e) => e.preventDefault()}
        className={`flex flex-col md:flex-row gap-4 items-center p-4 rounded-xl shadow ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'}`}
      >
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Pesquisar por número..."
          className={`flex-1 p-3 rounded-lg border border-slate-300 dark:border-slate-700 ${theme === 'dark' ? 'bg-slate-700 text-white' : 'bg-white text-slate-900'} placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500`}
        />
        <select
          value={naturezaFilter}
          onChange={(e) => setNaturezaFilter(e.target.value)}
          className={`p-3 rounded-lg border border-slate-300 dark:border-slate-700 ${theme === 'dark' ? 'bg-slate-700 text-white' : 'bg-white text-slate-900'} focus:outline-none focus:ring-2 focus:ring-teal-500`}
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
          className={`p-3 rounded-lg border border-slate-300 dark:border-slate-700 ${theme === 'dark' ? 'bg-slate-700 text-white' : 'bg-white text-slate-900'} focus:outline-none focus:ring-2 focus:ring-teal-500`}
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
          className={`p-3 rounded-lg border border-slate-300 dark:border-slate-700 ${theme === 'dark' ? 'bg-slate-700 text-white' : 'bg-white text-slate-900'} focus:outline-none focus:ring-2 focus:ring-teal-500`}
        >
          {anosDisponiveis.map((opt) => (
            <option key={opt} value={opt}>
              Ano Final: {opt}
            </option>
          ))}
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className={`p-3 rounded-lg border border-slate-300 dark:border-slate-700 ${theme === 'dark' ? 'bg-slate-700 text-white' : 'bg-white text-slate-900'} focus:outline-none focus:ring-2 focus:ring-teal-500`}
        >
          <option value="asc">Saldo (Crescente)</option>
          <option value="desc">Saldo (Decrescente)</option>
        </select>
        <button
          type="button"
          onClick={handleSearch}
          className="px-4 py-3 rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-700 transition-colors"
        >
          Buscar
        </button>
      </form>

      <div className="flex justify-end">
        <button
          onClick={handleExportCsv}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
        >
          <FileDownloadIcon fontSize="small" />
          Exportar CSV
        </button>
      </div>

      <DataTable columns={columns} data={cdas} />
    </div>
  );
}