import { useCallback, useEffect, useState } from 'react';
import { PuestoRegisterForm } from '../components/puestos/PuestoRegisterForm';
import { ESTADO_SANITARIO_LABELS } from '../constants';
import { useAuth } from '../hooks/useAuth';
import { listPuestosByVendedor } from '../services/puestosService';
import type { Puesto } from '../types';

export function RegistrarPuestoPage() {
  const { session } = useAuth();
  const [puestos, setPuestos] = useState<Puesto[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPuestos = useCallback(async () => {
    const userId = session?.user.id;
    if (!userId) {
      setPuestos([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const data = await listPuestosByVendedor(userId);
    setPuestos(data);
    setLoading(false);
  }, [session?.user.id]);

  useEffect(() => {
    void loadPuestos();
  }, [loadPuestos]);

  function handlePuestoCreated(puesto: Puesto) {
    setPuestos((prev) => [puesto, ...prev.filter((item) => item.id !== puesto.id)]);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Panel del vendedor</h1>
        <p className="mt-1 text-slate-600">Registra y consulta tus puestos ambulantes.</p>
      </div>

      <PuestoRegisterForm onPuestoCreated={handlePuestoCreated} />

      <section>
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Mis puestos</h2>

        {loading ? (
          <p className="text-sm text-slate-600">Cargando puestos...</p>
        ) : puestos.length === 0 ? (
          <p className="rounded-lg border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-500">
            Aún no has registrado ningún puesto.
          </p>
        ) : (
          <ul className="space-y-3">
            {puestos.map((puesto) => (
              <li
                key={puesto.id}
                className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h3 className="font-semibold text-slate-900">{puesto.nombre}</h3>
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                    {ESTADO_SANITARIO_LABELS[puesto.estado_sanitario] ?? puesto.estado_sanitario}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-600">{puesto.direccion}</p>
                <p className="text-sm text-slate-500">
                  {puesto.distrito} · {puesto.tipo_producto}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  {puesto.latitud}, {puesto.longitud}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
