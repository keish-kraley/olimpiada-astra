export interface GalleryEvent {
  slug: string;
  title: string;
  description: string;
  imageCount: number;
  thumbnail: string;
  images: string[];
}

export interface GalleryEdition {
  year: number;
  edition: string;
  events: GalleryEvent[];
}

export const galleryEditions: GalleryEdition[] = [
  {
    year: 2016,
    edition: "21ª Edição",
    events: [
      {
        slug: "lancamento-2016",
        title: "Lançamento",
        description: "Cerimônia de lançamento da 21ª edição.",
        imageCount: 95,
        thumbnail: "Olimp_ada_Astra_de_Matem_tica_10_.jpg",
        images: [],
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
        imageCount: 80,
        thumbnail:
          "Lan_amento_-_Olimp_ada_Astra_de_Matem_tica_100_.jpg",
        images: [],
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
        imageCount: 104,
        thumbnail: "1_fase_-_Olimp_ada_de_Matem_tica-10.jpg",
        images: [],
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
        imageCount: 7,
        thumbnail: "NIK_5408.jpg",
        images: [],
      },
      {
        slug: "primeira-fase-2013",
        title: "Primeira Fase",
        description: "Fotos da primeira fase classificatória.",
        imageCount: 8,
        thumbnail: "_NIK3174.jpg",
        images: [],
      },
      {
        slug: "segunda-fase-2013",
        title: "Segunda Fase",
        description: "Fotos da segunda fase da competição.",
        imageCount: 10,
        thumbnail: "_NIK7231.jpg",
        images: [],
      },
      {
        slug: "olimpiada-2013",
        title: "Olimpíada",
        description: "Fotos do evento principal.",
        imageCount: 72,
        thumbnail: "NIK_5408.jpg",
        images: [],
      },
      {
        slug: "premiacao2013",
        title: "Premiação",
        description: "Cerimônia de premiação dos vencedores.",
        imageCount: 77,
        thumbnail: "Olimpiada_Astra_de_Matematica-1.jpg",
        images: [],
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
        imageCount: 12,
        thumbnail: "DSC_0003.jpg",
        images: [],
      },
      {
        slug: "primeira-fase-2012",
        title: "Primeira Fase",
        description: "Fotos da primeira fase classificatória.",
        imageCount: 19,
        thumbnail: "DSC_0001.jpg",
        images: [],
      },
      {
        slug: "segunda-fase-2012",
        title: "Segunda Fase",
        description: "Fotos da segunda fase da competição.",
        imageCount: 13,
        thumbnail: "NIK_4136.jpg",
        images: [],
      },
      {
        slug: "olimpiada-2012",
        title: "Olimpíada",
        description: "Fotos do evento principal.",
        imageCount: 114,
        thumbnail: "DSC_0003.jpg",
        images: [],
      },
      {
        slug: "premiacao-2012",
        title: "Premiação",
        description: "Cerimônia de premiação dos vencedores.",
        imageCount: 66,
        thumbnail: "Olimp_ada_Astra_de_Matem_tica_-100.jpg",
        images: [],
      },
    ],
  },
];

export function findEventBySlug(slug: string): {
  event: GalleryEvent;
  edition: GalleryEdition;
} | null {
  for (const edition of galleryEditions) {
    for (const event of edition.events) {
      if (event.slug === slug) {
        return { event, edition };
      }
    }
  }
  return null;
}

export function getAllEventSlugs(): string[] {
  return galleryEditions.flatMap((ed) => ed.events.map((ev) => ev.slug));
}
