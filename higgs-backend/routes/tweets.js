import express from 'express';
import { db } from '../server.js';
const router = express.Router();

//get tweet content using a prepared statement
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.execute(
      'SELECT t.content, t.timestamp, u.username AS user FROM tweets t JOIN users u ON t.user_id = u.id WHERE t.id = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Tweet not found' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching tweet:', err);
    res.status(500).json({ error: 'Failed to fetch tweet' });
  }
});

export default router;
