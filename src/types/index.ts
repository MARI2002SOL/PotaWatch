export type UserRole = 'ciudadano' | 'vendedor' | 'inspector' | 'admin';

export type EstadoSanitario = 'sin_verificar' | 'verificado' | 'observado' | 'suspendido';

export interface Profile {
  id: string;
  role: UserRole;
  full_name: string;
  created_at: string;
}

export interface Puesto {
  id: string;
  vendedor_id: string;
  nombre: string;
  distrito: string;
  direccion: string;
  latitud: number;
  longitud: number;
  tipo_producto: string;
  estado_sanitario: EstadoSanitario;
  activo: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreatePuestoInput {
  nombre: string;
  distrito: string;
  direccion: string;
  latitud: number;
  longitud: number;
  tipo_producto: string;
}

export type TipoProblema =
  | 'ingrediente_incorrecto'
  | 'condiciones_insalubres'
  | 'sin_licencia'
  | 'otro';

export type EstadoReporte = 'pendiente' | 'en_revision' | 'resuelto' | 'rechazado' | 'cancelado';

export interface Reporte {
  id: string;
  puesto_id: string;
  ciudadano_id: string;
  tipo_problema: TipoProblema;
  descripcion: string;
  estado: EstadoReporte;
  comentario_inspector: string | null;
  inspector_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateReporteInput {
  puesto_id: string;
  tipo_problema: TipoProblema;
  descripcion: string;
}

export type PuestoOption = Pick<Puesto, 'id' | 'nombre' | 'distrito'>;