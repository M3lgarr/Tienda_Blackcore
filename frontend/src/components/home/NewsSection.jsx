import { ArrowRight } from 'lucide-react';

function NewsSection({ noticias }) {
  return (
    <section id="noticias" className="bg-black px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.4em] text-green-400">
            Noticias y tendencias
          </p>

          <h2 className="mt-4 text-4xl font-black md:text-5xl">
            Innovación en el mundo gamer
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-gray-400">
            Noticias recientes sobre hardware, gaming competitivo, componentes y tecnología para setups de alto rendimiento.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {noticias.length === 0 ? (
            <div className="col-span-full rounded-3xl border border-white/10 bg-gray-950 p-12 text-center">
              <p className="text-xl font-bold text-gray-300">
                Cargando noticias...
              </p>
              <p className="mt-2 text-gray-500">
                Verifica que el backend esté activo y que NEWS_API_KEY esté configurada.
              </p>
            </div>
          ) : (
            noticias.map((noticia, index) => (
              <article
                key={index}
                className="overflow-hidden rounded-3xl border border-white/10 bg-gray-950 transition hover:-translate-y-1 hover:border-green-400/60 hover:shadow-[0_0_30px_rgba(0,255,136,0.12)]"
              >
                <div className="relative h-52 overflow-hidden bg-black">
                  <img
                    src={noticia.imagen || '/fallback/news-placeholder.jpg'}
                    alt={noticia.titulo}
                    className="h-full w-full object-cover opacity-80 transition duration-500 hover:scale-105 hover:opacity-100"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>

                <div className="p-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-green-400">
                    {noticia.fuente || 'Gaming News'}
                  </span>

                  <h3 className="mt-3 line-clamp-2 min-h-[64px] text-2xl font-black">
                    {noticia.titulo}
                  </h3>

                  <p className="mt-3 line-clamp-3 min-h-[72px] text-sm leading-relaxed text-gray-400">
                    {noticia.descripcion || 'Noticia relacionada con tecnología, hardware y el ecosistema gamer.'}
                  </p>

                  <a
                    href={noticia.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 font-bold text-green-400 transition hover:text-green-300"
                  >
                    Leer noticia
                    <ArrowRight size={18} />
                  </a>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default NewsSection;