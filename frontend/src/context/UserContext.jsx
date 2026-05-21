import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

const usuarioInicial = {
  id: 1,
  nombre: 'Julio Melgar',
  email: 'julio.m3lgarb@gmail.com',
  telefono: '32912603',
  direcciones: [
    {
      id: 1,
      alias: 'Casa',
      nombreRecibe: 'Julio Melgar',
      telefono: '32912603',
      direccion: 'Zona 3 de Villa Nueva, Planes de Bárcenas',
      ciudad: 'Villa Nueva',
      departamento: 'Guatemala',
      referencia: 'Cerca de zona residencial'
    },
    {
      id: 2,
      alias: 'Universidad',
      nombreRecibe: 'Julio Melgar',
      telefono: '32912603',
      direccion: 'Universidad Mariano Gálvez',
      ciudad: 'Guatemala',
      departamento: 'Guatemala',
      referencia: 'Entrega en recepción'
    }
  ],
  metodosPago: [
    {
      id: 1,
      alias: 'Tarjeta principal',
      tipo: 'Tarjeta',
      titular: 'Julio Melgar',
      ultimos4: '4242',
      marca: 'Visa',
      vencimiento: '12/28'
    },
    {
      id: 2,
      alias: 'Transferencia simulada',
      tipo: 'Transferencia',
      banco: 'Banco simulado',
      cuenta: '****1020'
    }
  ]
};

export function UserProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const usuarioGuardado = localStorage.getItem('blackcore_usuario');
    return usuarioGuardado ? JSON.parse(usuarioGuardado) : usuarioInicial;
  });

  useEffect(() => {
    localStorage.setItem('blackcore_usuario', JSON.stringify(usuario));
  }, [usuario]);

  const actualizarDatosUsuario = datosActualizados => {
    setUsuario(prev => ({
      ...prev,
      ...datosActualizados
    }));
  };

  const agregarDireccion = nuevaDireccion => {
    const direccion = {
      ...nuevaDireccion,
      id: Date.now()
    };

    setUsuario(prev => ({
      ...prev,
      direcciones: [...prev.direcciones, direccion]
    }));
  };

  const actualizarDireccion = (id, datosDireccion) => {
    setUsuario(prev => ({
      ...prev,
      direcciones: prev.direcciones.map(direccion =>
        direccion.id === id
          ? { ...direccion, ...datosDireccion }
          : direccion
      )
    }));
  };

  const eliminarDireccion = id => {
    setUsuario(prev => ({
      ...prev,
      direcciones: prev.direcciones.filter(direccion => direccion.id !== id)
    }));
  };

  const agregarMetodoPago = nuevoMetodo => {
    const metodo = {
      ...nuevoMetodo,
      id: Date.now()
    };

    setUsuario(prev => ({
      ...prev,
      metodosPago: [...prev.metodosPago, metodo]
    }));
  };

  const actualizarMetodoPago = (id, datosMetodo) => {
    setUsuario(prev => ({
      ...prev,
      metodosPago: prev.metodosPago.map(metodo =>
        metodo.id === id
          ? { ...metodo, ...datosMetodo }
          : metodo
      )
    }));
  };

  const eliminarMetodoPago = id => {
    setUsuario(prev => ({
      ...prev,
      metodosPago: prev.metodosPago.filter(metodo => metodo.id !== id)
    }));
  };

  return (
    <UserContext.Provider
      value={{
        usuario,
        actualizarDatosUsuario,
        agregarDireccion,
        actualizarDireccion,
        eliminarDireccion,
        agregarMetodoPago,
        actualizarMetodoPago,
        eliminarMetodoPago
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}