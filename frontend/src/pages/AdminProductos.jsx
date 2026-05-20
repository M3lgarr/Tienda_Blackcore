import { useEffect, useState } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import {
  getProductos,
  getCategorias,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  getImagenUrl
} from '../services/api';

function AdminProductos() {
  const productoInicial = {
    nombre: '',
    descripcion: '',
    precio: '',
    imagen: '',
    stock: '',
    categoriaId: ''
  };

  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [formulario, setFormulario] = useState(productoInicial);
  const [productoEditando, setProductoEditando] = useState(null);
  const [notificacion, setNotificacion] = useState(null);

  const mostrarNotificacion = (tipo, texto) => {
    setNotificacion({ tipo, texto });

    setTimeout(() => {
      setNotificacion(null);
    }, 3000);
  };

  const cargarDatos = () => {
    getProductos()
      .then(data => setProductos(data))
      .catch(err => {
        console.error('Error al cargar productos:', err);
        mostrarNotificacion('error', 'No se pudieron cargar los productos.');
      });

    getCategorias()
      .then(data => setCategorias(data))
      .catch(err => {
        console.error('Error al cargar categorías:', err);
        mostrarNotificacion('error', 'No se pudieron cargar las categorías.');
      });
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const manejarCambio = e => {
    const { name, value } = e.target;

    setFormulario({
      ...formulario,
      [name]: value
    });
  };

  const limpiarFormulario = () => {
    setFormulario(productoInicial);
    setProductoEditando(null);
  };

  const guardarProducto = async e => {
    e.preventDefault();

    const producto = {
      nombre: formulario.nombre,
      descripcion: formulario.descripcion,
      precio: Number(formulario.precio),
      imagen: formulario.imagen,
      stock: Number(formulario.stock),
      categoriaId: Number(formulario.categoriaId)
    };

    try {
      if (productoEditando) {
        await actualizarProducto(productoEditando.id, producto);
        mostrarNotificacion('editar', 'Producto actualizado correctamente.');
      } else {
        await crearProducto(producto);
        mostrarNotificacion('crear', 'Producto creado correctamente.');
      }

      limpiarFormulario();
      cargarDatos();
    } catch (error) {
      console.error('Error al guardar producto:', error);
      mostrarNotificacion('error', 'Ocurrió un error al guardar el producto.');
    }
  };

  const editarProducto = producto => {
    setProductoEditando(producto);

    setFormulario({
      nombre: producto.nombre || '',
      descripcion: producto.descripcion || '',
      precio: producto.precio || '',
      imagen: producto.imagen || '',
      stock: producto.stock || '',
      categoriaId: producto.categoriaId || ''
    });

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const borrarProducto = async id => {
    const confirmar = window.confirm('¿Deseas eliminar este producto?');

    if (!confirmar) return;

    try {
      await eliminarProducto(id);
      mostrarNotificacion('eliminar', 'Producto eliminado correctamente.');
      cargarDatos();
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      mostrarNotificacion('error', 'No se pudo eliminar el producto.');
    }
  };

  const obtenerEstiloNotificacion = tipo => {
    if (tipo === 'crear') {
      return {
        icono: '✓',
        titulo: 'Producto creado',
        clase: 'bg-green-400 text-black',
        borde: 'shadow-[0_0_35px_rgba(0,255,136,0.20)]'
      };
    }

    if (tipo === 'editar') {
      return {
        icono: '↻',
        titulo: 'Producto actualizado',
        clase: 'bg-blue-400 text-black',
        borde: 'shadow-[0_0_35px_rgba(96,165,250,0.20)]'
      };
    }

    if (tipo === 'eliminar') {
      return {
        icono: '×',
        titulo: 'Producto eliminado',
        clase: 'bg-red-400 text-black',
        borde: 'shadow-[0_0_35px_rgba(248,113,113,0.20)]'
      };
    }

    return {
      icono: '!',
      titulo: 'Notificación',
      clase: 'bg-yellow-400 text-black',
      borde: 'shadow-[0_0_35px_rgba(250,204,21,0.20)]'
    };
  };

  const estiloToast = notificacion
    ? obtenerEstiloNotificacion(notificacion.tipo)
    : null;

  return (
    <AdminLayout
      titulo="Gestión de productos"
      subtitulo="Crear, editar y eliminar productos del catálogo BlackCore."
    >
      {notificacion && (
        <div
          className={`fixed right-6 top-24 z-[100] w-[340px] animate-[slideIn_.25s_ease-out] rounded-2xl border border-white/10 bg-gray-950 p-5 ${estiloToast.borde}`}
        >
          <div className="flex items-start gap-4">
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-full text-xl font-black ${estiloToast.clase}`}
            >
              {estiloToast.icono}
            </div>

            <div className="flex-1">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-green-400">
                BlackCore
              </p>

              <h3 className="mt-1 text-lg font-black text-white">
                {estiloToast.titulo}
              </h3>

              <p className="mt-1 text-sm text-gray-400">
                {notificacion.texto}
              </p>
            </div>

            <button
              onClick={() => setNotificacion(null)}
              className="text-xl font-black text-gray-500 transition hover:text-white"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="mb-10">
        <p className="text-sm font-bold uppercase tracking-[0.4em] text-green-400">
          Panel interno
        </p>

        <h2 className="mt-4 text-4xl font-black md:text-5xl">
          Gestión de productos
        </h2>

        <p className="mt-4 max-w-3xl text-gray-400">
          Módulo para crear, editar y eliminar productos del catálogo BlackCore.
          Esta sección permite administrar la información visible en la tienda.
        </p>
      </div>

      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <form
          onSubmit={guardarProducto}
          className="rounded-[2rem] border border-white/10 bg-gray-950 p-6 shadow-2xl"
        >
          <h3 className="text-2xl font-black">
            {productoEditando ? 'Editar producto' : 'Agregar producto'}
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Completa la información del producto que será visible en el catálogo.
          </p>

          <div className="mt-6 space-y-4">
            <input
              name="nombre"
              value={formulario.nombre}
              onChange={manejarCambio}
              placeholder="Nombre del producto"
              required
              className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 text-white outline-none transition focus:border-green-400"
            />

            <textarea
              name="descripcion"
              value={formulario.descripcion}
              onChange={manejarCambio}
              placeholder="Descripción"
              rows="4"
              required
              className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 text-white outline-none transition focus:border-green-400"
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <input
                name="precio"
                value={formulario.precio}
                onChange={manejarCambio}
                type="number"
                step="0.01"
                placeholder="Precio"
                required
                className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 text-white outline-none transition focus:border-green-400"
              />

              <input
                name="stock"
                value={formulario.stock}
                onChange={manejarCambio}
                type="number"
                placeholder="Stock"
                required
                className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 text-white outline-none transition focus:border-green-400"
              />
            </div>

            <input
              name="imagen"
              value={formulario.imagen}
              onChange={manejarCambio}
              placeholder="Ruta imagen: mouse/producto.jpg"
              required
              className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 text-white outline-none transition focus:border-green-400"
            />

            <select
              name="categoriaId"
              value={formulario.categoriaId}
              onChange={manejarCambio}
              required
              className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 text-white outline-none transition focus:border-green-400"
            >
              <option value="">Selecciona categoría</option>

              {categorias.map(categoria => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              className="flex-1 rounded-2xl bg-green-400 px-5 py-4 font-black text-black transition hover:bg-green-300"
            >
              {productoEditando ? 'Actualizar producto' : 'Crear producto'}
            </button>

            {productoEditando && (
              <button
                type="button"
                onClick={limpiarFormulario}
                className="rounded-2xl border border-white/10 px-5 py-4 font-black text-gray-300 transition hover:border-green-400 hover:text-green-400"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>

        <section className="rounded-[2rem] border border-white/10 bg-gray-950 p-6 shadow-2xl">
          <div className="flex flex-col justify-between gap-3 border-b border-white/10 pb-5 md:flex-row md:items-center">
            <div>
              <h3 className="text-2xl font-black">
                Productos registrados
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Total de productos: {productos.length}
              </p>
            </div>

            <button
              onClick={cargarDatos}
              className="rounded-full border border-white/10 px-5 py-2 text-sm font-bold text-gray-300 transition hover:border-green-400 hover:text-green-400"
            >
              Actualizar lista
            </button>
          </div>

          <div className="mt-6 max-h-[720px] space-y-4 overflow-y-auto pr-2">
            {productos.length === 0 ? (
              <p className="text-gray-500">
                No hay productos registrados.
              </p>
            ) : (
              productos.map(producto => (
                <article
                  key={producto.id}
                  className="rounded-2xl border border-white/10 bg-black p-4 transition hover:border-green-400/40"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-center">
                    <img
                      src={getImagenUrl(producto.imagen)}
                      alt={producto.nombre}
                      className="h-24 w-24 rounded-xl object-cover"
                    />

                    <div className="flex-1">
                      <p className="font-black text-white">
                        {producto.nombre}
                      </p>

                      <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                        {producto.descripcion}
                      </p>

                      <div className="mt-2 flex flex-wrap gap-2 text-xs">
                        <span className="rounded-full bg-green-400/10 px-3 py-1 font-bold text-green-300">
                          Q{producto.precio}
                        </span>

                        <span className="rounded-full bg-white/10 px-3 py-1 font-bold text-gray-300">
                          Stock: {producto.stock}
                        </span>

                        <span className="rounded-full bg-white/10 px-3 py-1 font-bold text-gray-300">
                          {producto.categoria?.nombre || 'Sin categoría'}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => editarProducto(producto)}
                        className="rounded-xl border border-white/10 px-4 py-2 text-sm font-bold text-gray-300 transition hover:border-green-400 hover:text-green-400"
                      >
                        Editar
                      </button>

                      <button
                        onClick={() => borrarProducto(producto.id)}
                        className="rounded-xl border border-red-400/30 px-4 py-2 text-sm font-bold text-red-300 transition hover:bg-red-400 hover:text-black"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </section>
    </AdminLayout>
  );
}

export default AdminProductos;