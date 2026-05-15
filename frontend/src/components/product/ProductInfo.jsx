function ProductInfo({ producto, precioActual, stockActual, formatoPrecio }) {
  return (
    <>
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
    </>
  );
}

export default ProductInfo;