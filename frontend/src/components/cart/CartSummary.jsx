import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Trash2 } from 'lucide-react';

function CartSummary({ totalProductos, subtotal, total, vaciarCarrito }) {
  const formatoPrecio = precio => {
    return Number(precio).toLocaleString('es-GT', {
      style: 'currency',
      currency: 'GTQ',
      minimumFractionDigits: 2
    });
  };

  return (
    <aside className="rounded-[2rem] border border-white/10 bg-gray-950 p-6 shadow-2xl">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-400 text-black">
          <ShoppingBag size={24} />
        </div>

        <div>
          <h2 className="text-2xl font-black">
            Resumen del pedido
          </h2>

          <p className="text-sm text-gray-500">
            {totalProductos} producto(s) en carrito
          </p>
        </div>
      </div>

      <div className="space-y-4 border-t border-white/10 pt-6">
        <div className="flex justify-between text-gray-400">
          <span>Subtotal</span>
          <span className="font-bold text-white">
            {formatoPrecio(subtotal)}
          </span>
        </div>

        <div className="flex justify-between text-gray-400">
          <span>Envío</span>
          <span className="font-bold text-green-400">
            Simulado
          </span>
        </div>

        <div className="flex justify-between border-t border-white/10 pt-4">
          <span className="text-lg font-black text-white">
            Total
          </span>

          <span className="text-2xl font-black text-green-400">
            {formatoPrecio(total)}
          </span>
        </div>
      </div>

      <Link
        to="/checkout"
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-green-400 px-5 py-4 font-black text-black transition hover:bg-green-300"
      >
        Continuar al pago
        <ArrowRight size={20} />
      </Link>

      <button
        onClick={vaciarCarrito}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-red-400/30 px-5 py-4 font-black text-red-300 transition hover:bg-red-400 hover:text-black"
      >
        <Trash2 size={19} />
        Vaciar carrito
      </button>

      <p className="mt-5 text-center text-xs leading-relaxed text-gray-500">
        El proceso de pago será simulado para fines académicos del Sprint 2.
      </p>
    </aside>
  );
}

export default CartSummary;