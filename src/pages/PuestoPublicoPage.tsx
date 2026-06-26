import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PuestoPublicDetail } from '../components/puestos/PuestoPublicDetail';
import { PUESTO_PUBLICO_ERRORS } from '../constants';
import { getPuestoPublico } from '../services/puestosService';
import type { Puesto } from '../types';

export function PuestoPublicoPage() {
  const { id } = useParams<{ id: string }>();
  const [puesto, setPuesto] = useState<Puesto | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function loadPuesto() {
      if (!id) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setLoading(true);
      const data = await getPuestoPublico(id);
      setPuesto(data);
      setNotFound(!data);
      setLoading(false);
    }

    void loadPuesto();
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <p className="text-slate-600">Cargando puesto...</p>
      </div>
    );
  }

  if (notFound || !puesto) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-lg font-medium text-slate-800">{PUESTO_PUBLICO_ERRORS.notAvailable}</p>
          <Link
            to="/buscar"
            className="mt-4 inline-block text-sm font-medium text-teal-700 hover:underline"
          >
            Volver a buscar puestos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link
        to="/buscar"
        className="mb-4 inline-block text-sm font-medium text-teal-700 hover:underline"
      >
        ← Volver a buscar
      </Link>
      <PuestoPublicDetail puesto={puesto} />
    </div>
  );
}
