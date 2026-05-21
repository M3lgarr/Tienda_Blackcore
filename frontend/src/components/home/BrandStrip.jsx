function BrandStrip({ marcas }) {
  return (
    <section className="keep-dark bg-black px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.5em] text-green-400">
            Marcas asociadas
          </p>

          <h2 className="mx-auto mt-5 max-w-5xl text-4xl font-black leading-tight md:text-5xl">
            Tecnología respaldada por marcas líderes
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-gray-400">
            BlackCore integra líneas de hardware, periféricos y componentes utilizados
            como referencia dentro del ecosistema gamer de alto rendimiento.
          </p>
        </div>

        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-20 gap-y-14">
          {marcas.map((marca, index) => (
            <div
              key={index}
              className="flex min-h-24 min-w-[180px] items-center justify-center opacity-80 transition duration-300 hover:opacity-100"
            >
              <img
                src={marca.logo}
                alt={marca.nombre}
                className="max-h-20 max-w-[220px] object-contain opacity-80 grayscale brightness-200 contrast-125 transition duration-300 hover:scale-105 hover:opacity-100 hover:grayscale-0"
              />
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 h-px max-w-5xl bg-gradient-to-r from-transparent via-green-400/40 to-transparent" />
      </div>
    </section>
  );
}

export default BrandStrip;