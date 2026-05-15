import { getImagenUrl } from '../../services/api';

function ProductImage({ imagenActual, producto }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-gray-950 p-5 shadow-2xl">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-black">
        <img
          src={getImagenUrl(imagenActual)}
          alt={producto.nombre}
          className="h-full w-full object-cover transition duration-500"
        />

        <div className="absolute left-5 top-5 rounded-full border border-green-400/30 bg-black/70 px-4 py-2 text-xs font-bold uppercase tracking-widest text-green-400 backdrop-blur">
          {producto.categoria?.nombre || 'Producto Gamer'}
        </div>
      </div>
    </div>
  );
}

export default ProductImage;