import { Navigate, Outlet } from 'react-router-dom';
import type { UserRole } from '../types';
import { getHomePathByRole } from '../constants';
import { useAuth } from '../hooks/useAuth';

interface RoleRouteProps {
  allowedRoles: UserRole[];
  fallbackPath?: string;
}

export function RoleRoute({ allowedRoles, fallbackPath }: RoleRouteProps) {
  const { profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-600">
        Cargando...
      </div>
    );
  }

  if (!profile) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(profile.role)) {
    return <Navigate to={fallbackPath ?? getHomePathByRole(profile.role)} replace />;
  }

  return <Outlet />;
}
