function StatsSection() {
  const stats = [
    {
      valor: '+50',
      texto: 'Productos premium'
    },
    {
      valor: '9',
      texto: 'Categorías gamer'
    },
    {
      valor: '24/7',
      texto: 'Experiencia online'
    },
    {
      valor: 'GT',
      texto: 'Mercado guatemalteco'
    }
  ];

  return (
    <section className="border-y border-white/10 bg-gray-950 px-6 py-10">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 text-center md:grid-cols-4">
        {stats.map((item, index) => (
          <div key={index}>
            <p className="text-4xl font-black text-green-400">
              {item.valor}
            </p>

            <p className="text-sm uppercase tracking-widest text-gray-400">
              {item.texto}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StatsSection;