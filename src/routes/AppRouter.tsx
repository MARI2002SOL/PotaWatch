import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { ProtectedRoute } from './ProtectedRoute';
import { RoleRoute } from './RoleRoute';

function CiudadanoHome() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-semibold text-slate-900">Inicio — Ciudadano</h1>
      <p className="mt-2 text-slate-600">Bienvenido a PotaWatch.</p>
    </div>
  );
}

function VendedorHome() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-semibold text-slate-900">Panel — Vendedor</h1>
      <p className="mt-2 text-slate-600">Área protegida para vendedores.</p>
    </div>
  );
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
        <Route element={<AppLayout />}>
          <Route index element={<CiudadanoHome />} />
          <Route path="registro" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<RoleRoute allowedRoles={['vendedor']} />}>
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
