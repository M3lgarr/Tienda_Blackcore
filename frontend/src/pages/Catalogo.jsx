import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getProductos, getCategorias } from '../services/api';

import CatalogHeader from '../components/catalog/CatalogHeader';
import CatalogFilters from '../components/catalog/CatalogFilters';
import ProductGrid from '../components/catalog/ProductGrid';


function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [precioMin, setPrecioMin] = useState('');
  const [precioMax, setPrecioMax] = useState('');
  const [orden, setOrden] = useState('');
  useEffect(() => {
    getProductos()
      .then(data => setProductos(data))
      .catch(err => console.error('Error al cargar productos:', err));

    getCategorias()
      .then(data => setCategorias(data))
      .catch(err => console.error('Error al cargar categorías:', err));
  }, []);

  const productosFiltrados = productos
  .filter(prod => {
    const coincideCategoria =
      categoriaSeleccionada === '' ||
      prod.categoriaId === parseInt(categoriaSeleccionada);

    const textoBusqueda = busqueda.toLowerCase();

    const coincideBusqueda =
      prod.nombre?.toLowerCase().includes(textoBusqueda) ||
      prod.descripcion?.toLowerCase().includes(textoBusqueda) ||
      prod.categoria?.nombre?.toLowerCase().includes(textoBusqueda);

    const precioProducto = Number(prod.precio);

    const coincidePrecioMin =
      precioMin === '' || precioProducto >= Number(precioMin);

    const coincidePrecioMax =
      precioMax === '' || precioProducto <= Number(precioMax);

    return (
      coincideCategoria &&
      coincideBusqueda &&
      coincidePrecioMin &&
      coincidePrecioMax
    );
  })
  .sort((a, b) => {
    if (orden === 'precio-asc') {
      return Number(a.precio) - Number(b.precio);
    }

    if (orden === 'precio-desc') {
      return Number(b.precio) - Number(a.precio);
    }

    if (orden === 'nombre-asc') {
      return a.nombre.localeCompare(b.nombre);
    }

    if (orden === 'stock-desc') {
      return Number(b.stock) - Number(a.stock);
    }

    return 0;
  });


  const limpiarFiltros = () => {
    setBusqueda('');
    setCategoriaSeleccionada('');
    setPrecioMin('');
    setPrecioMax('');
    setOrden('');
  };

 return (
  <div className="min-h-screen bg-black text-white">
    <Navbar />

    <section className="px-6 pb-16 pt-32">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-green-400 hover:text-green-300"
        >
          <ArrowLeft size={18} />
          Volver al inicio
        </Link>

        <CatalogHeader />

        <CatalogFilters
          busqueda={busqueda}
          setBusqueda={setBusqueda}
          categoriaSeleccionada={categoriaSeleccionada}
          setCategoriaSeleccionada={setCategoriaSeleccionada}
          categorias={categorias}
          precioMin={precioMin}
          setPrecioMin={setPrecioMin}
          precioMax={precioMax}
          setPrecioMax={setPrecioMax}
          orden={orden}
          setOrden={setOrden}
          limpiarFiltros={limpiarFiltros}
          totalProductos={productosFiltrados.length}
        />

        <ProductGrid productos={productosFiltrados} />
      </div>
    </section>
  </div>
);
}

export default Catalogo;