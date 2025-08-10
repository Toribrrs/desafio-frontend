import React, { useState } from 'react';
import { ArrowDropDown, Check } from '@mui/icons-material';

export default function CustomSelect({ options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const selectedOptionLabel = options.find(option => option.value === value)?.label || '';

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-teal-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOptionLabel}
          <ArrowDropDown className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {options.map(option => (
              <div
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
              >
                {option.label}
                {option.value === value && <Check className="h-4 w-4 text-teal-500" />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}