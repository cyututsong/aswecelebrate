
import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get('code');
  const nextParam = searchParams.get('next');

  // Allow only safe, relative paths.
  const next =
    nextParam &&
    nextParam.startsWith('/') &&
    !nextParam.startsWith('//') &&
    !nextParam.startsWith('/\\')
      ? nextParam
      : '/dashboard';

  if (!code) {
    return NextResponse.redirect(
      new URL('/login?error=missing_code', origin)
    );
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error('Auth callback failed:', error.message);

    return NextResponse.redirect(
      new URL('/login?error=auth_callback_failed', origin)
    );
  }

  return NextResponse.redirect(new URL(next, origin));
}
