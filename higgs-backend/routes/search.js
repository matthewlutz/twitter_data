import express from 'express';
import {data as db} from '../app.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        // advanced query to provide all instances of every interaction to accomidate from front end functionality.
        const results = await db.query(
            `SELECT * FROM (
                SELECT a.userName AS userA, b.userName AS userB, m.tweetId AS tweetId, m.timestamp, 'mention' AS type,
                    IF(f.follower IS NOT NULL, 1, 0) AS follows
                FROM Mention AS m 
                LEFT JOIN Tweet AS t 
                    ON m.tweetId = t.tweetId 
                JOIN User AS a 
                    ON t.userId = a.userId 
                JOIN User AS b 
                    ON m.userId = b.userId
                LEFT JOIN Follow AS f 
                    ON f.follower = m.userId AND f.following = t.userId
            ) AS A
            UNION ALL
            SELECT * FROM (
                SELECT a.userName AS userA, b.userName AS userB, r.tweetId AS tweetId, r.timestamp, 'retweet' AS type,
                    IF(f.follower IS NOT NULL, 1, 0) AS follows
                FROM Retweet AS r 
                LEFT JOIN Tweet AS t 
                    ON r.tweetId = t.tweetId 
                JOIN User AS a 
                    ON t.userId = a.userId 
                JOIN User AS b 
                    ON r.userId = b.userId
                LEFT JOIN Follow AS f 
                    ON f.follower = r.userId AND f.following = t.userId
            ) AS B
            UNION ALL
            SELECT * FROM (
                SELECT a.userName AS userA, b.userName AS userB, r.tweetId AS tweetId, r.timestamp, 'reply' AS type,
                    IF(f.follower IS NOT NULL, 1, 0) AS follows
                FROM Reply AS r 
                LEFT JOIN Tweet AS t 
                    ON r.tweetId = t.tweetId 
                JOIN User AS a 
                    ON t.userId = a.userId 
                JOIN User AS b 
                    ON r.userId = b.userId
                LEFT JOIN Follow AS f 
                    ON f.follower = r.userId AND f.following = t.userId
            ) AS C`
        );
       
        // reply with query results.
        res.status(200).send(results[0]);
    } catch (err) {
        console.log(err);
    } 
    
    // if a server error occurs, return 500.
    res.sendStatus(500);
});


router.get('/search/:user', async (req, res, next) => {
    try {
        // get page number, size, order, and username for query.
        const pageSize = Number(req.query.size);
        const orderBy = `\'${req.query.orderby}\'`;
        const order = req.query.order;
        const page = req.query.page;
        const user = req.params.user;

        // calculate the offset variable based off page and size.
        const offset = Number((page - 1) * (pageSize));

        // advanced query to combine results of all interaction tables, order time by user defined column and order, and limit to current page and page size.
        const results = await db.query(
            `SELECT * FROM (
                SELECT a.userName AS userA, b.userName AS userB, m.tweetId AS tweetId, m.timestamp, 'mention' AS type,
                    IF(f.follower IS NOT NULL, 1, 0) AS follows
                FROM Mention AS m 
                LEFT JOIN Tweet AS t 
                    ON m.tweetId = t.tweetId 
                JOIN User AS a 
                    ON t.userId = a.userId 
                JOIN User AS b 
                    ON m.userId = b.userId
                LEFT JOIN Follow AS f 
               	    ON f.follower = m.userId AND f.following = t.userId
                WHERE a.userName = ? OR b.userName = ?
            ) AS A
            UNION ALL
            SELECT * FROM (
                SELECT a.userName AS userA, b.userName AS userB, r.tweetId AS tweetId, r.timestamp, 'retweet' AS type,
                    IF(f.follower IS NOT NULL, 1, 0) AS follows
                FROM Retweet AS r 
                LEFT JOIN Tweet AS t 
                    ON r.tweetId = t.tweetId 
                JOIN User AS a 
                    ON t.userId = a.userId 
                JOIN User AS b 
                    ON r.userId = b.userId
                LEFT JOIN Follow AS f 
                    ON f.follower = r.userId AND f.following = t.userId
                WHERE a.userName = ? OR b.userName = ?
            ) AS B
            UNION ALL
            SELECT * FROM (
                SELECT a.userName AS userA, b.userName AS userB, r.tweetId AS tweetId, r.timestamp, 'reply' AS type,
                    IF(f.follower IS NOT NULL, 1, 0) AS follows
                FROM Reply AS r 
                LEFT JOIN Tweet AS t 
                    ON r.tweetId = t.tweetId 
                JOIN User AS a 
                    ON t.userId = a.userId 
                JOIN User AS b 
                    ON r.userId = b.userId
                LEFT JOIN Follow AS f 
                    ON f.follower = r.userId AND f.following = t.userId
                WHERE a.userName = ? OR b.userName = ?
            ) AS C
            ORDER BY ? ?
            LIMIT ? OFFSET ?`,
            [user, user, user, user, user, user, orderBy, order, pageSize, offset]
        );

        // reply with query results.
        res.status(200).send(results[0]);
    } catch (err) {
        console.log(err);
    }; 
    
    // if a server error occurs, return 500.
    res.sendStatus(500);
});

router.get('/tweet/:id', async (req, res, next) => {
    try {

        // retrieve properly formatted data from Tweet with given tweetId.
        const tweetDat = await db.query(
            `SELECT timestamp, content, userName AS user, path AS media
            FROM Tweet AS t
            JOIN User AS u 
                ON t.userId = u.userId
            LEFT JOIN Media AS m
                ON m.tweetId = t.tweetId
            WHERE t.tweetId = ?`,
            [req.params.id],
        )
        
        res.status(200).send(tweetDat[0][0]);
    } catch (err) {
        console.log(err);
    }

    // if a server error occurs, return 500.
    res.sendStatus(500);
})

export default router;