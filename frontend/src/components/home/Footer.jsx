function Footer() {
  return (
    <footer className="bg-black px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-black tracking-widest text-green-400">
            BLACK<span className="text-white">CORE</span>
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Tienda gamer corporativa — Proyecto académico de comercio electrónico.
          </p>
        </div>

        <p className="text-sm text-gray-500">
          © 2026 BlackCore Gaming Corporation.
        </p>
      </div>
    </footer>
  );
}

export default Footer;