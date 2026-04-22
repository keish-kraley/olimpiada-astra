"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../layout";

interface GalleryEvent {
  slug: string;
  title: string;
  description: string;
  year: string;
  images: string[];
}

export default function GaleriaAdmin() {
  const { token } = useAuth();
  const [events, setEvents] = useState<GalleryEvent[]>([]);
  const [selected, setSelected] = useState<GalleryEvent | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    slug: "",
    title: "",
    description: "",
    year: "",
  });

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    const res = await fetch("/api/gallery");
    setEvents(await res.json());
  }

  function resetForm() {
    setForm({ slug: "", title: "", description: "", year: "" });
    setShowForm(false);
  }

  async function handleCreateEvent(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/gallery", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...form, images: [] }),
    });

    resetForm();
    loadEvents();
  }

  async function handleDeleteEvent(slug: string) {
    if (!confirm("Tem certeza que deseja remover esta edição e todas as fotos?")) return;

    await fetch("/api/gallery", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ slug }),
    });

    if (selected?.slug === slug) setSelected(null);
    loadEvents();
  }

  async function handleUploadPhotos(e: React.ChangeEvent<HTMLInputElement>) {
    if (!selected || !e.target.files?.length) return;

    setUploading(true);
    const newImages: string[] = [];

    for (const file of Array.from(e.target.files)) {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", `galeria/${selected.slug}`);

      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });

      if (res.ok) {
        const data = await res.json();
        newImages.push(data.filename);
      }
    }

    const updated = {
      ...selected,
      images: [...selected.images, ...newImages],
    };

    await fetch("/api/gallery", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updated),
    });

    setSelected(updated);
    setUploading(false);
    loadEvents();
  }

  async function handleRemovePhoto(filename: string) {
    if (!selected) return;

    const updated = {
      ...selected,
      images: selected.images.filter((img) => img !== filename),
    };

    await fetch("/api/gallery", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updated),
    });

    setSelected(updated);
    loadEvents();
  }

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Galeria</h1>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="bg-brand-blue text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-blue-dark transition-colors"
        >
          + Nova Edição
        </button>
      </div>

      {/* New event form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Nova Edição</h2>
          <form onSubmit={handleCreateEvent} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue outline-none"
                placeholder="Ex: Olimpíada 2025"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-") })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue outline-none"
                placeholder="Ex: olimpiada-2025"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ano</label>
              <input
                type="text"
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue outline-none"
                placeholder="2025"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <input
                type="text"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue outline-none"
                placeholder="Breve descrição do evento"
                required
              />
            </div>
            <div className="sm:col-span-2 flex gap-2">
              <button
                type="submit"
                className="bg-brand-blue text-white px-6 py-2 rounded-lg font-medium hover:bg-brand-blue-dark transition-colors"
              >
                Criar Edição
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Event list */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="divide-y divide-gray-200">
              {events.map((event) => (
                <div
                  key={event.slug}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selected?.slug === event.slug ? "bg-blue-50 border-l-4 border-brand-blue" : ""
                  }`}
                  onClick={() => setSelected(event)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{event.title}</div>
                      <div className="text-xs text-gray-500">{event.images.length} fotos — {event.year}</div>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDeleteEvent(event.slug); }}
                      className="text-red-400 hover:text-red-600 text-xs"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              ))}
              {events.length === 0 && (
                <div className="p-8 text-center text-gray-500">Nenhuma edição cadastrada</div>
              )}
            </div>
          </div>
        </div>

        {/* Photo management */}
        <div className="lg:col-span-2">
          {selected ? (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{selected.title}</h2>
                  <p className="text-sm text-gray-500">{selected.images.length} fotos</p>
                </div>
                <label className="bg-brand-blue text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-blue-dark transition-colors cursor-pointer">
                  {uploading ? "Enviando..." : "+ Adicionar Fotos"}
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleUploadPhotos}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {selected.images.map((img) => (
                  <div key={img} className="relative group aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={`/galeria/${selected.slug}/${img}`}
                      alt={img}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => handleRemovePhoto(img)}
                      className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      title="Remover foto"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              {selected.images.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  Nenhuma foto. Clique em &quot;+ Adicionar Fotos&quot; para enviar.
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center text-gray-500">
              Selecione uma edição para gerenciar as fotos
            </div>
          )}
        </div>
      </div>
    </>
  );
}
