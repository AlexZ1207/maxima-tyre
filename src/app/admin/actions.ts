"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { CatalogCategory } from "@/types/catalog";

const categories: CatalogCategory[] = ["tire", "tube", "accessory"];

function requireString(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function parsePrice(formData: FormData, key: string): number | null {
  const raw = String(formData.get(key) ?? "").trim().replace(",", ".");
  if (!raw) {
    return null;
  }
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
}

function parseCategory(value: string): CatalogCategory {
  if (categories.includes(value as CatalogCategory)) {
    return value as CatalogCategory;
  }
  return "tire";
}

function productIdFromSku(sku: string): string {
  const slug =
    sku
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "item";
  return `${slug}-${crypto.randomUUID().slice(0, 8)}`;
}

async function requireAdminClient() {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    throw new Error("Supabase is not configured");
  }
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/admin/login");
  }
  return supabase;
}

async function uploadPhoto(
  supabase: NonNullable<Awaited<ReturnType<typeof createServerSupabaseClient>>>,
  productId: string,
  formData: FormData
): Promise<string | undefined> {
  const photo = formData.get("photo");
  if (!(photo instanceof File) || photo.size === 0) {
    const url = requireString(formData, "imageUrl");
    return url || undefined;
  }

  const allowed = new Set([
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
  ]);
  if (!allowed.has(photo.type)) {
    throw new Error("Photo must be a JPG, PNG, WebP, or GIF");
  }
  if (photo.size > 5 * 1024 * 1024) {
    throw new Error("Photo must be 5 MB or smaller");
  }

  const ext = photo.type.split("/")[1]?.replace("jpeg", "jpg") ?? "jpg";
  const path = `${productId}.${ext}`;
  const { error } = await supabase.storage
    .from("product-photos")
    .upload(path, photo, { upsert: true, contentType: photo.type });
  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabase.storage.from("product-photos").getPublicUrl(path);
  return data.publicUrl;
}

function rowFromForm(formData: FormData, imageUrl?: string) {
  return {
    sku: requireString(formData, "sku"),
    name: requireString(formData, "name"),
    size: requireString(formData, "size"),
    construction: requireString(formData, "construction"),
    category: parseCategory(requireString(formData, "category")),
    fitment: requireString(formData, "fitment"),
    price_mayor_bs: parsePrice(formData, "priceMayorBs"),
    price_gran_mayor_usd: parsePrice(formData, "priceGranMayorUsd"),
    is_published: formData.get("isPublished") === "on",
    ...(imageUrl !== undefined ? { image_url: imageUrl || null } : {}),
  };
}

function revalidateCatalog() {
  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin");
}

export async function createProduct(formData: FormData) {
  const supabase = await requireAdminClient();
  const sku = requireString(formData, "sku");
  const name = requireString(formData, "name");
  if (!sku || !name) {
    throw new Error("SKU and name are required");
  }

  const id = productIdFromSku(sku);
  const imageUrl = await uploadPhoto(supabase, id, formData);
  const { error } = await supabase.from("products").insert({
    id,
    ...rowFromForm(formData, imageUrl ?? ""),
  });
  if (error) {
    throw new Error(error.message);
  }

  revalidateCatalog();
  revalidatePath(`/admin/${id}`);
  redirect("/admin");
}

export async function updateProduct(id: string, formData: FormData) {
  const supabase = await requireAdminClient();
  const sku = requireString(formData, "sku");
  const name = requireString(formData, "name");
  if (!sku || !name) {
    throw new Error("SKU and name are required");
  }

  const imageUrl = await uploadPhoto(supabase, id, formData);
  const { error } = await supabase
    .from("products")
    .update(rowFromForm(formData, imageUrl))
    .eq("id", id);
  if (error) {
    throw new Error(error.message);
  }

  revalidateCatalog();
  revalidatePath(`/admin/${id}`);
  redirect("/admin");
}

export async function setProductPublished(id: string, isPublished: boolean) {
  const supabase = await requireAdminClient();
  const { error } = await supabase
    .from("products")
    .update({ is_published: isPublished })
    .eq("id", id);
  if (error) {
    throw new Error(error.message);
  }

  revalidateCatalog();
  revalidatePath(`/admin/${id}`);
}

export async function signOutAdmin() {
  const supabase = await createServerSupabaseClient();
  if (supabase) {
    await supabase.auth.signOut();
  }
  redirect("/admin/login");
}
