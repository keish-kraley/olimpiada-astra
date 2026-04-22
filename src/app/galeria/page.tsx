import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { galleryEditions } from "@/lib/gallery-data";
import type { GalleryEvent } from "@/lib/gallery-data";

export const metadata: Metadata = {
  title: "Galeria | Olimpíada Astra de Matemática",
  description:
    "Galeria de fotos das edições anteriores da Olimpíada Astra de Matemática.",
};

function EventCard({ event }: { event: GalleryEvent }) {
  return (
    <Link
      href={`/galeria/${event.slug}`}
      className="group bg-white rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
    >
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={`/galeria/${event.slug}/${event.thumbnail}`}
          alt={event.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-900">{event.title}</h3>
        <p className="text-sm text-gray-500 mt-1">{event.description}</p>
        <span className="inline-flex items-center gap-1 text-sm text-astra-blue font-medium mt-3 group-hover:text-astra-blue-light transition-colors">
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
        </span>
      </div>
    </Link>
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
                    <EventCard key={event.slug} event={event} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
