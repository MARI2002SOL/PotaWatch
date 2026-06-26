import { Link } from 'react-router-dom';
import { getHomePathByRole } from '../constants';
import { useAuth } from '../hooks/useAuth';

const MODULES = [
  {
    title: 'Consulta pública',
    description:
      'Cualquier persona puede buscar puestos y ver su estado sanitario antes de consumir.',
    icon: '🔍',
  },
  {
    title: 'Registro de puestos',
    description: 'Los vendedores registran su puesto ambulante con ubicación y tipo de producto.',
    icon: '🏪',
  },
  {
    title: 'Reporte ciudadano',
    description:
      'Ciudadanos registrados alertan sobre incidentes sanitarios o irregularidades en un puesto.',
    icon: '📢',
  },
  {
    title: 'Panel de inspección',
    description:
      'Inspectores municipales gestionan reportes, visitan puestos y publican el estado sanitario.',
    icon: '📋',
  },
];

export function HomePage() {
  const { session, profile, loading } = useAuth();

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-800 via-teal-700 to-cyan-800 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40" />
        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:py-24">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-teal-200">
            Trazabilidad sanitaria · Lima
          </p>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">
            Compra ceviche de pota con información clara y verificable
          </h1>
          <p className="mt-5 max-w-xl text-lg text-teal-100">
            PotaWatch centraliza el registro de puestos ambulantes, permite reportes ciudadanos y
            publica el estado sanitario verificado por inspectores municipales.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {!loading && session && profile ? (
              <>
                {(profile.role === 'ciudadano' || profile.role === 'vendedor') && (
                  <Link
                    to="/reportes/nuevo"
                    className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-teal-800 shadow hover:bg-teal-50"
                  >
                    Enviar reporte
                  </Link>
                )}
                {profile.role === 'vendedor' && (
                  <Link
                    to="/vendedor"
                    className="rounded-lg border border-white/40 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
                  >
                    Mi puesto
                  </Link>
                )}
                {(profile.role === 'inspector' || profile.role === 'admin') && (
                  <Link
                    to={getHomePathByRole(profile.role)}
                    className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-teal-800 shadow hover:bg-teal-50"
                  >
                    Ir a mi panel
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link
                  to="/registro"
                  className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-teal-800 shadow hover:bg-teal-50"
                >
                  Crear cuenta
                </Link>
                <Link
                  to="/login"
                  className="rounded-lg border border-white/40 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Iniciar sesión
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-amber-900">El problema</h2>
          <p className="mt-2 text-amber-800/90 leading-relaxed">
            Los puestos ambulantes de ceviche de pota en Lima operan con frecuencia sin control
            sanitario, sin cadena de frío garantizada y a veces sin licencia. Existen casos de
            sustitución de ingredientes y no hay un mecanismo público de trazabilidad sobre su
            estado sanitario o legal.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-bold text-slate-900">Módulos del sistema</h2>
          <p className="mt-2 text-slate-600">
            Cuatro piezas que conectan a ciudadanos, vendedores e inspectores en una sola plataforma.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {MODULES.map((mod) => (
              <article
                key={mod.title}
                className="rounded-xl border border-slate-200 bg-slate-50 p-5 transition hover:border-teal-200 hover:shadow-sm"
              >
                <span className="text-2xl" aria-hidden="true">
                  {mod.icon}
                </span>
                <h3 className="mt-3 font-semibold text-slate-900">{mod.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{mod.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14">
        <h2 className="text-2xl font-bold text-slate-900">¿Quién usa PotaWatch?</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { role: 'Visitante', desc: 'Consulta el estado sanitario de cualquier puesto.' },
            { role: 'Ciudadano', desc: 'Reporta incidentes sobre puestos registrados.' },
            { role: 'Vendedor', desc: 'Registra y da visibilidad a su puesto en el sistema.' },
            { role: 'Inspector', desc: 'Gestiona reportes y actualiza el estado sanitario.' },
          ].map((item) => (
            <div
              key={item.role}
              className="rounded-lg border-l-4 border-teal-600 bg-white p-4 shadow-sm"
            >
              <p className="font-semibold text-teal-800">{item.role}</p>
              <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
