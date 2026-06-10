const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all news articles
router.get('/', async (req, res) => {
  try {
    const connection = await db.getConnection();
    const [articles] = await connection.query(
      'SELECT * FROM articles ORDER BY published_date DESC LIMIT 50'
    );
    connection.release();
    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

// Get article by ID
router.get('/:id', async (req, res) => {
  try {
    const connection = await db.getConnection();
    const [article] = await connection.query(
      'SELECT * FROM articles WHERE id = ?',
      [req.params.id]
    );
    connection.release();
    if (article.length === 0) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.json(article[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch article' });
  }
});

// Get articles by category
router.get('/category/:category', async (req, res) => {
  try {
    const connection = await db.getConnection();
    const [articles] = await connection.query(
      'SELECT * FROM articles WHERE category = ? ORDER BY published_date DESC',
      [req.params.category]
    );
    connection.release();
    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

module.exports = router;
