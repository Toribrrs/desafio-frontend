const API_BASE_URL = 'http://localhost:8000';

export async function fetchSummaryData(endpoint) {
  try {
    const response = await fetch(`${API_BASE_URL}/resumo/${endpoint}`);
    if (!response.ok) {
      throw new Error(`Erro ao buscar dados do resumo: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Erro ao buscar ${endpoint}:`, error);
    throw error;
  }
}

export async function searchCdas(params) {
  try {
    const url = new URL(`${API_BASE_URL}/cda/search`);
    url.search = new URLSearchParams(params).toString();
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro na busca: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar CDAs:", error);
    throw error;
  }
}