import { Link } from 'react-router-dom';
import { EstadoSanitarioBadge } from './EstadoSanitarioBadge';
import type { EstadoSanitario, Puesto } from '../../types';

type PuestoSearchResult = Pick<Puesto, 'id' | 'nombre' | 'distrito' | 'estado_sanitario'>;

interface PuestoSearchResultsProps {
  results: PuestoSearchResult[];
  hasSearched: boolean;
  query: string;
}

export function PuestoSearchResults({ results, hasSearched, query }: PuestoSearchResultsProps) {
  if (!hasSearched) {
    return (
      <p className="rounded-lg border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-500">
        Escribe el nombre o distrito de un puesto para comenzar la búsqueda.
      </p>
    );
  }

  if (results.length === 0) {
    return (
      <p className="rounded-lg border border-slate-200 bg-white p-6 text-center text-sm text-slate-600">
        No se encontraron puestos para &ldquo;{query}&rdquo;.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {results.map((puesto) => (
        <li key={puesto.id}>
          <Link
            to={`/puesto/${puesto.id}`}
            className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:border-teal-300 hover:shadow"
          >
            <div>
              <h3 className="font-semibold text-slate-900">{puesto.nombre}</h3>
              <p className="text-sm text-slate-500">{puesto.distrito}</p>
            </div>
            <EstadoSanitarioBadge estado={puesto.estado_sanitario as EstadoSanitario} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
