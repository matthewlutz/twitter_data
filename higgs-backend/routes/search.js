import express from 'express';
import {data as db} from '../app.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        var list = [];
        var dat = await db.query(
            'SELECT t.userId AS userA, r.userId AS userB, r.tweetId AS tweetId, t.timestamp, r.content AS content FROM Reply AS r LEFT JOIN Tweet AS t ON r.tweetId = t.tweetId'
        );
        for (let i = 0; i < dat[0].length; i++) {
            dat[0][i].type = "Reply";
        };
        list = dat[0];

        dat = await db.query(
            'SELECT t.userId AS userA, r.userId AS userB, r.tweetId AS tweetId, t.timestamp FROM Retweet AS r LEFT JOIN Tweet AS t ON r.tweetId = t.tweetId'
        );
        for (let i = 0; i < dat[0].length; i++) {
            dat[0][i].type = "Retweet";
        };
        list = list.concat(dat[0]);

        dat = await db.query(
            'SELECT t.userId AS userA, m.userId AS userB, m.tweetId AS tweetId, t.timestamp FROM Mention AS m LEFT JOIN Tweet AS t ON m.tweetId = t.tweetId'
        );
        for (let i = 0; i < dat[0].length; i++) {
            dat[0][i].type = "Mention";
        };
        list = list.concat(dat[0]);

        console.log([list]);
        res.status(200).send(list);
    } catch (err) {
        console.log(err);
    }
});


router.get('/search', async (req, res, next) => {
    try {
     req.body.query
     req.body.filter
     req.body.size
    } catch (err) {
        console.log(err);
    };
});

export default router;