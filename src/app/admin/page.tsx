"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "./layout";

export default function AdminDashboard() {
  const { token } = useAuth();
  const [stats, setStats] = useState({ provas: 0, gabaritos: 0, documentos: 0, galerias: 0, fotos: 0 });

  useEffect(() => {
    async function load() {
      const [provasRes, galleryRes] = await Promise.all([
        fetch("/api/provas"),
        fetch("/api/gallery"),
      ]);
      const provas = await provasRes.json();
      const gallery = await galleryRes.json();

      setStats({
        provas: provas.filter((p: { category: string }) => p.category === "prova").length,
        gabaritos: provas.filter((p: { category: string }) => p.category === "gabarito").length,
        documentos: provas.filter((p: { category: string }) => p.category === "documento").length,
        galerias: gallery.length,
        fotos: gallery.reduce((acc: number, g: { images: string[] }) => acc + g.images.length, 0),
      });
    }
    if (token) load();
  }, [token]);

  const cards = [
    { label: "Provas", value: stats.provas, href: "/admin/provas", color: "bg-blue-500" },
    { label: "Gabaritos", value: stats.gabaritos, href: "/admin/provas", color: "bg-green-500" },
    { label: "Documentos", value: stats.documentos, href: "/admin/provas", color: "bg-orange-500" },
    { label: "Galerias", value: stats.galerias, href: "/admin/galeria", color: "bg-purple-500" },
    { label: "Fotos", value: stats.fotos, href: "/admin/galeria", color: "bg-pink-500" },
  ];

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
          >
            <div className={`w-10 h-10 rounded-lg ${card.color} flex items-center justify-center text-white text-lg font-bold mb-3`}>
              {card.value}
            </div>
            <div className="text-sm font-medium text-gray-600">{card.label}</div>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/admin/provas"
            className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-brand-blue hover:bg-blue-50 transition-colors"
          >
            <span className="text-2xl">📄</span>
            <div>
              <div className="font-medium text-gray-900">Gerenciar Provas</div>
              <div className="text-xs text-gray-500">Adicionar ou remover provas e gabaritos</div>
            </div>
          </Link>
          <Link
            href="/admin/galeria"
            className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-brand-blue hover:bg-blue-50 transition-colors"
          >
            <span className="text-2xl">🖼️</span>
            <div>
              <div className="font-medium text-gray-900">Gerenciar Galeria</div>
              <div className="text-xs text-gray-500">Adicionar fotos e edições</div>
            </div>
          </Link>
          <Link
            href="/admin/contato"
            className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-brand-blue hover:bg-blue-50 transition-colors"
          >
            <span className="text-2xl">📞</span>
            <div>
              <div className="font-medium text-gray-900">Contato e Logos</div>
              <div className="text-xs text-gray-500">Alterar informações e logos</div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
