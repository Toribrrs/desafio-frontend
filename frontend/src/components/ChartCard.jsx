import React from 'react'

export default function ChartCard({ title, children, className, controls }) {
  return (
    <div className={`bg-white rounded-xl shadow p-6 flex flex-col ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-slate-700">{title}</h3>
        {controls && <div className="flex items-center gap-2 text-sm">{controls}</div>}
      </div>
      <div className="w-full flex-1">
        {children}
      </div>
    </div>
  )
}