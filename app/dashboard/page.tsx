import LogoutButton from '@/components/auth/logout-button';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export default async function DashboardPage() {
  const supabase = await createClient();

  // Verify the user's session on the server.
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect('/login?next=/dashboard');
  }

  // Load the user's profile.
  const { data: profile } = await supabase
    .from('profiles')
    .select('display_name, avatar_url')
    .eq('id', user.id)
    .maybeSingle();

  // Load the role assigned by the database.
  const { data: roleRecord, error: roleError } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)
    .maybeSingle();

  if (roleError || !roleRecord) {
    console.error('Could not load user role:', roleError?.message);
  }

  const displayName =
    profile?.display_name?.trim() || user.email || 'Vendor';

  const role = roleRecord?.role ?? 'Role not available';

  return (
    <main className="min-h-screen bg-gray-50 px-5 py-10">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
            <p className="text-sm text-gray-500">AsWeCelebrate</p>
            <h1 className="mt-1 text-3xl font-bold text-gray-900">
            Vendor Dashboard
            </h1>
        </div>

        <div className="flex items-center gap-3">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium capitalize text-blue-800">
            {role}
            </span>

            <LogoutButton />
        </div>
        </header>

        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">
            Welcome, {displayName}!
          </h2>
          <p className="mt-2 text-gray-600">
            Manage your wedding and event business listing from here.
          </p>
          <p className="mt-3 break-all text-sm text-gray-500">
            Signed in as: {user.email}
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="font-semibold">My Business Listing</h2>
            <p className="mt-2 text-sm text-gray-600">
              Create and manage your vendor profile.
            </p>
            <p className="mt-4 text-sm text-gray-500">
              Coming soon
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="font-semibold">Listing Status</h2>
            <p className="mt-2 text-sm text-gray-600">
              Track your listing's review and publishing status.
            </p>
            <p className="mt-4 text-sm text-gray-500">
              No listing data yet
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="font-semibold">Account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Account email and profile settings.
            </p>
            <p className="mt-4 break-all text-sm text-gray-500">
              {user.email}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}