import { useParams, Link } from 'react-router-dom';

function DetalleProducto() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-black px-6 py-32 text-white">
      <div className="mx-auto max-w-7xl">
        <Link to="/catalogo" className="font-bold text-green-400">
          Volver al catálogo
        </Link>

        <h1 className="mt-8 text-4xl font-black">
          Detalle del producto
        </h1>

        <p className="mt-4 text-gray-400">
          Producto ID: {id}
        </p>
      </div>
    </div>
  );
}

export default DetalleProducto;