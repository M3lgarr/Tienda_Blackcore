import { Link } from 'react-router-dom';
import { Menu, UserRound, ArrowLeft } from 'lucide-react';

function AdminHeader({ titulo = 'Panel de gestión', subtitulo = 'Administración interna de BlackCore' }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/85 px-6 py-5 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-green-400">
            BlackCore Admin
          </p>

          <h1 className="mt-1 text-2xl font-black text-white md:text-3xl">
            {titulo}
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            {subtitulo}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="hidden items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-bold text-gray-300 transition hover:border-green-400 hover:text-green-400 md:flex"
          >
            <ArrowLeft size={17} />
            Tienda
          </Link>

          <button
            className="flex items-center gap-2 rounded-full border border-green-400/40 px-4 py-2 text-sm font-bold text-green-400 transition hover:bg-green-400 hover:text-black"
            title="Cuenta de usuario"
          >
            <UserRound size={18} />
            Cuenta
          </button>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 lg:hidden"
            title="Menú"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;