import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function DataTable({ columns, data }) {
  const { theme } = useContext(ThemeContext);

  const isDarkMode = theme === 'dark';

  const headerBgColor = isDarkMode ? 'bg-slate-700' : 'bg-gray-100';
  const headerTextColor = isDarkMode ? 'text-gray-100' : 'text-gray-600';
  const rowBgColor = isDarkMode ? 'bg-slate-800' : 'bg-white';
  const rowTextColor = isDarkMode ? 'text-gray-300' : 'text-gray-800';
  const rowHoverBgColor = isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-50';

  return (
    <div className="overflow-x-auto shadow-lg rounded-xl">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
        <thead className={headerBgColor}>
          <tr>
            {columns.map(column => (
              <th
                key={column.key}
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${headerTextColor}`}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={`divide-y divide-gray-200 dark:divide-slate-700 ${rowBgColor} ${rowTextColor}`}>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-4 whitespace-nowrap text-center">
                Nenhum resultado encontrado.
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowHoverBgColor}>
                {columns.map(column => (
                  <td
                    key={column.key}
                    className="px-6 py-4 whitespace-nowrap text-sm"
                  >
                    {row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}