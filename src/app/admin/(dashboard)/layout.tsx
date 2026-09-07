import type { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { signOutAdmin } from "@/app/admin/actions";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  if (!isSupabaseConfigured()) {
    redirect("/admin/login");
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = (await supabase?.auth.getUser()) ?? { data: { user: null } };

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="border-b border-border/80 bg-background">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-brand">
              Admin
            </p>
            <p className="font-heading text-lg tracking-wide">Catalog</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/admin"
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
            >
              All products
            </Link>
            <Link
              href="/admin/new"
              className={cn(buttonVariants({ size: "sm" }))}
            >
              Add product
            </Link>
            <Link
              href="/products"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              View site
            </Link>
            <form action={signOutAdmin}>
              <Button type="submit" variant="ghost" size="sm">
                Sign out
              </Button>
            </form>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
