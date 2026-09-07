const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

function loadEnvFile(file) {
  if (!fs.existsSync(file)) {
    return;
  }
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }
    const eq = trimmed.indexOf("=");
    if (eq === -1) {
      continue;
    }
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(path.join(__dirname, "..", ".env.local"));
loadEnvFile(path.join(__dirname, "..", ".env"));

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    console.error(
      "Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local"
    );
    process.exit(1);
  }

  const supabase = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: buckets, error: listError } =
    await supabase.storage.listBuckets();
  if (listError) {
    console.error(listError.message);
    process.exit(1);
  }

  const exists = (buckets ?? []).some(
    (bucket) => bucket.name === "product-photos"
  );
  if (!exists) {
    const { error } = await supabase.storage.createBucket("product-photos", {
      public: true,
      fileSizeLimit: "5242880",
      allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
    });
    if (error) {
      console.error(error.message);
      process.exit(1);
    }
    console.log("Created public bucket product-photos");
  } else {
    console.log("Bucket product-photos already exists");
  }

  const { error: columnError } = await supabase
    .from("products")
    .select("image_url")
    .limit(1);
  if (columnError) {
    console.error(
      "Run supabase/add-image-url.sql in the SQL editor, then try again."
    );
    console.error(columnError.message);
    process.exit(1);
  }

  console.log("products.image_url is ready");
}

main();
