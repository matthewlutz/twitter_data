import express from 'express';
import cors from 'cors';
import tweetRoutes from './routes/tweets.js';
import interactionRoutes from './routes/interactions.js';
// import mysql from 'mysql2/promise'; // ✅ Uncomment when using real DB

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/tweets', tweetRoutes);
app.use('/interactions', interactionRoutes);

/*
// real db connection
const db = await mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_db_name'
});
*/

// mock db for testing
const db = {
  execute: async (query, values) => {
    if (query.includes('FROM tweets')) {
      return [[{
        user: 'mock_user',
        content: 'This is a mock tweet from the backend!',
        timestamp: new Date().toISOString()
      }]];
    }

    if (query.includes('FROM interactions')) {
      return [[
        {
          id: 1,
          userA: 'alice',
          userB: 'bob',
          type: 'retweet',
          timestamp: '2023-07-04T12:00:00Z',
          tweetId: 1,
          follows: true
        },
        {
          id: 2,
          userA: 'carol',
          userB: 'dave',
          type: 'mention',
          timestamp: '2023-07-04T12:05:00Z',
          tweetId: 2,
          follows: false
        },
        {
          id: 3,
          userA: 'emily',
          userB: 'frank',
          type: 'reply',
          timestamp: '2023-07-04T12:10:00Z',
          tweetId: 3,
          follows: true
        },
        {
          id: 4,
          userA: 'grace',
          userB: 'henry',
          type: 'retweet',
          timestamp: '2023-07-04T12:15:00Z',
          tweetId: 4,
          follows: false
        },
        {
          id: 5,
          userA: 'ivy',
          userB: 'jake',
          type: 'mention',
          timestamp: '2023-07-04T12:20:00Z',
          tweetId: 5,
          follows: true
        }
      ]];
    }
    

    return [{ affectedRows: 1 }];
  }
};

export { db }; 


app.get('/interactions', (req, res) => {
  const mockInteractions = [
    {
      id: 1,
      userA: 'alice',
      userB: 'bob',
      type: 'retweet',
      timestamp: '2023-07-04T12:00:00Z',
      tweetId: '1',
      follows: true,
    },
    {
      id: 2,
      userA: 'carol',
      userB: 'dave',
      type: 'mention',
      timestamp: '2023-07-04T12:05:00Z',
      tweetId: '2',
      follows: false,
    },
    {
      id: 3,
      userA: 'emily',
      userB: 'frank',
      type: 'reply',
      timestamp: '2023-07-04T12:10:00Z',
      tweetId: '3',
      follows: true,
    },
    {
      id: 4,
      userA: 'grace',
      userB: 'henry',
      type: 'retweet',
      timestamp: '2023-07-04T12:15:00Z',
      tweetId: '4',
      follows: false,
    },
    {
      id: 5,
      userA: 'ivy',
      userB: 'jake',
      type: 'mention',
      timestamp: '2023-07-04T12:20:00Z',
      tweetId: '5',
      follows: true,
    },
  ];

  res.json(mockInteractions);
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
