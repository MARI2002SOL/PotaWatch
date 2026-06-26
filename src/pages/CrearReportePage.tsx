import { useSearchParams } from 'react-router-dom';
import { ReporteForm } from '../components/reportes/ReporteForm';

export function CrearReportePage() {
  const [searchParams] = useSearchParams();
  const puestoId = searchParams.get('puestoId') ?? '';

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <ReporteForm initialPuestoId={puestoId} />
    </div>
  );
}
