import express from 'express';
import cors from 'cors';

const router = express.Router();

import data from '../../../data.json';

router.use(cors());

router.get('/results', (req, res) => {
    console.log(req.query);
    let results = data.filter(item => {
        if (req.query.type ? item.type != req.query.type : false) return;
        
        return item;
    })
    res.json(results);
});

export default router;