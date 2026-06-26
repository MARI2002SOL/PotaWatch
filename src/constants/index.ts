import type { UserRole } from '../types';

export const ROLES: UserRole[] = ['ciudadano', 'vendedor', 'inspector', 'admin'];

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
