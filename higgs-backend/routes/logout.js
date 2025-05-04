import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
    req.session.destroy();
    res.status(200);
    res.send();
});

export default router;