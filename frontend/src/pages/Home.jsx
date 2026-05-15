import { useState, useEffect } from 'react';
import { getProductos, getNoticias } from '../services/api';


import BrandStrip from '../components/home/BrandStrip';
import StatsSection from '../components/home/StatsSection';
import VideoShowcase from '../components/home/VideoShowcase';
import CompanySection from '../components/home/CompanySection';
import HeroCarousel from '../components/home/HeroCarousel';
import FeaturedProducts from '../components/home/FeaturedProducts';
import NewsSection from '../components/home/NewsSection';
import Footer from '../components/home/Footer';
import Navbar from '../components/Navbar';


function Home() {
  const [productos, setProductos] = useState([]);
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
    getProductos()
      .then(data => setProductos(data))
      .catch(err => console.error('Error al cargar productos:', err));
  }, []);

  useEffect(() => {
    getNoticias()
      .then(data => {
        if (Array.isArray(data)) {
          setNoticias(data);
        } else {
          console.error('Respuesta inesperada de noticias:', data);
        }
      })
      .catch(err => console.error('Error al cargar noticias:', err));
  }, []);


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


  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <HeroCarousel slides={slides} />
      <StatsSection />
      <BrandStrip marcas={marcas} />
      <VideoShowcase videos={videos} />
      <CompanySection />
      <FeaturedProducts productosTop={productosTop} />
      <NewsSection noticias={noticias} />
      <Footer />
    </div>
  );
}

export default Home;