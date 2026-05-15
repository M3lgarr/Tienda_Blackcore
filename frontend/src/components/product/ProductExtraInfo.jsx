import { RotateCcw } from 'lucide-react';

function ProductExtraInfo({ producto }) {
  return (
    <section className="mt-12 rounded-[2rem] border border-white/10 bg-gray-950 p-8">
      <div className="flex items-center gap-3">
        <RotateCcw className="text-green-400" size={24} />

        <h2 className="text-2xl font-black">
          Información del producto
        </h2>
      </div>

      <p className="mt-5 max-w-4xl leading-relaxed text-gray-400">
        {producto.descripcion}
      </p>
    </section>
  );
}

export default ProductExtraInfo;