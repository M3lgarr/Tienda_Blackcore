import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../ProductCard';

function FeaturedProducts({ productosTop }) {
  return (
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
            productosTop.map(prod => (
              <ProductCard key={prod.id} prod={prod} />
            ))
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
  );
}

export default FeaturedProducts;