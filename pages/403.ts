import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('https://www.google.com');
    }
);

export default router;