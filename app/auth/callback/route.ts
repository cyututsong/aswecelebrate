
import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);

  const code = requestUrl.searchParams.get('code');
  const nextParam = requestUrl.searchParams.get('next');

  // Allow only safe, relative paths.
  const next =
    nextParam &&
    nextParam.startsWith('/') &&
    !nextParam.startsWith('//') &&
    !nextParam.startsWith('/\\')
      ? nextParam
      : '/dashboard';

  // Use the public host provided by the reverse proxy.
  const forwardedHost = request.headers.get('x-forwarded-host');
  const host = request.headers.get('host');

  const forwardedProto = request.headers.get('x-forwarded-proto');

  const allowedHosts = ['aswecelebrate.com', 'localhost:3000'];

  const publicHost = forwardedHost || host;

  const isAllowedHost =
    publicHost && allowedHosts.includes(publicHost);

  const protocol =
    forwardedProto === 'https' ? 'https' : 'http';

  const origin =
    isAllowedHost && publicHost
      ? `${protocol}://${publicHost}`
      : requestUrl.origin;

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