"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function getNextUrl() {
    const nextParam = searchParams.get("next");

    return nextParam &&
      nextParam.startsWith("/") &&
      !nextParam.startsWith("//") &&
      !nextParam.startsWith("/\\")
      ? nextParam
      : "/dashboard";
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const supabase = createClient();

      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setErrorMessage(
          "Unable to sign in with the provided details. Please check your credentials and try again.",
        );
        return;
      }

      router.replace(getNextUrl());
      router.refresh();
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setErrorMessage("");
    setLoading(true);

    try {
      const supabase = createClient();

      const redirectUrl = `${window.location.origin}/auth/callback?next=${encodeURIComponent(getNextUrl())}`;

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl,
        },
      });

      if (error) {
        setErrorMessage("Unable to sign in with Google. Please try again.");
        setLoading(false);
      }
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f3eee3] px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-[28px] bg-white shadow-[0_20px_70px_rgba(17,17,17,0.08)] lg:min-h-[680px] lg:grid-cols-2">
        {/* LEFT BRAND PANEL */}
        <section className="relative flex min-h-[350px] flex-col justify-between overflow-hidden bg-[#f3eee3] p-8 sm:p-12 lg:min-h-[680px] lg:p-14">
          {/* Decorative elements */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-[#d9541e]/15" />
          <div className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full border border-[#d9541e]/15" />
          <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#d9541e]/[0.04] blur-2xl" />

          {/* Brand */}
          <div className="relative z-10">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111111] text-lg text-white">
                <span className="font-heading">A</span>
              </span>

              <span className="font-heading text-xl font-bold tracking-tight text-[#111111]">
                AsWeCelebrate
              </span>
            </Link>
          </div>

          {/* Main message */}
          <div className="relative z-10 my-12 max-w-md">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#d9541e]">
              Make every moment special
            </p>

            <h1 className="font-heading text-4xl font-semibold leading-[1.2] tracking-tight text-[#111111] sm:text-5xl lg:text-[52px]">
              Your perfect day starts with the{" "}
              <span className="font-accent font-normal text-[#d9541e]">
                right people.
              </span>
            </h1>

            <p className="mt-6 max-w-sm text-base leading-7 text-[#66615a]">
              Discover wedding venues and talented vendors who can help bring
              your celebration to life.
            </p>
          </div>

          {/* Bottom message */}
          <div className="relative z-10">
            <div className="mb-5 h-px w-full bg-[#111111]/10" />

            <p className="font-accent text-lg text-[#d9541e]">
              Made for moments that matter.
            </p>

            <p className="mt-2 text-xs text-[#777168]">
              Your celebration. Your story. Your people.
            </p>
          </div>
        </section>

        {/* RIGHT LOGIN PANEL */}
        <section className="flex items-center justify-center bg-white px-7 py-12 sm:px-12 lg:px-16">
          <div className="w-full max-w-md">
            <div className="mb-9">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#d9541e]">
                Welcome back
              </p>

              <h2 className="font-heading text-3xl font-semibold tracking-tight text-[#111111] sm:text-4xl">
                Sign in to your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#777777]">
                Continue planning your celebration with AsWeCelebrate.
              </p>
            </div>

            {/* Error messages */}
            {searchParams.get("error") && (
              <div
                role="alert"
                className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
              >
                Authentication failed. Please try logging in again.
              </div>
            )}

            {errorMessage && (
              <div
                role="alert"
                className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
              >
                {errorMessage}
              </div>
            )}

            {/* Login form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-[#111111]"
                >
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your email address"
                  className="w-full rounded-lg border border-[#e5dfd3] bg-white px-4 py-3 text-sm text-[#111111] outline-none transition placeholder:text-[#aaa49b] focus:border-[#d9541e] focus:ring-2 focus:ring-[#d9541e]/10"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-[#111111]"
                  >
                    Password
                  </label>
                </div>

                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-[#e5dfd3] bg-white px-4 py-3 text-sm text-[#111111] outline-none transition placeholder:text-[#aaa49b] focus:border-[#d9541e] focus:ring-2 focus:ring-[#d9541e]/10"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-[#d9541e] px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#bd4619] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            {/* Divider */}
            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#e9e5de]" />
              <span className="text-xs text-[#999999]">OR CONTINUE WITH</span>
              <div className="h-px flex-1 bg-[#e9e5de]" />
            </div>

            {/* Google sign-in */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="flex w-full items-center justify-center gap-3 rounded-lg border border-[#e5dfd3] bg-white px-5 py-3 text-sm font-semibold text-[#333333] transition hover:bg-[#faf8f3] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <svg aria-hidden="true" viewBox="0 0 48 48" className="h-5 w-5">
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
                  transform="translate(0 4)"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.76 7.18l7.73 6C44.42 37.9 46.98 31.8 46.98 24.55Z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a23.9 23.9 0 0 0 0 21.56l7.98-6.19Z"
                  transform="translate(0 4)"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.9-5.8l-7.73-6c-2.14 1.44-4.89 2.3-8.17 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
                />
              </svg>

              {loading ? "Connecting to Google..." : "Continue with Google"}
            </button>

            {/* Register link */}
            <p className="mt-8 text-center text-sm text-[#777777]">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-bold text-[#d9541e] transition hover:text-[#bd4619]"
              >
                Create an account
              </Link>
            </p>

            <p className="mt-10 text-center text-xs text-[#aaa49b]">
              © {new Date().getFullYear()} AsWeCelebrate. All rights reserved.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
