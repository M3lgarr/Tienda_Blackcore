import { useState } from 'react';
import Navbar from '../components/Navbar';
import { useUser } from '../context/UserContext';
import {
  UserRound,
  MapPin,
  CreditCard,
  Save,
  Plus,
  Trash2
} from 'lucide-react';

function Cuenta() {
  const {
    usuario,
    actualizarDatosUsuario,
    agregarDireccion,
    eliminarDireccion,
    agregarMetodoPago,
    eliminarMetodoPago
  } = useUser();

  const [datosUsuario, setDatosUsuario] = useState({
    nombre: usuario.nombre,
    email: usuario.email,
    telefono: usuario.telefono
  });

  const [direccion, setDireccion] = useState({
    alias: '',
    nombreRecibe: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    departamento: '',
    referencia: ''
  });

  const [metodoPago, setMetodoPago] = useState({
    alias: '',
    tipo: 'Tarjeta',
    titular: '',
    ultimos4: '',
    marca: '',
    vencimiento: ''
  });

  const [mensaje, setMensaje] = useState('');

  const mostrarMensaje = texto => {
    setMensaje(texto);

    setTimeout(() => {
      setMensaje('');
    }, 3000);
  };

  const manejarDatosUsuario = e => {
    const { name, value } = e.target;

    setDatosUsuario({
      ...datosUsuario,
      [name]: value
    });
  };

  const guardarDatosUsuario = e => {
    e.preventDefault();
    actualizarDatosUsuario(datosUsuario);
    mostrarMensaje('Datos de usuario actualizados correctamente.');
  };

  const manejarDireccion = e => {
    const { name, value } = e.target;

    setDireccion({
      ...direccion,
      [name]: value
    });
  };

  const guardarDireccion = e => {
    e.preventDefault();

    agregarDireccion(direccion);

    setDireccion({
      alias: '',
      nombreRecibe: '',
      telefono: '',
      direccion: '',
      ciudad: '',
      departamento: '',
      referencia: ''
    });

    mostrarMensaje('Dirección agregada correctamente.');
  };

  const manejarMetodoPago = e => {
    const { name, value } = e.target;

    setMetodoPago({
      ...metodoPago,
      [name]: value
    });
  };

  const guardarMetodoPago = e => {
    e.preventDefault();

    agregarMetodoPago(metodoPago);

    setMetodoPago({
      alias: '',
      tipo: 'Tarjeta',
      titular: '',
      ultimos4: '',
      marca: '',
      vencimiento: ''
    });

    mostrarMensaje('Método de pago agregado correctamente.');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {mensaje && (
        <div className="fixed right-6 top-24 z-[100] rounded-2xl border border-green-400/30 bg-gray-950 px-5 py-4 font-bold text-green-300 shadow-[0_0_35px_rgba(0,255,136,0.18)]">
          {mensaje}
        </div>
      )}

      <main className="px-6 pb-20 pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="text-sm font-bold uppercase tracking-[0.4em] text-green-400">
              Cuenta BlackCore
            </p>

            <h1 className="mt-4 text-4xl font-black md:text-5xl">
              Perfil del usuario
            </h1>

            <p className="mt-4 max-w-3xl text-gray-400">
              Administra tus datos personales, direcciones de entrega y métodos de pago simulados para agilizar el proceso de compra.
            </p>
          </div>

          <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-8">
              <form
                onSubmit={guardarDatosUsuario}
                className="rounded-[2rem] border border-white/10 bg-gray-950 p-6 shadow-2xl"
              >
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-400 text-black">
                    <UserRound size={24} />
                  </div>

                  <div>
                    <h2 className="text-2xl font-black">
                      Datos personales
                    </h2>
                    <p className="text-sm text-gray-500">
                      Información base del usuario simulado.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <input
                    name="nombre"
                    value={datosUsuario.nombre}
                    onChange={manejarDatosUsuario}
                    placeholder="Nombre completo"
                    required
                    className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 text-white outline-none transition focus:border-green-400"
                  />

                  <input
                    name="email"
                    value={datosUsuario.email}
                    onChange={manejarDatosUsuario}
                    type="email"
                    placeholder="Correo electrónico"
                    required
                    className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 text-white outline-none transition focus:border-green-400"
                  />

                  <input
                    name="telefono"
                    value={datosUsuario.telefono}
                    onChange={manejarDatosUsuario}
                    placeholder="Teléfono"
                    required
                    className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 text-white outline-none transition focus:border-green-400"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-green-400 px-5 py-4 font-black text-black transition hover:bg-green-300"
                >
                  <Save size={20} />
                  Guardar datos
                </button>
              </form>

              <form
                onSubmit={guardarDireccion}
                className="rounded-[2rem] border border-white/10 bg-gray-950 p-6 shadow-2xl"
              >
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-400 text-black">
                    <MapPin size={24} />
                  </div>

                  <div>
                    <h2 className="text-2xl font-black">
                      Nueva dirección
                    </h2>
                    <p className="text-sm text-gray-500">
                      Guarda una dirección de entrega.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <input
                    name="alias"
                    value={direccion.alias}
                    onChange={manejarDireccion}
                    placeholder="Alias: Casa, Trabajo, Universidad..."
                    required
                    className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 text-white outline-none transition focus:border-green-400"
                  />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <input
                      name="nombreRecibe"
                      value={direccion.nombreRecibe}
                      onChange={manejarDireccion}
                      placeholder="Nombre de quien recibe"
                      required
                      className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 text-white outline-none transition focus:border-green-400"
                    />

                    <input
                      name="telefono"
                      value={direccion.telefono}
                      onChange={manejarDireccion}
                      placeholder="Teléfono de contacto"
                      required
                      className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 text-white outline-none transition focus:border-green-400"
                    />
                  </div>

                  <textarea
                    name="direccion"
                    value={direccion.direccion}
                    onChange={manejarDireccion}
                    placeholder="Dirección completa"
                    rows="3"
                    required
                    className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 text-white outline-none transition focus:border-green-400"
                  />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <input
                      name="ciudad"
                      value={direccion.ciudad}
                      onChange={manejarDireccion}
                      placeholder="Ciudad"
                      required
                      className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 text-white outline-none transition focus:border-green-400"
                    />

                    <input
                      name="departamento"
                      value={direccion.departamento}
                      onChange={manejarDireccion}
                      placeholder="Departamento"
                      required
                      className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 text-white outline-none transition focus:border-green-400"
                    />
                  </div>

                  <input
                    name="referencia"
                    value={direccion.referencia}
                    onChange={manejarDireccion}
                    placeholder="Referencia de entrega"
                    className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 text-white outline-none transition focus:border-green-400"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-green-400/40 px-5 py-4 font-black text-green-400 transition hover:bg-green-400 hover:text-black"
                >
                  <Plus size={20} />
                  Agregar dirección
                </button>
              </form>

              <form
                onSubmit={guardarMetodoPago}
                className="rounded-[2rem] border border-white/10 bg-gray-950 p-6 shadow-2xl"
              >
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-400 text-black">
                    <CreditCard size={24} />
                  </div>

                  <div>
                    <h2 className="text-2xl font-black">
                      Nuevo método de pago
                    </h2>
                    <p className="text-sm text-gray-500">
                      Guarda un método de pago simulado.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <input
                    name="alias"
                    value={metodoPago.alias}
                    onChange={manejarMetodoPago}
                    placeholder="Alias: Tarjeta principal"
                    required
                    className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 text-white outline-none transition focus:border-green-400"
                  />

                  <select
                    name="tipo"
                    value={metodoPago.tipo}
                    onChange={manejarMetodoPago}
                    className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 text-white outline-none transition focus:border-green-400"
                  >
                    <option value="Tarjeta">Tarjeta</option>
                    <option value="Transferencia">Transferencia</option>
                  </select>

                  {metodoPago.tipo === 'Tarjeta' ? (
                    <>
                      <input
                        name="titular"
                        value={metodoPago.titular}
                        onChange={manejarMetodoPago}
                        placeholder="Titular de la tarjeta"
                        required
                        className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 text-white outline-none transition focus:border-green-400"
                      />

                      <div className="grid gap-4 sm:grid-cols-3">
                        <input
                          name="marca"
                          value={metodoPago.marca}
                          onChange={manejarMetodoPago}
                          placeholder="Visa/Mastercard"
                          required
                          className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 text-white outline-none transition focus:border-green-400"
                        />

                        <input
                          name="ultimos4"
                          value={metodoPago.ultimos4}
                          onChange={manejarMetodoPago}
                          placeholder="Últimos 4"
                          maxLength="4"
                          required
                          className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 text-white outline-none transition focus:border-green-400"
                        />

                        <input
                          name="vencimiento"
                          value={metodoPago.vencimiento}
                          onChange={manejarMetodoPago}
                          placeholder="MM/AA"
                          required
                          className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 text-white outline-none transition focus:border-green-400"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <input
                        name="banco"
                        value={metodoPago.banco || ''}
                        onChange={manejarMetodoPago}
                        placeholder="Banco"
                        required
                        className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 text-white outline-none transition focus:border-green-400"
                      />

                      <input
                        name="cuenta"
                        value={metodoPago.cuenta || ''}
                        onChange={manejarMetodoPago}
                        placeholder="Número de cuenta simulado"
                        required
                        className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 text-white outline-none transition focus:border-green-400"
                      />
                    </>
                  )}
                </div>

                <button
                  type="submit"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-green-400/40 px-5 py-4 font-black text-green-400 transition hover:bg-green-400 hover:text-black"
                >
                  <Plus size={20} />
                  Agregar método de pago
                </button>
              </form>
            </div>

            <div className="space-y-8">
              <section className="rounded-[2rem] border border-white/10 bg-gray-950 p-6 shadow-2xl">
                <h2 className="text-2xl font-black">
                  Direcciones guardadas
                </h2>

                <div className="mt-6 space-y-4">
                  {usuario.direcciones.map(item => (
                    <article
                      key={item.id}
                      className="rounded-2xl border border-white/10 bg-black p-5"
                    >
                      <div className="flex justify-between gap-4">
                        <div>
                          <p className="font-black text-green-400">
                            {item.alias}
                          </p>

                          <p className="mt-2 font-bold text-white">
                            {item.nombreRecibe}
                          </p>

                          <p className="mt-1 text-sm text-gray-400">
                            {item.direccion}
                          </p>

                          <p className="mt-1 text-sm text-gray-500">
                            {item.ciudad}, {item.departamento}
                          </p>

                          {item.referencia && (
                            <p className="mt-1 text-xs text-gray-500">
                              Ref: {item.referencia}
                            </p>
                          )}
                        </div>

                        <button
                          onClick={() => eliminarDireccion(item.id)}
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-red-400/30 text-red-300 transition hover:bg-red-400 hover:text-black"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="rounded-[2rem] border border-white/10 bg-gray-950 p-6 shadow-2xl">
                <h2 className="text-2xl font-black">
                  Métodos de pago guardados
                </h2>

                <div className="mt-6 space-y-4">
                  {usuario.metodosPago.map(item => (
                    <article
                      key={item.id}
                      className="rounded-2xl border border-white/10 bg-black p-5"
                    >
                      <div className="flex justify-between gap-4">
                        <div>
                          <p className="font-black text-green-400">
                            {item.alias}
                          </p>

                          <p className="mt-2 font-bold text-white">
                            {item.tipo}
                          </p>

                          {item.tipo === 'Tarjeta' ? (
                            <p className="mt-1 text-sm text-gray-400">
                              {item.marca} terminada en ****{item.ultimos4}
                            </p>
                          ) : (
                            <p className="mt-1 text-sm text-gray-400">
                              {item.banco} - {item.cuenta}
                            </p>
                          )}
                        </div>

                        <button
                          onClick={() => eliminarMetodoPago(item.id)}
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-red-400/30 text-red-300 transition hover:bg-red-400 hover:text-black"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Cuenta;