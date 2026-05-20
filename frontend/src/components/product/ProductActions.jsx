import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';

function ProductActions({ producto, varianteSeleccionada, precioActual, stockActual }) {
  const { agregarAlCarrito } = useCart();

  const manejarAgregarCarrito = () => {
    const item = {
      itemId: `${producto.id}-${varianteSeleccionada?.id || 'principal'}`,
      productoId: producto.id,
      varianteId: varianteSeleccionada?.id || null,
      nombre: producto.nombre,
      variante: varianteSeleccionada?.nombre || null,
      color: varianteSeleccionada?.color || null,
      imagen: varianteSeleccionada?.imagen || producto.imagen,
      precio: Number(precioActual),
      stock: Number(stockActual)
    };

    agregarAlCarrito(item);
  };

  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2">
      <button
        onClick={manejarAgregarCarrito}
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