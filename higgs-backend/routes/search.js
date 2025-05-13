import express from 'express';
import {data as db} from '../app.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        // list of Reply interactions appended with type variable.

        const replyDat = await db.query(
            `SELECT a.userName AS userA, b.userName AS userB, r.tweetId AS tweetId, t.timestamp, r.content AS content,
            IF(f.follower IS NOT NULL, 1, 0) AS follows
            FROM Reply AS r 
            LEFT JOIN Tweet AS t 
                ON r.tweetId = t.tweetId 
            JOIN User AS a 
                ON t.userId = a.userId 
            JOIN User AS b 
                ON r.userId = b.userId
            LEFT JOIN Follow AS f 
               	ON f.follower = r.userId AND f.following = t.userId`
        );

        for (let i = 0; i < replyDat[0].length; i++) {
            replyDat[0][i].type = "reply";
        };

        // list of Retweet interactions appended with type variable.

        const retweetDat = await db.query(
            `SELECT a.userName AS userA, b.userName AS userB, r.tweetId AS tweetId, t.timestamp,
            IF(f.follower IS NOT NULL, 1, 0) AS follows 
            FROM Retweet AS r 
            LEFT JOIN Tweet AS t 
                ON r.tweetId = t.tweetId 
            JOIN User AS a 
                ON t.userId = a.userId 
            JOIN User AS b 
                ON r.userId = b.userId
            LEFT JOIN Follow AS f 
               	ON f.follower = r.userId AND f.following = t.userId`
        );

        for (let i = 0; i < retweetDat[0].length; i++) {
            retweetDat[0][i].type = "retweet";
        };

        // list of Mention interactions appended with type variable.
        const mentionDat = await db.query(
            `SELECT a.userName AS userA, b.userName AS userB, m.tweetId AS tweetId, t.timestamp, 
            IF(f.follower IS NOT NULL, 1, 0) AS follows
            FROM Mention AS m 
            LEFT JOIN Tweet AS t 
                ON m.tweetId = t.tweetId 
            JOIN User AS a 
                ON t.userId = a.userId 
            JOIN User AS b 
                ON m.userId = b.userId
            LEFT JOIN Follow AS f 
               	ON f.follower = m.userId AND f.following = t.userId`
        );
        for (let i = 0; i < mentionDat[0].length; i++) {
            mentionDat[0][i].type = "mention";
        };
        
        // concat arrays for loading in json reply body.
        const list = replyDat[0].concat(retweetDat[0]).concat(mentionDat[0]);

        res.status(200).send(list);
    } catch (err) {
        console.log(err);
    }
});


router.get('/search', async (req, res, next) => {
    try {
        /**
         * Cannot implement properly, as search feature purely exists on front end.
         */
    } catch (err) {
        console.log(err);
    };
});

export default router;