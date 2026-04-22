"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../layout";

interface ProvaItem {
  id: string;
  name: string;
  file: string;
  year: string;
  category: "prova" | "gabarito" | "documento";
}

const categoryLabels = {
  prova: "Prova",
  gabarito: "Gabarito",
  documento: "Documento",
};

export default function ProvasAdmin() {
  const { token } = useAuth();
  const [items, setItems] = useState<ProvaItem[]>([]);
  const [filter, setFilter] = useState<"all" | "prova" | "gabarito" | "documento">("all");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<ProvaItem | null>(null);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    year: "",
    category: "prova" as "prova" | "gabarito" | "documento",
    file: "",
  });

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    const res = await fetch("/api/provas");
    setItems(await res.json());
  }

  function resetForm() {
    setForm({ name: "", year: "", category: "prova", file: "" });
    setEditing(null);
    setShowForm(false);
  }

  function startEdit(item: ProvaItem) {
    setForm({ name: item.name, year: item.year, category: item.category, file: item.file });
    setEditing(item);
    setShowForm(true);
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", "pdf");

    const res = await fetch("/api/upload", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: fd,
    });

    if (res.ok) {
      const data = await res.json();
      setForm((prev) => ({ ...prev, file: data.path }));
    }
    setUploading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const method = editing ? "PUT" : "POST";
    const body = editing
      ? { ...form, id: editing.id }
      : { ...form, id: `${form.category[0]}${Date.now()}` };

    await fetch("/api/provas", {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    resetForm();
    loadItems();
  }

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja remover este item?")) return;

    await fetch("/api/provas", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });

    loadItems();
  }

  const filtered = filter === "all" ? items : items.filter((i) => i.category === filter);

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Provas e Documentos</h1>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="bg-brand-blue text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-blue-dark transition-colors"
        >
          + Adicionar
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {(["all", "prova", "gabarito", "documento"] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === cat
                ? "bg-brand-blue text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            {cat === "all" ? "Todos" : categoryLabels[cat] + "s"}
          </button>
        ))}
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {editing ? "Editar Item" : "Novo Item"}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue outline-none"
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
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as "prova" | "gabarito" | "documento" })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue outline-none"
              >
                <option value="prova">Prova</option>
                <option value="gabarito">Gabarito</option>
                <option value="documento">Documento</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Arquivo PDF</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={form.file}
                  onChange={(e) => setForm({ ...form, file: e.target.value })}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue outline-none text-sm"
                  placeholder="/pdf/arquivo.pdf"
                  required
                />
                <label className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors text-sm whitespace-nowrap">
                  {uploading ? "..." : "Upload"}
                  <input type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>
            </div>
            <div className="sm:col-span-2 flex gap-2">
              <button
                type="submit"
                className="bg-brand-blue text-white px-6 py-2 rounded-lg font-medium hover:bg-brand-blue-dark transition-colors"
              >
                {editing ? "Salvar" : "Adicionar"}
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

      {/* List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Nome</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Ano</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Categoria</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Arquivo</th>
              <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{item.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.year}</td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                    item.category === "prova" ? "bg-blue-100 text-blue-700" :
                    item.category === "gabarito" ? "bg-green-100 text-green-700" :
                    "bg-orange-100 text-orange-700"
                  }`}>
                    {categoryLabels[item.category]}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-[200px]">
                  <a href={item.file} target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline">
                    {item.file}
                  </a>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => startEdit(item)}
                    className="text-brand-blue hover:text-brand-blue-dark mr-3 text-sm font-medium"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500">Nenhum item encontrado</div>
        )}
      </div>
    </>
  );
}
