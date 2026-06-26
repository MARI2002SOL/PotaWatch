import { LoginForm } from '../components/auth/LoginForm';

export function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-8">
      <LoginForm />
    </div>
  );
}
