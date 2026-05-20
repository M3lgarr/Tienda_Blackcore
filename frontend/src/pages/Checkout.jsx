import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, ShieldCheck } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';

function Checkout() {
  const navigate = useNavigate();
  const { carrito, totalProductos, subtotal, total, vaciarCarrito } = useCart();

  const [formulario, setFormulario] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    metodoPago: 'tarjeta'
  });

  const formatoPrecio = precio => {
    return Number(precio).toLocaleString('es-GT', {
      style: 'currency',
      currency: 'GTQ',
      minimumFractionDigits: 2
    });
  };

  const manejarCambio = e => {
    const { name, value } = e.target;

    setFormulario({
      ...formulario,
      [name]: value
    });
  };

  const confirmarCompra = e => {
    e.preventDefault();

    const pedido = {
      id: `BC-${Date.now()}`,
      cliente: formulario,
      productos: carrito,
      totalProductos,
      subtotal,
      total,
      fecha: new Date().toISOString()
    };

    localStorage.setItem('blackcore_ultimo_pedido', JSON.stringify(pedido));
    vaciarCarrito();

    navigate('/confirmacion');
  };

  if (carrito.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />

        <main className="px-6 pb-20 pt-32">
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-gray-950 p-10 text-center">
            <h1 className="text-4xl font-black">
              No hay productos para pagar
            </h1>

            <p className="mt-4 text-gray-400">
              Agrega productos al carrito antes de continuar con el pago.
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
        <div className="mx-auto max-w-7xl">
          <Link
            to="/carrito"
            className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-green-400 transition hover:text-green-300"
          >
            <ArrowLeft size={18} />
            Volver al carrito
          </Link>

          <div className="mb-10">
            <p className="text-sm font-bold uppercase tracking-[0.4em] text-green-400">
              Checkout
            </p>

            <h1 className="mt-4 text-4xl font-black md:text-5xl">
              Pago simulado
            </h1>

            <p className="mt-4 max-w-3xl text-gray-400">
              Completa los datos del cliente y confirma el pedido. Este flujo es una simulación académica para el Sprint 2.
            </p>
          </div>

          <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <form
              onSubmit={confirmarCompra}
              className="rounded-[2rem] border border-white/10 bg-gray-950 p-6 shadow-2xl"
            >
              <h2 className="text-2xl font-black">
                Datos del cliente
              </h2>

              <div className="mt-6 space-y-4">
                <input
                  name="nombre"
                  value={formulario.nombre}
                  onChange={manejarCambio}
                  placeholder="Nombre completo"
                  required
                  className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 text-white outline-none transition focus:border-green-400"
                />

                <input
                  name="email"
                  value={formulario.email}
                  onChange={manejarCambio}
                  type="email"
                  placeholder="Correo electrónico"
                  required
                  className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 text-white outline-none transition focus:border-green-400"
                />

                <input
                  name="telefono"
                  value={formulario.telefono}
                  onChange={manejarCambio}
                  placeholder="Teléfono"
                  required
                  className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 text-white outline-none transition focus:border-green-400"
                />

                <textarea
                  name="direccion"
                  value={formulario.direccion}
                  onChange={manejarCambio}
                  placeholder="Dirección de entrega"
                  rows="4"
                  required
                  className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 text-white outline-none transition focus:border-green-400"
                />
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-black">
                  Método de pago
                </h2>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <label className="cursor-pointer rounded-2xl border border-green-400 bg-green-400/10 p-5">
                    <input
                      type="radio"
                      name="metodoPago"
                      value="tarjeta"
                      checked={formulario.metodoPago === 'tarjeta'}
                      onChange={manejarCambio}
                      className="mr-2"
                    />
                    Tarjeta simulada
                  </label>

                  <label className="cursor-pointer rounded-2xl border border-white/10 bg-black p-5 text-gray-300">
                    <input
                      type="radio"
                      name="metodoPago"
                      value="transferencia"
                      checked={formulario.metodoPago === 'transferencia'}
                      onChange={manejarCambio}
                      className="mr-2"
                    />
                    Transferencia simulada
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-green-400 px-5 py-4 font-black text-black transition hover:bg-green-300"
              >
                <CreditCard size={20} />
                Confirmar compra simulada
              </button>
            </form>

            <aside className="rounded-[2rem] border border-white/10 bg-gray-950 p-6 shadow-2xl">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-400 text-black">
                  <ShieldCheck size={24} />
                </div>

                <div>
                  <h2 className="text-2xl font-black">
                    Resumen final
                  </h2>

                  <p className="text-sm text-gray-500">
                    {totalProductos} producto(s)
                  </p>
                </div>
              </div>

              <div className="max-h-[360px] space-y-3 overflow-y-auto border-t border-white/10 pt-5">
                {carrito.map(item => (
                  <div
                    key={item.itemId}
                    className="flex justify-between gap-4 rounded-2xl bg-black p-4"
                  >
                    <div>
                      <p className="font-bold text-white">
                        {item.nombre}
                      </p>

                      {item.variante && (
                        <p className="text-xs text-green-400">
                          {item.variante}
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

              <div className="mt-6 space-y-4 border-t border-white/10 pt-6">
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

              <p className="mt-5 text-center text-xs leading-relaxed text-gray-500">
                No se realiza ningún cargo real. El proceso es únicamente una simulación para el proyecto BlackCore.
              </p>
            </aside>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Checkout;