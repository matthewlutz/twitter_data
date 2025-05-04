import express from 'express';

const router = express.Router();

router.all('*', (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    res.status(401).send();
});

export default router;