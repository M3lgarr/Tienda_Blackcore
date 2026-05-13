import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ShoppingCart,
  PackageCheck,
  ShieldCheck,
  Truck,
  RotateCcw
} from 'lucide-react';
import Navbar from '../components/Navbar';

function DetalleProducto() {
  const { id } = useParams();

  const [producto, setProducto] = useState(null);
  const [varianteSeleccionada, setVarianteSeleccionada] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3001/api/productos/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('No se pudo cargar el producto');
        }

        return res.json();
      })
      .then(data => {
        setProducto(data);

        if (data.variantes && data.variantes.length > 0) {
          setVarianteSeleccionada(data.variantes[0]);
        }

        setCargando(false);
      })
      .catch(err => {
        console.error('Error al cargar detalle del producto:', err);
        setError('No se pudo cargar el detalle del producto.');
        setCargando(false);
      });
  }, [id]);

  const formatoPrecio = precio => {
    return Number(precio).toLocaleString('es-GT', {
      style: 'currency',
      currency: 'GTQ',
      minimumFractionDigits: 2
    });
  };

  if (cargando) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />

        <div className="flex min-h-screen items-center justify-center px-6 pt-24">
          <div className="rounded-3xl border border-white/10 bg-gray-950 p-10 text-center">
            <p className="text-xl font-black text-green-400">
              Cargando producto...
            </p>
            <p className="mt-2 text-gray-500">
              Obteniendo información del catálogo BlackCore.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !producto) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />

        <div className="flex min-h-screen items-center justify-center px-6 pt-24">
          <div className="rounded-3xl border border-white/10 bg-gray-950 p-10 text-center">
            <p className="text-xl font-black text-red-400">
              Producto no disponible
            </p>
            <p className="mt-2 text-gray-500">
              {error || 'No se encontró información del producto.'}
            </p>

            <Link
              to="/catalogo"
              className="mt-6 inline-flex rounded-full bg-green-400 px-6 py-3 font-black text-black transition hover:bg-green-300"
            >
              Volver al catálogo
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const imagenActual = varianteSeleccionada?.imagen || producto.imagen;
  const precioActual = varianteSeleccionada?.precio || producto.precio;
  const stockActual = varianteSeleccionada?.stock ?? producto.stock;
  const tieneVariantes = producto.variantes && producto.variantes.length > 0;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="px-6 pb-20 pt-32">
        <div className="mx-auto max-w-7xl">
          <Link
            to="/catalogo"
            className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-green-400 transition hover:text-green-300"
          >
            <ArrowLeft size={18} />
            Volver al catálogo
          </Link>

          <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            {/* Imagen */}
            <div className="rounded-[2rem] border border-white/10 bg-gray-950 p-5 shadow-2xl">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-black">
                <img
                  src={`http://localhost:3001/imagenes/${imagenActual}`}
                  alt={producto.nombre}
                  className="h-full w-full object-cover transition duration-500"
                />

                <div className="absolute left-5 top-5 rounded-full border border-green-400/30 bg-black/70 px-4 py-2 text-xs font-bold uppercase tracking-widest text-green-400 backdrop-blur">
                  {producto.categoria?.nombre || 'Producto Gamer'}
                </div>
              </div>
            </div>

            {/* Información */}
            <div className="rounded-[2rem] border border-white/10 bg-gray-950 p-8 shadow-2xl lg:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.4em] text-green-400">
                Producto BlackCore
              </p>

              <h1 className="mt-5 text-4xl font-black leading-tight md:text-5xl">
                {producto.nombre}
              </h1>

              <p className="mt-5 leading-relaxed text-gray-400">
                {producto.descripcion}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <span className="text-4xl font-black text-green-400">
                  {formatoPrecio(precioActual)}
                </span>

                <span
                  className={`rounded-full px-4 py-2 text-sm font-bold ${
                    stockActual > 5
                      ? 'bg-green-400/10 text-green-300'
                      : stockActual > 0
                      ? 'bg-yellow-400/10 text-yellow-300'
                      : 'bg-red-400/10 text-red-300'
                  }`}
                >
                  {stockActual > 0 ? `${stockActual} unidades disponibles` : 'Agotado'}
                </span>
              </div>

              {/* Variantes */}
              {tieneVariantes && (
                <div className="mt-10">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-black">
                      Selecciona color
                    </h2>

                    <span className="text-sm text-gray-500">
                      {varianteSeleccionada?.nombre}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {producto.variantes.map(variante => {
                      const activa = varianteSeleccionada?.id === variante.id;

                      return (
                        <button
                          key={variante.id}
                          onClick={() => setVarianteSeleccionada(variante)}
                          className={`rounded-2xl border px-5 py-3 text-sm font-black transition ${
                            activa
                              ? 'border-green-400 bg-green-400 text-black'
                              : 'border-white/10 bg-black text-gray-300 hover:border-green-400 hover:text-green-400'
                          }`}
                        >
                          {variante.nombre || variante.color}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Acciones */}
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <button
                  disabled={stockActual <= 0}
                  className={`inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-4 font-black transition ${
                    stockActual > 0
                      ? 'bg-green-400 text-black hover:bg-green-300'
                      : 'cursor-not-allowed bg-gray-800 text-gray-500'
                  }`}
                >
                  <ShoppingCart size={20} />
                  Agregar al carrito
                </button>

                <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 px-6 py-4 font-black text-gray-300 transition hover:border-green-400 hover:text-green-400">
                  Comprar ahora
                </button>
              </div>

              {/* Beneficios */}
              <div className="mt-10 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
                <div>
                  <PackageCheck className="text-green-400" size={24} />
                  <p className="mt-3 text-sm font-bold text-white">
                    Stock verificado
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Inventario por variante.
                  </p>
                </div>

                <div>
                  <Truck className="text-green-400" size={24} />
                  <p className="mt-3 text-sm font-bold text-white">
                    Envío local
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Preparado para Guatemala.
                  </p>
                </div>

                <div>
                  <ShieldCheck className="text-green-400" size={24} />
                  <p className="mt-3 text-sm font-bold text-white">
                    Compra segura
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Plataforma protegida.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Descripción inferior */}
          <section className="mt-12 rounded-[2rem] border border-white/10 bg-gray-950 p-8">
            <div className="flex items-center gap-3">
              <RotateCcw className="text-green-400" size={24} />
              <h2 className="text-2xl font-black">
                Información del producto
              </h2>
            </div>
            <p className="mt-5 max-w-4xl leading-relaxed text-gray-400">
              {producto.descripcion}
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

export default DetalleProducto;