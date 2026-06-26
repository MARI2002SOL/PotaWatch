import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { getHomePathByRole, ROLE_LABELS } from '../../constants';
import { useAuth } from '../../hooks/useAuth';
import type { UserRole } from '../../types';

function canSendReporte(role: UserRole): boolean {
  return role === 'ciudadano' || role === 'vendedor';
}

function getPanelLabel(role: UserRole): string {
  switch (role) {
    case 'vendedor':
      return 'Mi puesto';
    case 'inspector':
      return 'Panel inspector';
    case 'admin':
      return 'Panel admin';
    default:
      return 'Mi cuenta';
  }
}

export function AppLayout() {
  const navigate = useNavigate();
  const { session, profile, loading, signOut } = useAuth();
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    setSigningOut(true);
    await signOut();
    navigate('/', { replace: true });
    setSigningOut(false);
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="sticky top-0 z-10 border-b border-teal-900/10 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4">
          <Link to="/" className="group flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-700 text-lg font-bold text-white shadow-sm">
              P
            </span>
            <div className="leading-tight">
              <span className="block text-base font-bold text-teal-900 group-hover:text-teal-700">
                PotaWatch
              </span>
              <span className="hidden text-xs text-slate-500 sm:block">
                Trazabilidad sanitaria
              </span>
            </div>
          </Link>

          <nav className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/buscar"
              className="rounded-md px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 hover:text-teal-800"
            >
              Buscar puestos
            </Link>
            
            <Link
              to="/"
              className="hidden rounded-md px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 hover:text-teal-800 sm:inline-block"
            >
              Inicio
            </Link>

            {loading ? (
              <span className="text-sm text-slate-400">...</span>
            ) : session && profile ? (
              <>
                {canSendReporte(profile.role) && (
                  <Link
                    to="/reportes/nuevo"
                    className="rounded-md bg-teal-700 px-3 py-1.5 text-sm font-medium text-white hover:bg-teal-800"
                  >
                    Enviar reporte
                  </Link>
                )}
                {!canSendReporte(profile.role) && (
                  <Link
                    to={getHomePathByRole(profile.role)}
                    className="rounded-md px-3 py-1.5 text-sm font-medium text-teal-800 hover:bg-teal-50"
                  >
                    {getPanelLabel(profile.role)}
                  </Link>
                )}
                <div className="hidden items-center gap-2 border-l border-slate-200 pl-3 sm:flex">