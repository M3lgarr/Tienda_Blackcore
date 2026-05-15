const API_URL = 'http://localhost:3001';

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.detalle || 'Error en la solicitud');
  }

  return data;
}

// PRODUCTOS
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

// CATEGORÍAS
export function getCategorias() {
  return request('/api/categorias');
}

// VARIANTES
export function getVariantes() {
  return request('/api/productos/variantes');
}

export function getVariantesPorProducto(id) {
  return request(`/api/productos/${id}/variantes`);
}

export function crearVariantesBulk(variantes) {
  return request('/api/productos/variantes/bulk', {
    method: 'POST',
    body: JSON.stringify(variantes)
  });
}

export function actualizarVariante(id, variante) {
  return request(`/api/productos/variantes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(variante)
  });
}

export function eliminarVariante(id) {
  return request(`/api/productos/variantes/${id}`, {
    method: 'DELETE'
  });
}

// NOTICIAS
export function getNoticias() {
  return request('/api/noticias');
}

// IMÁGENES
export function getImagenUrl(rutaImagen) {
  if (!rutaImagen) {
    return '/fallback/news-placeholder.jpg';
  }

  return `${API_URL}/imagenes/${rutaImagen}`;
}