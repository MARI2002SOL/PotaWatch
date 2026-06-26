import { Link } from 'react-router-dom';
import { LoginForm } from '../components/auth/LoginForm';
import { getHomePathByRole } from '../constants';
import { useAuth } from '../hooks/useAuth';

export function LoginPage() {
  const { session, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-8">
        <p className="text-slate-600">Cargando...</p>
      </div>
    );
  }

  if (session && profile) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-8">
        <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 text-center shadow-sm">
          <h1 className="text-xl font-semibold text-slate-900">Ya iniciaste sesión</h1>
          <p className="mt-2 text-sm text-slate-600">
            Hola, {profile.full_name || 'usuario'}. Tu sesión está activa.
          </p>
          <Link
            to={getHomePathByRole(profile.role)}
            className="mt-4 inline-block rounded-md bg-teal-700 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800"
          >
            Ir a mi panel
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-8">
      <LoginForm />
    </div>
  );
}
