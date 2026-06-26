import { supabase } from '../lib/supabaseClient';
import { PUESTO_ERRORS } from '../constants';
import type { CreatePuestoInput, Puesto } from '../types';

export interface CreatePuestoResult {
  puesto: Puesto | null;
  error: string | null;
}

function isRlsError(message: string, code?: string): boolean {
  const normalized = message.toLowerCase();
  return (
    code === '42501' ||
    normalized.includes('row-level security') ||
    normalized.includes('permission denied') ||
    normalized.includes('violates row-level security')
  );
}

export async function createPuesto(
  vendedorId: string,
  input: CreatePuestoInput,
): Promise<CreatePuestoResult> {
  const { data, error } = await supabase
    .from('puestos')
    .insert({
      vendedor_id: vendedorId,
      nombre: input.nombre.trim(),
      distrito: input.distrito,
      direccion: input.direccion.trim(),
      latitud: input.latitud,
      longitud: input.longitud,
      tipo_producto: input.tipo_producto.trim(),
    })
    .select(
      'id, vendedor_id, nombre, distrito, direccion, latitud, longitud, tipo_producto, estado_sanitario, activo, created_at, updated_at',
    )
    .single();

  if (error) {
    if (isRlsError(error.message, error.code)) {
      return { puesto: null, error: PUESTO_ERRORS.noPermission };
    }
    return { puesto: null, error: error.message };
  }

  return { puesto: data as Puesto, error: null };
}

export async function listPuestosByVendedor(vendedorId: string): Promise<Puesto[]> {
  const { data, error } = await supabase
    .from('puestos')
    .select(
      'id, vendedor_id, nombre, distrito, direccion, latitud, longitud, tipo_producto, estado_sanitario, activo, created_at, updated_at',
    )
    .eq('vendedor_id', vendedorId)
    .eq('activo', true)
    .order('created_at', { ascending: false });

  if (error || !data) {
    return [];
  }

  return data as Puesto[];
}

export async function listPuestosActivos(): Promise<
  Pick<Puesto, 'id' | 'nombre' | 'distrito'>[]
> {
  const { data, error } = await supabase
    .from('puestos')
    .select('id, nombre, distrito')
    .eq('activo', true)
    .order('nombre');

  if (error || !data) {
    return [];
  }

  return data;
}
