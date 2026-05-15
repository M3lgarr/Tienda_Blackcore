function ProductVariants({
  producto,
  varianteSeleccionada,
  setVarianteSeleccionada
}) {
  const tieneVariantes = producto.variantes && producto.variantes.length > 0;

  if (!tieneVariantes) {
    return null;
  }

  return (
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
  );
}

export default ProductVariants;