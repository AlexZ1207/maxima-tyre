const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

const SOURCE = path.join(__dirname, "..", "data", "catalogo-maxima-tyre.xlsx");
const OUTPUT = path.join(__dirname, "..", "src", "data", "catalog.json");

function parseNumber(value) {
  if (value === null || value === undefined || value === "") {
    return null;
  }
  const n = Number(String(value).replace(",", ".").trim());
  return Number.isFinite(n) ? n : null;
}

function classify(title) {
  const t = title.toUpperCase();
  if (t.includes("CAUCHO")) {
    return "tire";
  }
  if (t.includes("TRIPA")) {
    return "tube";
  }
  return "accessory";
}

function parseTitle(raw) {
  const lines = String(raw)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const name = lines[0] || "Producto Maxima";
  const sku = lines.slice(1).join(" ") || name;
  const construction = /\bTL\b/i.test(name) ? "TL" : /\bTT\b/i.test(name) ? "TT" : "";
  let size = "";
  const sizeMatch = name.match(
    /(\d+\s*\/\s*\d+\s*-\s*\d+|\d+\.\d+\s*-\s*\d+|\d+\s*-\s*\d+|\d+H\d+)/i
  );
  if (sizeMatch) {
    size = sizeMatch[1].replace(/\s+/g, " ").trim();
  }
  return { name, sku, construction, size };
}

function main() {
  if (!fs.existsSync(SOURCE)) {
    throw new Error(`Missing catalog file: ${SOURCE}`);
  }

  const workbook = XLSX.readFile(SOURCE);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet, {
    header: 1,
    defval: "",
    raw: false,
  });

  const address = String(rows[1]?.[0] || "").trim();
  const phoneCell = String(rows[2]?.[0] || "");
  const phone = phoneCell.replace(/TELEFONO:\s*/i, "").trim();

  const headerIndex = rows.findIndex((row) =>
    row.some((cell) => String(cell).toUpperCase().includes("DESCRIPCION"))
  );
  if (headerIndex < 0) {
    throw new Error("Could not find DESCRIPCION header row in Excel.");
  }

  const items = [];
  for (let i = headerIndex + 1; i < rows.length; i += 1) {
    const row = rows[i];
    const description = String(row[2] || "").trim();
    if (!description) {
      continue;
    }
    const parsed = parseTitle(description);
    const category = classify(parsed.name);
    if (category !== "tire") {
      continue;
    }
    items.push({
      id: `row-${i}-${parsed.sku}`.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      sku: parsed.sku,
      name: parsed.name,
      size: parsed.size,
      construction: parsed.construction,
      category,
      fitment: String(row[3] || "").replace(/\s+/g, " ").trim(),
      priceMayorBs: parseNumber(row[4]),
      priceGranMayorUsd: parseNumber(row[5]),
      isPublished: true,
    });
  }

  const catalog = {
    source: "data/catalogo-maxima-tyre.xlsx",
    importedAt: new Date().toISOString(),
    address,
    phone,
    items,
  };

  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, `${JSON.stringify(catalog, null, 2)}\n`, "utf8");
  console.log(`Imported ${items.length} products from ${path.basename(SOURCE)}`);
}

main();
