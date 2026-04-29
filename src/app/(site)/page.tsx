import Image from "next/image";
import Link from "next/link";

const highlights = [
  {
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
        />
      </svg>
    ),
    title: "Educação",
    description:
      "Promovemos o ensino de matemática de forma lúdica e desafiadora para estudantes.",
    color: "bg-sym-plus",
  },
  {
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0 1 16.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m4.332-4.97a19.79 19.79 0 0 1-3.37 3.014M3.918 9.75a19.79 19.79 0 0 0 3.37-3.014"
        />
      </svg>
    ),
    title: "Competição",
    description:
      "Desafios que estimulam o raciocínio lógico e a criatividade dos participantes.",
    color: "bg-sym-minus",
  },
  {
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
        />
      </svg>
    ),
    title: "Comunidade",
    description:
      "Reunimos escolas e estudantes da região em torno da matemática.",
    color: "bg-sym-times",
  },
];

const editions = [
  { year: "2012", edition: "17ª Edição" },
  { year: "2013", edition: "18ª Edição" },
  { year: "2014", edition: "19ª Edição" },
  { year: "2015", edition: "20ª Edição" },
  { year: "2016", edition: "21ª Edição" },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="banner-bg banner-border relative">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="flex flex-col items-center gap-10 text-center">
            <Image
              src="/img/logo-olimpiada-branco.png"
              alt="Logo Olimpíada Estudantil Astra de Matemática"
              width={500}
              height={250}
              className="w-auto h-32 sm:h-44 lg:h-56 drop-shadow-2xl"
              priority
            />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Olimpíada Estudantil
              <br />
              Astra de Matemática
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl">
              Promovendo o ensino e a excelência em matemática para estudantes
              desde 1996. Participe da maior competição de matemática da
              região!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/sobre"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-brand-blue-dark font-semibold hover:bg-brand-blue-pale transition-all shadow-lg"
              >
                Saiba Mais
              </Link>
              <Link
                href="/provas"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-white/60 text-white font-semibold hover:bg-white/10 transition-all"
              >
                Ver Provas Anteriores
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Por que participar?
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              A Olimpíada Astra de Matemática é uma oportunidade única para
              estudantes mostrarem seu talento e paixão pela matemática.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow"
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${item.color} text-white mb-6`}
                >
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editions Timeline */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Edições Anteriores
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Confira a história das nossas olimpíadas ao longo dos anos.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {editions.map((ed) => (
              <Link
                key={ed.year}
                href={`/galeria?ano=${ed.year}`}
                className="group bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div className="text-4xl font-bold text-brand-blue group-hover:text-brand-blue-dark transition-colors">
                  {ed.year}
                </div>
                <div className="mt-2 text-sm text-gray-500">{ed.edition}</div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/galeria"
              className="inline-flex items-center gap-2 text-brand-blue hover:text-brand-blue-dark font-semibold transition-colors"
            >
              Ver todas as galerias
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
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="banner-bg relative py-16 sm:py-20">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Pronto para o desafio?
          </h2>
          <p className="mt-4 text-lg text-white/80">
            Acesse as provas anteriores e prepare-se para a próxima edição da
            Olimpíada Astra de Matemática!
          </p>
          <div className="mt-8">
            <Link
              href="/provas"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-white text-brand-blue-dark font-bold text-lg hover:bg-brand-blue-pale transition-all shadow-lg"
            >
              Acessar Provas
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
