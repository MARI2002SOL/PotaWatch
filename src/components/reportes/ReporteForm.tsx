import { type FormEvent, useEffect, useState } from 'react';
import {
  isValidDescripcion,
  MIN_DESCRIPCION_LENGTH,
  REPORTE_ERRORS,
  TIPO_PROBLEMA_LABELS,
  TIPOS_PROBLEMA,
} from '../../constants';
import { useAuth } from '../../hooks/useAuth';
import { listPuestosActivos } from '../../services/puestosService';
import { createReporte } from '../../services/reportesService';
import type { PuestoOption, TipoProblema } from '../../types';

interface ReporteFormProps {
  initialPuestoId?: string;
}

interface FieldErrors {
  puesto_id?: string;
  tipo_problema?: string;
  descripcion?: string;
}

export function ReporteForm({ initialPuestoId = '' }: ReporteFormProps) {
  const { session } = useAuth();
  const [puestos, setPuestos] = useState<PuestoOption[]>([]);
  const [loadingPuestos, setLoadingPuestos] = useState(true);
  const [puestoId, setPuestoId] = useState(initialPuestoId);
  const [tipoProblema, setTipoProblema] = useState<TipoProblema | ''>('');
  const [descripcion, setDescripcion] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadPuestos() {
      setLoadingPuestos(true);
      const data = await listPuestosActivos();
      setPuestos(data);
      setLoadingPuestos(false);
    }

    void loadPuestos();
  }, []);

  useEffect(() => {
    if (initialPuestoId) {
      setPuestoId(initialPuestoId);
    }
  }, [initialPuestoId]);

  function validate(): boolean {
    const errors: FieldErrors = {};

    if (!puestoId) {
      errors.puesto_id = 'Selecciona un puesto';
    }

    if (!tipoProblema) {
      errors.tipo_problema = 'Selecciona el tipo de problema';
    }

    if (!descripcion.trim()) {
      errors.descripcion = 'La descripción es obligatoria';
    } else if (!isValidDescripcion(descripcion)) {
      errors.descripcion = `La descripción debe tener al menos ${MIN_DESCRIPCION_LENGTH} caracteres`;
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);
    setSuccessMessage(null);

    if (!validate()) {
      return;
    }

    const userId = session?.user.id;
    if (!userId || !tipoProblema) {
      return;
    }

    setSubmitting(true);

    const { error, success } = await createReporte(userId, {
      puesto_id: puestoId,
      tipo_problema: tipoProblema,
      descripcion: descripcion.trim(),
    });

    if (error) {
      setSubmitError(error);
      setSubmitting(false);
      return;
    }

    if (success) {
      setSuccessMessage(REPORTE_ERRORS.success);
      setPuestoId('');
      setTipoProblema('');
      setDescripcion('');
      setFieldErrors({});
    }

    setSubmitting(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div>
        <h2 className="text-xl font-semibold text-slate-900">Enviar reporte</h2>
        <p className="mt-1 text-sm text-slate-600">
          Selecciona un puesto e indica el problema para alertar a las autoridades.
        </p>
      </div>

      {successMessage && (
        <p className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          {successMessage}
        </p>
      )}

      <div>
        <label htmlFor="puesto_id" className="mb-1 block text-sm font-medium text-slate-700">
          Puesto
        </label>
        <select
          id="puesto_id"
          value={puestoId}
          onChange={(e) => setPuestoId(e.target.value)}
          disabled={loadingPuestos}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 disabled:bg-slate-100"
        >
          <option value="">
            {loadingPuestos ? 'Cargando puestos...' : 'Selecciona un puesto'}
          </option>
          {puestos.map((puesto) => (
            <option key={puesto.id} value={puesto.id}>
              {puesto.nombre} — {puesto.distrito}
            </option>
          ))}
        </select>
        {fieldErrors.puesto_id && (
          <p className="mt-1 text-sm text-red-600">{fieldErrors.puesto_id}</p>
        )}
      </div>

      <div>
        <label htmlFor="tipo_problema" className="mb-1 block text-sm font-medium text-slate-700">
          Tipo de problema
        </label>
        <select
          id="tipo_problema"
          value={tipoProblema}
          onChange={(e) => setTipoProblema(e.target.value as TipoProblema | '')}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
        >
          <option value="">Selecciona un tipo</option>
          {TIPOS_PROBLEMA.map((tipo) => (
            <option key={tipo} value={tipo}>
              {TIPO_PROBLEMA_LABELS[tipo]}
            </option>
          ))}
        </select>
        {fieldErrors.tipo_problema && (
          <p className="mt-1 text-sm text-red-600">{fieldErrors.tipo_problema}</p>
        )}
      </div>

      <div>
        <label htmlFor="descripcion" className="mb-1 block text-sm font-medium text-slate-700">
          Descripción
        </label>
        <textarea
          id="descripcion"
          rows={4}
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Describe el incidente con el mayor detalle posible (mínimo 20 caracteres)"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
        />
        <p className="mt-1 text-xs text-slate-500">
          {descripcion.trim().length} / {MIN_DESCRIPCION_LENGTH} caracteres mínimos
        </p>
        {fieldErrors.descripcion && (
          <p className="mt-1 text-sm text-red-600">{fieldErrors.descripcion}</p>
        )}
      </div>

      {submitError && <p className="text-sm text-red-600">{submitError}</p>}

      <button
        type="submit"
        disabled={submitting || loadingPuestos}
        className="w-full rounded-md bg-teal-700 px-4 py-2 font-medium text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {submitting ? 'Enviando...' : 'Enviar reporte'}
      </button>
    </form>
  );
}
