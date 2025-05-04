import express from 'express';
import bcrypt from 'bcryptjs';
import {data as db} from '../app.js';

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        if (req.body.user && req.body.pass) {
            const dat = await db.query(
                'SELECT * FROM Admin WHERE name = ?',
                req.body.user,
            );       

            const auth = await bcrypt.compare(
                req.body.pass, 
                String(dat[0][0]['passHash'])
            ); 
            
            if (auth) {
                req.session.user = dat[0][0]['adminId'];
                res.status(200);
            } else res.status(401);
        } else res.status(400);
        res.send();
    } catch (err) {
        console.error(err);
    }
});

export default router;