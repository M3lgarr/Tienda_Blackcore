import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingCart,
  UserRound,
  Search,
  Menu,
  X
} from 'lucide-react';

function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* LOGO */}
        <Link to="/" onClick={cerrarMenu} className="flex flex-col">
          <h1 className="text-2xl font-black tracking-widest text-green-400 drop-shadow-[0_0_10px_#00ff88]">
            BLACK<span className="text-white">CORE</span>
          </h1>
          <p className="text-xs uppercase tracking-[0.35em] text-gray-500">
            Gaming Corporation
          </p>
        </Link>

        {/* LINKS DESKTOP */}
        <div className="hidden gap-8 text-sm font-medium text-gray-300 lg:flex">
          <Link to="/" className="transition hover:text-green-400">
            Inicio
          </Link>

          <Link to="/catalogo" className="transition hover:text-green-400">
            Catálogo
          </Link>

          <a href="/#empresa" className="transition hover:text-green-400">
            Corporación
          </a>

          <a href="/#noticias" className="transition hover:text-green-400">
            Noticias
          </a>
        </div>

        {/* ACCIONES DERECHA */}
        <div className="flex items-center gap-3">
          <button
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition hover:border-green-400 hover:text-green-400 md:flex"
            title="Buscar"
          >
            <Search size={19} />
          </button>

          <button
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition hover:border-green-400 hover:text-green-400"
            title="Carrito de compras"
          >
            <ShoppingCart size={20} />

            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-400 text-xs font-black text-black">
              0
            </span>
          </button>

          <button
            className="hidden items-center gap-2 rounded-full border border-green-400/40 px-4 py-2 text-sm font-bold text-green-400 transition hover:bg-green-400 hover:text-black md:flex"
            title="Cuenta de usuario"
          >
            <UserRound size={18} />
            Cuenta
          </button>

          {/* BOTÓN MENÚ MÓVIL */}
          <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition hover:border-green-400 hover:text-green-400 lg:hidden"
            title="Menú"
          >
            {menuAbierto ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* MENÚ MÓVIL */}
      {menuAbierto && (
        <div className="border-t border-white/10 bg-black/95 px-6 py-5 backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-4">
            <Link
              to="/"
              onClick={cerrarMenu}
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 font-bold text-gray-300 transition hover:border-green-400 hover:text-green-400"
            >
              Inicio
            </Link>

            <Link
              to="/catalogo"
              onClick={cerrarMenu}
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 font-bold text-gray-300 transition hover:border-green-400 hover:text-green-400"
            >
              Catálogo
            </Link>

            <a
              href="/#empresa"
              onClick={cerrarMenu}
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 font-bold text-gray-300 transition hover:border-green-400 hover:text-green-400"
            >
              Corporación
            </a>

            <a
              href="/#noticias"
              onClick={cerrarMenu}
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 font-bold text-gray-300 transition hover:border-green-400 hover:text-green-400"
            >
              Noticias
            </a>

            <button
              className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-green-400 px-5 py-4 font-black text-black transition hover:bg-green-300"
            >
              <UserRound size={18} />
              Cuenta
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;