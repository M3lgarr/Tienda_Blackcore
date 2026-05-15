import { useState } from 'react';
import { PlayCircle } from 'lucide-react';

function VideoPlaylist({ item }) {
  const [videoActual, setVideoActual] = useState(0);

  const siguienteVideo = () => {
    setVideoActual(prev => (prev + 1) % item.videos.length);
  };

  return (
    <video
      key={item.videos[videoActual]}
      src={item.videos[videoActual]}
      className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
      autoPlay
      muted
      playsInline
      preload="metadata"
      onEnded={siguienteVideo}
    />
  );
}

function VideoShowcase({ videos }) {
  return (
    <section className="bg-gray-950 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.4em] text-green-400">
              Experiencia visual
            </p>

            <h2 className="mt-4 max-w-4xl text-4xl font-black leading-tight md:text-5xl">
              Rendimiento, diseño y tecnología en movimiento
            </h2>

            <p className="mt-4 max-w-2xl text-gray-400">
              Una vista minimalista del tipo de experiencia que BlackCore busca ofrecer:
              setups limpios, componentes modernos y una estética gamer profesional.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black px-5 py-3 text-sm font-bold text-gray-300">
            BlackCore Media
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {videos.map((item, index) => (
            <article
              key={index}
              className="group overflow-hidden rounded-[2rem] border border-white/10 bg-black shadow-2xl transition hover:-translate-y-2 hover:border-green-400/60 hover:shadow-[0_0_35px_rgba(0,255,136,0.15)]"
            >
              <div className="grid gap-0 md:grid-cols-[0.72fr_1fr]">
                <div className="flex justify-center bg-black p-5">
                  <div className="relative aspect-[9/16] h-[540px] max-h-[70vh] overflow-hidden rounded-[1.5rem] border border-white/10 bg-black">
                    <VideoPlaylist item={item} />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    <div className="absolute left-5 top-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-green-400/30 bg-black/60 text-green-400 backdrop-blur">
                      <PlayCircle size={30} />
                    </div>

                    <span className="absolute bottom-5 left-5 rounded-full border border-green-400/30 bg-green-400/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-green-400">
                      Video destacado
                    </span>
                  </div>
                </div>

                <div className="flex flex-col justify-center p-8 md:p-10">
                  <p className="text-sm font-bold uppercase tracking-[0.35em] text-green-400">
                    BlackCore Visual
                  </p>

                  <h3 className="mt-5 text-4xl font-black leading-tight text-white">
                    {item.titulo}
                  </h3>

                  <p className="mt-5 text-base leading-relaxed text-gray-400">
                    {item.descripcion}
                  </p>

                  <div className="mt-8 h-1 w-24 rounded-full bg-green-400" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default VideoShowcase;