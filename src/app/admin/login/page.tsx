import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { LoginForm } from "@/components/admin/LoginForm";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (!isSupabaseConfigured()) {
    return (
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-16">
        <h1 className="font-heading text-3xl">Admin is not connected</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY, then
          create an Auth user in the Supabase dashboard.
        </p>
      </main>
    );
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = (await supabase?.auth.getUser()) ?? { data: { user: null } };
  if (user) {
    redirect("/admin");
  }

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-16">
      <p className="text-sm font-medium uppercase tracking-widest text-brand">
        Catalog
      </p>
      <h1 className="mt-2 font-heading text-3xl tracking-tight">Admin sign in</h1>
      <p className="mt-3 mb-8 text-sm text-muted-foreground">
        Use the email and password from the Supabase Auth user.
      </p>
      <LoginForm />
    </main>
  );
}
