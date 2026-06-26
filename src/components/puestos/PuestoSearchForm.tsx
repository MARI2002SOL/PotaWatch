import { type FormEvent, useState } from 'react';
import { MIN_SEARCH_LENGTH } from '../../constants';

interface PuestoSearchFormProps {
  onSearch: (query: string) => void;
  loading?: boolean;
}

export function PuestoSearchForm({ onSearch, loading = false }: PuestoSearchFormProps) {
  const [query, setQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();

    if (trimmed.length < MIN_SEARCH_LENGTH) {
      setError(`Ingresa al menos ${MIN_SEARCH_LENGTH} caracteres para buscar`);
      return;
    }

    setError(null);
    onSearch(trimmed);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label htmlFor="busqueda" className="mb-1 block text-sm font-medium text-slate-700">
          Buscar por nombre o distrito
        </label>
        <div className="flex gap-2">
          <input
            id="busqueda"
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (error) setError(null);
            }}
            placeholder="Ej. Ceviche del puerto, Miraflores..."
            className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-teal-700 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </div>
        <p className="mt-1 text-xs text-slate-500">
          Mínimo {MIN_SEARCH_LENGTH} caracteres. Se busca en nombre y distrito.
        </p>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    </form>
  );
}
