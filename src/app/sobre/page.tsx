import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Sobre | Olimpíada Astra de Matemática",
  description:
    "Conheça a história e os objetivos da Olimpíada Astra Estudantil de Matemática.",
};

const timeline = [
  {
    year: "1996",
    title: "Fundação",
    description:
      "A Olimpíada Astra de Matemática é criada com o objetivo de incentivar o estudo da matemática entre estudantes da região.",
  },
  {
    year: "2010",
    title: "15ª Edição",
    description:
      "A competição alcança marcos importantes, consolidando-se como referência em educação matemática.",
  },
  {
    year: "2012",
    title: "17ª Edição",
    description:
      "Expansão significativa com a participação de dezenas de escolas e centenas de estudantes.",
  },
  {
    year: "2013",
    title: "18ª Edição",
    description:
      "Edição marcante com grande engajamento das comunidades escolares da região.",
  },
  {
    year: "2014–2016",
    title: "Crescimento Contínuo",
    description:
      "A olimpíada continua a crescer, fortalecendo o compromisso da Astra com a educação.",
  },
];

export default function SobrePage() {
  return (
    <>
      {/* Page Header */}
      <section className="banner-bg banner-border relative py-16 sm:py-24">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            Sobre a Olimpíada
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Conheça a história e os valores da Olimpíada Astra Estudantil de
            Matemática.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                O que é a Olimpíada Astra de Matemática?
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  A <strong>Olimpíada Astra Estudantil de Matemática</strong> é
                  uma competição educacional promovida pelo Grupo Astra, uma das
                  mais importantes empresas do setor de construção civil do
                  Brasil, com sede em Jundiaí, São Paulo.
                </p>
                <p>
                  Desde sua criação em 1996, a olimpíada tem como missão
                  incentivar o estudo da matemática entre estudantes,
                  proporcionando desafios que estimulam o raciocínio lógico, a
                  criatividade e o gosto pela disciplina.
                </p>
                <p>
                  A competição é dividida em duas fases: a{" "}
                  <strong>Primeira Fase</strong>, que serve como classificatória,
                  e a <strong>Segunda Fase</strong>, onde os melhores
                  participantes competem pelos prêmios e reconhecimento.
                </p>
                <p>
                  Ao longo dos anos, milhares de estudantes participaram da
                  olimpíada, que se tornou uma tradição importante na região de
                  Jundiaí e arredores.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="/img/index.png"
                alt="Mascote da Olimpíada"
                width={500}
                height={375}
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Nossos Objetivos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Estimular o Aprendizado",
                description:
                  "Tornar a matemática mais atrativa e acessível para todos os estudantes.",
                icon: "📐",
              },
              {
                title: "Desenvolver Talentos",
                description:
                  "Identificar e apoiar estudantes com aptidão e interesse pela matemática.",
                icon: "🌟",
              },
              {
                title: "Promover a Integração",
                description:
                  "Criar um ambiente de colaboração entre escolas, professores e alunos.",
                icon: "🤝",
              },
              {
                title: "Investir no Futuro",
                description:
                  "Contribuir para a formação de cidadãos com pensamento crítico e analítico.",
                icon: "🚀",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Nossa Trajetória
          </h2>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-brand-blue/20" />
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={item.year}
                  className={`relative flex flex-col md:flex-row gap-4 md:gap-8 ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="flex-1 md:text-right">
                    {index % 2 === 0 && (
                      <div className="bg-gray-50 rounded-xl p-6">
                        <div className="text-sm font-bold text-brand-blue mb-1">
                          {item.year}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {item.description}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-3 h-3 bg-brand-blue rounded-full mt-8 ring-4 ring-white" />
                  <div className="flex-1 pl-10 md:pl-0">
                    {index % 2 !== 0 && (
                      <div className="bg-gray-50 rounded-xl p-6">
                        <div className="text-sm font-bold text-brand-blue mb-1">
                          {item.year}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {item.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grupo Astra */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Uma iniciativa do Grupo Astra
          </h2>
          <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8">
            O Grupo Astra é formado por empresas do ramo da construção civil e
            está entre os mais importantes fornecedores do mercado brasileiro.
            Além de seus produtos, a empresa investe ativamente na educação e no
            desenvolvimento das comunidades onde atua.
          </p>
          <div className="flex items-center justify-center gap-8">
            <Image
              src="/img/astra-logo.svg"
              alt="Logo Astra"
              width={120}
              height={36}
              className="h-10 w-auto"
            />
            <Image
              src="/img/logo-japi.png"
              alt="Logo Japi"
              width={80}
              height={24}
              className="h-8 w-auto"
            />

          </div>
        </div>
      </section>
    </>
  );
}
