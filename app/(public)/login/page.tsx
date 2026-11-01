import { Suspense } from 'react';
import LoginForm from './LoginForm';

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto flex min-h-screen max-w-md items-center px-5 py-12">
          <p className="text-sm text-gray-500">Loading login...</p>
        </main>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
