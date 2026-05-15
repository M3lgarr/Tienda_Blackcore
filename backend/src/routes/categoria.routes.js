const express = require('express');
const prisma = require('../prisma/client');

const router = express.Router();


router.get('/', async (req, res) => {
    try {
      const categorias = await prisma.categoria.findMany();
      res.json(categorias);
    } catch (error) {
      console.error('Error al obtener categorías:', error);
      res.status(500).json({ error: 'Error al obtener categorías' });
    }
  });

router.post("/bulk", async (req, res) => {
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

router.post("/", async (req, res) => {
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

    module.exports = router;