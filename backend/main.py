import json
import os
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List, Dict, Any

app = FastAPI()

# Configuração do CORS para permitir que o frontend acesse a API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Caminho para a pasta de dados
DATA_FOLDER = "data"

def read_json_file(file_name: str):
    """Função para ler um arquivo JSON do diretório de dados."""
    file_path = os.path.join(DATA_FOLDER, file_name)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail=f"File {file_name} not found")
    with open(file_path, "r", encoding="utf-8") as f:
        return json.load(f)

# Endpoint para os resumos
@app.get("/resumo/{name}")
def get_resumo(name: str):
    """
    Retorna os dados de resumo de um arquivo JSON.
    Ex: /resumo/quantidade_cdas, /resumo/saldo_cdas
    """
    file_name = f"{name}.json"
    data = read_json_file(file_name)
    return data

# Endpoint para a busca de CDAs
@app.get("/cda/search")
def search_cdas(
    q: Optional[str] = Query(None, description="Busca por numCDA ou devedor"),
    natureza: Optional[str] = Query(None, description="Filtro por natureza"),
    situacao: Optional[int] = Query(None, description="Filtro por situação (-1, 0, 1)"),
    sort_by: Optional[str] = Query("ano_inscricao", description="Campo para ordenação (ano_inscricao ou saldo_atual)"),
    sort_order: Optional[str] = Query("asc", description="Ordem de ordenação (asc ou desc)"),
    per_page: int = Query(50, description="Número de itens por página"),
):
    """
    Endpoint de busca e filtragem para o dashboard.
    """
    all_cdas = read_json_file("cdas.json")

    results = all_cdas
    
    # Aplica o filtro de busca geral (q) em vários campos
    if q:
        q_lower = q.lower()
        results = [
            cda for cda in results 
            if q_lower in str(cda.get("numCDA", "")).lower() or 
               q_lower in str(cda.get("devedor", "")).lower()
        ]
    
    # Aplica o filtro por natureza, de forma case-insensitive
    if natureza and natureza != "Todos":
        natureza_lower = natureza.lower()
        results = [
            cda for cda in results 
            if cda.get("natureza", "").lower() == natureza_lower
        ]
        
    # Aplica o filtro por situação
    if situacao is not None:
        results = [cda for cda in results if cda.get("agrupamento_situacao") == situacao]

    # Implementa a ordenação
    if sort_by:
        reverse = sort_order.lower() == 'desc'
        if sort_by == 'saldo_atual':
            results = sorted(results, key=lambda x: x.get('valor_saldo_atualizado', 0), reverse=reverse)
        elif sort_by == 'ano_inscricao':
            results = sorted(results, key=lambda x: x.get('ano_inscricao', 0), reverse=reverse)

    return {
        "items": results[:per_page],
        "total": len(results)
    }

# Endpoint para a página inicial 
@app.get("/")
def read_root():
    return {"message": "API do Dashboard está no ar!"}