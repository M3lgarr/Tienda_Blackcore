import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

function HeroCarousel({ slides }) {
  const [slideActual, setSlideActual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setSlideActual(prev => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(intervalo);
  }, [slides.length]);

  const siguienteSlide = () => {
    setSlideActual((slideActual + 1) % slides.length);
  };

  const anteriorSlide = () => {
    setSlideActual((slideActual - 1 + slides.length) % slides.length);
  };

  return (
    <section id="inicio" className="relative min-h-screen w-full overflow-hidden bg-black">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === slideActual ? 'z-10 opacity-100' : 'z-0 opacity-0'
          }`}
        >
          <img
            src={slide.imagen}
            alt={slide.titulo}
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_50%,rgba(0,255,136,0.25),transparent_35%)]" />

          <div className="relative z-30 flex min-h-screen items-center px-6 pt-24">
            <div className="mx-auto w-full max-w-7xl">
              <div className="max-w-4xl rounded-[2rem] border border-white/10 bg-black/55 p-8 shadow-2xl backdrop-blur-md md:p-12">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-400/40 bg-green-400/10 px-4 py-2 text-sm font-semibold text-green-300">
                  <ShieldCheck size={18} />
                  {slide.etiqueta}
                </div>

                <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-gray-300">
                  {slide.categoria}
                </p>

                <h2 className="text-5xl font-black leading-tight tracking-tight text-white drop-shadow-2xl md:text-7xl">
                  {slide.titulo}
                </h2>

                <p className="mt-5 text-2xl font-bold text-green-400 drop-shadow md:text-3xl">
                  {slide.subtitulo}
                </p>

                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-gray-200">
                  {slide.descripcion}
                </p>

                <div className="mt-8 grid max-w-3xl gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                    <p className="text-sm text-gray-400">Especialidad</p>
                    <p className="mt-1 font-black text-white">{slide.dato1}</p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                    <p className="text-sm text-gray-400">Enfoque</p>
                    <p className="mt-1 font-black text-white">{slide.dato2}</p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                    <p className="text-sm text-gray-400">Ventaja</p>
                    <p className="mt-1 font-black text-white">{slide.dato3}</p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Link
                    to="/catalogo"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-green-400 px-8 py-3 text-center font-black text-black transition hover:bg-green-300"
                  >
                    Ver catálogo
                    <ArrowRight size={20} />
                  </Link>

                  <a
                    href="#empresa"
                    className="rounded-full border border-white/20 px-8 py-3 text-center font-bold text-white transition hover:border-green-400 hover:text-green-400"
                  >
                    Conocer empresa
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={anteriorSlide}
        className="absolute left-6 top-1/2 z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur transition hover:border-green-400 hover:text-green-400"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        onClick={siguienteSlide}
        className="absolute right-6 top-1/2 z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur transition hover:border-green-400 hover:text-green-400"
      >
        <ChevronRight size={28} />
      </button>
    </section>
  );
}

export default HeroCarousel;