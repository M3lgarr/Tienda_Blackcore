import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem('blackcore_carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  useEffect(() => {
    localStorage.setItem('blackcore_carrito', JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = item => {
    setCarrito(prevCarrito => {
      const itemExistente = prevCarrito.find(
        producto =>
          producto.productoId === item.productoId &&
          producto.varianteId === item.varianteId
      );

      if (itemExistente) {
        return prevCarrito.map(producto =>
          producto.productoId === item.productoId &&
          producto.varianteId === item.varianteId
            ? {
                ...producto,
                cantidad: Math.min(producto.cantidad + 1, producto.stock)
              }
            : producto
        );
      }

      return [
        ...prevCarrito,
        {
          ...item,
          cantidad: 1
        }
      ];
    });
  };

  const eliminarDelCarrito = itemId => {
    setCarrito(prevCarrito =>
      prevCarrito.filter(item => item.itemId !== itemId)
    );
  };

  const actualizarCantidad = (itemId, nuevaCantidad) => {
    setCarrito(prevCarrito =>
      prevCarrito.map(item =>
        item.itemId === itemId
          ? {
              ...item,
              cantidad: Math.max(1, Math.min(Number(nuevaCantidad), item.stock))
            }
          : item
      )
    );
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const totalProductos = carrito.reduce(
    (total, item) => total + item.cantidad,
    0
  );

  const subtotal = carrito.reduce(
    (total, item) => total + Number(item.precio) * item.cantidad,
    0
  );

  const total = subtotal;

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        actualizarCantidad,
        vaciarCarrito,
        totalProductos,
        subtotal,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}