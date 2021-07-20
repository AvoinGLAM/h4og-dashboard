import express from 'express';
const router = express.Router();

import data from '../../../data.json';

router.get('/results', (req, res) => {
    res.json(data);
});

export default router;