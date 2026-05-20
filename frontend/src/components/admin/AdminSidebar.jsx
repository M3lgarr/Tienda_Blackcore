import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Tags,
  Palette,
  ShoppingBag,
  ArrowLeft
} from 'lucide-react';

function AdminSidebar() {
  const location = useLocation();

  const links = [
    {
      nombre: 'Resumen',
      ruta: '/admin',
      icono: LayoutDashboard
    },
    {
      nombre: 'Productos',
      ruta: '/admin/productos',
      icono: Package
    },
    {
      nombre: 'Categorías',
      ruta: '/admin/categorias',
      icono: Tags
    },
    {
      nombre: 'Variantes',
      ruta: '/admin/variantes',
      icono: Palette
    },
    {
      nombre: 'Pedidos',
      ruta: '/admin/pedidos',
      icono: ShoppingBag
    }
  ];

  return (
    <aside className="hidden min-h-screen w-72 border-r border-white/10 bg-black/95 px-5 py-6 lg:block">
      <div className="mb-10">
        <h2 className="text-2xl font-black tracking-widest text-green-400">
          BLACK<span className="text-white">CORE</span>
        </h2>

        <p className="mt-1 text-xs uppercase tracking-[0.35em] text-gray-500">
          Gestión interna
        </p>
      </div>

      <nav className="space-y-2">
        {links.map(item => {
          const Icono = item.icono;
          const activo = location.pathname === item.ruta;

          return (
            <Link
              key={item.ruta}
              to={item.ruta}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 font-bold transition ${
                activo
                  ? 'bg-green-400 text-black'
                  : 'text-gray-400 hover:bg-white/5 hover:text-green-400'
              }`}
            >
              <Icono size={20} />
              {item.nombre}
            </Link>
          );
        })}
      </nav>

      <div className="mt-10 border-t border-white/10 pt-6">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 font-bold text-gray-400 transition hover:border-green-400 hover:text-green-400"
        >
          <ArrowLeft size={20} />
          Volver a tienda
        </Link>
      </div>
    </aside>
  );
}

export default AdminSidebar;