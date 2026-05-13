require('dotenv').config();

console.log('Cargando DATABASE_URL:', process.env.DATABASE_URL);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_NAME:', process.env.DB_NAME);

const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const { PrismaMariaDb } = require('@prisma/adapter-mariadb');

async function main() {
  const adapter = new PrismaMariaDb({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'blackcore',
    connectionLimit: 5,
  });

  const prisma = new PrismaClient({ adapter });

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



/* ---------------------------------------------- */

app.get('/api/categorias', async (req, res) => {
    try {
      const categorias = await prisma.categoria.findMany();
      res.json(categorias);
    } catch (error) {
      console.error('Error al obtener categorías:', error);
      res.status(500).json({ error: 'Error al obtener categorías' });
    }
  });

app.post("/api/categorias/bulk", async (req, res) => {
    try {
        const categorias = req.body;

        if (!Array.isArray(categorias)) {
        return res.status(400).json({
            error: "Debes enviar un arreglo de categorías"
        });
        }

        const resultado = await prisma.categoria.createMany({
        data: categorias,
        skipDuplicates: true
        });

        res.status(201).json({
        mensaje: "Categorías creadas correctamente",
        resultado
        });
    } catch (error) {
        res.status(500).json({
        error: "Error al crear categorías",
        detalle: error.message
        });
    }
    });

app.post("/api/categorias", async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;

        if (!nombre) {
        return res.status(400).json({
            error: "El campo nombre es obligatorio"
        });
        }

        const categoria = await prisma.categoria.create({
        data: {
            nombre,
            descripcion
        }
        });

        res.status(201).json(categoria);
    } catch (error) {
        res.status(500).json({
        error: "Error al crear categoría",
        detalle: error.message
        });
    }
    });

/* ----------------------------  APIS PRODUCTO  ------------------------------------------------------------------- */


  app.get('/api/productos', async (req, res) => {
    try {
      const productos = await prisma.producto.findMany({
        include: {
          categoria: true,
        },
      });

      res.json(productos);
    } catch (error) {
      console.error('Error al obtener productos:', error);
      res.status(500).json({ error: 'Error al obtener productos' });
    }
  });

  app.post('/api/productos', async (req, res) => {
    try {
      const producto = await prisma.producto.create({
        data: req.body,
      });

      res.status(201).json(producto);
    } catch (error) {
      console.error('Error al crear producto:', error);
      res.status(500).json({ error: 'Error al crear producto' });
    }
  });


  app.post("/api/productos/bulk", async (req, res) => {
    try {
        const productos = req.body;

        if (!Array.isArray(productos)) {
        return res.status(400).json({
            error: "Debes enviar un arreglo de productos"
        });
        }

        const resultado = await prisma.producto.createMany({
        data: productos,
        skipDuplicates: true
        });

        res.status(201).json({
        mensaje: "Productos creados correctamente",
        resultado
        });
    } catch (error) {
        res.status(500).json({
        error: "Error al crear productos",
        detalle: error.message
        });
    }
  });

/* ----------------------------------*/


  app.get('/api/productos/variantes', async (req, res) => {
    try {
      const variantes = await prisma.productoVariante.findMany({
        include: {
          producto: true
        }
      });

      res.json(variantes);
    } catch (error) {
      res.status(500).json({
        error: 'Error al obtener variantes',
        detalle: error.message
      });
    }
  });

  app.post('/api/productos/variantes/bulk', async (req, res) => {
    try {
      const variantes = req.body;

      if (!Array.isArray(variantes)) {
        return res.status(400).json({
          error: 'Debes enviar un arreglo de variantes'
        });
      }

      const resultado = await prisma.productoVariante.createMany({
        data: variantes,
        skipDuplicates: true
      });

      res.status(201).json({
        mensaje: 'Variantes creadas correctamente',
        resultado
      });
    } catch (error) {
      console.error('Error al crear variantes:', error);

      res.status(500).json({
        error: 'Error al crear variantes',
        detalle: error.message
      });
    }
  });

  app.put('/api/productos/:id', async (req, res) => {
    const { id } = req.params;

    try {
      const producto = await prisma.producto.update({
        where: {
          id: Number(id),
        },
        data: req.body,
      });

      res.json(producto);
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      res.status(500).json({ error: 'Error al actualizar producto' });
    }
  });

  app.delete('/api/productos/variantes/:id', async (req, res) => {
    const { id } = req.params;

    try {
      await prisma.productoVariante.delete({
        where: {
          id: Number(id),
        },
      });

      res.json({
        mensaje: 'Variante eliminada correctamente',
      });
    } catch (error) {
      console.error('Error al eliminar variante:', error);

      res.status(500).json({
        error: 'Error al eliminar variante',
        detalle: error.message,
      });
    }
  });


/* ----------------------------------*/


  app.get('/api/productos/:id', async (req, res) => {
    const { id } = req.params;

    try {
      const producto = await prisma.producto.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          categoria: true,
          variantes: true,
        },
      });

      if (!producto) {
        return res.status(404).json({
          error: 'Producto no encontrado',
        });
      }

      res.json(producto);
    } catch (error) {
      console.error('Error al obtener producto:', error);

      res.status(500).json({
        error: 'Error al obtener producto',
        detalle: error.message,
      });
    }
  });

  app.get('/api/productos/:id/variantes', async (req, res) => {
    const { id } = req.params;

    try {
      const variantes = await prisma.productoVariante.findMany({
        where: {
          productoId: Number(id),
        },
        orderBy: {
          id: 'asc',
        },
      });

      res.json(variantes);
    } catch (error) {
      console.error('Error al obtener variantes:', error);

      res.status(500).json({
        error: 'Error al obtener variantes',
        detalle: error.message,
      });
    }
  });


  app.put('/api/productos/variantes/:id', async (req, res) => {
    const { id } = req.params;

    try {
      const { nombre, color, imagen, stock, precio } = req.body;

      const variante = await prisma.productoVariante.update({
        where: {
          id: Number(id),
        },
        data: {
          nombre,
          color,
          imagen,
          stock,
          precio,
        },
      });

      res.json(variante);
    } catch (error) {
      console.error('Error al actualizar variante:', error);

      res.status(500).json({
        error: 'Error al actualizar variante',
        detalle: error.message,
      });
    }
  });


    app.delete('/api/productos/:id', async (req, res) => {
      const { id } = req.params;

      try {
        await prisma.producto.delete({
          where: {
            id: Number(id),
          },
        });

        res.json({ mensaje: 'Producto eliminado' });
      } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).json({ error: 'Error al eliminar producto' });
      }
    });

/* ----------------------------  APIS NOTICIAS  ------------------------------------------------------------------- */

app.get('/api/noticias', async (req, res) => {
  try {
    const query = 'gaming hardware OR PC gaming OR NVIDIA OR Razer';

    if (!process.env.NEWS_API_KEY) {
      return res.status(500).json({
        error: 'NEWS_API_KEY no está configurada en el archivo .env'
      });
    }

    const respuesta = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&pageSize=15&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`
    );

    const data = await respuesta.json();

    if (!respuesta.ok) {
      return res.status(500).json({
        error: 'Error al obtener noticias',
        detalle: data.message || 'Error desconocido'
      });
    }

    const noticiasUnicas = [];
    const fuentesUsadas = new Set();

    for (const article of data.articles) {
      if (!article.title || !article.description || !article.url) continue;

      const fuente = article.source?.name || 'Gaming News';

      if (fuentesUsadas.has(fuente)) continue;

      fuentesUsadas.add(fuente);

      noticiasUnicas.push({
        titulo: article.title,
        descripcion: article.description,
        imagen: article.urlToImage || '/fallback/news-placeholder.jpg',
        fuente,
        url: article.url,
        fecha: article.publishedAt
      });

      if (noticiasUnicas.length === 3) break;
    }

    res.json(noticiasUnicas);
  } catch (error) {
    res.status(500).json({
      error: 'Error al consultar noticias',
      detalle: error.message
    });
  }
});

  app.listen(PORT, () => {
    console.log(`BlackCore API corriendo en http://localhost:${PORT}`);
  });

}

main().catch((error) => {
  console.error('Error al iniciar servidor:', error);
  process.exit(1);
});