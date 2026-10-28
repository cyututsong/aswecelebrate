'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to handle form submission for email/password login
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const supabase = createClient();

      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

        if (error) {
        setErrorMessage(
            'Unable to sign in with the provided details. Please check your credentials and try again.'
        );
        return;
        }

      const nextParam = searchParams.get('next');
      const next =
        nextParam &&
        nextParam.startsWith('/') &&
        !nextParam.startsWith('//') &&
        !nextParam.startsWith('/\\')
          ? nextParam
          : '/dashboard';

      router.replace(next);
      router.refresh();
    } catch {
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  // Function to handle Google sign-in
  async function handleGoogleSignIn() {
    setErrorMessage('');
    setLoading(true);

    const nextParam = searchParams.get('next');
    const next =
      nextParam &&
      nextParam.startsWith('/') &&
      !nextParam.startsWith('//') &&
      !nextParam.startsWith('/\\')
        ? nextParam
        : '/dashboard';

    try {
      const supabase = createClient();

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
        },
      });

      if (error) {
        setErrorMessage('Unable to sign in with Google. Please try again.');
        setLoading(false);
      }
    } catch {
      setErrorMessage('Something went wrong. Please try again.');
      setLoading(false);
    }
  }


  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-5 py-12">
      <section className="w-full space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="text-sm text-gray-600">
            Log in to your AsWeCelebrate account.
          </p>
        </div>

        {searchParams.get('error') && (
          <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">
            Authentication failed. Please try logging in again.
          </p>
        )}

        {errorMessage && (
          <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">
            {errorMessage}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium">
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-gray-900 px-4 py-3 font-medium text-white disabled:opacity-60"
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>


        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-sm text-gray-500">or continue with</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 px-4 py-3 font-medium text-gray-800 hover:bg-gray-50 disabled:opacity-60"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 48 48"
              className="h-5 w-5"
            >
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" transform="translate(0 4)" />
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.76 7.18l7.73 6C44.42 37.9 46.98 31.8 46.98 24.55Z" />
              <path fill="#FBBC05" d="M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a23.9 23.9 0 0 0 0 21.56l7.98-6.19Z" transform="translate(0 4)" />
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.9-5.8l-7.73-6c-2.14 1.44-4.89 2.3-8.17 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z" />
            </svg>

            {loading ? 'Connecting to Google...' : 'Continue with Google'}
          </button>
        </div>

        <p className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-medium underline">
            Create an account
          </Link>
        </p>
      </section>
    </main>
  );
}
