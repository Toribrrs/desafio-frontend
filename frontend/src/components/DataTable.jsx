import React from 'react'

export default function DataTable({ columns = [], data = [], title }) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      {title && (
        <h3 className="p-6 text-base font-semibold text-slate-700">{title}</h3>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              {columns.map(c => (
                <th key={c.key} className="p-4 text-xs font-medium text-slate-500 uppercase tracking-wider">
                  {c.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {data.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50">
                {columns.map(c => (
                  <td key={c.key} className="p-4 text-sm text-slate-700">
                    {c.render ? c.render(row) : (row[c.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}