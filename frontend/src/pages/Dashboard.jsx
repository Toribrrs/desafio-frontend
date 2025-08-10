import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { fetchSummaryData } from '../services/api';
import ChartCard from '../components/ChartCard';
import CustomSelect from '../components/CustomSelect';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A2D9D9'];

const inscricoesFilters = {
  'Total': 'inscricoes',
  'Quitadas': 'inscricoes_quitadas',
  'Canceladas': 'inscricoes_canceladas',
};

export default function Dashboard() {
  const [inscricoesData, setInscricoesData] = useState([]);
  const [distribuicaoData, setDistribuicaoData] = useState([]);
  const [saldoPorNaturezaData, setSaldoPorNaturezaData] = useState([]);
  const [selectedInscricoesFilter, setSelectedInscricoesFilter] = useState('Total');
  const [selectedDistribuicao, setSelectedDistribuicao] = useState('IPTU');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const inscricoes = await fetchSummaryData(inscricoesFilters[selectedInscricoesFilter]);
        const distribuicao = await fetchSummaryData('distribuicao_cdas');
        const saldo = await fetchSummaryData('saldo_cdas');

        setInscricoesData(inscricoes);
        setDistribuicaoData(distribuicao);
        setSaldoPorNaturezaData(saldo);
      } catch (error) {
        console.error("Não foi possível carregar os dados do dashboard.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [selectedInscricoesFilter]);

  if (loading) {
    return <div className="text-center mt-20 text-slate-500">Carregando dados do dashboard...</div>;
  }

  const distribuicaoChartData = distribuicaoData.find(d => d.name === selectedDistribuicao);

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-slate-800 mb-6">Visão Geral</h2>

      <div className="grid grid-cols-1">
        <ChartCard
          title="Inscrições por Ano"
          controls={
            <CustomSelect
              options={Object.keys(inscricoesFilters).map(filter => ({
                value: filter,
                label: filter
              }))}
              value={selectedInscricoesFilter}
              onChange={setSelectedInscricoesFilter}
            />
          }
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={inscricoesData}>
              <XAxis dataKey="ano" />
              <YAxis
                tickFormatter={(value) => Intl.NumberFormat('pt-BR', { notation: 'compact', maximumFractionDigits: 1 }).format(value)}
              />
              <Tooltip
                formatter={(value) => `Quantidade: ${value.toLocaleString('pt-BR')}`}
              />
              <Legend />
              <Line type="monotone" dataKey="Quantidade" stroke="#8884d8" name="Inscrições" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Saldo Total por Natureza">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={saldoPorNaturezaData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={70}
              />
              <YAxis
                tickFormatter={(value) => Intl.NumberFormat('pt-BR', { notation: 'compact', maximumFractionDigits: 1 }).format(value)}
              />
              <Tooltip
                formatter={(value) => `R$ ${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
              />
              <Bar dataKey="Saldo" fill="#82ca9d" name="Saldo Total" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Distribuição de CDAs por Situação"
          controls={
            <CustomSelect
              options={distribuicaoData.map(d => ({ value: d.name, label: d.name }))}
              value={selectedDistribuicao}
              onChange={setSelectedDistribuicao}
            />
          }
        >
          {distribuicaoChartData && (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={Object.entries(distribuicaoChartData).filter(([key]) => key !== 'name').map(([key, value]) => ({ name: key, value: value }))}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {Object.keys(distribuicaoChartData).filter(key => key !== 'name').map((_, i) => (
                    <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </ChartCard>
      </div>
    </div>
  );
}