import type { Metadata } from "next";
import { getProvas, ProvaItem } from "@/lib/data-store";

export const metadata: Metadata = {
  title: "Provas | Olimpíada Astra de Matemática",
  description:
    "Baixe provas e gabaritos das edições anteriores da Olimpíada Astra de Matemática.",
};

export const dynamic = "force-dynamic";

function DownloadCard({
  name,
  file,
  year,
}: {
  name: string;
  file: string;
  year: string;
}) {
  return (
    <a
      href={file}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
        <svg
          className="h-6 w-6 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
          />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-gray-900 group-hover:text-astra-blue transition-colors">
          {name}
        </div>
        <div className="text-xs text-gray-500 mt-0.5">PDF — {year}</div>
      </div>
      <svg
        className="h-5 w-5 text-gray-400 group-hover:text-astra-blue transition-colors"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
        />
      </svg>
    </a>
  );
}

function SectionGrid({
  items,
}: {
  items: ProvaItem[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {items.map((item) => (
        <DownloadCard
          key={item.id}
          name={item.name}
          file={item.file}
          year={item.year}
        />
      ))}
    </div>
  );
}

export default function ProvasPage() {
  const allItems = getProvas();
  const provas = allItems.filter((i) => i.category === "prova");
  const gabaritos = allItems.filter((i) => i.category === "gabarito");
  const documentos = allItems.filter((i) => i.category === "documento");

  return (
    <>
      {/* Page Header */}
      <section className="banner-bg banner-border relative py-16 sm:py-24">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            Provas e Gabaritos
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Baixe as provas e gabaritos das edições anteriores para estudar e se
            preparar.
          </p>
        </div>
      </section>

      {/* Provas */}
      {provas.length > 0 && (
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Provas</h2>
              <p className="text-gray-600">
                Provas aplicadas nas edições anteriores da Olimpíada Astra de
                Matemática.
              </p>
            </div>
            <SectionGrid items={provas} />
          </div>
        </section>
      )}

      {/* Gabaritos */}
      {gabaritos.length > 0 && (
        <section className="py-16 sm:py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Provas com Gabarito
              </h2>
              <p className="text-gray-600">
                Provas com as respostas corretas para conferir seu desempenho.
              </p>
            </div>
            <SectionGrid items={gabaritos} />
          </div>
        </section>
      )}

      {/* Documentos */}
      {documentos.length > 0 && (
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Documentos
              </h2>
              <p className="text-gray-600">
                Regulamentos e outros documentos oficiais da olimpíada.
              </p>
            </div>
            <SectionGrid items={documentos} />
          </div>
        </section>
      )}
    </>
  );
}
