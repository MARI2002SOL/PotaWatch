import { supabase } from '../lib/supabaseClient';
import { AUTH_ERRORS } from '../constants';

export interface SignUpResult {
  error: string | null;
  userId: string | null;
  needsEmailConfirmation: boolean;
}

export interface SignInResult {
  error: string | null;
}

function isEmailAlreadyRegistered(message: string): boolean {
  const normalized = message.toLowerCase();
  return (
    normalized.includes('already registered') ||
    normalized.includes('already been registered') ||
    normalized.includes('user already exists')
  );
}

function isEmailRateLimited(message: string): boolean {
  const normalized = message.toLowerCase();
  return normalized.includes('rate limit') || normalized.includes('too many requests');
}

function isEmailNotConfirmed(message: string): boolean {
  const normalized = message.toLowerCase();
  return normalized.includes('email not confirmed');
}

export async function signUp(email: string, password: string): Promise<SignUpResult> {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (!error) {
    return {
      error: null,
      userId: data.user?.id ?? null,
      needsEmailConfirmation: !data.session,
    };
  }

  if (isEmailAlreadyRegistered(error.message)) {
    return { error: AUTH_ERRORS.emailAlreadyRegistered, userId: null, needsEmailConfirmation: false };
  }

  if (isEmailRateLimited(error.message)) {
    return { error: AUTH_ERRORS.emailRateLimit, userId: null, needsEmailConfirmation: false };
  }

  return { error: error.message, userId: null, needsEmailConfirmation: false };
}

export async function signIn(email: string, password: string): Promise<SignInResult> {
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (!error) {
    return { error: null };
  }

  if (isEmailNotConfirmed(error.message)) {
    return { error: AUTH_ERRORS.emailNotConfirmed };
  }

  if (isEmailRateLimited(error.message)) {
    return { error: AUTH_ERRORS.emailRateLimit };
  }

  return { error: AUTH_ERRORS.invalidCredentials };
}
