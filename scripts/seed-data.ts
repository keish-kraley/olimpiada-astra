/**
 * Seed script: migrates existing static data into JSON files in /data.
 * Run with: npx tsx scripts/seed-data.ts
 */
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function writeJSON(filename: string, data: unknown) {
  ensureDir(DATA_DIR);
  fs.writeFileSync(
    path.join(DATA_DIR, filename),
    JSON.stringify(data, null, 2),
    "utf-8"
  );
}

// --- Provas ---
const provas = [
  { id: "p1", name: "15ª Edição — Primeira Fase", file: "/pdf/15-edicao-primeira-fase.pdf", year: "2010", category: "prova" },
  { id: "p2", name: "15ª Edição — Segunda Fase", file: "/pdf/15-edicao-segunda-fase.pdf", year: "2010", category: "prova" },
  { id: "p3", name: "16ª Edição — Primeira Fase", file: "/pdf/16-edicao-primeira-fase.pdf", year: "2011", category: "prova" },
  { id: "p4", name: "16ª Edição — Segunda Fase", file: "/pdf/16-edicao-segunda-fase.pdf", year: "2011", category: "prova" },
  { id: "p5", name: "17ª Edição — Primeira Fase", file: "/pdf/17-edicao-primeira-fase.pdf", year: "2012", category: "prova" },
  { id: "p6", name: "17ª Edição — Segunda Fase", file: "/pdf/17-edicao-segunda-fase.pdf", year: "2012", category: "prova" },
  { id: "p7", name: "18ª Edição — Segunda Fase", file: "/pdf/18-edicao-segunda-fase.pdf", year: "2013", category: "prova" },
  { id: "g1", name: "Prova e Gabarito — 2010", file: "/pdf/2010-prova-e-gabarito.pdf", year: "2010", category: "gabarito" },
  { id: "g2", name: "Prova e Gabarito — 2011", file: "/pdf/2011-prova-e-gabarito.pdf", year: "2011", category: "gabarito" },
  { id: "g3", name: "Prova e Gabarito — 2012", file: "/pdf/2012-prova-e-gabarito.pdf", year: "2012", category: "gabarito" },
  { id: "g4", name: "Gabarito 17ª Olimpíada 2012 (1ª Fase)", file: "/pdf/gabarito-17aolimpiada2012fafase.pdf", year: "2012", category: "gabarito" },
  { id: "g5", name: "Gabarito — 1ª Fase", file: "/pdf/gabarito-1fase.pdf", year: "2024", category: "gabarito" },
  { id: "g6", name: "Gabarito — 2ª Fase (2024)", file: "/pdf/gabarito-2fase-olimpiada2024.pdf", year: "2024", category: "gabarito" },
  { id: "g7", name: "Gabarito — 2ª Fase", file: "/pdf/gabarito-2fase.pdf", year: "2024", category: "gabarito" },
  { id: "g8", name: "Gabarito — 1ª Fase (2025)", file: "/pdf/gabarito-1fase-olimpiada2025.pdf", year: "2025", category: "gabarito" },
  { id: "d1", name: "Regulamento — 2013", file: "/pdf/regulamento-2013.pdf", year: "2013", category: "documento" },
  { id: "d2", name: "Regulamento — 2024", file: "/pdf/regulamento-2024.pdf", year: "2024", category: "documento" },
  { id: "d3", name: "Regulamento — 2025", file: "/pdf/regulamento-2025.pdf", year: "2025", category: "documento" },
  { id: "d4", name: "Ficha de Inscrição e Termo de Consentimento", file: "/pdf/ficha-inscricao-e-termo.pdf", year: "2024", category: "documento" },
  { id: "d5", name: "Termo de Consentimento", file: "/pdf/termo-de-consentimento.pdf", year: "2024", category: "documento" },
];

writeJSON("provas.json", provas);
console.log(`Wrote ${provas.length} items to provas.json`);

// --- Gallery ---
// Read from existing gallery-images.json
const galleryImagesPath = path.join(process.cwd(), "src/lib/gallery-images.json");
let galleryImagesMap: Record<string, string[]> = {};
if (fs.existsSync(galleryImagesPath)) {
  galleryImagesMap = JSON.parse(fs.readFileSync(galleryImagesPath, "utf-8"));
}

const galleryMeta: Record<string, { title: string; description: string; year: string }> = {
  "lancamento-2012": { title: "Lançamento 2012", description: "Cerimônia de lançamento da Olimpíada 2012", year: "2012" },
  "primeira-fase-2012": { title: "Primeira Fase 2012", description: "Provas da primeira fase da Olimpíada 2012", year: "2012" },
  "segunda-fase-2012": { title: "Segunda Fase 2012", description: "Provas da segunda fase da Olimpíada 2012", year: "2012" },
  "olimpiada-2012": { title: "Olimpíada 2012", description: "Evento principal da Olimpíada 2012", year: "2012" },
  "premiacao-2012": { title: "Premiação 2012", description: "Cerimônia de premiação da Olimpíada 2012", year: "2012" },
  "lancamento-2013": { title: "Lançamento 2013", description: "Cerimônia de lançamento da Olimpíada 2013", year: "2013" },
  "primeira-fase-2013": { title: "Primeira Fase 2013", description: "Provas da primeira fase da Olimpíada 2013", year: "2013" },
  "segunda-fase-2013": { title: "Segunda Fase 2013", description: "Provas da segunda fase da Olimpíada 2013", year: "2013" },
  "olimpiada-2013": { title: "Olimpíada 2013", description: "Evento principal da Olimpíada 2013", year: "2013" },
  "premiacao2013": { title: "Premiação 2013", description: "Cerimônia de premiação da Olimpíada 2013", year: "2013" },
  "olimpiada-2014": { title: "Olimpíada 2014", description: "Evento principal da Olimpíada 2014", year: "2014" },
  "olimpiada-2015": { title: "Olimpíada 2015", description: "Evento principal da Olimpíada 2015", year: "2015" },
  "lancamento-2016": { title: "Lançamento 2016", description: "Cerimônia de lançamento da Olimpíada 2016", year: "2016" },
};

const galleryEvents = Object.entries(galleryMeta).map(([slug, meta]) => ({
  slug,
  title: meta.title,
  description: meta.description,
  year: meta.year,
  images: galleryImagesMap[slug] || [],
}));

writeJSON("gallery.json", galleryEvents);
console.log(`Wrote ${galleryEvents.length} gallery events to gallery.json`);

// --- Contact ---
const contact = {
  phone: "SAC: 0800 165 051",
  email: "sac@astra-sa.com.br",
  website: "loja.astra-sa.com",
  websiteUrl: "https://loja.astra-sa.com",
  address: "Jundiaí, São Paulo — Brasil",
  facebook: "https://www.facebook.com/astraoficialbr",
  youtube: "https://www.youtube.com/astraoficialbr",
  linkedin: "https://www.linkedin.com/company/astra-industria-e-comercio-sa",
  instagram: "https://www.instagram.com/astraoficialbr",
};

writeJSON("contact.json", contact);
console.log("Wrote contact.json");

// --- Logos ---
const logos = {
  mainLogo: "/img/astra-logo.svg",
  partnerLogos: [
    { name: "Japi", src: "/img/logo-japi.png", href: "https://www.japi.com.br" },
  ],
};

writeJSON("logos.json", logos);
console.log("Wrote logos.json");

console.log("\nSeed complete! Data files are in:", DATA_DIR);
