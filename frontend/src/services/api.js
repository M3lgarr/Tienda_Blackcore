const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

async function request(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    const contentType = response.headers.get('content-type');

    const data = contentType?.includes('application/json')
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      throw new Error(
        typeof data === 'string'
          ? data
          : data.detalle || data.error || data.mensaje || 'Error en la petición'
      );
    }

    return data;
  } catch (error) {
    console.error(`Error en request ${endpoint}:`, error);
    throw error;
  }
}

/* ================================
   IMÁGENES
================================ */

export function getImagenUrl(rutaImagen) {
  if (!rutaImagen) {
    return '';
  }

  if (rutaImagen.startsWith('http')) {
    return rutaImagen;
  }

  return `${API_URL}/imagenes/${rutaImagen}`;
}

/* ================================
   PRODUCTOS
================================ */

export function getProductos() {
  return request('/api/productos');
}

export function getProductoPorId(id) {
  return request(`/api/productos/${id}`);
}

export function crearProducto(producto) {
  return request('/api/productos', {
    method: 'POST',
    body: JSON.stringify(producto)
  });
}

export function actualizarProducto(id, producto) {
  return request(`/api/productos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(producto)
  });
}

export function eliminarProducto(id) {
  return request(`/api/productos/${id}`, {
    method: 'DELETE'
  });
}

/* ================================
   CATEGORÍAS
================================ */

export function getCategorias() {
  return request('/api/categorias');
}

export function crearCategoria(categoria) {
  return request('/api/categorias', {
    method: 'POST',
    body: JSON.stringify(categoria)
  });
}

/* ================================
   VARIANTES
================================ */

export function getVariantes() {
  return request('/api/productos/variantes');
}

export function crearVariante(variante) {
  return request('/api/productos/variantes', {
    method: 'POST',
    body: JSON.stringify(variante)
  });
}

export function crearVariantesBulk(variantes) {
  return request('/api/productos/variantes/bulk', {
    method: 'POST',
    body: JSON.stringify(variantes)
  });
}

/* ================================
   NOTICIAS
================================ */

export function getNoticias() {
  return request('/api/noticias');
}