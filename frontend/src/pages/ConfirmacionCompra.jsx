import { Link } from 'react-router-dom';
import { CheckCircle, Home, ShoppingBag } from 'lucide-react';
import Navbar from '../components/Navbar';

function ConfirmacionCompra() {
  const pedidoGuardado = localStorage.getItem('blackcore_ultimo_pedido');
  const pedido = pedidoGuardado ? JSON.parse(pedidoGuardado) : null;

  const formatoPrecio = precio => {
    return Number(precio).toLocaleString('es-GT', {
      style: 'currency',
      currency: 'GTQ',
      minimumFractionDigits: 2
    });
  };

  if (!pedido) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />

        <main className="px-6 pb-20 pt-32">
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-gray-950 p-10 text-center">
            <h1 className="text-4xl font-black">
              No hay una compra registrada
            </h1>

            <p className="mt-4 text-gray-400">
              Realiza una compra simulada para ver la confirmación del pedido.
            </p>

            <Link
              to="/catalogo"
              className="mt-8 inline-flex rounded-full bg-green-400 px-8 py-3 font-black text-black transition hover:bg-green-300"
            >
              Ver catálogo
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="px-6 pb-20 pt-32">
        <div className="mx-auto max-w-5xl">
          <section className="rounded-[2rem] border border-white/10 bg-gray-950 p-10 text-center shadow-2xl">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-400 text-black">
              <CheckCircle size={52} />
            </div>

            <p className="mt-8 text-sm font-bold uppercase tracking-[0.4em] text-green-400">
              Compra confirmada
            </p>

            <h1 className="mt-4 text-4xl font-black md:text-5xl">
              Pedido realizado correctamente
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-gray-400">
              Tu compra fue registrada de forma simulada para el Sprint 2 de BlackCore.
              No se realizó ningún cargo real.
            </p>

            <div className="mx-auto mt-10 grid max-w-3xl gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-black p-5">
                <p className="text-sm text-gray-500">No. Pedido</p>
                <p className="mt-2 font-black text-green-400">
                  {pedido.id}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black p-5">
                <p className="text-sm text-gray-500">Productos</p>
                <p className="mt-2 font-black text-white">
                  {pedido.totalProductos}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black p-5">
                <p className="text-sm text-gray-500">Total</p>
                <p className="mt-2 font-black text-green-400">
                  {formatoPrecio(pedido.total)}
                </p>
              </div>
            </div>

            <div className="mt-10 rounded-[1.5rem] border border-white/10 bg-black p-6 text-left">
              <div className="mb-5 flex items-center gap-3">
                <ShoppingBag className="text-green-400" size={24} />

                <h2 className="text-2xl font-black">
                  Resumen del pedido
                </h2>
              </div>

              <div className="space-y-3">
                {pedido.productos.map(item => (
                  <div
                    key={item.itemId}
                    className="flex flex-col justify-between gap-2 rounded-2xl bg-gray-950 p-4 md:flex-row md:items-center"
                  >
                    <div>
                      <p className="font-bold text-white">
                        {item.nombre}
                      </p>

                      {item.variante && (
                        <p className="text-sm text-green-400">
                          Variante: {item.variante}
                        </p>
                      )}

                      <p className="text-sm text-gray-500">
                        Cantidad: {item.cantidad}
                      </p>
                    </div>

                    <p className="font-black text-green-400">
                      {formatoPrecio(Number(item.precio) * item.cantidad)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-green-400 px-8 py-3 font-black text-black transition hover:bg-green-300"
              >
                <Home size={20} />
                Volver al inicio
              </Link>

              <Link
                to="/catalogo"
                className="inline-flex items-center justify-center rounded-full border border-white/10 px-8 py-3 font-black text-gray-300 transition hover:border-green-400 hover:text-green-400"
              >
                Seguir comprando
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default ConfirmacionCompra;