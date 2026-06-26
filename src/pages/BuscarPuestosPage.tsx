import { useState } from 'react';
import { PuestoSearchForm } from '../components/puestos/PuestoSearchForm';
import { PuestoSearchResults } from '../components/puestos/PuestoSearchResults';
import { searchPuestos } from '../services/puestosService';
import type { Puesto } from '../types';

type SearchResult = Pick<Puesto, 'id' | 'nombre' | 'distrito' | 'estado_sanitario'>;

export function BuscarPuestosPage() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [query, setQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSearch(searchQuery: string) {
    setLoading(true);
    setQuery(searchQuery);
    const data = await searchPuestos(searchQuery);
    setResults(data);
    setHasSearched(true);
    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Buscar puestos</h1>
        <p className="mt-1 text-slate-600">
          Consulta el estado sanitario de puestos ambulantes de ceviche de pota en Lima.
        </p>
      </div>

      <div className="mb-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <PuestoSearchForm onSearch={handleSearch} loading={loading} />
      </div>

      <PuestoSearchResults results={results} hasSearched={hasSearched} query={query} />
    </div>
  );
}
