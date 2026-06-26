import type { UserRole } from '../types';

export const ROLES: UserRole[] = ['ciudadano', 'vendedor', 'inspector', 'admin'];

export const ROLE_LABELS: Record<UserRole, string> = {
  ciudadano: 'Ciudadano',
  vendedor: 'Vendedor',
  inspector: 'Inspector',
  admin: 'Administrador',
};

export const MIN_PASSWORD_LENGTH = 8;

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const AUTH_ERRORS = {
  emailAlreadyRegistered: 'Este correo ya está registrado',
  invalidCredentials: 'Correo o contraseña incorrectos',
  emailNotConfirmed:
    'Debes confirmar tu correo antes de iniciar sesión. Revisa tu bandeja de entrada.',
  emailRateLimit:
    'Se enviaron demasiados correos. Espera unos minutos e intenta de nuevo, o confirma tu usuario desde el panel de Supabase.',
} as const;

export function getHomePathByRole(role: UserRole): string {
  switch (role) {
    case 'vendedor':
      return '/vendedor';
    case 'inspector':
      return '/inspector';
    case 'admin':
      return '/admin';
    case 'ciudadano':
    default:
      return '/';
  }
}

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

export function isValidPassword(password: string): boolean {
  return password.length >= MIN_PASSWORD_LENGTH;
}

export const LAT_MIN = -90;
export const LAT_MAX = 90;
export const LNG_MIN = -180;
export const LNG_MAX = 180;

export const PUESTO_ERRORS = {
  noPermission: 'No tienes permisos para registrar un puesto',
} as const;

export const DISTRITOS_LIMA = [
  'Lima',
  'Miraflores',
  'San Isidro',
  'Surco',
  'La Molina',
  'Barranco',
  'San Borja',
  'Magdalena',
  'Pueblo Libre',
  'Jesús María',
  'Lince',
  'Breña',
  'Rímac',
  'Cercado de Lima',
  'San Miguel',
  'Callao',
  'Ventanilla',
  'Los Olivos',
  'San Martín de Porres',
  'Independencia',
  'Comas',
  'Carabayllo',
  'Puente Piedra',
  'Ate',
  'El Agustino',
  'San Juan de Lurigancho',
  'Santa Anita',
  'La Victoria',
  'Surquillo',
  'Chorrillos',
  'Villa El Salvador',
  'Villa María del Triunfo',
  'San Juan de Miraflores',
] as const;

export function isValidLatitud(value: number): boolean {
  return !Number.isNaN(value) && value >= LAT_MIN && value <= LAT_MAX;
}

export function isValidLongitud(value: number): boolean {
  return !Number.isNaN(value) && value >= LNG_MIN && value <= LNG_MAX;
}

export const ESTADO_SANITARIO_LABELS: Record<string, string> = {
  sin_verificar: 'Sin verificar',
  verificado: 'Verificado',
  observado: 'Observado',
  suspendido: 'Suspendido',
};

export const MIN_DESCRIPCION_LENGTH = 20;
export const MAX_REPORTES_ACTIVOS = 3;

export const TIPOS_PROBLEMA = [
  'ingrediente_incorrecto',
  'condiciones_insalubres',
  'sin_licencia',
  'otro',
] as const;

export const TIPO_PROBLEMA_LABELS: Record<(typeof TIPOS_PROBLEMA)[number], string> = {
  ingrediente_incorrecto: 'Ingrediente incorrecto',
  condiciones_insalubres: 'Condiciones insalubres',
  sin_licencia: 'Sin licencia',
  otro: 'Otro',
};

export const REPORTE_ERRORS = {
  maxActivos: 'Ya tienes 3 reportes activos sobre este puesto',
  success: 'Tu reporte fue enviado correctamente',
} as const;

export function isValidDescripcion(descripcion: string): boolean {
  return descripcion.trim().length >= MIN_DESCRIPCION_LENGTH;
}