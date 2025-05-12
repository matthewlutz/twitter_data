import express from 'express';
const router = express.Router();


router.post('/login', (req, res) => {
  const { username, password } = req.body;

  //change this once i get values
  if (username === 'admin' && password === 'password') {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

export default router;
