import fs from "fs";
import path from "path";

const DATA_DIR = process.env.DATA_DIR || path.join(/** @turbopackIgnore */ process.cwd(), "data");

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function readJSON<T>(filename: string, fallback: T): T {
  const filepath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filepath)) return fallback;
  try {
    return JSON.parse(fs.readFileSync(filepath, "utf-8"));
  } catch {
    return fallback;
  }
}

function writeJSON<T>(filename: string, data: T) {
  ensureDir(DATA_DIR);
  const filepath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2), "utf-8");
}

// --- Provas / Gabaritos / Documentos ---

export interface ProvaItem {
  id: string;
  name: string;
  file: string;
  year: string;
  category: "prova" | "gabarito" | "documento";
}

export function getProvas(): ProvaItem[] {
  return readJSON<ProvaItem[]>("provas.json", []);
}

export function saveProvas(items: ProvaItem[]) {
  writeJSON("provas.json", items);
}

// --- Gallery ---

export interface GalleryEvent {
  slug: string;
  title: string;
  description: string;
  year: string;
  images: string[];
}

export function getGalleryEvents(): GalleryEvent[] {
  return readJSON<GalleryEvent[]>("gallery.json", []);
}

export function saveGalleryEvents(events: GalleryEvent[]) {
  writeJSON("gallery.json", events);
}

// --- Contact Info ---

export interface ContactInfo {
  phone: string;
  email: string;
  website: string;
  websiteUrl: string;
  address: string;
  facebook: string;
  youtube: string;
  linkedin: string;
  instagram: string;
}

const defaultContact: ContactInfo = {
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

export function getContactInfo(): ContactInfo {
  return readJSON<ContactInfo>("contact.json", defaultContact);
}

export function saveContactInfo(info: ContactInfo) {
  writeJSON("contact.json", info);
}

// --- Logos ---

export interface LogoConfig {
  mainLogo: string;
  partnerLogos: { name: string; src: string; href: string }[];
}

const defaultLogos: LogoConfig = {
  mainLogo: "/img/astra-logo.svg",
  partnerLogos: [
    { name: "Japi", src: "/img/logo-japi.png", href: "https://www.japi.com.br" },
  ],
};

export function getLogos(): LogoConfig {
  return readJSON<LogoConfig>("logos.json", defaultLogos);
}

export function saveLogos(logos: LogoConfig) {
  writeJSON("logos.json", logos);
}

// --- Upload directory ---

export function getUploadDir(): string {
  const uploadDir = path.join(DATA_DIR, "uploads");
  ensureDir(uploadDir);
  return uploadDir;
}
