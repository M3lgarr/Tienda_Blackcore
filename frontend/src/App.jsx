import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import './index.css';
import DetalleProducto from './pages/DetalleProducto';
import AdminProductos from './pages/AdminProductos';
import Carrito from './pages/Carrito';
import Checkout from './pages/Checkout';
import ConfirmacionCompra from './pages/ConfirmacionCompra';
import Cuenta from './pages/Cuenta';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/producto/:id" element={<DetalleProducto />} />
        <Route path="/admin/productos" element={<AdminProductos />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/checkout" element={<Checkout />} />
       <Route path="/confirmacion" element={<ConfirmacionCompra />} />
       <Route path="/cuenta" element={<Cuenta />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;