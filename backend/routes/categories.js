const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all categories
router.get('/', async (req, res) => {
  try {
    const connection = await db.getConnection();
    const [categories] = await connection.query(
      'SELECT DISTINCT category FROM articles ORDER BY category'
    );
    connection.release();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

module.exports = router;
