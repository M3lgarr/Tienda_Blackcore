import { Search } from 'lucide-react';

function CatalogFilters({
  busqueda,
  setBusqueda,
  categoriaSeleccionada,
  setCategoriaSeleccionada,
  categorias,
  precioMin,
  setPrecioMin,
  precioMax,
  setPrecioMax,
  orden,
  setOrden,
  limpiarFiltros,
  totalProductos
}) {
  return (
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
            {totalProductos}
          </span>{' '}
          productos disponibles.
        </p>

        <button
          onClick={limpiarFiltros}
          className="w-fit rounded-full border border-white/10 px-5 py-2 font-bold text-gray-300 transition hover:border-green-400 hover:text-green-400"
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  );
}

export default CatalogFilters;