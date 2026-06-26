import { Link, Outlet } from 'react-router-dom';

export function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
          <Link to="/" className="text-lg font-semibold text-teal-800">
            PotaWatch
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link to="/login" className="text-slate-700 hover:text-teal-700">
              Iniciar sesión
            </Link>
            <Link
              to="/registro"
              className="rounded-md bg-teal-700 px-3 py-1.5 font-medium text-white hover:bg-teal-800"
            >
              Registrarse
            </Link>
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
