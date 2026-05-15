import { useState, useEffect } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { getProductos, getCategorias } from '../services/api';

function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [precioMin, setPrecioMin] = useState('');
  const [precioMax, setPrecioMax] = useState('');
  const [orden, setOrden] = useState('');
  useEffect(() => {
    getProductos()
      .then(data => setProductos(data))
      .catch(err => console.error('Error al cargar productos:', err));

    getCategorias()
      .then(data => setCategorias(data))
      .catch(err => console.error('Error al cargar categorías:', err));
  }, []);

  const productosFiltrados = productos
  .filter(prod => {
    const coincideCategoria =
      categoriaSeleccionada === '' ||
      prod.categoriaId === parseInt(categoriaSeleccionada);

    const textoBusqueda = busqueda.toLowerCase();

    const coincideBusqueda =
      prod.nombre?.toLowerCase().includes(textoBusqueda) ||
      prod.descripcion?.toLowerCase().includes(textoBusqueda) ||
      prod.categoria?.nombre?.toLowerCase().includes(textoBusqueda);

    const precioProducto = Number(prod.precio);

    const coincidePrecioMin =
      precioMin === '' || precioProducto >= Number(precioMin);

    const coincidePrecioMax =
      precioMax === '' || precioProducto <= Number(precioMax);

    return (
      coincideCategoria &&
      coincideBusqueda &&
      coincidePrecioMin &&
      coincidePrecioMax
    );
  })
  .sort((a, b) => {
    if (orden === 'precio-asc') {
      return Number(a.precio) - Number(b.precio);
    }

    if (orden === 'precio-desc') {
      return Number(b.precio) - Number(a.precio);
    }

    if (orden === 'nombre-asc') {
      return a.nombre.localeCompare(b.nombre);
    }

    if (orden === 'stock-desc') {
      return Number(b.stock) - Number(a.stock);
    }

    return 0;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="px-6 pb-16 pt-32">
        <div className="mx-auto max-w-7xl">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-green-400 hover:text-green-300"
          >
            <ArrowLeft size={18} />
            Volver al inicio
          </Link>

          <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.4em] text-green-400">
                Catálogo completo
              </p>

              <h1 className="mt-4 text-5xl font-black md:text-6xl">
                Todos los productos
              </h1>

              <p className="mt-5 max-w-2xl text-gray-400">
                Explora el catálogo completo de BlackCore. Filtra por categoría,
                busca por nombre o características y revisa disponibilidad.
              </p>
            </div>

            <div className="rounded-2xl border border-green-400/20 bg-green-400/10 px-6 py-4 text-sm font-bold text-green-300">
              {productosFiltrados.length} productos encontrados
            </div>
          </div>

        <div className="mb-10 rounded-3xl border border-white/10 bg-gray-950 p-5 backdrop-blur">
        <div className="grid gap-4 lg:grid-cols-[1.3fr_240px_180px_180px_220px]">
            <div className="relative">
            <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
                type="text"
                placeholder="Buscar productos, marcas o características..."
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-black px-12 py-4 text-white placeholder-gray-500 outline-none transition focus:border-green-400"
            />
            </div>

            <select
            value={categoriaSeleccionada}
            onChange={e => setCategoriaSeleccionada(e.target.value)}
            className="rounded-2xl border border-white/10 bg-black px-5 py-4 text-white outline-none transition focus:border-green-400"
            >
            <option value="">Todas las categorías</option>
            {categorias.map(cat => (
                <option key={cat.id} value={cat.id}>
                {cat.nombre}
                </option>
            ))}
            </select>

            <input
            type="number"
            placeholder="Precio min."
            value={precioMin}
            onChange={e => setPrecioMin(e.target.value)}
            className="rounded-2xl border border-white/10 bg-black px-5 py-4 text-white placeholder-gray-500 outline-none transition focus:border-green-400"
            />

            <input
            type="number"
            placeholder="Precio max."
            value={precioMax}
            onChange={e => setPrecioMax(e.target.value)}
            className="rounded-2xl border border-white/10 bg-black px-5 py-4 text-white placeholder-gray-500 outline-none transition focus:border-green-400"
            />

            <select
            value={orden}
            onChange={e => setOrden(e.target.value)}
            className="rounded-2xl border border-white/10 bg-black px-5 py-4 text-white outline-none transition focus:border-green-400"
            >
            <option value="">Ordenar por</option>
            <option value="precio-asc">Precio: menor a mayor</option>
            <option value="precio-desc">Precio: mayor a menor</option>
            <option value="nombre-asc">Nombre: A-Z</option>
            <option value="stock-desc">Mayor stock</option>
            </select>
        </div>

        <div className="mt-4 flex flex-col justify-between gap-3 border-t border-white/10 pt-4 text-sm text-gray-400 md:flex-row md:items-center">
            <p>
            Mostrando{' '}
            <span className="font-bold text-green-400">
                {productosFiltrados.length}
            </span>{' '}
            productos disponibles.
            </p>

            <button
            onClick={() => {
                setBusqueda('');
                setCategoriaSeleccionada('');
                setPrecioMin('');
                setPrecioMax('');
                setOrden('');
            }}
            className="w-fit rounded-full border border-white/10 px-5 py-2 font-bold text-gray-300 transition hover:border-green-400 hover:text-green-400"
            >
            Limpiar filtros
            </button>
        </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {productosFiltrados.length === 0 ? (
            <div className="col-span-full rounded-3xl border border-white/10 bg-gray-950 p-12 text-center">
            <p className="text-xl font-bold text-gray-300">
                No se encontraron productos.
            </p>
            <p className="mt-2 text-gray-500">
                Prueba con otra categoría, búsqueda o rango de precio.
            </p>
            </div>
        ) : (
            productosFiltrados.map(prod => (
            <ProductCard key={prod.id} prod={prod} />
            ))
        )}
        </div>
        </div>
      </section>
    </div>
  );
}

export default Catalogo;