const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const SOURCE =
  process.env.CATALOG_XLSX ||
  path.join(
    process.env.USERPROFILE || "",
    "Documents",
    "xwechat_files",
    "wxid_gh8n605zctkg12_1283",
    "msg",
    "file",
    "2026-08",
    "CATALOGO MAXIMA TYRE CAUCHOS (1) (1) 28082026.xlsx"
  );
const FALLBACK = path.join(__dirname, "..", "data", "catalogo-maxima-tyre.xlsx");
const CATALOG_JSON = path.join(__dirname, "..", "src", "data", "catalog.json");
const PUBLIC_DIR = path.join(__dirname, "..", "public", "catalog");
const TMP = path.join(__dirname, "..", "tmp-xlsx");

function readXml(file) {
  return fs.readFileSync(file, "utf8");
}

function parseRels(xml) {
  const map = new Map();
  const re =
    /Id="(rId\d+)"[^>]*Target="([^"]+)"|Target="([^"]+)"[^>]*Id="(rId\d+)"/g;
  let match;
  while ((match = re.exec(xml))) {
    const id = match[1] || match[4];
    const target = match[2] || match[3];
    map.set(id, target.replace(/^\.\.\//, ""));
  }
  return map;
}

function parseAnchors(xml) {
  const anchors = [];
  const blocks = xml.split(/<xdr:twoCellAnchor\b/);
  for (const block of blocks.slice(1)) {
    const rowMatch = block.match(/<xdr:from>[\s\S]*?<xdr:row>(\d+)<\/xdr:row>/);
    const embedMatch = block.match(/r:embed="(rId\d+)"/);
    if (rowMatch && embedMatch) {
      anchors.push({
        row: Number(rowMatch[1]),
        rId: embedMatch[1],
      });
    }
  }
  return anchors;
}

function main() {
  const xlsx = fs.existsSync(SOURCE) ? SOURCE : FALLBACK;
  if (!fs.existsSync(xlsx)) {
    throw new Error(`Missing Excel file: ${xlsx}`);
  }

  fs.rmSync(TMP, { recursive: true, force: true });
  fs.mkdirSync(path.join(TMP, "unzip"), { recursive: true });
  execSync(`tar -xf "${xlsx}" -C "${path.join(TMP, "unzip")}"`, {
    stdio: "inherit",
  });

  const unzip = path.join(TMP, "unzip");
  const rels = parseRels(
    readXml(path.join(unzip, "xl", "drawings", "_rels", "drawing1.xml.rels"))
  );
  const anchors = parseAnchors(
    readXml(path.join(unzip, "xl", "drawings", "drawing1.xml"))
  );
  const catalog = JSON.parse(fs.readFileSync(CATALOG_JSON, "utf8"));
  const productsByRow = new Map();
  for (const item of catalog.items) {
    const match = item.id.match(/^row-(\d+)-/);
    if (match) {
      productsByRow.set(Number(match[1]), item);
    }
  }

  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  let linked = 0;
  for (const anchor of anchors) {
    const product = productsByRow.get(anchor.row);
    const rel = rels.get(anchor.rId);
    if (!product || !rel) {
      continue;
    }
    const src = path.join(unzip, "xl", rel.replace(/\//g, path.sep));
    if (!fs.existsSync(src)) {
      console.warn(`Missing media ${rel}`);
      continue;
    }
    const ext = path.extname(src).toLowerCase() || ".jpeg";
    const destName = `${product.id}${ext}`;
    fs.copyFileSync(src, path.join(PUBLIC_DIR, destName));
    product.imageUrl = `/catalog/${destName}`;
    linked += 1;
  }

  fs.writeFileSync(CATALOG_JSON, `${JSON.stringify(catalog, null, 2)}\n`);
  console.log(
    `Linked ${linked} Excel photos to products (${anchors.length} drawings, ${catalog.items.length} SKUs)`
  );

  fs.rmSync(TMP, { recursive: true, force: true });
}

main();
