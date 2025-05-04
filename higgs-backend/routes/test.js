import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200);
    res.send({
        sid: req.sessionID,
        user: req.session.user
    });
});

export default router;