import React, { createContext, useContext, useState } from 'react';
import { searchCdas } from '../services/api';

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [q, setQ] = useState('');
  const [natureza, setNatureza] = useState('');
  const [situacao, setSituacao] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSearch = async (params) => {
    setLoading(true);
    try {
      const data = await searchCdas(params);
      setSearchResults(data.items); // O backend retorna os resultados dentro de 'items'
    } catch (err) {
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SearchContext.Provider value={{ q, setQ, natureza, setNatureza, situacao, setSituacao, searchResults, loading, onSearch }}>
      {children}
    </SearchContext.Provider>
  );
};