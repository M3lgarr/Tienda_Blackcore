import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProductoPorId } from '../services/api';


import ProductImage from '../components/product/ProductImage';
import ProductInfo from '../components/product/ProductInfo';
import ProductVariants from '../components/product/ProductVariants';
import ProductActions from '../components/product/ProductActions';
import ProductBenefits from '../components/product/ProductBenefits';
import ProductExtraInfo from '../components/product/ProductExtraInfo';

import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';

function DetalleProducto() {
  const { id } = useParams();

  const [producto, setProducto] = useState(null);
  const [varianteSeleccionada, setVarianteSeleccionada] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getProductoPorId(id)
      .then(data => {
        setProducto(data);

        if (data.variantes && data.variantes.length > 0) {
          setVarianteSeleccionada(data.variantes[0]);
        }

        setCargando(false);
      })
      .catch(err => {
        console.error('Error al cargar detalle del producto:', err);
        setError('No se pudo cargar el detalle del producto.');
        setCargando(false);
      });
  }, [id]);



  const formatoPrecio = precio => {
    return Number(precio).toLocaleString('es-GT', {
      style: 'currency',
      currency: 'GTQ',
      minimumFractionDigits: 2
    });
  };

  if (cargando) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />

        <div className="flex min-h-screen items-center justify-center px-6 pt-24">
          <div className="rounded-3xl border border-white/10 bg-gray-950 p-10 text-center">
            <p className="text-xl font-black text-green-400">
              Cargando producto...
            </p>
            <p className="mt-2 text-gray-500">
              Obteniendo información del catálogo BlackCore.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !producto) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />

        <div className="flex min-h-screen items-center justify-center px-6 pt-24">
          <div className="rounded-3xl border border-white/10 bg-gray-950 p-10 text-center">
            <p className="text-xl font-black text-red-400">
              Producto no disponible
            </p>
            <p className="mt-2 text-gray-500">
              {error || 'No se encontró información del producto.'}
            </p>

            <Link
              to="/catalogo"
              className="mt-6 inline-flex rounded-full bg-green-400 px-6 py-3 font-black text-black transition hover:bg-green-300"
            >
              Volver al catálogo
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const imagenActual = varianteSeleccionada?.imagen || producto.imagen;
  const precioActual = varianteSeleccionada?.precio || producto.precio;
  const stockActual = varianteSeleccionada?.stock ?? producto.stock;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="px-6 pb-20 pt-32">
        <div className="mx-auto max-w-7xl">
          <Link
            to="/catalogo"
            className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-green-400 transition hover:text-green-300"
          >
            <ArrowLeft size={18} />
            Volver al catálogo
          </Link>

          <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <ProductImage imagenActual={imagenActual} producto={producto} />

            <div className="rounded-[2rem] border border-white/10 bg-gray-950 p-8 shadow-2xl lg:p-10">
              <ProductInfo
                producto={producto}
                precioActual={precioActual}
                stockActual={stockActual}
                formatoPrecio={formatoPrecio}
              />

              <ProductVariants
                producto={producto}
                varianteSeleccionada={varianteSeleccionada}
                setVarianteSeleccionada={setVarianteSeleccionada}
              />

              <ProductActions stockActual={stockActual} />
              <ProductBenefits />

              </div>
          </section>

          <ProductExtraInfo producto={producto} />
          
        </div>
      </main>
    </div>
  );
}

export default DetalleProducto;