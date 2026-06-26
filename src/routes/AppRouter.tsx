import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { RegistrarPuestoPage } from '../pages/RegistrarPuestoPage';
import { CrearReportePage } from '../pages/CrearReportePage';
import { ProtectedRoute } from './ProtectedRoute';
import { RoleRoute } from './RoleRoute';

function VendedorHome() {
  return <RegistrarPuestoPage />;
}

function InspectorHome() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-semibold text-slate-900">Panel — Inspector</h1>
      <p className="mt-2 text-slate-600">Área protegida para inspectores.</p>
    </div>
  );
}

function AdminHome() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-semibold text-slate-900">Panel — Admin</h1>
      <p className="mt-2 text-slate-600">Área protegida para administradores.</p>
    </div>
  );
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="registro" element={<RegisterPage />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<RoleRoute allowedRoles={['ciudadano', 'vendedor']} />}>
              <Route path="reportes/nuevo" element={<CrearReportePage />} />
            </Route>
            <Route element={<RoleRoute allowedRoles={['vendedor']} fallbackPath="/" />}>
              <Route path="vendedor" element={<VendedorHome />} />
            </Route>
            <Route element={<RoleRoute allowedRoles={['inspector', 'admin']} />}>
              <Route path="inspector" element={<InspectorHome />} />
            </Route>
            <Route element={<RoleRoute allowedRoles={['admin']} />}>
              <Route path="admin" element={<AdminHome />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
