import express from 'express';
import bcrypt from 'bcryptjs';
import {data as db} from '../app.js';

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {

    // if body contains a username and a password, continue. otherwise, return 400 error code.
        if (req.body.user && req.body.pass) {

            // get information for provided user..
            const dat = await db.query(
                'SELECT * FROM Admin WHERE name = ?',
                req.body.user,
            );       

            // if the user doesn't exist, send 401 error code. Otherwise, continue.
            if (dat[0][0] == null) res.status(401).send();
            else {

                // compare the given password to the stored hash.
                const auth = await bcrypt.compare(
                    req.body.pass, 
                    String(dat[0][0]['passHash'])
                ); 
                
                // if the password matches the hash, append adminId to session. otherwise, send 401 error code.
                if (auth) {
                    req.session.user = dat[0][0]['adminId'];
                    res.status(200);
                } else res.status(401);
            }
        } else res.status(400);
        res.send();
    } catch (err) {
        console.error(err);
    }

    // send 500 if server error.
    res.sendStatus(500);
});

export default router;