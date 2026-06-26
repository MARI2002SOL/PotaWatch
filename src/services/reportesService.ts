import { supabase } from '../lib/supabaseClient';
import { MAX_REPORTES_ACTIVOS, REPORTE_ERRORS } from '../constants';
import type { CreateReporteInput } from '../types';

export interface CreateReporteResult {
  error: string | null;
  success: boolean;
}

export async function countReportesActivos(
  ciudadanoId: string,
  puestoId: string,
): Promise<number> {
  const { data, error } = await supabase.rpc('count_reportes_activos', {
    p_ciudadano_id: ciudadanoId,
    p_puesto_id: puestoId,
  });

  if (error || data === null) {
    return 0;
  }

  return data as number;
}

export async function createReporte(
  ciudadanoId: string,
  input: CreateReporteInput,
): Promise<CreateReporteResult> {
  const activos = await countReportesActivos(ciudadanoId, input.puesto_id);

  if (activos >= MAX_REPORTES_ACTIVOS) {
    return { error: REPORTE_ERRORS.maxActivos, success: false };
  }

  const { error } = await supabase.from('reportes').insert({
    puesto_id: input.puesto_id,
    ciudadano_id: ciudadanoId,
    tipo_problema: input.tipo_problema,
    descripcion: input.descripcion.trim(),
  });

  if (error) {
    return { error: error.message, success: false };
  }

  return { error: null, success: true };
}
