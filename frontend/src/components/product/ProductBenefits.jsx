import {
  PackageCheck,
  ShieldCheck,
  Truck
} from 'lucide-react';

function ProductBenefits() {
  return (
    <div className="mt-10 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
      <div>
        <PackageCheck className="text-green-400" size={24} />
        <p className="mt-3 text-sm font-bold text-white">
          Stock verificado
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Inventario por variante.
        </p>
      </div>

      <div>
        <Truck className="text-green-400" size={24} />
        <p className="mt-3 text-sm font-bold text-white">
          Envío local
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Preparado para Guatemala.
        </p>
      </div>

      <div>
        <ShieldCheck className="text-green-400" size={24} />
        <p className="mt-3 text-sm font-bold text-white">
          Compra segura
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Plataforma protegida.
        </p>
      </div>
    </div>
  );
}

export default ProductBenefits;