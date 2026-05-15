const express = require('express');
const prisma = require('../prisma/client');

const router = express.Router();

router.get('/', async (req, res) => {
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

router.get('/:id', async (req, res) => {
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

router.post('/', async (req, res) => {
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

router.post('/bulk', async (req, res) => {
  try {
    const productos = req.body;

    if (!Array.isArray(productos)) {
      return res.status(400).json({
        error: 'Debes enviar un arreglo de productos',
      });
    }

    const resultado = await prisma.producto.createMany({
      data: productos,
      skipDuplicates: true,
    });

    res.status(201).json({
      mensaje: 'Productos creados correctamente',
      resultado,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al crear productos',
      detalle: error.message,
    });
  }
});

router.put('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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

module.exports = router;