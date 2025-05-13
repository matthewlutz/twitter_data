import express from 'express';
import {data as db} from '../app.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

// returns list of all admin users.
router.get('/admin', async (req, res, next) => {
    try {
        // select everything except the password hash from Admin table.
        const adminDat = await db.query(
            `SELECT adminId, name FROM Admin`
        );
        res.status(200).send(adminDat);
    } catch (err) {
        console.error(err);
    }
});

// create a new admin user.
router.post('/admin', async (req, res, next) => {
    try {
        // hash provided password.
        const hashedPassword = await bcrypt.hash(req.body.pass, 10);

        // attempt to create new admin user.
        const result = await db.query(
            `INSERT INTO Admin (adminId, name, passHash)
            VALUES (?, ?, ?)`,
            [crypto.getRandomValues(new Uint16Array(1))[0], req.body.user, hashedPassword]
        )

        res.status(201).send();
    } catch (err) {
        console.error(err);
    }

});

// update existing admin user name and/or password. assumes button press from list of exisiting admin users.
router.put('/admin/:id', async (req, res, next) => {
    try {
        // check if body contains an updated username or password.
        if (req.body.user || req.body.pass) {
            // update username if provided.
            if (req.body.user) {
                await db.query(
                    `UPDATE Admin
                    SET name = ?
                    WHERE adminId = ?`,
                    [req.body.user, req.params.id]
                );
            }

            // update password if provided.
            if (req.body.pass) {
                const hashedPassword = await bcrypt.hash(req.body.pass, 10);

                await db.query(
                    `UPDATE Admin
                    SET passHash = ?
                    WHERE adminId = ?`,
                    [hashedPassword, req.params.id]
                );
            }
            res.status(204).send();
        } else res.status(400).send();
    } catch (err) {
        console.error(err)
    };
});

// delete an admin user.
router.delete('/admin/:id', async (req, res, next) => {
    try {
        await db.query(
            `DELETE
            FROM Admin
            WHERE adminId = ?`,
            [req.params.id]
        )
        res.status(204).send();
    } catch (err) {
        console.error(err);
    }
});

export default router;