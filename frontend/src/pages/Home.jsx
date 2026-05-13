import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {
  Target,
  Rocket,
  Zap,
  Cpu,
  Monitor,
  ShieldCheck,
  Trophy,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  PlayCircle,
  BadgeCheck
} from 'lucide-react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';

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

function Home() {
  const [productos, setProductos] = useState([]);
  const [slideActual, setSlideActual] = useState(0);
  const [noticias, setNoticias] = useState([]);

  const slides = [
    {
      titulo: 'BLACKCORE GAMING',
      subtitulo: 'Infraestructura gamer para jugadores de alto rendimiento.',
      descripcion:
        'Una plataforma especializada en periféricos, componentes y accesorios premium para construir setups modernos, competitivos y visualmente impactantes.',
      etiqueta: 'Gaming Corporation',
      categoria: 'Hardware | Periféricos | Setups',
      dato1: 'Catálogo premium',
      dato2: 'Tecnología gamer',
      dato3: 'Experiencia digital',
      imagen:
        'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop'
    },
    {
      titulo: 'SETUPS PROFESIONALES',
      subtitulo: 'Diseñados para competir, trabajar y crear contenido.',
      descripcion:
        'BlackCore integra monitores de alta frecuencia, teclados de respuesta rápida, audio inmersivo y componentes de última generación en un solo ecosistema.',
      etiqueta: 'Performance Setup',
      categoria: 'Streaming | Esports | Creadores',
      dato1: '240Hz+ Ready',
      dato2: 'RGB Ecosystem',
      dato3: 'Low Latency',
      imagen:
        'https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=2070&auto=format&fit=crop'
    },
    {
      titulo: 'POTENCIA SIN LÍMITES',
      subtitulo: 'Componentes para gaming 4K, edición y multitarea extrema.',
      descripcion:
        'Procesadores, tarjetas gráficas, almacenamiento NVMe y memorias DDR5 preparados para usuarios que exigen velocidad, estabilidad y rendimiento.',
      etiqueta: 'Next Gen Hardware',
      categoria: 'GPU | CPU | RAM | SSD',
      dato1: '4K Gaming',
      dato2: 'DDR5 Ready',
      dato3: 'NVMe Speed',
      imagen:
        'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?q=80&w=2070&auto=format&fit=crop'
    }
  ];

  const marcas = [
    {
      nombre: 'Razer',
      logo: '/brands/Razer.png'
    },
    {
      nombre: 'Logitech G',
      logo: '/brands/logitech-g.png'
    },
    {
      nombre: 'Corsair',
      logo: '/brands/corsair.png'
    },
    {
      nombre: 'SteelSeries',
      logo: '/brands/steelseries.png'
    },
    {
      nombre: 'ASUS ROG',
      logo: '/brands/asus-rog.png'
    },
    {
      nombre: 'NVIDIA',
      logo: '/brands/nvidia.png'
    }
  ];

const videos = [
  {
    titulo: 'Setups de alto rendimiento',
    descripcion:
      'Ambientes modernos diseñados para gaming competitivo, streaming y creación de contenido.',
    videos: [
      '/videos/setup_1.mp4',
      '/videos/setup_2.mp4',
      '/videos/setup_4.mp4'
    ]
  },
  {
    titulo: 'Hardware de nueva generación',
    descripcion:
      'Componentes, periféricos y equipos pensados para usuarios que buscan velocidad y estabilidad.',
    videos: [
      '/videos/componentes_1.mp4',
      '/videos/componentes_2.mp4',
      '/videos/componentes_3.mp4'
    ]
  }
];

  useEffect(() => {
    fetch('http://localhost:3001/api/productos')
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error('Error al cargar productos:', err));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3001/api/noticias')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setNoticias(data);
        } else {
          console.error('Respuesta inesperada de noticias:', data);
        }
      })
      .catch(err => console.error('Error al cargar noticias:', err));
  }, []);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setSlideActual(prev => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(intervalo);
  }, [slides.length]);

  const productosTop = productos.filter(prod =>
    [
      'NVIDIA GeForce RTX 5090',
      'ASUS ROG Swift OLED PG32UCDM',
      'Samsung Odyssey OLED G9 49',
      'Herman Miller x Logitech G Embody',
      'Wooting 60HE+',
      'Logitech G Pro X Superlight 2'
    ].includes(prod.nombre)
  );

  const siguienteSlide = () => {
    setSlideActual((slideActual + 1) % slides.length);
  };

  const anteriorSlide = () => {
    setSlideActual((slideActual - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* CAROUSEL HERO */}
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

      {/* ESTADÍSTICAS */}
      <section className="border-y border-white/10 bg-gray-950 px-6 py-10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 text-center md:grid-cols-4">
          <div>
            <p className="text-4xl font-black text-green-400">+50</p>
            <p className="text-sm uppercase tracking-widest text-gray-400">
              Productos premium
            </p>
          </div>

          <div>
            <p className="text-4xl font-black text-green-400">9</p>
            <p className="text-sm uppercase tracking-widest text-gray-400">
              Categorías gamer
            </p>
          </div>

          <div>
            <p className="text-4xl font-black text-green-400">24/7</p>
            <p className="text-sm uppercase tracking-widest text-gray-400">
              Experiencia online
            </p>
          </div>

          <div>
            <p className="text-4xl font-black text-green-400">GT</p>
            <p className="text-sm uppercase tracking-widest text-gray-400">
              Mercado guatemalteco
            </p>
          </div>
        </div>
      </section>

      {/* MARCAS / SPONSORS */}
      <section className="bg-black px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.5em] text-green-400">
              Marcas asociadas
            </p>

            <h2 className="mx-auto mt-5 max-w-5xl text-4xl font-black leading-tight md:text-5xl">
              Tecnología respaldada por marcas líderes
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-gray-400">
              BlackCore integra líneas de hardware, periféricos y componentes utilizados
              como referencia dentro del ecosistema gamer de alto rendimiento.
            </p>
          </div>

          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-20 gap-y-14">
            {marcas.map((marca, index) => (
              <div
                key={index}
                className="flex min-h-24 min-w-[180px] items-center justify-center opacity-80 transition duration-300 hover:opacity-100"
              >
                <img
                  src={marca.logo}
                  alt={marca.nombre}
                  className="max-h-20 max-w-[220px] object-contain opacity-80 grayscale brightness-200 contrast-125 transition duration-300 hover:scale-105 hover:opacity-100 hover:grayscale-0"
                />
              </div>
            ))}
          </div>

          <div className="mx-auto mt-16 h-px max-w-5xl bg-gradient-to-r from-transparent via-green-400/40 to-transparent" />
        </div>
      </section>

      {/* VIDEOS DESTACADOS */}
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
                  {/* VIDEO VERTICAL */}
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

                  {/* CONTENIDO */}
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

     {/* EMPRESA */}
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

      {/* PRODUCTOS DESTACADOS */}
      <section id="productos" className="bg-gray-950 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.4em] text-green-400">
                Selección BlackCore
              </p>

              <h2 className="mt-4 text-4xl font-black md:text-5xl">
                Productos destacados
              </h2>

              <p className="mt-4 max-w-2xl text-gray-400">
                Una selección de productos premium elegidos por rendimiento,
                innovación, diseño y valor para setups de alto nivel.
              </p>
            </div>

            <Link
              to="/catalogo"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-green-400/50 px-6 py-3 font-black text-green-400 transition hover:bg-green-400 hover:text-black"
            >
              Ver catálogo completo
              <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {productosTop.length === 0 ? (
              <div className="col-span-full rounded-3xl border border-white/10 bg-black p-12 text-center">
                <p className="text-xl font-bold text-gray-300">
                  Cargando productos destacados...
                </p>
              </div>
            ) : (
              productosTop.map(prod => <ProductCard key={prod.id} prod={prod} />)
            )}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/catalogo"
              className="inline-flex items-center gap-2 rounded-full bg-green-400 px-10 py-4 font-black text-black transition hover:bg-green-300"
            >
              Ver más productos
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* NOTICIAS */}
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

      <footer className="bg-black px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-black tracking-widest text-green-400">
              BLACK<span className="text-white">CORE</span>
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Tienda gamer corporativa — Proyecto académico de comercio electrónico.
            </p>
          </div>

          <p className="text-sm text-gray-500">
            © 2026 BlackCore Gaming Corporation.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;