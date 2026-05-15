import { ShoppingCart } from 'lucide-react';

function ProductActions({ stockActual }) {
  return (
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
  );
}

export default ProductActions;