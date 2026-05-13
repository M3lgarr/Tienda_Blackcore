import { Link } from 'react-router-dom';
function ProductCard({ prod }) {
  const formatoPrecio = precio => {
    return Number(precio).toLocaleString('es-GT', {
      style: 'currency',
      currency: 'GTQ',
      minimumFractionDigits: 2
    });
  };

  return (
    <article className="group overflow-hidden rounded-3xl border border-white/10 bg-gray-950 shadow-xl transition duration-300 hover:-translate-y-2 hover:border-green-400/70 hover:shadow-[0_0_35px_rgba(0,255,136,0.18)]">
      <div className="relative h-56 overflow-hidden bg-gray-900">
        <img
          src={`http://localhost:3001/imagenes/${prod.imagen}`}
          alt={prod.nombre}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        <span className="absolute left-4 top-4 rounded-full border border-green-400/30 bg-black/70 px-3 py-1 text-xs font-bold text-green-400 backdrop-blur">
          {prod.categoria?.nombre || 'Sin categoría'}
        </span>
      </div>

      <div className="p-5">
        <h3 className="line-clamp-1 text-xl font-black">
          {prod.nombre}
        </h3>

        <p className="mt-3 line-clamp-3 min-h-[72px] text-sm leading-relaxed text-gray-400">
          {prod.descripcion}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-2xl font-black text-green-400">
            {formatoPrecio(prod.precio)}
          </span>

          <span
            className={`rounded-full px-3 py-1 text-xs font-bold ${
              prod.stock > 5
                ? 'bg-green-400/10 text-green-300'
                : prod.stock > 0
                ? 'bg-yellow-400/10 text-yellow-300'
                : 'bg-red-400/10 text-red-300'
            }`}
          >
            {prod.stock > 0 ? `${prod.stock} stock` : 'Agotado'}
          </span>
        </div>
          <Link
            to={`/producto/${prod.id}`}
            className="mt-5 block w-full rounded-2xl bg-white px-5 py-3 text-center font-black text-black transition hover:bg-green-400" >
            Ver detalle
          </Link>
      </div>
    </article>
  );
}

export default ProductCard;