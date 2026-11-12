import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AuditTestClient from "./audit-test-client";

export const dynamic = "force-dynamic";

export default async function AdminAuditTestPage() {
  const supabase = await createClient();

  // Verify authenticated user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login?next=/dashboard/admin-audit-test");
  }

  // Verify admin permission through the database function
  const { data: isAdmin, error: adminError } = await supabase.rpc("is_admin");

  if (adminError || !isAdmin) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-gray-50 px-5 py-10">
      <div className="mx-auto max-w-3xl space-y-6">
        <header>
          <p className="text-sm text-gray-500">AsWeCelebrate / Admin</p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Vendor Audit Test
          </h1>

          <p className="mt-2 text-gray-600">
            Temporary testing page for vendor status changes and audit history.
          </p>
        </header>

        <AuditTestClient userId={user.id} />
      </div>
    </main>
  );
}
