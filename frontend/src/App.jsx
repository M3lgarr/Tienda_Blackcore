import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import './index.css';
import DetalleProducto from './pages/DetalleProducto';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
       <Route path="/producto/:id" element={<DetalleProducto />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;