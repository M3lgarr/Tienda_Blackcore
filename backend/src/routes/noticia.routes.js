const express = require('express');
const prisma = require('../prisma/client');

const router = express.Router();



router.get('/', async (req, res) => {
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

  module.exports = router;