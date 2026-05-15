import { Target, Rocket, Zap } from 'lucide-react';

function CompanySection() {
  return (
    <section id="empresa" className="bg-black px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.5em] text-green-400">
            Identidad corporativa
          </p>

          <h2 className="mx-auto mt-5 max-w-5xl text-4xl font-black leading-tight md:text-5xl">
            Más que una tienda, un ecosistema gamer
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-gray-400">
            BlackCore nace como una propuesta moderna para ofrecer hardware, periféricos
            y accesorios de alto rendimiento, combinando tecnología, diseño y experiencia
            de compra digital.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          <div className="group border-t border-white/10 pt-8 transition hover:border-green-400">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-green-400/10 text-green-400">
              <Target size={26} />
            </div>

            <span className="text-xs font-bold uppercase tracking-[0.35em] text-gray-500">
              01
            </span>

            <h3 className="mt-4 text-3xl font-black text-white group-hover:text-green-400">
              Misión
            </h3>

            <p className="mt-5 max-w-sm leading-relaxed text-gray-400">
              Brindar productos gamer de alto rendimiento que permitan construir
              setups modernos, confiables y competitivos.
            </p>
          </div>

          <div className="group border-t border-white/10 pt-8 transition hover:border-green-400">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-green-400/10 text-green-400">
              <Rocket size={26} />
            </div>

            <span className="text-xs font-bold uppercase tracking-[0.35em] text-gray-500">
              02
            </span>

            <h3 className="mt-4 text-3xl font-black text-white group-hover:text-green-400">
              Visión
            </h3>

            <p className="mt-5 max-w-sm leading-relaxed text-gray-400">
              Ser una tienda gamer referente en Guatemala, reconocida por su catálogo
              innovador y experiencia digital.
            </p>
          </div>

          <div className="group border-t border-white/10 pt-8 transition hover:border-green-400">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-green-400/10 text-green-400">
              <Zap size={26} />
            </div>

            <span className="text-xs font-bold uppercase tracking-[0.35em] text-gray-500">
              03
            </span>

            <h3 className="mt-4 text-3xl font-black text-white group-hover:text-green-400">
              Valores
            </h3>

            <p className="mt-5 max-w-sm leading-relaxed text-gray-400">
              Innovación, rendimiento, confianza, accesibilidad tecnológica y pasión
              por la cultura gamer.
            </p>
          </div>
        </div>

        <div className="mt-16 h-px w-full bg-gradient-to-r from-transparent via-green-400/30 to-transparent" />
      </div>
    </section>
  );
}

export default CompanySection;