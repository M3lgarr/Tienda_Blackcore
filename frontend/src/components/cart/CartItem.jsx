import { Minus, Plus, Trash2 } from 'lucide-react';
import { getImagenUrl } from '../../services/api';

function CartItem({ item, actualizarCantidad, eliminarDelCarrito }) {
  const subtotalItem = Number(item.precio) * item.cantidad;

  const formatoPrecio = precio => {
    return Number(precio).toLocaleString('es-GT', {
      style: 'currency',
      currency: 'GTQ',
      minimumFractionDigits: 2
    });
  };

  return (
    <article className="rounded-3xl border border-white/10 bg-gray-950 p-5 transition hover:border-green-400/50">
      <div className="flex flex-col gap-5 md:flex-row md:items-center">
        <img
          src={getImagenUrl(item.imagen)}
          alt={item.nombre}
          className="h-32 w-32 rounded-2xl object-cover"
        />

        <div className="flex-1">
          <p className="text-xl font-black text-white">
            {item.nombre}
          </p>

          {item.variante && (
            <p className="mt-1 text-sm font-bold text-green-400">
              Variante: {item.variante}
            </p>
          )}

          <p className="mt-2 text-sm text-gray-500">
            Precio unitario: {formatoPrecio(item.precio)}
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Stock disponible: {item.stock}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => actualizarCantidad(item.itemId, item.cantidad - 1)}
            disabled={item.cantidad <= 1}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-gray-300 transition hover:border-green-400 hover:text-green-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Minus size={18} />
          </button>

          <span className="w-10 text-center text-lg font-black">
            {item.cantidad}
          </span>

          <button
            onClick={() => actualizarCantidad(item.itemId, item.cantidad + 1)}
            disabled={item.cantidad >= item.stock}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-gray-300 transition hover:border-green-400 hover:text-green-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Plus size={18} />
          </button>
        </div>

        <div className="min-w-[130px] text-left md:text-right">
          <p className="text-sm text-gray-500">
            Subtotal
          </p>

          <p className="text-xl font-black text-green-400">
            {formatoPrecio(subtotalItem)}
          </p>
        </div>

        <button
          onClick={() => eliminarDelCarrito(item.itemId)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-red-400/30 text-red-300 transition hover:bg-red-400 hover:text-black"
          title="Eliminar producto"
        >
          <Trash2 size={19} />
        </button>
      </div>
    </article>
  );
}

export default CartItem;