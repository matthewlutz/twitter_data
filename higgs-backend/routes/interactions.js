import express from 'express';
import { db } from '../server.js'; 
const router = express.Router();

//endpoint to get the rows 
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT 
        i.id,
        i.user_a AS userA,
        i.user_b AS userB,
        i.type,
        i.timestamp,
        i.tweet_id AS tweetId,
        CASE WHEN f.follower_id IS NOT NULL THEN TRUE ELSE FALSE END AS follows
      FROM interactions i
      LEFT JOIN follows f ON f.follower_id = i.user_b AND f.followed_id = i.user_a
      LIMIT 100;
    `);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching interactions:', err);
    res.status(500).json({ error: 'Failed to fetch interactions' });
  }
});

//endpoints for retrieving a tweet
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.execute(
      'SELECT * FROM interactions WHERE id = ?',
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Interaction not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching interaction:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

//endpoint for creating new tweets
router.post('/', async (req, res) => {
  const { userA, userB, type, timestamp, tweetId } = req.body;

  if (!userA || !userB || !type || !timestamp || !tweetId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await db.execute(
      `INSERT INTO interactions (user_a, user_b, type, timestamp, tweet_id)
       VALUES (?, ?, ?, ?, ?)`,
      [userA, userB, type, timestamp, tweetId]
    );
    res.status(201).json({ success: true });
  } catch (err) {
    console.error('Error inserting interaction:', err);
    res.status(500).json({ error: 'Insert failed' });
  }
});

//endpoint for updates
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { userA, userB, type, timestamp, tweetId } = req.body;

  if (!userA || !userB || !type || !timestamp || !tweetId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const [result] = await db.execute(
      `UPDATE interactions
       SET user_a = ?, user_b = ?, type = ?, timestamp = ?, tweet_id = ?
       WHERE id = ?`,
      [userA, userB, type, timestamp, tweetId, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Interaction not found' });
    }

    res.json({ success: true });
  } catch (err) {
    console.error('Error updating interaction:', err);
    res.status(500).json({ error: 'Update failed' });
  }
});

// delete endpoint 
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.execute(
      'DELETE FROM interactions WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Not found' });
    }

    res.json({ success: true });
  } catch (err) {
    console.error('Error deleting interaction:', err);
    res.status(500).json({ success: false, error: 'Database error' });
  }
});

export default router;
