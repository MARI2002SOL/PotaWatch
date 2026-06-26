import { type FormEvent, useState } from 'react';
import {
  DISTRITOS_LIMA,
  isValidLatitud,
  isValidLongitud,
  LAT_MAX,
  LAT_MIN,
  LNG_MAX,
  LNG_MIN,
} from '../../constants';
import { createPuesto } from '../../services/puestosService';
import { useAuth } from '../../hooks/useAuth';
import type { Puesto } from '../../types';

interface PuestoRegisterFormProps {
  onPuestoCreated: (puesto: Puesto) => void;
}

interface FieldErrors {
  nombre?: string;
  distrito?: string;
  direccion?: string;
  latitud?: string;
  longitud?: string;
  tipo_producto?: string;
}

export function PuestoRegisterForm({ onPuestoCreated }: PuestoRegisterFormProps) {
  const { session } = useAuth();
  const [nombre, setNombre] = useState('');
  const [distrito, setDistrito] = useState('');
  const [direccion, setDireccion] = useState('');
  const [latitud, setLatitud] = useState('');
  const [longitud, setLongitud] = useState('');
  const [tipoProducto, setTipoProducto] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function validate(): boolean {
    const errors: FieldErrors = {};

    if (!nombre.trim()) {
      errors.nombre = 'El nombre es obligatorio';
    }

    if (!distrito) {
      errors.distrito = 'El distrito es obligatorio';
    }

    if (!direccion.trim()) {
      errors.direccion = 'La dirección es obligatoria';
    }

    const lat = Number(latitud);
    if (!latitud.trim()) {
      errors.latitud = 'La latitud es obligatoria';
    } else if (!isValidLatitud(lat)) {
      errors.latitud = `La latitud debe estar entre ${LAT_MIN} y ${LAT_MAX}`;
    }

    const lng = Number(longitud);
    if (!longitud.trim()) {
      errors.longitud = 'La longitud es obligatoria';
    } else if (!isValidLongitud(lng)) {
      errors.longitud = `La longitud debe estar entre ${LNG_MIN} y ${LNG_MAX}`;
    }

    if (!tipoProducto.trim()) {
      errors.tipo_producto = 'El tipo de producto es obligatorio';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      return;
    }

    const userId = session?.user.id;
    if (!userId) {
      setSubmitError('Debes iniciar sesión para registrar un puesto');
      return;
    }

    setSubmitting(true);

    const { puesto, error } = await createPuesto(userId, {
      nombre: nombre.trim(),
      distrito,
      direccion: direccion.trim(),
      latitud: Number(latitud),
      longitud: Number(longitud),
      tipo_producto: tipoProducto.trim(),
    });

    if (error) {
      setSubmitError(error);
      setSubmitting(false);
      return;
    }

    if (puesto) {
      setNombre('');
      setDistrito('');
      setDireccion('');
      setLatitud('');
      setLongitud('');
      setTipoProducto('');
      setFieldErrors({});
      onPuestoCreated(puesto);
    }

    setSubmitting(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div>
        <h2 className="text-xl font-semibold text-slate-900">Registrar puesto</h2>
        <p className="mt-1 text-sm text-slate-600">
          Completa los datos de tu puesto ambulante para figurar en el sistema.
        </p>
      </div>

      <div>
        <label htmlFor="nombre" className="mb-1 block text-sm font-medium text-slate-700">
          Nombre del puesto
        </label>
        <input
          id="nombre"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
        />
        {fieldErrors.nombre && <p className="mt-1 text-sm text-red-600">{fieldErrors.nombre}</p>}
      </div>

      <div>
        <label htmlFor="distrito" className="mb-1 block text-sm font-medium text-slate-700">
          Distrito
        </label>
        <select
          id="distrito"
          value={distrito}
          onChange={(e) => setDistrito(e.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
        >
          <option value="">Selecciona un distrito</option>
          {DISTRITOS_LIMA.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        {fieldErrors.distrito && (
          <p className="mt-1 text-sm text-red-600">{fieldErrors.distrito}</p>
        )}
      </div>

      <div>
        <label htmlFor="direccion" className="mb-1 block text-sm font-medium text-slate-700">
          Dirección
        </label>
        <input
          id="direccion"
          type="text"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
        />
        {fieldErrors.direccion && (
          <p className="mt-1 text-sm text-red-600">{fieldErrors.direccion}</p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="latitud" className="mb-1 block text-sm font-medium text-slate-700">
            Latitud
          </label>
          <input
            id="latitud"
            type="number"
            step="any"
            value={latitud}
            onChange={(e) => setLatitud(e.target.value)}
            placeholder="-12.046374"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
          />
          {fieldErrors.latitud && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.latitud}</p>
          )}
        </div>

        <div>
          <label htmlFor="longitud" className="mb-1 block text-sm font-medium text-slate-700">
            Longitud
          </label>
          <input
            id="longitud"
            type="number"
            step="any"
            value={longitud}
            onChange={(e) => setLongitud(e.target.value)}
            placeholder="-77.042793"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
          />
          {fieldErrors.longitud && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.longitud}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="tipo_producto" className="mb-1 block text-sm font-medium text-slate-700">
          Tipo de producto
        </label>
        <input
          id="tipo_producto"
          type="text"
          value={tipoProducto}
          onChange={(e) => setTipoProducto(e.target.value)}
          placeholder="Ej. Ceviche de pota"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
        />
        {fieldErrors.tipo_producto && (
          <p className="mt-1 text-sm text-red-600">{fieldErrors.tipo_producto}</p>
        )}
      </div>

      {submitError && <p className="text-sm text-red-600">{submitError}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-md bg-teal-700 px-4 py-2 font-medium text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {submitting ? 'Guardando...' : 'Registrar puesto'}
      </button>
    </form>
  );
}
