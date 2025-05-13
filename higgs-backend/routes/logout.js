import express from 'express';

const router = express.Router();

// CURRENTLY UNUSED, NO LOGOUT BUTTON ON FRONTEND.
router.get('/', (req, res, next) => {
    // destroys current login session, then regenerates when page reloads.
    req.session.destroy();
    res.status(200);
    res.send();
});

export default router;