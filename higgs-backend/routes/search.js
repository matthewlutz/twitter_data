import express from 'express';
import {data as db} from '../app.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        
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