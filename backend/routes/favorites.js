const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get user's favorite articles
router.get('/:userId', async (req, res) => {
  try {
    const connection = await db.getConnection();
    const [favorites] = await connection.query(
      'SELECT a.* FROM articles a JOIN favorites f ON a.id = f.article_id WHERE f.user_id = ?',
      [req.params.userId]
    );
    connection.release();
    res.json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
});

// Add article to favorites
router.post('/', async (req, res) => {
  const { userId, articleId } = req.body;
  try {
    const connection = await db.getConnection();
    await connection.query(
      'INSERT INTO favorites (user_id, article_id) VALUES (?, ?)',
      [userId, articleId]
    );
    connection.release();
    res.json({ message: 'Article added to favorites' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add to favorites' });
  }
});

// Remove article from favorites
router.delete('/:userId/:articleId', async (req, res) => {
  try {
    const connection = await db.getConnection();
    await connection.query(
      'DELETE FROM favorites WHERE user_id = ? AND article_id = ?',
      [req.params.userId, req.params.articleId]
    );
    connection.release();
    res.json({ message: 'Article removed from favorites' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to remove from favorites' });
  }
});

module.exports = router;
