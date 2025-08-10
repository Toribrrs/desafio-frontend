import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function ChartCard({ title, children, className, controls }) {
  const { theme } = useContext(ThemeContext);

  const cardBackgroundColor = theme === 'dark' ? 'bg-slate-800' : 'bg-white';
  const titleTextColor = theme === 'dark' ? 'text-gray-100' : 'text-slate-700';

  return (
    <div className={`
      ${cardBackgroundColor} rounded-xl shadow p-6 flex flex-col 
      border border-gray-200 dark:border-slate-700
      ${className}
    `}>
      <div className="flex justify-between items-center mb-4">
        <h3 className={`text-lg font-semibold ${titleTextColor}`}>{title}</h3>
        {controls && <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-gray-100">{controls}</div>}
      </div>
      <div className="w-full flex-1">
        {children}
      </div>
    </div>
  );
}