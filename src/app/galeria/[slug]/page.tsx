import Link from "next/link";
import { notFound } from "next/navigation";
import { findEventBySlug, getAllEventSlugs } from "@/lib/gallery-data";
import galleryImages from "@/lib/gallery-images.json";
import GalleryGrid from "@/components/GalleryGrid";

export function generateStaticParams() {
  return getAllEventSlugs().map((slug) => ({ slug }));
}

export default async function GalleryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = findEventBySlug(slug);
  const images =
    (galleryImages as Record<string, string[]>)[slug] ?? [];

  if (!result) {
    notFound();
  }

  const { event, edition } = result;

  return (
    <>
      {/* Page Header */}
      <section className="chalkboard-bg wood-frame relative py-12 sm:py-20">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-sm text-chalk/60 mb-2">
            {edition.edition} — {edition.year}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold chalk-text">
            {event.title}
          </h1>
          <p className="mt-3 text-chalk/80">{event.description}</p>
          <p className="mt-2 text-sm text-chalk/50">
            {images.length} fotos
          </p>
        </div>
      </section>

      {/* Back link */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/galeria"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-astra-blue transition-colors"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            Voltar para a galeria
          </Link>
        </div>
      </div>

      {/* Photo Grid */}
      <section className="py-8 sm:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GalleryGrid slug={slug} images={images} />
        </div>
      </section>
    </>
  );
}
