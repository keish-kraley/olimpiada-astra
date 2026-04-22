"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../layout";

interface ContactInfo {
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

interface PartnerLogo {
  name: string;
  src: string;
  href: string;
}

interface LogoConfig {
  mainLogo: string;
  partnerLogos: PartnerLogo[];
}

export default function ContatoAdmin() {
  const { token } = useAuth();
  const [contact, setContact] = useState<ContactInfo | null>(null);
  const [logos, setLogos] = useState<LogoConfig | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState("");
  const [uploading, setUploading] = useState(false);
  const [newLogo, setNewLogo] = useState({ name: "", src: "", href: "" });

  useEffect(() => {
    Promise.all([
      fetch("/api/contact").then((r) => r.json()),
      fetch("/api/logos").then((r) => r.json()),
    ]).then(([c, l]) => {
      setContact(c);
      setLogos(l);
    });
  }, []);

  async function saveContact() {
    if (!contact) return;
    setSaving(true);
    await fetch("/api/contact", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(contact),
    });
    setSaving(false);
    setSaved("contact");
    setTimeout(() => setSaved(""), 2000);
  }

  async function saveLogos() {
    if (!logos) return;
    setSaving(true);
    await fetch("/api/logos", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(logos),
    });
    setSaving(false);
    setSaved("logos");
    setTimeout(() => setSaved(""), 2000);
  }

  async function handleLogoUpload(
    e: React.ChangeEvent<HTMLInputElement>,
    onPath: (path: string) => void
  ) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", "img");
    const res = await fetch("/api/upload", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: fd,
    });
    if (res.ok) {
      const data = await res.json();
      onPath(data.path);
    }
    setUploading(false);
  }

  function addPartnerLogo() {
    if (!logos || !newLogo.name || !newLogo.src) return;
    setLogos({
      ...logos,
      partnerLogos: [...logos.partnerLogos, { ...newLogo }],
    });
    setNewLogo({ name: "", src: "", href: "" });
  }

  function removePartnerLogo(idx: number) {
    if (!logos) return;
    setLogos({
      ...logos,
      partnerLogos: logos.partnerLogos.filter((_, i) => i !== idx),
    });
  }

  if (!contact || !logos) {
    return <div className="text-gray-500">Carregando...</div>;
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Contato e Logos</h1>

      {/* Contact Info */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Informações de Contato</h2>
          <button
            onClick={saveContact}
            disabled={saving}
            className="bg-brand-blue text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-blue-dark transition-colors disabled:opacity-50"
          >
            {saving ? "Salvando..." : saved === "contact" ? "Salvo!" : "Salvar Contato"}
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
            <input
              type="text"
              value={contact.phone}
              onChange={(e) => setContact({ ...contact, phone: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={contact.email}
              onChange={(e) => setContact({ ...contact, email: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Website (texto)</label>
            <input
              type="text"
              value={contact.website}
              onChange={(e) => setContact({ ...contact, website: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Website (URL)</label>
            <input
              type="url"
              value={contact.websiteUrl}
              onChange={(e) => setContact({ ...contact, websiteUrl: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue outline-none"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
            <input
              type="text"
              value={contact.address}
              onChange={(e) => setContact({ ...contact, address: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
            <input
              type="url"
              value={contact.facebook}
              onChange={(e) => setContact({ ...contact, facebook: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">YouTube</label>
            <input
              type="url"
              value={contact.youtube}
              onChange={(e) => setContact({ ...contact, youtube: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
            <input
              type="url"
              value={contact.linkedin}
              onChange={(e) => setContact({ ...contact, linkedin: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
            <input
              type="url"
              value={contact.instagram}
              onChange={(e) => setContact({ ...contact, instagram: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue outline-none"
            />
          </div>
        </div>
      </div>

      {/* Logos */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Logos</h2>
          <button
            onClick={saveLogos}
            disabled={saving}
            className="bg-brand-blue text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-blue-dark transition-colors disabled:opacity-50"
          >
            {saving ? "Salvando..." : saved === "logos" ? "Salvo!" : "Salvar Logos"}
          </button>
        </div>

        {/* Main logo */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Logo Principal</h3>
          <div className="flex items-center gap-4">
            <div className="w-24 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
              <img src={logos.mainLogo} alt="Logo principal" className="max-h-full max-w-full" />
            </div>
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                value={logos.mainLogo}
                onChange={(e) => setLogos({ ...logos, mainLogo: e.target.value })}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-blue outline-none"
              />
              <label className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors text-sm whitespace-nowrap">
                {uploading ? "..." : "Upload"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleLogoUpload(e, (path) => setLogos({ ...logos, mainLogo: path }))}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Partner logos */}
        <h3 className="text-sm font-medium text-gray-700 mb-3">Logos de Empresas do Grupo</h3>
        <div className="space-y-3 mb-4">
          {logos.partnerLogos.map((logo, idx) => (
            <div key={idx} className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
              <div className="w-16 h-8 bg-white rounded flex items-center justify-center overflow-hidden">
                <img src={logo.src} alt={logo.name} className="max-h-full max-w-full" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">{logo.name}</div>
                <div className="text-xs text-gray-500">{logo.href}</div>
              </div>
              <button
                onClick={() => removePartnerLogo(idx)}
                className="text-red-400 hover:text-red-600 text-sm"
              >
                Remover
              </button>
            </div>
          ))}
        </div>

        {/* Add partner logo */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Nome</label>
            <input
              type="text"
              value={newLogo.name}
              onChange={(e) => setNewLogo({ ...newLogo, name: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-blue outline-none"
              placeholder="Ex: Japi"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Imagem</label>
            <div className="flex gap-1">
              <input
                type="text"
                value={newLogo.src}
                onChange={(e) => setNewLogo({ ...newLogo, src: e.target.value })}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-blue outline-none"
                placeholder="/img/logo.png"
              />
              <label className="bg-gray-100 text-gray-700 px-2 py-2 rounded-lg cursor-pointer hover:bg-gray-200 text-xs">
                Upload
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleLogoUpload(e, (path) => setNewLogo({ ...newLogo, src: path }))}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Link (URL)</label>
            <input
              type="url"
              value={newLogo.href}
              onChange={(e) => setNewLogo({ ...newLogo, href: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-blue outline-none"
              placeholder="https://..."
            />
          </div>
          <button
            onClick={addPartnerLogo}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors text-sm"
          >
            + Adicionar
          </button>
        </div>
      </div>
    </>
  );
}
