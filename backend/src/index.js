require('dotenv').config();

const express = require('express');
const cors = require('cors');
const prisma = require('./prisma/client');

const categoriaRoutes = require('./routes/categoria.routes');
const productoRoutes = require('./routes/producto.routes');
const varianteRoutes = require('./routes/variante.routes');
const noticiaRoutes = require('./routes/noticia.routes');

async function main() {
  await prisma.$connect();
  console.log('Conexión a la base de datos exitosa');

  const app = express();
  const PORT = process.env.PORT || 3001;

  app.use(cors());
  app.use(express.json());
  app.use('/imagenes', express.static('public/productos'));

  app.get('/', (req, res) => {
    res.json({ mensaje: 'BlackCore API funcionando' });
  });

  app.use('/api/categorias', categoriaRoutes);
  app.use('/api/productos/variantes', varianteRoutes);
  app.use('/api/productos', productoRoutes);
  app.use('/api/noticias', noticiaRoutes);

  app.listen(PORT, () => {
    console.log(`BlackCore API corriendo en http://localhost:${PORT}`);
  });
}

main().catch((error) => {
  console.error('Error al iniciar servidor:', error);
  process.exit(1);
});