import express from 'express';

const router = express.Router();

router.all('*', (req, res, next) => {
    // rudamentary authentication guard, not for use in an actual production product, but adequate for the scope of this project.
    if (req.session.user) {
        return next();
    }
    res.status(401).send();
});

export default router;