import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Galeria | Olimpíada Astra de Matemática",
  description:
    "Galeria de fotos das edições anteriores da Olimpíada Astra de Matemática.",
};

interface GalleryEdition {
  year: number;
  edition: string;
  events: {
    slug: string;
    title: string;
    description: string;
    imageCount: number;
  }[];
}

const galleryEditions: GalleryEdition[] = [
  {
    year: 2016,
    edition: "21ª Edição",
    events: [
      {
        slug: "lancamento-2016",
        title: "Lançamento",
        description: "Cerimônia de lançamento da 21ª edição.",
        imageCount: 0,
      },
    ],
  },
  {
    year: 2015,
    edition: "20ª Edição",
    events: [
      {
        slug: "olimpiada-2015",
        title: "Olimpíada",
        description: "Fotos do evento principal da 20ª edição.",
        imageCount: 0,
      },
    ],
  },
  {
    year: 2014,
    edition: "19ª Edição",
    events: [
      {
        slug: "olimpiada-2014",
        title: "Olimpíada",
        description: "Fotos do evento principal da 19ª edição.",
        imageCount: 0,
      },
    ],
  },
  {
    year: 2013,
    edition: "18ª Edição",
    events: [
      {
        slug: "lancamento-2013",
        title: "Lançamento",
        description: "Cerimônia de lançamento da 18ª edição.",
        imageCount: 0,
      },
      {
        slug: "primeira-fase-2013",
        title: "Primeira Fase",
        description: "Fotos da primeira fase classificatória.",
        imageCount: 0,
      },
      {
        slug: "segunda-fase-2013",
        title: "Segunda Fase",
        description: "Fotos da segunda fase da competição.",
        imageCount: 0,
      },
      {
        slug: "olimpiada-2013",
        title: "Olimpíada",
        description: "Fotos do evento principal.",
        imageCount: 0,
      },
      {
        slug: "premiacao2013",
        title: "Premiação",
        description: "Cerimônia de premiação dos vencedores.",
        imageCount: 0,
      },
    ],
  },
  {
    year: 2012,
    edition: "17ª Edição",
    events: [
      {
        slug: "lancamento-2012",
        title: "Lançamento",
        description: "Cerimônia de lançamento da 17ª edição.",
        imageCount: 0,
      },
      {
        slug: "primeira-fase-2012",
        title: "Primeira Fase",
        description: "Fotos da primeira fase classificatória.",
        imageCount: 0,
      },
      {
        slug: "segunda-fase-2012",
        title: "Segunda Fase",
        description: "Fotos da segunda fase da competição.",
        imageCount: 0,
      },
      {
        slug: "olimpiada-2012",
        title: "Olimpíada",
        description: "Fotos do evento principal.",
        imageCount: 0,
      },
      {
        slug: "premiacao-2012",
        title: "Premiação",
        description: "Cerimônia de premiação dos vencedores.",
        imageCount: 0,
      },
    ],
  },
];

function EventCard({
  event,
}: {
  event: GalleryEdition["events"][number];
}) {
  const hasImages = event.imageCount > 0;

  return (
    <div
      className={`bg-white rounded-xl overflow-hidden shadow-sm transition-all ${
        hasImages
          ? "hover:shadow-md hover:-translate-y-0.5"
          : "opacity-75"
      }`}
    >
      <div className="aspect-video bg-gradient-to-br from-chalkboard to-chalkboard-dark flex items-center justify-center relative">
        <div className="text-center">
          <svg
            className="h-12 w-12 text-chalk/30 mx-auto mb-2"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75Z"
            />
          </svg>
          {!hasImages && (
            <p className="text-xs text-chalk/40">Em breve</p>
          )}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-900">{event.title}</h3>
        <p className="text-sm text-gray-500 mt-1">{event.description}</p>
        {hasImages ? (
          <Link
            href={`/galeria/${event.slug}`}
            className="inline-flex items-center gap-1 text-sm text-astra-blue hover:text-astra-blue-light font-medium mt-3 transition-colors"
          >
            Ver fotos ({event.imageCount})
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        ) : (
          <p className="text-xs text-gray-400 mt-3 italic">
            Fotos em breve disponíveis
          </p>
        )}
      </div>
    </div>
  );
}

export default function GaleriaPage() {
  return (
    <>
      {/* Page Header */}
      <section className="chalkboard-bg wood-frame relative py-16 sm:py-24">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold chalk-text">
            Galeria de Fotos
          </h1>
          <p className="mt-4 text-lg text-chalk/80">
            Reviva os melhores momentos das edições anteriores da Olimpíada Astra
            de Matemática.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {galleryEditions.map((edition) => (
              <div key={edition.year}>
                <div className="flex items-baseline gap-4 mb-6">
                  <h2 className="text-3xl font-bold text-gray-900">
                    {edition.year}
                  </h2>
                  <span className="text-sm font-medium text-astra-blue bg-astra-blue/10 px-3 py-1 rounded-full">
                    {edition.edition}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {edition.events.map((event) => (
                    <EventCard
                      key={event.slug}
                      event={event}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Banner */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-astra-blue/5 border border-astra-blue/20 rounded-xl p-6 text-center">
            <svg
              className="h-8 w-8 text-astra-blue mx-auto mb-3"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
              />
            </svg>
            <h3 className="font-bold text-gray-900 mb-2">
              Galeria em atualização
            </h3>
            <p className="text-sm text-gray-600 max-w-lg mx-auto">
              Estamos trabalhando para disponibilizar as fotos de todas as
              edições anteriores. As imagens serão adicionadas em breve. Fique
              atento!
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
