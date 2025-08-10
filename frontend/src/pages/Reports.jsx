import React, { useEffect, useState, useContext } from 'react';
import { fetchSummaryData } from '../services/api';
import ChartCard from '../components/ChartCard';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  LineChart, Line, PieChart, Pie, Cell,
} from 'recharts';
import { ThemeContext } from '../context/ThemeContext';

const COLORS = ['#60A5FA', '#4FD1C5', '#81C784', '#FFB74D', '#EF9A9A', '#B39DDB'];

export default function Reports() {
  const [inscricoes, setInscricoes] = useState([]);
  const [inscricoesQuitadas, setInscricoesQuitadas] = useState([]);
  const [inscricoesCanceladas, setInscricoesCanceladas] = useState([]);
  const [saldoPorNatureza, setSaldoPorNatureza] = useState([]);
  const [loading, setLoading] = useState(true);

  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';
  const axisColor = isDarkMode ? '#e2e8f0' : '#475569';
  const legendColor = isDarkMode ? '#e2e8f0' : '#475569';
  const tooltipStyle = {
    backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
    border: `1px solid ${isDarkMode ? '#475569' : '#e2e8f0'}`,
    color: isDarkMode ? '#e2e8f0' : '#1e293b',
  };

  const formatMoeda = (valor) =>
    `R$ ${Intl.NumberFormat('pt-BR', { notation: 'compact', maximumFractionDigits: 2 }).format(valor)}`;

  const formatNumero = (valor) =>
    Intl.NumberFormat('pt-BR', { notation: 'compact', maximumFractionDigits: 1 }).format(valor);

  useEffect(() => {
    async function loadData() {
      try {
        const [total, quitadas, canceladas, saldo] = await Promise.all([
          fetchSummaryData('inscricoes'),
          fetchSummaryData('inscricoes_quitadas'),
          fetchSummaryData('inscricoes_canceladas'),
          fetchSummaryData('saldo_cdas'),
        ]);
        setInscricoes(total);
        setInscricoesQuitadas(quitadas);
        setInscricoesCanceladas(canceladas);
        setSaldoPorNatureza(saldo);
      } catch (err) {
        console.error('Erro ao carregar dados de análise', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return <div className="text-center mt-20 text-slate-500 dark:text-gray-400">Carregando análises...</div>;
  }

  const totalSaldo = saldoPorNatureza.reduce((sum, item) => sum + item.Saldo, 0);
  const top5 = [...saldoPorNatureza]
    .sort((a, b) => b.Saldo - a.Saldo)
    .slice(0, 5)
    .map(item => ({
      ...item,
      percentual: ((item.Saldo / totalSaldo) * 100).toFixed(1)
    }));

  const concentracaoTop2 = top5.slice(0, 2).reduce((sum, item) => sum + item.Saldo, 0);
  const concentracaoPercentual = ((concentracaoTop2 / totalSaldo) * 100).toFixed(1);

  const inscricoesAnuais = inscricoes.map(i => {
    const quitada = inscricoesQuitadas.find(q => q.ano === i.ano)?.Quantidade || 0;
    const cancelada = inscricoesCanceladas.find(c => c.ano === i.ano)?.Quantidade || 0;
    return {
      ano: i.ano,
      total: i.Quantidade,
      quitadas: quitada,
      canceladas: cancelada
    };
  });

  const inscricoesComVariacao = inscricoesAnuais.map((ano, idx, arr) => {
    if (idx === 0) return { ...ano, variacao: null };
    const anterior = arr[idx - 1].total;
    const variacao = anterior ? ((ano.total - anterior) / anterior) * 100 : null;
    return { ...ano, variacao: variacao?.toFixed(1) };
  });

  const inscricoesComVariacaoCorrigida = inscricoesComVariacao
    .filter(item => parseInt(item.ano) >= new Date().getFullYear() - 15)
    .map(item => ({
      ...item,
      variacaoNum: item.variacao ? parseFloat(item.variacao) : null,
      crescimento: item.variacao > 0 ? parseFloat(item.variacao) : null,
      queda: item.variacao < 0 ? parseFloat(item.variacao) : null,
    }));

  return (
    <div className="space-y-8 p-8 transition-colors">
      <h2 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-gray-100' : 'text-black'}`}>
        Análises e Insights
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-4 text-center border border-gray-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-gray-400">Saldo Total</p>
          <p className="text-2xl font-bold text-slate-800 dark:text-gray-100">{formatMoeda(totalSaldo)}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-4 text-center border border-gray-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-gray-400">Concentração Top 2 Naturezas</p>
          <p className="text-2xl font-bold text-slate-800 dark:text-gray-100">{concentracaoPercentual}%</p>
        </div>
        <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-4 text-center border border-gray-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-gray-400">Ano mais movimentado</p>
          <p className="text-2xl font-bold text-slate-800 dark:text-gray-100">
            {inscricoesAnuais.reduce((a, b) => a.total > b.total ? a : b).ano}
          </p>
        </div>
      </div>

      <ChartCard title="Top 5 Naturezas por Saldo">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={top5} animationDuration={500} animationEasing="ease">
            <XAxis dataKey="name" stroke={axisColor} />
            <YAxis tickFormatter={formatMoeda} stroke={axisColor} />
            <Tooltip formatter={(v) => formatMoeda(v)} contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ color: legendColor }} />
            <Bar dataKey="Saldo" fill={COLORS[0]} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Taxa de Quitação e Cancelamento por Ano">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={inscricoesAnuais} animationDuration={500} animationEasing="ease">
            <XAxis dataKey="ano" stroke={axisColor} />
            <YAxis tickFormatter={formatNumero} stroke={axisColor} />
            <Tooltip formatter={(v) => formatNumero(v)} contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ color: legendColor }} />
            <Line type="monotone" dataKey="quitadas" stroke={COLORS[2]} strokeWidth={3} activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="canceladas" stroke={COLORS[4]} strokeWidth={3} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Variação Anual de Inscrições (Últimos 15 anos)">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={inscricoesComVariacaoCorrigida} animationDuration={500} animationEasing="ease">
            <XAxis dataKey="ano" stroke={axisColor} />
            <YAxis unit="%" tickFormatter={(v) => `${v}%`} stroke={axisColor} />
            <Tooltip formatter={(v) => v != null ? `${v}%` : '-'} labelFormatter={(label) => `Ano: ${label}`} contentStyle={tooltipStyle} />
            <Legend verticalAlign="top" height={36} wrapperStyle={{ color: legendColor }} />
            <Bar dataKey="crescimento" name="Crescimento" fill="#22C55E" radius={[4, 4, 0, 0]} />
            <Bar dataKey="queda" name="Queda" fill="#EF4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Participação das Top 5 Naturezas no Saldo Total">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart animationDuration={500} animationEasing="ease">
            <Pie
              data={top5}
              dataKey="Saldo"
              nameKey="name"
              outerRadius={100}
              labelLine={false}
              label={({ name, percentual }) => `${name} (${percentual}%)`}
            >
              {top5.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(v) => formatMoeda(v)} contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ color: legendColor }} />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}