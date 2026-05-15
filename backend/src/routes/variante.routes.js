
const express = require('express');
const prisma = require('../prisma/client');

const router = express.Router();

/* Obtener todas las variantes */
router.get('/', async (req, res) => {
  try {
    const variantes = await prisma.productoVariante.findMany({
      include: {
        producto: true
      },
      orderBy: {
        id: 'asc'
      }
    });

    res.json(variantes);
  } catch (error) {
    console.error('Error al obtener variantes:', error);

    res.status(500).json({
      error: 'Error al obtener variantes',
      detalle: error.message
    });
  }
});

/* Crear variantes en lote */
router.post('/bulk', async (req, res) => {
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

/* Actualizar una variante */
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { nombre, color, imagen, stock, precio } = req.body;

    const variante = await prisma.productoVariante.update({
      where: {
        id: Number(id)
      },
      data: {
        nombre,
        color,
        imagen,
        stock,
        precio
      }
    });

    res.json(variante);
  } catch (error) {
    console.error('Error al actualizar variante:', error);

    res.status(500).json({
      error: 'Error al actualizar variante',
      detalle: error.message
    });
  }
});

/* Eliminar una variante */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.productoVariante.delete({
      where: {
        id: Number(id)
      }
    });

    res.json({
      mensaje: 'Variante eliminada correctamente'
    });
  } catch (error) {
    console.error('Error al eliminar variante:', error);

    res.status(500).json({
      error: 'Error al eliminar variante',
      detalle: error.message
    });
  }
});

module.exports = router;
