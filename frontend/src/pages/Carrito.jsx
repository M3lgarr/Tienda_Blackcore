import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';

function Carrito() {
  const {
    carrito,
    eliminarDelCarrito,
    actualizarCantidad,
    vaciarCarrito,
    totalProductos,
    subtotal,
    total
  } = useCart();

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="px-6 pb-20 pt-32">
        <div className="mx-auto max-w-7xl">
          <Link
            to="/catalogo"
            className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-green-400 transition hover:text-green-300"
          >
            <ArrowLeft size={18} />
            Seguir comprando
          </Link>

          <div className="mb-10">
            <p className="text-sm font-bold uppercase tracking-[0.4em] text-green-400">
              Carrito de compras
            </p>

            <h1 className="mt-4 text-4xl font-black md:text-5xl">
              Tu carrito BlackCore
            </h1>

            <p className="mt-4 max-w-3xl text-gray-400">
              Revisa los productos agregados, ajusta cantidades y continúa al proceso de pago simulado.
            </p>
          </div>

          {carrito.length === 0 ? (
            <div className="rounded-[2rem] border border-white/10 bg-gray-950 p-12 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-400/10 text-green-400">
                <ShoppingCart size={38} />
              </div>

              <h2 className="mt-6 text-3xl font-black">
                Tu carrito está vacío
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-gray-400">
                Agrega productos desde el catálogo para comenzar tu compra.
              </p>

              <Link
                to="/catalogo"
                className="mt-8 inline-flex rounded-full bg-green-400 px-8 py-3 font-black text-black transition hover:bg-green-300"
              >
                Ver catálogo
              </Link>
            </div>
          ) : (
            <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-5">
                {carrito.map(item => (
                  <CartItem
                    key={item.itemId}
                    item={item}
                    actualizarCantidad={actualizarCantidad}
                    eliminarDelCarrito={eliminarDelCarrito}
                  />
                ))}
              </div>

              <CartSummary
                totalProductos={totalProductos}
                subtotal={subtotal}
                total={total}
                vaciarCarrito={vaciarCarrito}
              />
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

export default Carrito;