import { type FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  getHomePathByRole,
  isValidEmail,
  isValidPassword,
  MIN_PASSWORD_LENGTH,
} from '../../constants';
import { supabase } from '../../lib/supabaseClient';
import { signUp } from '../../services/authService';
import { getProfile } from '../../services/profileService';

export function RegisterForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function validate(): boolean {
    const errors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      errors.email = 'El correo es obligatorio';
    } else if (!isValidEmail(email)) {
      errors.email = 'Ingresa un correo válido';
    }

    if (!password) {
      errors.password = 'La contraseña es obligatoria';
    } else if (!isValidPassword(password)) {
      errors.password = `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres`;
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      return;
    }

    setSubmitting(true);

    const { error, userId, needsEmailConfirmation } = await signUp(email.trim(), password);

    if (error) {
      setSubmitError(error);
      setSubmitting(false);
      return;
    }

    if (needsEmailConfirmation) {
      setSubmitError(
        'Cuenta creada. Confirma tu correo antes de iniciar sesión, o desactiva la confirmación por email en Supabase para desarrollo.',
      );
      setSubmitting(false);
      return;
    }

    let resolvedUserId = userId;

    if (!resolvedUserId) {
      const { data } = await supabase.auth.getSession();
      resolvedUserId = data.session?.user.id ?? null;
    }

    if (resolvedUserId) {
      const userProfile = await getProfile(resolvedUserId);
      navigate(getHomePathByRole(userProfile?.role ?? 'ciudadano'), { replace: true });
    } else {
      navigate('/', { replace: true });
    }

    setSubmitting(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-md space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Crear cuenta</h1>
        <p className="mt-1 text-sm text-slate-600">
          Regístrate para acceder a funcionalidades protegidas.
        </p>
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
          Correo electrónico
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
        />
        {fieldErrors.email && <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>}
      </div>

      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
        />
        {fieldErrors.password && (
          <p className="mt-1 text-sm text-red-600">{fieldErrors.password}</p>
        )}
      </div>

      {submitError && <p className="text-sm text-red-600">{submitError}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-md bg-teal-700 px-4 py-2 font-medium text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? 'Registrando...' : 'Registrarse'}
      </button>

      <p className="text-center text-sm text-slate-600">
        ¿Ya tienes cuenta?{' '}
        <Link to="/login" className="font-medium text-teal-700 hover:underline">
          Inicia sesión
        </Link>
      </p>
    </form>
  );
}
