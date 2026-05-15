import ProductCard from '../ProductCard';

function ProductGrid({ productos }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {productos.length === 0 ? (
        <div className="col-span-full rounded-3xl border border-white/10 bg-gray-950 p-12 text-center">
          <p className="text-xl font-bold text-gray-300">
            No se encontraron productos.
          </p>

          <p className="mt-2 text-gray-500">
            Prueba con otra categoría, búsqueda o rango de precio.
          </p>
        </div>
      ) : (
        productos.map(prod => (
          <ProductCard key={prod.id} prod={prod} />
        ))
      )}
    </div>
  );
}

export default ProductGrid;