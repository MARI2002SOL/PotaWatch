import { ESTADO_SANITARIO_LABELS, formatFechaActualizacion } from '../../constants';
import { EstadoSanitarioBadge } from './EstadoSanitarioBadge';
import type { Puesto } from '../../types';

interface PuestoPublicDetailProps {
  puesto: Puesto;
}

export function PuestoPublicDetail({ puesto }: PuestoPublicDetailProps) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h1 className="text-2xl font-bold text-slate-900">{puesto.nombre}</h1>
        <EstadoSanitarioBadge estado={puesto.estado_sanitario} />
      </div>

      <dl className="mt-6 space-y-4">
        <div>
          <dt className="text-sm font-medium text-slate-500">Dirección</dt>
          <dd className="mt-0.5 text-slate-900">{puesto.direccion}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-slate-500">Distrito</dt>
          <dd className="mt-0.5 text-slate-900">{puesto.distrito}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-slate-500">Tipo de producto</dt>
          <dd className="mt-0.5 text-slate-900">{puesto.tipo_producto}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-slate-500">Estado sanitario</dt>
          <dd className="mt-1 flex items-center gap-2">
            <EstadoSanitarioBadge estado={puesto.estado_sanitario} />
            <span className="text-sm text-slate-600">
              {ESTADO_SANITARIO_LABELS[puesto.estado_sanitario]}
            </span>
          </dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-slate-500">Última actualización</dt>
          <dd className="mt-0.5 text-slate-900">
            {formatFechaActualizacion(puesto.updated_at)}
          </dd>
        </div>
      </dl>
    </article>
  );
}
